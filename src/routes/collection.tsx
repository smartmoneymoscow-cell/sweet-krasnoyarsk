import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Коллекция — Пряничный Дом · Красноярск" },
      { name: "description", content: "Каталог макарон, тортов, пряников и кофе на вынос от кондитерской Пряничный Дом. Фильтры, поиск и доставка по Красноярску." },
      { property: "og:title", content: "Коллекция — Пряничный Дом" },
      { property: "og:description", content: "Каталог кондитерских изделий и кофе с доставкой по Красноярску." },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"pop" | "asc" | "desc">("pop");
  const [openCart, setOpenCart] = useState(false);
  const { add, count } = useCart();

  const list = useMemo(() => {
    let xs = products.filter((p) => (cat === "all" ? true : p.category === cat));
    const s = q.trim().toLowerCase();
    if (s) xs = xs.filter((p) => (p.title + " " + p.subtitle).toLowerCase().includes(s));
    if (sort === "asc") xs = [...xs].sort((a, b) => a.price - b.price);
    if (sort === "desc") xs = [...xs].sort((a, b) => b.price - a.price);
    return xs;
  }, [cat, q, sort]);

  return (
    <div className="min-h-screen bg-cream text-foreground font-sans">
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-lg sm:text-xl tracking-[0.35em] uppercase text-foreground">Пряничный Дом</span>
            <span className="text-[9px] tracking-[0.4em] text-gold uppercase mt-1">Красноярск</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.22em] uppercase text-foreground/75">
            <Link to="/" className="hover:text-foreground">Главная</Link>
            <Link to="/collection" className="text-foreground">Коллекция</Link>
          </nav>
          <button
            onClick={() => setOpenCart(true)}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-4 py-2 text-[12px] tracking-[0.22em] uppercase hover:bg-foreground hover:text-cream transition"
          >
            <span>Корзина</span>
            <span className="text-foreground/40">·</span>
            <span>{count}</span>
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-14 sm:pt-20 pb-8">
        <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">Каталог</div>
        <h1 className="font-display text-4xl sm:text-6xl leading-[1.02] text-balance">
          Вся <em className="font-script text-gold" style={{ fontStyle: "italic" }}>коллекция</em>
        </h1>
        <p className="mt-5 max-w-xl text-foreground/70">
          Макарон, торты, пряничные достопримечательности Красноярска и авторский кофе на вынос —
          с доставкой по городу за 90 минут.
        </p>
      </section>

      <div className="sticky top-[73px] z-30 bg-cream/95 backdrop-blur border-y border-border/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`px-4 py-2 rounded-full text-[11px] tracking-[0.22em] uppercase transition ${
                  cat === c.id
                    ? "bg-foreground text-cream"
                    : "border border-foreground/20 text-foreground/70 hover:border-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-[200px] flex items-center gap-3 border-b border-foreground/20 py-1">
            <span className="text-foreground/40 text-sm">⌕</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Поиск по коллекции…"
              className="flex-1 bg-transparent text-sm placeholder:text-foreground/40 focus:outline-none py-1"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "pop" | "asc" | "desc")}
            className="rounded-full border border-foreground/20 bg-cream px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-foreground/75 focus:outline-none focus:border-foreground"
          >
            <option value="pop">Популярные</option>
            <option value="asc">Цена ↑</option>
            <option value="desc">Цена ↓</option>
          </select>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16">
        {list.length === 0 ? (
          <div className="py-24 text-center text-foreground/60">Ничего не найдено. Попробуйте другой запрос.</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8">
            {list.map((p, i) => (
              <article key={p.id} className="group animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-sm">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={() => add(p)}
                    className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 rounded-full bg-cream/95 backdrop-blur py-2.5 text-[11px] tracking-[0.28em] uppercase text-foreground hover:bg-foreground hover:text-cream"
                  >
                    В корзину
                  </button>
                </div>
                <div className="pt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg sm:text-xl leading-tight truncate">{p.title}</h3>
                    <p className="text-[12px] text-foreground/60 mt-1 truncate">{p.subtitle}</p>
                  </div>
                  <div className="text-[13px] tracking-wider shrink-0 pt-1">{p.price.toLocaleString("ru-RU")} ₽</div>
                </div>
                <button
                  onClick={() => add(p)}
                  className="sm:hidden mt-3 w-full rounded-full border border-foreground/25 py-2 text-[11px] tracking-[0.28em] uppercase text-foreground/80"
                >
                  В корзину
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />

      <footer className="border-t border-border/60 py-10 text-center text-[11px] tracking-[0.3em] uppercase text-foreground/50">
        © 2026 Пряничный Дом · Красноярск
      </footer>
    </div>
  );
}

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, setQty, remove, clear } = useCart();
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full sm:w-[440px] bg-cream shadow-2xl flex flex-col transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-gold">Ваш заказ</div>
            <div className="font-display text-2xl">Корзина</div>
          </div>
          <button onClick={onClose} className="text-[11px] tracking-[0.28em] uppercase text-foreground/60 hover:text-foreground">
            Закрыть ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="py-16 text-center text-foreground/60 text-sm">
              Корзина пуста. Загляните в коллекцию.
            </div>
          ) : (
            <ul className="divide-y divide-border/60">
              {items.map((it) => (
                <li key={it.id} className="py-4 flex gap-4">
                  <div className="h-20 w-20 rounded-sm overflow-hidden shrink-0 bg-muted">
                    <img src={it.img} alt="" className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-lg leading-tight truncate">{it.title}</div>
                    <div className="text-[11px] text-foreground/55 truncate">{it.subtitle}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => setQty(it.id, it.qty - 1)}
                        className="h-7 w-7 rounded-full border border-foreground/25 text-sm"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{it.qty}</span>
                      <button
                        onClick={() => setQty(it.id, it.qty + 1)}
                        className="h-7 w-7 rounded-full border border-foreground/25 text-sm"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(it.id)}
                        className="ml-auto text-[10px] tracking-[0.28em] uppercase text-foreground/50 hover:text-foreground"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                  <div className="text-sm shrink-0 pt-1">{(it.qty * it.price).toLocaleString("ru-RU")} ₽</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-border/60 px-6 py-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] tracking-[0.28em] uppercase text-foreground/60">Итого</span>
            <span className="font-display text-2xl">{total.toLocaleString("ru-RU")} ₽</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full rounded-full bg-foreground py-3.5 text-cream text-[12px] tracking-[0.28em] uppercase hover:bg-foreground/85 transition disabled:opacity-40"
          >
            Оформить доставку
          </button>
          {items.length > 0 && (
            <button onClick={clear} className="w-full text-[11px] tracking-[0.28em] uppercase text-foreground/50 hover:text-foreground">
              Очистить
            </button>
          )}
        </div>
      </aside>
    </>
  );
}