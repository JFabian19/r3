export interface Dish {
  numero?: number;
  nombre: string;
  descripcion?: string;
  precio: string;
  imagen: string;
}

export interface Category {
  id: string;
  nombre: string;
  etiqueta?: string;
  items: Dish[];
}

const grillSide = "Papa + arroz + choclo + ensalada";
const menuImage = (file: string) => `/menu-images/${file}`;

export const DEFAULT_MENU_DATA: Category[] = [
  {
    id: "tradicionales", nombre: "Tradicionales", etiqueta: "Los favoritos de la casa",
    items: [
      { numero: 1, nombre: "3 palos de anticuchos o 3 brochetas de pollo", descripcion: grillSide, precio: "S/ 15.00", imagen: menuImage("trad-01-anticuchos.webp") },
      { numero: 2, nombre: "2 palos de anticucho o 2 brochetas de pollo", descripcion: grillSide, precio: "S/ 10.00", imagen: menuImage("trad-02-anticuchos.webp") },
      { numero: 3, nombre: "Pancita", descripcion: grillSide, precio: "S/ 12.00", imagen: menuImage("trad-03-pancita.webp") },
      { numero: 4, nombre: "Rachi", descripcion: grillSide, precio: "S/ 18.00", imagen: menuImage("trad-04-rachi.webp") },
      { numero: 5, nombre: "Molleja", descripcion: grillSide, precio: "S/ 14.00", imagen: menuImage("trad-05-molleja.webp") },
    ],
  },
  {
    id: "mixtos", nombre: "Mixtos", etiqueta: "Combina tus preferidos",
    items: [
      { numero: 6, nombre: "1 palo de anticucho + pancita", descripcion: grillSide, precio: "S/ 10.00", imagen: menuImage("mixto-06.webp") },
      { numero: 7, nombre: "2 palos de anticucho + pancita", descripcion: grillSide, precio: "S/ 14.00", imagen: menuImage("mixto-07.webp") },
      { numero: 8, nombre: "2 palos de anticucho + rachi", descripcion: grillSide, precio: "S/ 18.00", imagen: menuImage("mixto-08.webp") },
      { numero: 9, nombre: "2 palos de anticucho + molleja", descripcion: grillSide, precio: "S/ 17.00", imagen: menuImage("mixto-09.webp") },
      { numero: 10, nombre: "Pancita + molleja", descripcion: grillSide, precio: "S/ 15.00", imagen: menuImage("mixto-10.webp") },
      { numero: 11, nombre: "Rachi + molleja", descripcion: grillSide, precio: "S/ 18.00", imagen: menuImage("mixto-11.webp") },
      { numero: 12, nombre: "Rachi + pancita", descripcion: grillSide, precio: "S/ 18.00", imagen: menuImage("mixto-12.webp") },
      { numero: 13, nombre: "Rachi + pancita + molleja", descripcion: grillSide, precio: "S/ 20.00", imagen: menuImage("mixto-13.webp") },
      { numero: 14, nombre: "1 palo de anticucho + pancita + molleja", descripcion: grillSide, precio: "S/ 20.00", imagen: menuImage("mixto-14.webp") },
      { numero: 15, nombre: "1 palo de anticucho + rachi + pancita", descripcion: grillSide, precio: "S/ 20.00", imagen: menuImage("mixto-15.webp") },
      { numero: 16, nombre: "1 palo de anticucho + rachi + molleja", descripcion: grillSide, precio: "S/ 20.00", imagen: menuImage("mixto-16.webp") },
      { numero: 17, nombre: "1 palo de anticucho + rachi + pancita + molleja", descripcion: grillSide, precio: "S/ 22.00", imagen: menuImage("mixto-17.webp") },
    ],
  },
  {
    id: "parrillas", nombre: "Parrillas", etiqueta: "Directo del fuego",
    items: [
      { numero: 18, nombre: "Alitas", descripcion: grillSide, precio: "S/ 10.00", imagen: menuImage("parrilla-18-alitas.webp") },
      { numero: 19, nombre: "Pierna", descripcion: grillSide, precio: "S/ 12.00", imagen: menuImage("parrilla-19-pierna.webp") },
      { numero: 20, nombre: "Entrepierna", descripcion: grillSide, precio: "S/ 13.00", imagen: menuImage("parrilla-20-entrepierna.webp") },
      { numero: 21, nombre: "Pechuga", descripcion: grillSide, precio: "S/ 15.00", imagen: menuImage("parrilla-21-pechuga.webp") },
      { numero: 22, nombre: "Pecho con ala", descripcion: grillSide, precio: "S/ 18.00", imagen: menuImage("parrilla-22-chuleta.webp") },
    ],
  },
  {
    id: "mixtos-especiales", nombre: "Mixtos especiales", etiqueta: "Para un hambre grande",
    items: [
      { numero: 23, nombre: "1 alita + rachi + 1 anticucho", descripcion: grillSide, precio: "S/ 21.00", imagen: menuImage("especial-23.webp") },
      { numero: 24, nombre: "Pierna + rachi + 1 anticucho", descripcion: grillSide, precio: "S/ 22.00", imagen: menuImage("especial-24.webp") },
      { numero: 25, nombre: "Entrepierna + pierna + 1 anticucho", descripcion: grillSide, precio: "S/ 23.00", imagen: menuImage("especial-25.webp") },
      { numero: 26, nombre: "Pechuga + 2 palitos", descripcion: grillSide, precio: "S/ 20.00", imagen: menuImage("especial-26.webp") },
    ],
  },
  {
    id: "adicionales", nombre: "Adicionales", etiqueta: "Arma tu plato a tu gusto",
    items: [
      { nombre: "1 palo de anticucho", precio: "S/ 5.00", imagen: menuImage("adicional-anticucho.webp") },
      { nombre: "Porción de pancita", precio: "S/ 6.00", imagen: menuImage("adicional-pancita.webp") },
      { nombre: "Porción de rachi", precio: "S/ 9.00", imagen: menuImage("adicional-rachi.webp") },
      { nombre: "Porción de molleja", precio: "S/ 7.00", imagen: menuImage("adicional-molleja.webp") },
      { nombre: "Porción de arroz", precio: "S/ 3.00", imagen: menuImage("adicional-arroz.webp") },
      { nombre: "Porción de papas", precio: "S/ 3.00", imagen: menuImage("adicional-papas.webp") },
      { nombre: "Porción de ensalada", precio: "S/ 4.00", imagen: menuImage("adicional-ensalada.webp") },
      { nombre: "Choclo", precio: "S/ 3.00", imagen: menuImage("adicional-choclo.webp") },
    ],
  },
  {
    id: "bebidas", nombre: "Bebidas", etiqueta: "Para acompañar",
    items: [
      { nombre: "Chicha morada 1 LT", precio: "S/ 8.00", imagen: menuImage("bebida-chicha.webp") },
      { nombre: "Maracuyá", precio: "S/ 8.00", imagen: menuImage("bebida-maracuya.webp") },
      { nombre: "Gaseosa personal", precio: "S/ 3.00", imagen: menuImage("bebida-gaseosa-personal.webp") },
      { nombre: "Gordita", precio: "S/ 6.00", imagen: menuImage("bebida-gordita.webp") },
      { nombre: "Gaseosa de 1 1/2 LT", precio: "S/ 10.00", imagen: menuImage("bebida-gaseosa-15l.webp") },
      { nombre: "Gaseosa de 1 LT", precio: "S/ 9.00", imagen: menuImage("bebida-gaseosa-1l.webp") },
      { nombre: "Chicha 1/2 LT", precio: "S/ 4.00", imagen: menuImage("bebida-chicha-half.webp") },
      { nombre: "Cerveza", precio: "S/ 8.00", imagen: menuImage("bebida-cerveza.webp") },
      { nombre: "Infusiones", precio: "S/ 2.50", imagen: menuImage("bebida-infusion.webp") },
    ],
  },
];

