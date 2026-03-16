import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: string;
  verified: boolean;
}

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

interface UserState {
  user: User | null;
  paymentMethods: PaymentMethod[];
  setUser: (user: User | null) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPayment: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: 'u1',
    name: 'Mark Santos',
    email: 'marksantos.contact@gmail.com',
    phone: '+1 (555) 000-0000',
    avatar: 'https://picsum.photos/seed/user/200',
    status: 'Active',
    verified: true,
  },
  paymentMethods: [
    { id: 'p1', brand: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
    { id: 'p2', brand: 'Mastercard', last4: '8888', expiry: '05/25', isDefault: false },
  ],
  setUser: (user) => set({ user }),
  addPaymentMethod: (method) => set((state) => ({ paymentMethods: [...state.paymentMethods, method] })),
  removePaymentMethod: (id) => set((state) => ({ 
    paymentMethods: state.paymentMethods.filter(p => p.id !== id) 
  })),
  setDefaultPayment: (id) => set((state) => ({
    paymentMethods: state.paymentMethods.map(p => ({ ...p, isDefault: p.id === id }))
  })),
}));
