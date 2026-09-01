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
      { numero: 1, nombre: "3 palos de anticucho o 3 brochetas de pollo", descripcion: grillSide, precio: "S/ 11.00", imagen: menuImage("trad-01-anticuchos.jpg") },
      { numero: 2, nombre: "2 palos de anticucho o 2 brochetas de pollo", descripcion: grillSide, precio: "S/ 8.00", imagen: menuImage("trad-02-anticuchos.jpg") },
      { numero: 3, nombre: "Pancita", descripcion: grillSide, precio: "S/ 10.00", imagen: menuImage("trad-03-pancita.jpg") },
      { numero: 4, nombre: "Rachi", descripcion: grillSide, precio: "S/ 15.00", imagen: menuImage("trad-04-rachi.jpg") },
      { numero: 5, nombre: "Molleja", descripcion: grillSide, precio: "S/ 12.00", imagen: menuImage("trad-05-molleja.jpg") },
    ],
  },
  {
    id: "mixtos", nombre: "Mixtos", etiqueta: "Combina tus preferidos",
    items: [
      { numero: 6, nombre: "1 palo de anticucho + pancita", descripcion: grillSide, precio: "S/ 8.00", imagen: menuImage("mixto-06.jpg") },
      { numero: 7, nombre: "2 palos de anticucho + pancita", descripcion: grillSide, precio: "S/ 11.00", imagen: menuImage("mixto-07.jpg") },
      { numero: 8, nombre: "2 palos de anticucho + rachi", descripcion: grillSide, precio: "S/ 15.00", imagen: menuImage("mixto-08.jpg") },
      { numero: 9, nombre: "2 palos de anticucho + molleja", descripcion: grillSide, precio: "S/ 15.00", imagen: menuImage("mixto-09.jpg") },
      { numero: 10, nombre: "Pancita + molleja", descripcion: grillSide, precio: "S/ 13.00", imagen: menuImage("mixto-10.jpg") },
      { numero: 11, nombre: "Rachi + molleja", descripcion: grillSide, precio: "S/ 15.00", imagen: menuImage("mixto-11.png") },
      { numero: 12, nombre: "Rachi + pancita", descripcion: grillSide, precio: "S/ 15.00", imagen: menuImage("mixto-12.jpg") },
      { numero: 13, nombre: "Rachi + pancita + molleja", descripcion: grillSide, precio: "S/ 17.00", imagen: menuImage("mixto-13.jpg") },
      { numero: 14, nombre: "1 palo de anticucho + pancita + molleja", descripcion: grillSide, precio: "S/ 17.00", imagen: menuImage("mixto-14.jpg") },
      { numero: 15, nombre: "1 palo de anticucho + rachi + pancita", descripcion: grillSide, precio: "S/ 17.00", imagen: menuImage("mixto-15.jpg") },
      { numero: 16, nombre: "1 palo de anticucho + rachi + molleja", descripcion: grillSide, precio: "S/ 17.00", imagen: menuImage("mixto-16.jpg") },
      { numero: 17, nombre: "1 palo de anticucho + rachi + pancita + molleja", descripcion: grillSide, precio: "S/ 20.00", imagen: menuImage("mixto-17.jpg") },
    ],
  },
  {
    id: "parrillas", nombre: "Parrillas", etiqueta: "Directo del fuego",
    items: [
      { numero: 18, nombre: "Alitas", descripcion: grillSide, precio: "S/ 9.00", imagen: menuImage("parrilla-18-alitas.jpg") },
      { numero: 19, nombre: "Pierna", descripcion: grillSide, precio: "S/ 10.00", imagen: menuImage("parrilla-19-pierna.webp") },
      { numero: 20, nombre: "Entrepierna", descripcion: grillSide, precio: "S/ 11.00", imagen: menuImage("parrilla-20-entrepierna.jpg") },
      { numero: 21, nombre: "Pechuga", descripcion: grillSide, precio: "S/ 12.00", imagen: menuImage("parrilla-21-pechuga.jpg") },
      { numero: 22, nombre: "Chuleta", descripcion: grillSide, precio: "S/ 15.00", imagen: menuImage("parrilla-22-chuleta.jpg") },
    ],
  },
  {
    id: "mixtos-especiales", nombre: "Mixtos especiales", etiqueta: "Para un hambre grande",
    items: [
      { numero: 23, nombre: "1 alita + rachi + 1 anticucho", descripcion: grillSide, precio: "S/ 18.50", imagen: menuImage("especial-23.png") },
      { numero: 24, nombre: "Pierna + rachi + 1 anticucho", descripcion: grillSide, precio: "S/ 19.50", imagen: menuImage("especial-24.jpg") },
      { numero: 25, nombre: "Entrepierna + pierna + 1 anticucho", descripcion: grillSide, precio: "S/ 20.50", imagen: menuImage("especial-25.jpg") },
      { numero: 26, nombre: "Pechuga + 2 palitos", descripcion: grillSide, precio: "S/ 17.50", imagen: menuImage("especial-26.jpg") },
    ],
  },
  {
    id: "adicionales", nombre: "Adicionales", etiqueta: "Arma tu plato a tu gusto",
    items: [
      { nombre: "1 palo de anticucho", precio: "S/ 4.00", imagen: menuImage("adicional-anticucho.jpg") },
      { nombre: "Porción de pancita", precio: "S/ 5.00", imagen: menuImage("adicional-pancita.jpg") },
      { nombre: "Porción de rachi", precio: "S/ 8.00", imagen: menuImage("adicional-rachi.jpg") },
      { nombre: "Porción de molleja", precio: "S/ 6.00", imagen: menuImage("adicional-molleja.jpg") },
      { nombre: "Porción de arroz", precio: "S/ 3.00", imagen: menuImage("adicional-arroz.jpg") },
      { nombre: "Porción de papas", precio: "S/ 3.00", imagen: menuImage("adicional-papas.jpg") },
      { nombre: "Porción de ensalada", precio: "S/ 4.00", imagen: menuImage("adicional-ensalada.jpg") },
      { nombre: "Choclo", precio: "S/ 3.00", imagen: menuImage("adicional-choclo.jpg") },
    ],
  },
  {
    id: "bebidas", nombre: "Bebidas", etiqueta: "Para acompañar",
    items: [
      { nombre: "Chicha morada", precio: "S/ 8.00", imagen: menuImage("bebida-chicha.jpg") },
      { nombre: "Maracuyá", precio: "S/ 8.00", imagen: menuImage("bebida-maracuya.webp") },
      { nombre: "Gaseosa personal", precio: "S/ 2.50", imagen: menuImage("bebida-gaseosa-personal.jpg") },
      { nombre: "Gordita", precio: "S/ 4.00", imagen: menuImage("bebida-gordita.jpg") },
      { nombre: "Gaseosa de 1 1/2 LT", precio: "S/ 8.50", imagen: menuImage("bebida-gaseosa-15l.jpg") },
      { nombre: "Gaseosa de 1 LT", precio: "S/ 7.00", imagen: menuImage("bebida-gaseosa-1l.jpg") },
      { nombre: "Chicha 1/2 LT", precio: "S/ 4.00", imagen: menuImage("bebida-chicha-half.webp") },
      { nombre: "Cerveza", precio: "S/ 8.00", imagen: menuImage("bebida-cerveza.jpg") },
      { nombre: "Infusiones", precio: "S/ 2.50", imagen: menuImage("bebida-infusion.jpg") },
    ],
  },
];
