import React, { useEffect, useMemo, useState } from "react";
import { ChevronRight, Flame, Gift, Loader2, MapPin, MessageCircle, Minus, Plus, ShoppingBag, Star, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { DEFAULT_MENU_DATA, Dish } from "./data/menuData";
import { submitSheetData } from "./services/googleSheets";

const RESTAURANTE_NAME = "R3 Carnes y Parrillas";
const WHATSAPP_NUMBER = "51959682826";
const WHATSAPP_DISPLAY = "959 682 826";
const LOGO_PATH = "/r3-logo.png";
const MARQUEE_TEXT = "INFINITY • SABOR QUE ENCIENDE • CARNES Y PARRILLAS • ";

interface CartItem extends Dish { cantidad: number }

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState(DEFAULT_MENU_DATA[0].id);
  const [showSummary, setShowSummary] = useState(false);
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
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
  const total = useMemo(() => cart.reduce((sum, item) => sum + (Number(item.precio.replace(/[^\d.]/g, "")) || 0) * item.cantidad, 0), [cart]);

  const addToCart = (dish: Dish) => setCart((current) => {
    const existing = current.find((item) => item.nombre === dish.nombre && item.precio === dish.precio);
    return existing
      ? current.map((item) => item === existing ? { ...item, cantidad: item.cantidad + 1 } : item)
      : [...current, { ...dish, cantidad: 1 }];
  });

  const updateQuantity = (dish: CartItem, delta: number) => setCart((current) => current
    .map((item) => item.nombre === dish.nombre && item.precio === dish.precio ? { ...item, cantidad: item.cantidad + delta } : item)
    .filter((item) => item.cantidad > 0));

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openWhatsApp = (withOrder = false) => {
    let message = `Hola ${RESTAURANTE_NAME}, quisiera hacer una consulta.`;
    if (withOrder && cart.length) {
      message = `*Hola ${RESTAURANTE_NAME}, deseo realizar este pedido:*\n\n`;
      cart.forEach((item) => { message += `• ${item.cantidad} x ${item.nombre} — ${item.precio}\n`; });
      message += `\n*TOTAL: S/ ${total.toFixed(2)}*`;
    }
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
          <div className="ember ember-one" /><div className="ember ember-two" />
          <span className="eyebrow"><Flame size={14} fill="currentColor" /> Carta digital</span>
          <div className="logo-card"><img src={LOGO_PATH} alt="Logo original de R3 Carnes y Parrillas" /></div>
          <h1>El sabor de la parrilla<br /><em>en tus manos</em></h1>
          <p>Elige tus platos, arma tu pedido y envíalo directo por WhatsApp.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => scrollToCategory("tradicionales")}>Ver la carta <ChevronRight size={17} /></button>
            <button className="whatsapp-button" onClick={() => openWhatsApp(false)}><MessageCircle size={18} fill="currentColor" /> WhatsApp</button>
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
                  <article className="dish-row" key={`${category.id}-${dish.nombre}`}>
                    {dish.numero && <span className="dish-number">{String(dish.numero).padStart(2, "0")}</span>}
                    <div className="dish-copy"><h3>{dish.nombre}</h3>{dish.descripcion && <p>{dish.descripcion}</p>}</div>
                    <div className="dish-order"><strong>{dish.precio}</strong><motion.button whileTap={{ scale: 0.82 }} onClick={() => addToCart(dish)} aria-label={`Agregar ${dish.nombre}`}><Plus size={17} strokeWidth={3} /></motion.button></div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <section className="review-card"><div><Star size={22} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={12} fill="currentColor" /></div><h2>¿Cómo estuvo todo?</h2><p>Cuéntanos sobre tu experiencia en R3.</p><button onClick={() => setShowReviewForm(true)}>Dejar una reseña</button></section>
        </div>
      </main>

      <footer><img src={LOGO_PATH} alt="R3 Carnes y Parrillas" /><p>Parrilla encendida. Sabor inolvidable.</p><button onClick={() => openWhatsApp(false)}><MessageCircle size={17} fill="currentColor" /> {WHATSAPP_DISPLAY}</button><small>© 2026 R3 Carnes y Parrillas · Hecho por Tyma Solutions</small></footer>
      <button className="floating-whatsapp" onClick={() => openWhatsApp(false)} aria-label="Escribir por WhatsApp"><MessageCircle size={25} fill="currentColor" /></button>

      <AnimatePresence>{cartCount > 0 && !showSummary && (
        <motion.button initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }} className="cart-bar" onClick={() => setShowSummary(true)}><span className="cart-bag"><ShoppingBag size={20} /><b>{cartCount}</b></span><span><small>Tu pedido</small><strong>S/ {total.toFixed(2)}</strong></span><span className="cart-view">Ver pedido <ChevronRight size={17} /></span></motion.button>
      )}</AnimatePresence>

      <AnimatePresence>{showSummary && (
        <Modal onClose={() => setShowSummary(false)}><div className="modal-heading"><span>Tu selección</span><h2>Mi pedido</h2></div><div className="cart-items">
          {cart.map((item) => <div className="cart-item" key={`${item.nombre}-${item.precio}`}><div><h3>{item.nombre}</h3><p>{item.precio}</p></div><div className="quantity"><button onClick={() => updateQuantity(item, -1)}><Minus size={15} /></button><b>{item.cantidad}</b><button onClick={() => updateQuantity(item, 1)}><Plus size={15} /></button></div><button className="remove" onClick={() => updateQuantity(item, -item.cantidad)}><Trash2 size={17} /></button></div>)}
        </div><div className="cart-total"><span>Total</span><strong>S/ {total.toFixed(2)}</strong></div><button className="modal-whatsapp" onClick={() => openWhatsApp(true)}><MessageCircle size={19} fill="currentColor" /> Enviar pedido por WhatsApp</button></Modal>
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
