/* eslint-disable prettier/prettier */
import { Category } from './Category'; // Importamos la interface Category

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[]; // Array de URLs de imagenes
  category: Category;
  creationAt: string;
  updatedAt: string;
}
