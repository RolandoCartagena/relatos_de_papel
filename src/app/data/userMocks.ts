export interface OrderItem {
  bookId: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: OrderItem[];
  status: 'entregado' | 'en camino' | 'procesando';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  memberSince: string;
  address: string;
  city: string;
  country: string;
  avatar?: string;
  orders: Order[];
}

export const mockUsers: UserProfile[] = [
  {
    id: 'user-1',
    name: 'Rolando Cartagena',
    email: 'rolando@relatos.com',
    password: 'password123',
    memberSince: 'Enero 2024',
    address: 'Colonia Escalón, Calle del Mirador',
    city: 'San Salvador',
    country: 'El Salvador',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rolando',
    orders: [
      {
        id: 'RC-001',
        date: '2025-05-01',
        total: 55.20,
        status: 'entregado',
        items: [{ bookId: '10', title: 'Clean Code', quantity: 1, price: 55.20 }]
      },
      { id: 'RC-002', date: '2025-03-15', total: 22.00, status: 'entregado', items: [{ bookId: '5', title: 'Rayuela', quantity: 1, price: 22.00 }] },
      { id: 'RC-003', date: '2025-02-10', total: 15.99, status: 'entregado', items: [{ bookId: '4', title: '1984', quantity: 1, price: 15.99 }] },
      { id: 'RC-004', date: '2025-01-05', total: 45.00, status: 'entregado', items: [{ bookId: '12', title: 'The Pragmatic Programmer', quantity: 1, price: 45.00 }] },
      { id: 'RC-005', date: '2024-12-01', total: 12.99, status: 'entregado', items: [{ bookId: '2', title: 'El principito', quantity: 1, price: 12.99 }] }
    ]
  },
  {
    id: 'user-2',
    name: 'Roció Poma',
    email: 'rocio@relatos.com',
    password: 'password456',
    memberSince: 'Febrero 2024',
    address: 'Av. 6 de Agosto, Edificio Los Pinos',
    city: 'La Paz',
    country: 'Bolivia',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rocio',
    orders: [
      {
        id: 'RP-001',
        date: '2025-04-20',
        total: 18.50,
        status: 'entregado',
        items: [{ bookId: '15', title: 'La tía Julia y el escribidor', quantity: 1, price: 18.50 }]
      },
      { id: 'RP-002', date: '2025-03-10', total: 30.00, status: 'entregado', items: [{ bookId: '20', title: 'Antología Poética', quantity: 1, price: 30.00 }] },
      { id: 'RP-003', date: '2025-02-15', total: 25.99, status: 'entregado', items: [{ bookId: '1', title: 'Cien años de soledad', quantity: 1, price: 25.99 }] },
      { id: 'RP-004', date: '2025-01-20', total: 14.00, status: 'entregado', items: [{ bookId: '8', title: 'Crónica de una muerte anunciada', quantity: 1, price: 14.00 }] },
      { id: 'RP-005', date: '2024-11-30', total: 19.99, status: 'entregado', items: [{ bookId: '9', title: 'Pedro Páramo', quantity: 1, price: 19.99 }] }
    ]
  },
  {
    id: 'user-3',
    name: 'Andrés López',
    email: 'andres@relatos.com',
    password: 'password123',
    memberSince: 'Marzo 2024',
    address: 'Calle La Mascota #456',
    city: 'San Salvador',
    country: 'El Salvador',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andres',
    orders: [
        {
        id: 'ORD-9928',
        date: '2025-04-15',
        total: 45.50,
        status: 'entregado',
        items: [
            { bookId: '1', title: 'Cien años de soledad', quantity: 1, price: 25.99 },
            { bookId: '6', title: 'La sombra del viento', quantity: 1, price: 18.99 }
        ]
        },
        {
        id: 'ORD-8812',
        date: '2025-03-20',
        total: 12.99,
        status: 'entregado',
        items: [
            { bookId: '2', title: 'El principito', quantity: 1, price: 12.99 }
        ]
        },
        {
        id: 'ORD-7754',
        date: '2025-02-10',
        total: 35.50,
        status: 'entregado',
        items: [
            { bookId: '3', title: 'Don Quijote de la Mancha', quantity: 1, price: 35.50 }
        ]
        },
        {
        id: 'ORD-6621',
        date: '2025-01-05',
        total: 31.98,
        status: 'entregado',
        items: [
            { bookId: '4', title: '1984', quantity: 2, price: 15.99 }
        ]
        },
        {
        id: 'ORD-5540',
        date: '2024-12-15',
        total: 22.00,
        status: 'entregado',
        items: [
            { bookId: '5', title: 'Rayuela', quantity: 1, price: 22.00 }
        ]
        }
    ]
  }
];