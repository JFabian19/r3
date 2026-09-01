import React, { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, Flame, Gift, Loader2, MapPin, Minus, Plus, ShoppingBag, Star, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { DEFAULT_MENU_DATA, Dish } from "./data/menuData";
import { submitSheetData } from "./services/googleSheets";

const RESTAURANTE_NAME = "R3 Carnes y Parrillas";
const WHATSAPP_NUMBER = "51959682826";
const WHATSAPP_DISPLAY = "959 682 826";
const LOGO_PATH = "/r3-logo.png";
const WHATSAPP_ICON_PATH = "/whatsapp-icon.png";
const INSTAGRAM_ICON_PATH = "/instagram-icon.png";
const INSTAGRAM_URL = "https://www.instagram.com/r73parrillas?igsi=ZjBxZDAxbHl3b29i";
const MARQUEE_TEXT = "AQUÍ EL FUEGO TIENE SABOR • CORTES QUE DESPIERTAN EL INSTINTO • R3 CARNES Y PARRILLAS • ";
const SIDE_OPTIONS = ["Papa", "Arroz", "Choclo", "Ensalada"];
const CREAM_OPTIONS = ["Ají de la casa", "Mayonesa", "Kétchup", "Mostaza"];
const PICKUP_FREE_LABEL = "Recojo en tienda gratis";
const DELIVERY_DISTRICTS = ["Ate", "Barranco", "Breña", "Cercado de Lima", "Chorrillos", "Comas", "El Agustino", "Independencia", "Jesús María", "La Molina", "La Victoria", "Lince", "Los Olivos", "Magdalena del Mar", "Miraflores", "Pueblo Libre", "Rímac", "San Borja", "San Isidro", "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis", "San Martín de Porres", "San Miguel", "Santa Anita", "Santiago de Surco", "Surquillo", "Villa El Salvador", "Villa María del Triunfo", "Otro distrito"];

type Fulfillment = "delivery" | "pickup";
type LocationStatus = "idle" | "loading" | "ready" | "error";

interface CartItem extends Dish {
  cantidad: number;
  cartKey: string;
  categoryId: string;
  packagingFee: number;
  guarniciones?: string[];
  cremas?: string[];
}

interface PendingDish { dish: Dish; categoryId: string }

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState(DEFAULT_MENU_DATA[0].id);
  const [showSummary, setShowSummary] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [pendingDish, setPendingDish] = useState<PendingDish | null>(null);
  const [selectedSides, setSelectedSides] = useState<string[]>([...SIDE_OPTIONS]);
  const [selectedCreams, setSelectedCreams] = useState<string[]>([]);
  const [checkoutData, setCheckoutData] = useState({ fulfillment: "delivery" as Fulfillment, nombre: "", telefono: "", direccion: "", distrito: "", metodoPago: "" });
  const [customerLocation, setCustomerLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [birthdayData, setBirthdayData] = useState({ nombre: "", telefono: "", fechaNacimiento: "", distrito: "", correo: "" });
  const [reviewData, setReviewData] = useState({ estrellasMozo: 0, estrellasComida: 0, comentario: "" });

  useEffect(() => {
    const sections = DEFAULT_MENU_DATA.map((cat) => document.getElementById(`cat-${cat.id}`)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActiveCategory(visible.target.id.replace("cat-", ""));
    }, { rootMargin: "-35% 0px -55%", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.cantidad, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (Number(item.precio.replace(/[^\d.]/g, "")) || 0) * item.cantidad, 0), [cart]);
  const packagingTotal = useMemo(() => cart.reduce((sum, item) => sum + item.packagingFee * item.cantidad, 0), [cart]);
  const total = subtotal + packagingTotal;

  const addToCart = (dish: Dish, categoryId: string, guarniciones?: string[], cremas?: string[]) => setCart((current) => {
    const packagingFee = categoryId === "bebidas" || categoryId === "adicionales" ? 0 : 1;
    const cartKey = [categoryId, dish.nombre, dish.precio, ...(guarniciones ?? []), "cremas", ...(cremas ?? [])].join("|");
    const existing = current.find((item) => item.cartKey === cartKey);
    return existing
      ? current.map((item) => item === existing ? { ...item, cantidad: item.cantidad + 1 } : item)
      : [...current, { ...dish, cantidad: 1, cartKey, categoryId, packagingFee, guarniciones, cremas }];
  });

  const updateQuantity = (dish: CartItem, delta: number) => setCart((current) => current
    .map((item) => item.cartKey === dish.cartKey ? { ...item, cantidad: item.cantidad + delta } : item)
    .filter((item) => item.cantidad > 0));

  const requestDish = (dish: Dish, categoryId: string) => {
    if (!dish.descripcion?.toLowerCase().includes("papa")) { addToCart(dish, categoryId); return; }
    setPendingDish({ dish, categoryId });
    setSelectedSides([...SIDE_OPTIONS]);
    setSelectedCreams([]);
  };

  const toggleSelection = (option: string, selection: string[], update: (value: string[]) => void) => {
    update(selection.includes(option) ? selection.filter((item) => item !== option) : [...selection, option]);
  };

  const confirmCustomization = () => {
    if (!pendingDish) return;
    addToCart(pendingDish.dish, pendingDish.categoryId, selectedSides, selectedCreams);
    setPendingDish(null);
  };

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openWhatsApp = () => {
    const message = `Hola ${RESTAURANTE_NAME}, quisiera hacer una consulta.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const requestCurrentLocation = () => {
    if (!navigator.geolocation) { setLocationStatus("error"); return; }
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCustomerLocation({ latitude: coords.latitude, longitude: coords.longitude });
        setLocationStatus("ready");
      },
      () => setLocationStatus("error"),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  const openCheckout = () => {
    setShowSummary(false);
    setShowCheckout(true);
  };

  const handleCheckoutSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!checkoutData.metodoPago) return;

    let message = `*Hola ${RESTAURANTE_NAME}, deseo realizar este pedido:*\n\n`;
    message += `*Modalidad:* ${checkoutData.fulfillment === "delivery" ? "Delivery" : PICKUP_FREE_LABEL}\n`;
    message += `*Nombre:* ${checkoutData.nombre}\n*Teléfono:* ${checkoutData.telefono}\n`;
    if (checkoutData.fulfillment === "delivery") {
      message += `*Dirección / referencia:* ${checkoutData.direccion}\n*Distrito:* ${checkoutData.distrito}\n`;
      message += customerLocation
        ? `*Ubicación exacta:* https://maps.google.com/?q=${customerLocation.latitude},${customerLocation.longitude}\n`
        : "*Ubicación exacta:* No compartida; usar la dirección indicada\n";
    }
    message += `*Medio de pago:* ${checkoutData.metodoPago}\n\n*PEDIDO*\n`;
    cart.forEach((item) => {
      message += `• ${item.cantidad} x ${item.nombre} — ${item.precio}\n`;
      if (item.guarniciones) message += `   Guarniciones: ${item.guarniciones.length ? item.guarniciones.join(", ") : "sin guarniciones"}\n`;
      if (item.cremas) message += `   Cremas: ${item.cremas.length ? item.cremas.join(", ") : "sin cremas"}\n`;
      if (item.packagingFee) message += `   Envase: S/ ${(item.packagingFee * item.cantidad).toFixed(2)}\n`;
    });
    message += `\nSubtotal: S/ ${subtotal.toFixed(2)}\nEnvases: S/ ${packagingTotal.toFixed(2)}\n*TOTAL: S/ ${total.toFixed(2)}*`;
    message += checkoutData.fulfillment === "delivery" ? "\n_Costo de delivery por coordinar en WhatsApp._" : "\n_Recojo en tienda sin costo._";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const handleBirthdaySubmit = async (event: React.FormEvent) => {
    event.preventDefault(); setIsSubmitting(true);
    const ok = await submitSheetData("Cumpleaños", { timestamp: new Date().toLocaleString("es-PE"), ...birthdayData });
    setIsSubmitting(false);
    if (ok) { setSuccessMessage("¡Listo! Guardamos tus datos para celebrar contigo."); setTimeout(() => { setShowBirthdayForm(false); setSuccessMessage(""); }, 2200); }
  };

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); if (!reviewData.estrellasMozo || !reviewData.estrellasComida) return; setIsSubmitting(true);
    const ok = await submitSheetData("Reseñas", { timestamp: new Date().toLocaleString("es-PE"), ...reviewData });
    setIsSubmitting(false);
    if (ok) { setSuccessMessage("¡Gracias! Tu opinión nos ayuda a seguir mejorando."); setTimeout(() => { setShowReviewForm(false); setSuccessMessage(""); }, 2200); }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a href="#inicio" className="brand-mini" aria-label="Volver al inicio"><img src={LOGO_PATH} alt="R3 Carnes y Parrillas" /></a>
        <div className="top-actions">
          <a className="icon-button" href="https://www.google.com/maps/search/?api=1&query=R3+Carnes+y+Parrillas" target="_blank" rel="noreferrer" aria-label="Ver ubicación"><MapPin size={19} /></a>
          <button className="icon-button cart-icon" onClick={() => cartCount && setShowSummary(true)} aria-label="Abrir pedido"><ShoppingBag size={19} />{cartCount > 0 && <span>{cartCount}</span>}</button>
        </div>
      </header>

      <div className="marquee" aria-label="Infinity marquee"><div className="marquee-track">{[0, 1, 2, 3, 4, 5].map((item) => <span key={item}>{MARQUEE_TEXT}</span>)}</div></div>

      <main>
        <section className="hero" id="inicio">
          <div className="flame-field" aria-hidden="true">
            {["one", "two", "three", "four", "five", "six", "seven"].map((flame) => <Flame className={`background-flame flame-${flame}`} fill="currentColor" strokeWidth={1.35} key={flame} />)}
          </div>
          <span className="eyebrow"><Flame size={14} fill="currentColor" /> Carta digital</span>
          <div className="logo-card"><img src={LOGO_PATH} alt="Logo original de R3 Carnes y Parrillas" /></div>
          <h1>El sabor de la parrilla<br /><em>en tus manos</em></h1>
          <p>Elige tus platos, arma tu pedido y envíalo directo por WhatsApp.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => scrollToCategory("tradicionales")}>Ver la carta <ChevronRight size={17} /></button>
            <button className="whatsapp-button" onClick={openWhatsApp}><img src={WHATSAPP_ICON_PATH} alt="" /> WhatsApp</button>
            <a className="instagram-button" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><img src={INSTAGRAM_ICON_PATH} alt="" /> Síguenos en Instagram</a>
          </div>
        </section>

        <button className="birthday-card" onClick={() => setShowBirthdayForm(true)}>
          <span className="birthday-icon"><Gift size={22} /></span><span><strong>¿Estás de cumpleaños?</strong><small>Regístrate y celebra con nosotros</small></span><ChevronRight size={18} />
        </button>

        <nav className="category-nav" aria-label="Categorías de la carta"><div className="category-track">
          {DEFAULT_MENU_DATA.map((category) => <button key={category.id} onClick={() => scrollToCategory(category.id)} className={activeCategory === category.id ? "active" : ""}>{category.nombre}</button>)}
        </div></nav>

        <div className="menu-content">
          {DEFAULT_MENU_DATA.map((category, categoryIndex) => (
            <section className="menu-section" id={`cat-${category.id}`} key={category.id}>
              <div className="section-heading"><div className="section-icon">{category.id === "bebidas" ? "🥤" : <Flame size={21} fill="currentColor" />}</div><div><span>0{categoryIndex + 1} /</span><h2>{category.nombre}</h2><p>{category.etiqueta}</p></div></div>
              <div className="dish-list">
                {category.items.map((dish) => (
                  <article className="dish-card" key={`${category.id}-${dish.nombre}`}>
                    <div className="dish-image-placeholder" role="img" aria-label={`Espacio reservado para la imagen de ${dish.nombre}`}>
                      <span>Acá va la imagen</span>
                    </div>
                    <div className="dish-copy"><h3>{dish.nombre}</h3>{dish.descripcion && <p>{dish.descripcion}</p>}</div>
                    <div className="dish-order"><span>Precio</span><strong>{dish.precio}</strong>{category.id !== "bebidas" && category.id !== "adicionales" && <small className="packaging-note">+ S/ 1 envase</small>}<motion.button whileTap={{ scale: 0.92 }} onClick={() => requestDish(dish, category.id)} aria-label={`Pedir ${dish.nombre}`}><Plus size={14} strokeWidth={3} /> Pedir</motion.button></div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <section className="review-card"><div><Star size={22} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={12} fill="currentColor" /></div><h2>¿Cómo estuvo todo?</h2><p>Cuéntanos sobre tu experiencia en R3.</p><button onClick={() => setShowReviewForm(true)}>Dejar una reseña</button></section>
        </div>
      </main>

      <footer><img src={LOGO_PATH} alt="R3 Carnes y Parrillas" /><p>Parrilla encendida. Sabor inolvidable.</p><button onClick={openWhatsApp}><img src={WHATSAPP_ICON_PATH} alt="" /> {WHATSAPP_DISPLAY}</button><small>© 2026 R3 Carnes y Parrillas · Hecho por Tyma Solutions</small></footer>

      <AnimatePresence>{cartCount > 0 && !showSummary && (
        <motion.button initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }} className="cart-bar" onClick={() => setShowSummary(true)}><span className="cart-bag"><ShoppingBag size={20} /><b>{cartCount}</b></span><span><small>Tu pedido</small><strong>S/ {total.toFixed(2)}</strong></span><span className="cart-view">Ver pedido <ChevronRight size={17} /></span></motion.button>
      )}</AnimatePresence>

      <AnimatePresence>{pendingDish && (
        <Modal onClose={() => setPendingDish(null)}>
          <div className="modal-heading customization-heading"><span>Arma tu plato</span><h2>{pendingDish.dish.nombre}</h2><p>Personaliza los acompañamientos antes de agregarlo.</p></div>
          <div className="customization-group">
            <div className="customization-title"><h3>Guarniciones</h3><small>Las cuatro vienen seleccionadas</small></div>
            <div className="customization-options">
              {SIDE_OPTIONS.map((option) => {
                const selected = selectedSides.includes(option);
                return <button type="button" className={selected ? "selected" : ""} aria-pressed={selected} onClick={() => toggleSelection(option, selectedSides, setSelectedSides)} key={option}><span>{selected && <Check size={13} strokeWidth={3} />}</span>{option}</button>;
              })}
            </div>
          </div>
          <div className="customization-group">
            <div className="customization-title"><h3>Cremas</h3><small>Elige todas las que quieras</small></div>
            <div className="customization-options">
              {CREAM_OPTIONS.map((option) => {
                const selected = selectedCreams.includes(option);
                return <button type="button" className={selected ? "selected" : ""} aria-pressed={selected} onClick={() => toggleSelection(option, selectedCreams, setSelectedCreams)} key={option}><span>{selected && <Check size={13} strokeWidth={3} />}</span>{option}</button>;
              })}
            </div>
          </div>
          <button className="customization-submit" onClick={confirmCustomization}><Plus size={17} strokeWidth={3} /> Agregar · {pendingDish.dish.precio} + S/ 1 envase</button>
        </Modal>
      )}</AnimatePresence>

      <AnimatePresence>{showSummary && (
        <Modal onClose={() => setShowSummary(false)}><div className="modal-heading"><span>Tu selección</span><h2>Mi pedido</h2></div><div className="cart-items">
          {cart.map((item) => <div className="cart-item" key={item.cartKey}><div className="cart-item-copy"><h3>{item.nombre}</h3><p>{item.precio}{item.packagingFee > 0 && <em> + S/ 1 envase c/u</em>}</p>{item.guarniciones && <small><b>Guarniciones:</b> {item.guarniciones.length ? item.guarniciones.join(", ") : "Sin guarniciones"}<br /><b>Cremas:</b> {item.cremas?.length ? item.cremas.join(", ") : "Sin cremas"}</small>}</div><div className="quantity"><button onClick={() => updateQuantity(item, -1)}><Minus size={15} /></button><b>{item.cantidad}</b><button onClick={() => updateQuantity(item, 1)}><Plus size={15} /></button></div><button className="remove" onClick={() => updateQuantity(item, -item.cantidad)}><Trash2 size={17} /></button></div>)}
        </div><div className="order-totals"><div><span>Productos</span><strong>S/ {subtotal.toFixed(2)}</strong></div><div><span>Envases</span><strong>S/ {packagingTotal.toFixed(2)}</strong></div><div className="cart-total"><span>Total</span><strong>S/ {total.toFixed(2)}</strong></div></div><button className="modal-whatsapp" onClick={openCheckout}><img src={WHATSAPP_ICON_PATH} alt="" /> Continuar pedido</button></Modal>
      )}</AnimatePresence>

      <AnimatePresence>{showCheckout && (
        <Modal onClose={() => setShowCheckout(false)}>
          <div className="modal-heading checkout-heading"><span>Último paso</span><h2>¿Cómo recibirás tu pedido?</h2><p>Completa los datos para preparar el mensaje de WhatsApp.</p></div>
          <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
            <div className="fulfillment-options" role="group" aria-label="Modalidad de entrega">
              <button type="button" className={checkoutData.fulfillment === "delivery" ? "selected" : ""} onClick={() => setCheckoutData({ ...checkoutData, fulfillment: "delivery" })}><span>Delivery</span><small>Precio por coordinar en WhatsApp</small></button>
              <button type="button" className={checkoutData.fulfillment === "pickup" ? "selected" : ""} onClick={() => setCheckoutData({ ...checkoutData, fulfillment: "pickup" })}><span>Recojo en tienda</span><small>Sin costo</small></button>
            </div>

            <FormField label="Nombre completo"><input required value={checkoutData.nombre} onChange={(event) => setCheckoutData({ ...checkoutData, nombre: event.target.value })} placeholder="¿Quién recibirá el pedido?" /></FormField>
            <FormField label="Número de contacto"><input required inputMode="numeric" pattern="[0-9]{9,11}" value={checkoutData.telefono} onChange={(event) => setCheckoutData({ ...checkoutData, telefono: event.target.value.replace(/\D/g, "") })} placeholder="999 999 999" /></FormField>

            {checkoutData.fulfillment === "delivery" && <>
              <FormField label="Dirección o referencia"><textarea required rows={3} value={checkoutData.direccion} onChange={(event) => setCheckoutData({ ...checkoutData, direccion: event.target.value })} placeholder="Calle, número y una referencia para llegar" /></FormField>
              <FormField label="Distrito"><select required value={checkoutData.distrito} onChange={(event) => setCheckoutData({ ...checkoutData, distrito: event.target.value })}><option value="">Selecciona tu distrito</option>{DELIVERY_DISTRICTS.map((district) => <option value={district} key={district}>{district}</option>)}</select></FormField>
              <div className="location-card">
                <button type="button" className={locationStatus === "ready" ? "ready" : ""} onClick={requestCurrentLocation} disabled={locationStatus === "loading"}><MapPin size={19} />{locationStatus === "loading" ? "Obteniendo ubicación..." : locationStatus === "ready" ? "Ubicación exacta agregada" : "Dar mi ubicación exacta"}</button>
                <p><b>Importante:</b> debes pulsar este botón y permitir el acceso para enviarnos tu ubicación en tiempo real y mejorar la precisión de la entrega. Si no lo haces, usaremos únicamente la dirección escrita.</p>
                {locationStatus === "error" && <small>No pudimos obtenerla. Revisa el permiso de ubicación o continúa solo con tu dirección.</small>}
              </div>
              <p className="delivery-note">El precio del delivery se coordinará contigo mediante WhatsApp.</p>
            </>}

            {checkoutData.fulfillment === "pickup" && <div className="pickup-note"><Check size={18} /><span><b>Recojo en tienda gratis.</b> Te confirmaremos por WhatsApp cuándo estará listo.</span></div>}

            <fieldset className="payment-fieldset"><legend>¿Con qué pagarás?</legend><div className="payment-options">
              {["Yape", "Efectivo", "Tarjeta"].map((method) => <label className={checkoutData.metodoPago === method ? "selected" : ""} key={method}><input required type="radio" name="metodoPago" value={method} checked={checkoutData.metodoPago === method} onChange={(event) => setCheckoutData({ ...checkoutData, metodoPago: event.target.value })} /><span>{method}</span></label>)}
            </div></fieldset>

            <button className="checkout-submit" type="submit"><img src={WHATSAPP_ICON_PATH} alt="" /> Enviar pedido por WhatsApp</button>
          </form>
        </Modal>
      )}</AnimatePresence>

      <AnimatePresence>{showBirthdayForm && (
        <Modal onClose={() => setShowBirthdayForm(false)}><div className="form-intro"><Gift size={25} /><span>Un detalle para ti</span><h2>¡Celebra con R3!</h2><p>Déjanos tus datos para acompañarte en tu día especial.</p></div>{successMessage ? <div className="success-message">{successMessage}</div> : (
          <form className="form-grid" onSubmit={handleBirthdaySubmit}>
            <FormField label="Nombre completo"><input required value={birthdayData.nombre} onChange={(e) => setBirthdayData({ ...birthdayData, nombre: e.target.value })} placeholder="Tu nombre" /></FormField>
            <FormField label="Teléfono"><input required inputMode="numeric" pattern="[0-9]{9,11}" value={birthdayData.telefono} onChange={(e) => setBirthdayData({ ...birthdayData, telefono: e.target.value.replace(/\D/g, "") })} placeholder="999 999 999" /></FormField>
            <FormField label="Fecha de nacimiento"><input required type="date" value={birthdayData.fechaNacimiento} onChange={(e) => setBirthdayData({ ...birthdayData, fechaNacimiento: e.target.value })} /></FormField>
            <FormField label="Distrito"><input required value={birthdayData.distrito} onChange={(e) => setBirthdayData({ ...birthdayData, distrito: e.target.value })} placeholder="Tu distrito" /></FormField>
            <FormField label="Correo (opcional)"><input type="email" value={birthdayData.correo} onChange={(e) => setBirthdayData({ ...birthdayData, correo: e.target.value })} placeholder="correo@ejemplo.com" /></FormField>
            <SubmitButton loading={isSubmitting}>Guardar mis datos</SubmitButton>
          </form>
        )}</Modal>
      )}</AnimatePresence>

      <AnimatePresence>{showReviewForm && (
        <Modal onClose={() => setShowReviewForm(false)}><div className="form-intro"><Star size={25} fill="currentColor" /><span>Tu opinión cuenta</span><h2>Califica tu visita</h2><p>Queremos que cada visita sea mejor que la anterior.</p></div>{successMessage ? <div className="success-message">{successMessage}</div> : (
          <form className="form-grid" onSubmit={handleReviewSubmit}>
            <Rating label="Atención" value={reviewData.estrellasMozo} onChange={(value) => setReviewData({ ...reviewData, estrellasMozo: value })} />
            <Rating label="Comida" value={reviewData.estrellasComida} onChange={(value) => setReviewData({ ...reviewData, estrellasComida: value })} />
            <FormField label="Comentario (opcional)"><textarea rows={3} value={reviewData.comentario} onChange={(e) => setReviewData({ ...reviewData, comentario: e.target.value })} placeholder="Cuéntanos tu experiencia..." /></FormField>
            <SubmitButton loading={isSubmitting}>Enviar reseña</SubmitButton>
          </form>
        )}</Modal>
      )}</AnimatePresence>
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}><motion.div className="modal-sheet" initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} onMouseDown={(event) => event.stopPropagation()}><div className="modal-handle" /><button className="modal-close" onClick={onClose} aria-label="Cerrar"><X size={19} /></button>{children}</motion.div></motion.div>;
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) { return <label className="form-field"><span>{label}</span>{children}</label>; }
function SubmitButton({ children, loading }: { children: React.ReactNode; loading: boolean }) { return <button className="submit-button" disabled={loading}>{loading ? <Loader2 className="spin" size={19} /> : children}</button>; }
function Rating({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <div className="rating"><span>{label}</span><div>{[1, 2, 3, 4, 5].map((star) => <button type="button" key={star} onClick={() => onChange(star)} aria-label={`${star} estrellas`}><Star size={27} className={value >= star ? "filled" : ""} fill={value >= star ? "currentColor" : "none"} /></button>)}</div></div>;
}
