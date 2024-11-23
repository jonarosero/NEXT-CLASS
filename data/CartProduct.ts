/* eslint-disable prettier/prettier */
import { Product } from "./Products";

export interface CartProduct extends Product {
  quantity: number;  // Solo en el carrito, no en el producto original
}