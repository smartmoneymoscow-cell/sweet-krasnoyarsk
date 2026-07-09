import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  category: "macarons" | "cakes" | "pryaniki" | "coffee" | "pastry";
  img: string;
};

export type CartItem = Product & { qty: number };

type Ctx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, q: number) => void;
  clear: () => void;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "maison-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = (p: Product) =>
    setItems((xs) => {
      const i = xs.findIndex((x) => x.id === p.id);
      if (i >= 0) {
        const copy = [...xs];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [...xs, { ...p, qty: 1 }];
    });
  const remove = (id: string) => setItems((xs) => xs.filter((x) => x.id !== id));
  const setQty = (id: string, q: number) =>
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, qty: Math.max(1, q) } : x)));
  const clear = () => setItems([]);

  const count = items.reduce((s, x) => s + x.qty, 0);
  const total = items.reduce((s, x) => s + x.qty * x.price, 0);

  return (
    <CartCtx.Provider value={{ items, count, total, add, remove, setQty, clear }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}