export const OrderStatus = {
  Received: 0,
  InPreparation: 1,
  Ready: 2,
  Delivered: 3,
  Cancelled: 4,
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentMethod = {
  Cash: 0,
  Pix: 1,
  Card: 2,
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PlanType = {
  Basic: 0,
  Pro: 1,
  Enterprise: 2,
} as const;
export type PlanType = (typeof PlanType)[keyof typeof PlanType];

export const TableSessionStatus = {
  Open: 0,
  Closed: 1,
} as const;
export type TableSessionStatus = (typeof TableSessionStatus)[keyof typeof TableSessionStatus];

export const UserRole = {
  SuperAdmin: 0,
  Admin: 1,
  Waiter: 2,
  Cashier: 3,
  Kitchen: 4,
  Customer: 5,
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface AuthResponseDto {
  token: string;
  user: UserDto;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  tenantId?: string;
  role?: UserRole;
}

export interface CategoryDto {
  id: string;
  name: string;
  description?: string;
  sortOrder: number;
}

export interface ProductDto {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  categoryName: string;
}

export interface OrderItemDto {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface OrderDto {
  id: string;
  tableSessionId: string;
  tableNumber: number;
  waiterId?: string;
  waiterName?: string;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  totalAmount: number;
  items: OrderItemDto[];
}

export interface CreateOrderItemCommand {
  productId: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface CreateOrderCommand {
  tableSessionId: string;
  waiterId?: string;
  notes?: string;
  items: CreateOrderItemCommand[];
}

export interface TableDto {
  id: string;
  number: number;
  qrCodeUrl?: string;
  isActive: boolean;
}

export interface TableSessionDto {
  id: string;
  tableId: string;
  tableNumber: number;
  openedAt: string;
  closedAt?: string;
  status: TableSessionStatus;
}

export interface PaymentDto {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  paidAt: string;
}

export interface TenantDto {
  id: string;
  name: string;
  cnpj: string;
  address?: string;
  logoUrl?: string;
  plan: PlanType;
  isActive: boolean;
  createdAt: string;
}

export interface MenuCategoryDto {
  id: string;
  name: string;
  description?: string;
  sortOrder: number;
  products: ProductDto[];
}

export interface OrdersByRestaurantDto {
  restaurantName: string;
  totalOrders: number;
  totalRevenue: number;
}

export interface DashboardDto {
  totalRestaurants: number;
  totalOrders: number;
  totalRevenue: number;
  ordersByRestaurant: OrdersByRestaurantDto[];
}

export interface CreateProductCommand {
  tenantId?: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export interface UpdateProductCommand {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export interface CreateCategoryCommand {
  name: string;
  description?: string;
  sortOrder?: number;
}

export interface UpdateCategoryCommand {
  id: string;
  name: string;
  description?: string;
  sortOrder?: number;
}

export interface CreatePaymentCommand {
  orderId: string;
  amount: number;
  method: PaymentMethod;
}

export interface CreateTableCommand {
  number: number;
}

export interface CreateTablesBatchCommand {
  startNumber: number;
  endNumber: number;
}

export interface UpdateOrderStatusCommand {
  id: string;
  status: OrderStatus;
}

export const OrderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.Received]: 'Recebido',
  [OrderStatus.InPreparation]: 'Em Preparo',
  [OrderStatus.Ready]: 'Pronto',
  [OrderStatus.Delivered]: 'Entregue',
  [OrderStatus.Cancelled]: 'Cancelado',
};

export const PaymentMethodLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.Cash]: 'Dinheiro',
  [PaymentMethod.Pix]: 'Pix',
  [PaymentMethod.Card]: 'Cartão',
};

export const UserRoleLabels: Record<UserRole, string> = {
  [UserRole.SuperAdmin]: 'Super Admin',
  [UserRole.Admin]: 'Administrador',
  [UserRole.Waiter]: 'Garçom',
  [UserRole.Cashier]: 'Caixa',
  [UserRole.Kitchen]: 'Cozinha',
  [UserRole.Customer]: 'Cliente',
};
