export interface Order {
  id: string;
  customer: string;
  date: Date;
  position?: Number;
  total: number;
  items: OrderItem[];
  // number: string;
}

export interface OrderItem {
  ///id === product id
  id: string;
  units: number;
  product?: Product;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  //stock
  quantity: number;
}

export interface Sales {
  units: number;
  total: number;
  orders: number;
}
