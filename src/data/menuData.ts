export interface Dish {
  numero?: number;
  nombre: string;
  descripcion?: string;
  precio: string;
}

export interface Category {
  id: string;
  nombre: string;
  etiqueta?: string;
  items: Dish[];
}

const anticuchoSide = "Papa, choclo y ensalada";
const grillSide = "Papa, arroz, choclo y ensalada";

export const DEFAULT_MENU_DATA: Category[] = [
  {
    id: "tradicionales", nombre: "Tradicionales", etiqueta: "Los favoritos de la casa",
    items: [
      { numero: 1, nombre: "3 palos de anticucho o 3 brochetas de pollo", descripcion: anticuchoSide, precio: "S/ 11.00" },
      { numero: 2, nombre: "2 palos de anticucho o 2 brochetas de pollo", descripcion: anticuchoSide, precio: "S/ 8.00" },
      { numero: 3, nombre: "Pancita", descripcion: anticuchoSide, precio: "S/ 10.00" },
      { numero: 4, nombre: "Rachi", descripcion: anticuchoSide, precio: "S/ 15.00" },
      { numero: 5, nombre: "Molleja", descripcion: anticuchoSide, precio: "S/ 12.00" },
    ],
  },
  {
    id: "mixtos", nombre: "Mixtos", etiqueta: "Combina tus preferidos",
    items: [
      { numero: 6, nombre: "1 palo de anticucho + pancita", descripcion: anticuchoSide, precio: "S/ 8.00" },
      { numero: 7, nombre: "2 palos de anticucho + pancita", descripcion: anticuchoSide, precio: "S/ 11.00" },
      { numero: 8, nombre: "2 palos de anticucho + rachi", descripcion: anticuchoSide, precio: "S/ 15.00" },
      { numero: 9, nombre: "2 palos de anticucho + molleja", descripcion: anticuchoSide, precio: "S/ 15.00" },
      { numero: 10, nombre: "Pancita + molleja", descripcion: anticuchoSide, precio: "S/ 13.00" },
      { numero: 11, nombre: "Rachi + molleja", descripcion: anticuchoSide, precio: "S/ 15.00" },
      { numero: 12, nombre: "Rachi + pancita", descripcion: anticuchoSide, precio: "S/ 15.00" },
      { numero: 13, nombre: "Rachi + pancita + molleja", descripcion: anticuchoSide, precio: "S/ 17.00" },
      { numero: 14, nombre: "1 palo de anticucho + pancita + molleja", descripcion: anticuchoSide, precio: "S/ 17.00" },
      { numero: 15, nombre: "1 palo de anticucho + rachi + pancita", descripcion: anticuchoSide, precio: "S/ 17.00" },
      { numero: 16, nombre: "1 palo de anticucho + rachi + molleja", descripcion: anticuchoSide, precio: "S/ 17.00" },
      { numero: 17, nombre: "1 palo de anticucho + rachi + pancita + molleja", descripcion: anticuchoSide, precio: "S/ 20.00" },
    ],
  },
  {
    id: "parrillas", nombre: "Parrillas", etiqueta: "Directo del fuego",
    items: [
      { numero: 18, nombre: "Alitas", descripcion: grillSide, precio: "S/ 9.00" },
      { numero: 19, nombre: "Pierna", descripcion: grillSide, precio: "S/ 10.00" },
      { numero: 20, nombre: "Entrepierna", descripcion: grillSide, precio: "S/ 11.00" },
      { numero: 21, nombre: "Pechuga", descripcion: grillSide, precio: "S/ 12.00" },
      { numero: 22, nombre: "Chuleta", descripcion: grillSide, precio: "S/ 15.00" },
    ],
  },
  {
    id: "mixtos-especiales", nombre: "Mixtos especiales", etiqueta: "Para un hambre grande",
    items: [
      { numero: 23, nombre: "1 alita + rachi + 1 anticucho", descripcion: grillSide, precio: "S/ 18.50" },
      { numero: 24, nombre: "Pierna + rachi + 1 anticucho", descripcion: grillSide, precio: "S/ 19.50" },
      { numero: 25, nombre: "Entrepierna + pierna + 1 anticucho", descripcion: grillSide, precio: "S/ 20.50" },
      { numero: 26, nombre: "Pechuga + 2 palitos", descripcion: grillSide, precio: "S/ 17.50" },
    ],
  },
  {
    id: "adicionales", nombre: "Adicionales", etiqueta: "Arma tu plato a tu gusto",
    items: [
      { nombre: "1 palo de anticucho", precio: "S/ 4.00" },
      { nombre: "Porción de pancita", precio: "S/ 5.00" },
      { nombre: "Porción de rachi", precio: "S/ 8.00" },
      { nombre: "Porción de molleja", precio: "S/ 6.00" },
      { nombre: "Porción de arroz", precio: "S/ 3.00" },
      { nombre: "Porción de papas", precio: "S/ 3.00" },
      { nombre: "Porción de ensalada", precio: "S/ 4.00" },
      { nombre: "Choclo", precio: "S/ 3.00" },
    ],
  },
  {
    id: "bebidas", nombre: "Bebidas", etiqueta: "Para acompañar",
    items: [
      { nombre: "Chicha morada", precio: "S/ 8.00" },
      { nombre: "Maracuyá", precio: "S/ 8.00" },
      { nombre: "Gaseosa personal", precio: "S/ 2.50" },
      { nombre: "Gordita", precio: "S/ 4.00" },
      { nombre: "Gaseosa de 1 1/2 LT", precio: "S/ 8.50" },
      { nombre: "Gaseosa de 1 LT", precio: "S/ 7.00" },
      { nombre: "Chicha 1/2 LT", precio: "S/ 4.00" },
      { nombre: "Cerveza", precio: "S/ 8.00" },
      { nombre: "Infusiones", precio: "S/ 2.50" },
    ],
  },
];
