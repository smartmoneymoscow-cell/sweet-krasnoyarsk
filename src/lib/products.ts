import macarons from "@/assets/macarons.jpg";
import cake from "@/assets/cake.jpg";
import coffee from "@/assets/coffee.jpg";
import pryanik from "@/assets/pryanik.jpg";
import togo from "@/assets/togo-cup.jpg";
import heroChapel from "@/assets/hero-chapel.jpg";
import heroBridge from "@/assets/hero-bridge.jpg";
import heroOpera from "@/assets/hero-opera.jpg";
import type { Product } from "./cart";

export const products: Product[] = [
  { id: "mac-assorti", title: "Макарон ассорти", subtitle: "Коробка из 12 вкусов", price: 1890, category: "macarons", img: macarons },
  { id: "mac-rose", title: "Макарон Роза & Личи", subtitle: "Лимитированная серия", price: 1590, category: "macarons", img: macarons },
  { id: "cake-rose", title: "Розовый Исполин", subtitle: "Торт с малиной и розой", price: 3400, category: "cakes", img: cake },
  { id: "cake-pist", title: "Фисташковый салон", subtitle: "Бисквит с фисташкой и вишней", price: 3200, category: "cakes", img: cake },
  { id: "pryanik-chapel", title: "Часовня Параскевы", subtitle: "Расписной пряник", price: 1600, category: "pryaniki", img: heroChapel },
  { id: "pryanik-bridge", title: "Коммунальный мост", subtitle: "Айсинг и сусальное золото", price: 1800, category: "pryaniki", img: heroBridge },
  { id: "pryanik-opera", title: "Театр оперы", subtitle: "Медовый пряник", price: 1700, category: "pryaniki", img: heroOpera },
  { id: "pryanik-classic", title: "Сибирский пряник", subtitle: "Мёд и корица", price: 890, category: "pryaniki", img: pryanik },
  { id: "coffee-flat", title: "Флэт уайт фисташка", subtitle: "Кофе на вынос 300 мл", price: 420, category: "coffee", img: togo },
  { id: "coffee-cap", title: "Капучино роза", subtitle: "С сиропом дамасской розы", price: 390, category: "coffee", img: togo },
  { id: "coffee-latte", title: "Латте карамель", subtitle: "Солёная карамель · 400 мл", price: 450, category: "coffee", img: togo },
  { id: "coffee-esp", title: "Эспрессо Maison", subtitle: "Купаж собственной обжарки", price: 260, category: "coffee", img: coffee },
];

export const categories = [
  { id: "all", label: "Всё" },
  { id: "macarons", label: "Макарон" },
  { id: "cakes", label: "Торты" },
  { id: "pryaniki", label: "Пряники" },
  { id: "coffee", label: "Кофе" },
] as const;