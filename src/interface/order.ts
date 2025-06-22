export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'DELIVERED';

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: number;
  tableNumber: number;
  orderTime: string;
  orderItems: OrderItem[];
  status: OrderStatus;
}
