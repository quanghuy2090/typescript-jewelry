export interface Cart {
  id?: number | string;
  quantity: number;
  title: string;
  price: number;
  description: string;
  thumbnail?: string;
  amount: number;
  name: string;
  address: string;
  phone: string;
}
