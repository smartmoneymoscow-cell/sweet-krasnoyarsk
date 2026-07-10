import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroChapel from "@/assets/hero-chapel.jpg";
import heroBridge from "@/assets/hero-bridge.jpg";
import heroOpera from "@/assets/hero-opera.jpg";
import macarons from "@/assets/macarons.jpg";
import cake from "@/assets/cake.jpg";
import pryanik from "@/assets/pryanik.jpg";
import interior from "@/assets/interior.jpg";
import togo from "@/assets/togo-cup.jpg";
import cupCutout from "@/assets/cup-cutout.png";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  component: Index,
});

const landmarks = [
  { src: heroChapel, name: "Часовня Параскевы Пятницы", tag: "Ручная роспись королевской глазурью" },
  { src: heroBridge, name: "Коммунальный мост", tag: "Айсинг и сусальное золото" },
  { src: heroOpera, name: "Театр оперы и балета", tag: "Медовый пряник ручной работы" },
];

const preview = [
  { img: macarons, title: "Макарон", subtitle: "Ассорти из 12 вкусов", price: "1 890 ₽" },
  { img: cake, title: "Розовый Исполин", subtitle: "Торт с малиной и розой", price: "3 400 ₽" },
  { img: pryanik, title: "Сибирский пряник", subtitle: "Медовый, расписной", price: "890 ₽" },
  { img: togo, title: "Кофе на вынос", subtitle: "Флэт уайт с фисташкой", price: "420 ₽" },
];

function Index() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((n) => (n + 1) % landmarks.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-foreground font-sans overflow-x-hidden">
      <Hero active={active} setActive={setActive} />
      <Marquee />
      <Story />
      <Collection />
      <Togo />
      <Delivery />
      <Salon />
      <AppMockup />
      <Footer />
    </div>
  );
}

function Nav({ variant = "light" }: { variant?: "light" | "over" }) {
  const { count } = useCart();
  const isOver = variant === "over";
  return (
    <header
      className={
        isOver
          ? "absolute inset-x-0 top-0 z-30 text-cream"
          : "sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-border/60 text-foreground"
      }
    >
      {!isOver && (
        <div className="hidden md:block bg-[color-mix(in_oklab,var(--pistachio)_35%,var(--cream))] text-foreground/70 text-[11px] tracking-[0.28em] uppercase">
          <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
            <span>Бесплатная доставка по Красноярску от 3 000 ₽</span>
            <span className="text-foreground/50">Ежедневно с 9:00 до 22:00</span>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex items-center justify-between gap-4 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-6">
        <nav className={`hidden xl:flex items-center gap-8 text-[12px] tracking-[0.22em] uppercase min-w-0 justify-end pe-4 ${isOver ? "text-cream/85" : "text-foreground/75"}`}>
          <Link to="/collection" className="hover:opacity-100 opacity-90 transition">Коллекция</Link>
          <a href="#landmarks" className="hover:opacity-100 opacity-90 transition">Достопримечательности</a>
          <a href="#story" className="hover:opacity-100 opacity-90 transition">История</a>
        </nav>
        <Link to="/" className="flex flex-col items-center leading-none shrink-0">
          <span className={`font-script text-[13px] sm:text-[15px] tracking-normal ${isOver ? "text-cream/70" : "text-foreground/55"}`}>красноярская</span>
          <span className={`font-display text-xl sm:text-2xl tracking-[0.25em] sm:tracking-[0.3em] xl:tracking-[0.35em] uppercase ${isOver ? "text-cream" : "text-foreground"}`}>Пряничный Дом</span>
          <span className={`mt-1 hidden sm:inline text-[9px] tracking-[0.4em] uppercase ${isOver ? "text-cream/60" : "text-gold"}`}>с 2014 · Красноярск</span>
        </Link>
        <div className={`hidden xl:flex items-center justify-start gap-6 text-[12px] tracking-[0.22em] uppercase ps-4 ${isOver ? "text-cream/85" : "text-foreground/75"}`}>
          <a href="#delivery" className="hover:opacity-100 opacity-90 transition">Доставка</a>
          <a href="#salon" className="hover:opacity-100 opacity-90 transition">Салон</a>
          <Link
            to="/collection"
            className={`ml-2 relative inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
              isOver ? "border border-cream/45 hover:bg-cream hover:text-foreground" : "border border-foreground/25 hover:bg-foreground hover:text-cream"
            }`}
          >
            <span>Корзина</span>
            <span className={isOver ? "text-cream/50" : "text-foreground/50"}>·</span>
            <span>{count}</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold animate-bounce">
                {count}
              </span>
            )}
          </Link>
        </div>
        <Link to="/collection" className={`xl:hidden relative text-[11px] tracking-[0.25em] uppercase shrink-0 ${isOver ? "text-cream" : "text-foreground/70"}`}>
          Корзина · {count}
          {count > 0 && (
            <span className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold animate-bounce">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

function Hero({ active, setActive }: { active: number; setActive: (n: number) => void }) {
  return (
    <section id="landmarks" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden text-cream">
      {/* Background slideshow — the "video" */}
      <div className="absolute inset-0">
        {landmarks.map((l, i) => (
          <div
            key={l.name}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={l.src}
              alt={l.name}
              className={`absolute inset-0 h-full w-full object-cover object-center ${i === active ? "animate-ken-burns" : ""}`}
            />
          </div>
        ))}
        {/* Overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
      </div>

      <Nav variant="over" />

      {/* Floating pastel accents */}
      <div aria-hidden className="pointer-events-none absolute -left-16 top-1/3 h-64 w-64 rounded-full bg-rose/25 blur-3xl animate-float-slow" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-pistachio/25 blur-3xl animate-drift" />

      {/* Copy overlay */}
      <div className="relative z-10 h-full flex items-end">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 pb-24 sm:pb-28 lg:pb-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-gold">Зимняя коллекция · Красноярск</span>
            </div>
            <h1
              className="font-display text-[44px] sm:text-6xl lg:text-[86px] leading-[0.98] tracking-tight text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] text-balance animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              Пряничный{" "}
              <em className="font-script text-gold not-italic" style={{ fontStyle: "italic" }}>
                Красноярск
              </em>
              <br />
              <span className="block mt-1">в каждой детали</span>
            </h1>
            <p
              className="mt-7 max-w-lg text-[15px] sm:text-base leading-relaxed text-cream/85 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] animate-fade-up"
              style={{ animationDelay: "260ms" }}
            >
              Дом кондитерских искусств, где сибирский мёд встречается с парижской школой.
              Пряничные достопримечательности города, макарон восемнадцати вкусов и кофе на вынос —
              с доставкой по Красноярску.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "400ms" }}>
              <Link
                to="/collection"
                className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-3.5 text-foreground text-[12px] tracking-[0.28em] uppercase hover:bg-gold hover:text-cream transition-all"
              >
                Смотреть коллекцию
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="#togo"
                className="inline-flex items-center gap-3 text-[12px] tracking-[0.28em] uppercase text-cream/90 hover:text-cream border-b border-cream/40 pb-1"
              >
                Кофе на вынос
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Caption + dots */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-6 flex items-end justify-between gap-6">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-cream/70">Film · Пряничный город</div>
            <div className="font-display text-xl sm:text-2xl mt-1 tracking-wide">{landmarks[active].name}</div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-cream/70 mt-0.5">{landmarks[active].tag}</div>
          </div>
          <div className="flex gap-2 pb-1">
            {landmarks.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Кадр ${i + 1}`}
                className={`h-[3px] transition-all rounded-full ${i === active ? "w-12 bg-cream" : "w-6 bg-cream/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Ручная работа", "Сибирский мёд", "Французская школа", "Натуральные ингредиенты", "Доставка за 90 минут", "Кофе на вынос"];
  const row = [...items, ...items];
  return (
    <div className="border-y border-border/70 bg-[color-mix(in_oklab,var(--pistachio)_18%,var(--cream))] overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee py-4">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 px-8 font-display italic text-xl sm:text-2xl text-foreground/70">
            {t}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Story() {
  return (
    <section id="story" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-6">Пряничный Дом · с 2014</div>
        <h2 className="font-display text-4xl sm:text-6xl leading-[1.05] text-foreground text-balance">
          Тонкое искусство<br />
          <em className="font-script text-gold" style={{ fontStyle: "italic" }}>сибирского</em> десерта
        </h2>
        <p className="mt-8 max-w-2xl mx-auto text-foreground/70 leading-relaxed">
          Мы соединили парижскую точность с сибирской щедростью. Каждый пряник расписан
          вручную королевской глазурью, каждый макарон рождается в мастерской в центре
          Красноярска, а каждый торт — маленькая архитектура вкуса.
        </p>
        <div className="mt-10 flex items-center justify-center gap-6 text-foreground/40">
          <span className="h-px w-16 bg-current" />
          <span className="text-gold text-lg">✦</span>
          <span className="h-px w-16 bg-current" />
        </div>
      </div>
    </section>
  );
}

function Collection() {
  return (
    <section id="collection" className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="text-[11px] tracking-[0.35em] uppercase text-gold mb-3">Витрина</div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight">Коллекция сезона</h2>
          </div>
          <Link to="/collection" className="text-[12px] tracking-[0.28em] uppercase text-foreground/70 hover:text-foreground border-b border-foreground/30 pb-1">
            Вся коллекция →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {preview.map((p, i) => (
            <Link
              to="/collection"
              key={p.title}
              className="group cursor-pointer animate-fade-up block"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-sm">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="pt-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display text-xl sm:text-2xl leading-tight truncate">{p.title}</h3>
                  <p className="text-[12px] text-foreground/60 mt-1 truncate">{p.subtitle}</p>
                </div>
                <div className="text-[13px] tracking-wider text-foreground shrink-0 pt-1">{p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoffeeCup() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Steam wisps rising from cup rim */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[320px] h-52 pointer-events-none z-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-foreground/15 blur-xl animate-steam"
            style={{
              left: `${35 + i * 8}%`,
              width: `${28 + (i % 3) * 12}px`,
              height: `${60 + (i % 2) * 30}px`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${2.8 + i * 0.4}s`,
              // @ts-expect-error CSS var
              "--steam-x": `${(i - 2) * 12}px`,
            }}
          />
        ))}
      </div>

      {/* Cup image — transparent cutout, large */}
      <div className="relative w-full max-w-[340px] sm:max-w-[400px] mx-auto">
        <img
          src={cupCutout}
          alt="Кофе в фирменном картонном стаканчике"
          loading="lazy"
          className="w-full h-auto drop-shadow-[0_30px_60px_rgba(80,60,30,0.35)] relative z-20"
        />
      </div>

      {/* Brand label — CSS badge below cup, premium style */}
      <div className="relative z-20 mt-4 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          <span className="font-display text-[11px] tracking-[0.4em] uppercase text-gold">с 2014</span>
          <span className="h-px w-8 bg-gold/60" />
        </div>
        <span className="mt-2 font-display text-lg sm:text-xl tracking-[0.3em] uppercase text-foreground">Пряничный Дом</span>
        <span className="mt-1 font-script text-gold text-sm">Красноярск</span>
      </div>
    </div>
  );
}

function Togo() {
  return (
    <section id="togo" className="relative py-24 sm:py-32 bg-[color-mix(in_oklab,var(--pistachio)_14%,var(--cream))] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-5">Кофе на вынос</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-balance">
            Тёплое утро<br />в <em className="font-script text-gold" style={{ fontStyle: "italic" }}>фирменном</em> стаканчике
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed max-w-md">
            Каждый стакан — небольшая открытка из Красноярска: пряничный силуэт Часовни
            Параскевы Пятницы, тёплое пистачное кольцо и золотое тиснение. Внутри — авторский
            купаж на молоке или классика в стиле парижских бистро.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-foreground/75">
            <li className="flex items-center gap-3"><span className="text-gold">✦</span> Флэт уайт с фисташкой · 420 ₽</li>
            <li className="flex items-center gap-3"><span className="text-gold">✦</span> Капучино с розовым сиропом · 390 ₽</li>
            <li className="flex items-center gap-3"><span className="text-gold">✦</span> Латте с солёной карамелью · 450 ₽</li>
          </ul>
          <Link
            to="/collection"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-cream text-[12px] tracking-[0.28em] uppercase hover:bg-foreground/85 transition"
          >
            Заказать кофе →
          </Link>
        </div>
        <div className="lg:col-span-7 flex justify-center">
          <CoffeeCup />
        </div>
      </div>
    </section>
  );
}

function Delivery() {
  const steps = [
    { n: "01", t: "Выбор", d: "Соберите композицию в нашей витрине" },
    { n: "02", t: "Ателье", d: "Кондитер завершает вашу коробку в день заказа" },
    { n: "03", t: "Курьер", d: "Доставка в термо-упаковке по Красноярску" },
    { n: "04", t: "Церемония", d: "Открываете коробку — и день становится праздником" },
  ];
  return (
    <section id="delivery" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-16">
          <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">Доставка</div>
          <h2 className="font-display text-4xl sm:text-5xl">Четыре шага до десерта</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.n} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="font-display text-5xl text-gold/80 mb-4">{s.n}</div>
              <div className="h-px w-12 bg-foreground/30 mb-4" />
              <div className="font-display text-2xl mb-2">{s.t}</div>
              <p className="text-sm text-foreground/65 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Salon() {
  return (
    <section id="salon" className="relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-24 sm:pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm order-2 lg:order-1">
          <img src={interior} alt="Салон Пряничный Дом" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" />
          <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b border-r border-gold/60" />
        </div>
        <div className="order-1 lg:order-2 lg:pl-8">
          <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-5">Салон</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            Приходите на<br />чай в наш <em className="font-script text-gold" style={{ fontStyle: "italic" }}>салон</em>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed max-w-md">
            Мраморные столики, свежая выпечка каждое утро и лучший капучино в городе.
            Загляните к нам — мы приготовили для вас место у окна.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-6 max-w-md">
            <div>
              <dt className="text-[10px] tracking-[0.3em] uppercase text-foreground/55 mb-2">Адрес</dt>
              <dd className="font-display text-lg leading-snug">пр. Мира, 102<br />Красноярск</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.3em] uppercase text-foreground/55 mb-2">Часы</dt>
              <dd className="font-display text-lg leading-snug">Ежедневно<br />09:00 — 22:00</dd>
            </div>
          </dl>
          <a href="#" className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-cream text-[12px] tracking-[0.28em] uppercase hover:bg-foreground/85 transition">
            Забронировать столик →
          </a>
        </div>
      </div>
    </section>
  );
}

function AppMockup() {
  const [activeItem, setActiveItem] = useState(0);
  const menuItems = [
    { name: "Макарон ассорти", price: "1 890 ₽", emoji: "🍰" },
    { name: "Капучино роза", price: "390 ₽", emoji: "☕" },
    { name: "Розовый Исполин", price: "3 400 ₽", emoji: "🎂" },
    { name: "Сибирский пряник", price: "890 ₽", emoji: "🍪" },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveItem((n) => (n + 1) % menuItems.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 bg-[color-mix(in_oklab,var(--pistachio)_10%,var(--cream))] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left side - text */}
        <div>
          <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-5">Мобильное приложение</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-balance">
            Заказывайте<br />из <em className="font-script text-gold" style={{ fontStyle: "italic" }}>кармана</em>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed max-w-md">
            Все сладости Пряничного Дома в вашем телефоне. Выбирайте, заказывайте и получайте
            доставку за 90 минут по Красноярску.
          </p>
          <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-cream text-[12px] tracking-[0.28em] uppercase hover:bg-foreground/85 transition">
            Скачать приложение →
          </button>
        </div>

        {/* Right side - iPhone mockup */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Phone frame */}
            <div className="relative w-[280px] sm:w-[320px] bg-foreground rounded-[50px] p-3 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.5)]">
              {/* Screen */}
              <div className="relative bg-cream rounded-[38px] overflow-hidden aspect-[9/19.5]">
                {/* Status bar */}
                <div className="bg-[color-mix(in_oklab,var(--pistachio)_20%,var(--cream))] px-6 pt-10 pb-4">
                  <div className="font-display text-lg tracking-[0.25em] uppercase text-foreground">Пряничный Дом</div>
                  <div className="text-[10px] tracking-[0.3em] text-gold uppercase">Меню</div>
                </div>

                {/* Menu items with animation */}
                <div className="p-4 space-y-3">
                  {menuItems.map((item, i) => (
                    <div
                      key={item.name}
                      className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-500 ${
                        i === activeItem
                          ? "bg-[color-mix(in_oklab,var(--pistachio)_25%,var(--cream))] scale-[1.02] shadow-md"
                          : "bg-white/50"
                      }`}
                    >
                      <div className="h-12 w-12 rounded-xl bg-[color-mix(in_oklab,var(--pistachio)_30%,var(--cream))] flex items-center justify-center text-xl">
                        {item.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{item.name}</div>
                        <div className="text-xs text-foreground/60">{item.price}</div>
                      </div>
                      <button
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          i === activeItem
                            ? "bg-foreground text-cream scale-110"
                            : "bg-foreground/10 text-foreground"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  ))}

                  {/* Cart preview */}
                  <div className="mt-4 bg-foreground rounded-2xl p-4 text-cream">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] tracking-[0.3em] uppercase text-cream/60">Корзина</div>
                        <div className="font-display text-lg">2 товара</div>
                      </div>
                      <div className="font-display text-xl">2 280 ₽</div>
                    </div>
                    <button className="mt-3 w-full bg-[color-mix(in_oklab,var(--pistachio)_40%,var(--cream))] text-foreground rounded-full py-2.5 text-[11px] tracking-[0.25em] uppercase">
                      Оформить →
                    </button>
                  </div>
                </div>
              </div>

              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-foreground rounded-b-2xl" />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-pistachio/30 blur-2xl animate-float-slow" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-rose/25 blur-3xl animate-drift" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-cream/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-[0.3em] uppercase text-cream">Пряничный Дом</div>
          <p className="mt-4 max-w-sm text-sm text-cream/60 leading-relaxed">
            Кондитерская, кофейня и мастерская пряничных чудес в самом сердце Красноярска.
          </p>
          <div className="mt-8 flex items-center gap-3 max-w-sm">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 min-w-0 bg-transparent border-b border-cream/30 py-2 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
            />
            <button className="text-[11px] tracking-[0.28em] uppercase text-cream border-b border-cream/50 pb-2 hover:text-gold hover:border-gold transition">
              Подписаться
            </button>
          </div>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-cream/50 mb-4">Магазин</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/collection">Макарон</Link></li>
            <li><Link to="/collection">Торты</Link></li>
            <li><Link to="/collection">Пряники</Link></li>
            <li><Link to="/collection">Кофе на вынос</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-cream/50 mb-4">Контакты</div>
          <ul className="space-y-2 text-sm">
            <li>+7 (391) 200-45-67</li>
            <li>hello@pryanichny-dom.ru</li>
            <li>пр. Мира, 102</li>
            <li>Красноярск, 660049</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-[0.25em] uppercase text-cream/45">
          <span>© 2026 Пряничный Дом</span>
          <span className="font-script text-gold text-base tracking-normal normal-case">с любовью · Красноярск</span>
          <span>Политика · Оферта</span>
        </div>
      </div>
    </footer>
  );
}