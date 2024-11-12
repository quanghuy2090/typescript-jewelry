import { Cart } from "./Cart";

export interface Order {
    id: number;
    cart: Cart[];
    date: string;
  }