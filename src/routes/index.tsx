import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroChapel from "@/assets/hero-chapel.jpg";
import heroBridge from "@/assets/hero-bridge.jpg";
import heroOpera from "@/assets/hero-opera.jpg";
import macarons from "@/assets/macarons.jpg";
import cake from "@/assets/cake.jpg";
import coffee from "@/assets/coffee.jpg";
import pryanik from "@/assets/pryanik.jpg";
import interior from "@/assets/interior.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const landmarks = [
  { src: heroChapel, name: "Часовня Параскевы Пятницы", tag: "Ручная роспись глазурью" },
  { src: heroBridge, name: "Коммунальный мост", tag: "Айсинг · сусальное золото" },
  { src: heroOpera, name: "Театр оперы и балета", tag: "Пряник ручной работы" },
];

const collection = [
  { img: macarons, title: "Макарон", subtitle: "Ассорти из 12 вкусов", price: "1 890 ₽" },
  { img: cake, title: "Розовый Исполин", subtitle: "Торт с малиной и розой", price: "3 400 ₽" },
  { img: pryanik, title: "Сибирский пряник", subtitle: "Расписной, медовый", price: "890 ₽" },
  { img: coffee, title: "Кофе Maison", subtitle: "Флэт уайт с фисташкой", price: "420 ₽" },
];

function Index() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((n) => (n + 1) % landmarks.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-foreground font-sans overflow-x-hidden">
      <TopBar />
      <Nav />
      <Hero active={active} setActive={setActive} />
      <Marquee />
      <Story />
      <Collection />
      <Landmarks />
      <Delivery />
      <Salon />
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="hidden md:block bg-[color-mix(in_oklab,var(--pistachio)_35%,var(--cream))] text-foreground/70 text-[11px] tracking-[0.28em] uppercase">
      <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
        <span>Бесплатная доставка по Красноярску от 3 000 ₽</span>
        <span className="text-foreground/50">Ежедневно с 9:00 до 22:00</span>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex items-center justify-between gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <nav className="hidden lg:flex items-center gap-8 text-[12px] tracking-[0.22em] uppercase text-foreground/75 min-w-0">
          <a href="#collection" className="hover:text-foreground transition">Коллекция</a>
          <a href="#landmarks" className="hover:text-foreground transition">Достопримечательности</a>
          <a href="#story" className="hover:text-foreground transition">История</a>
        </nav>
        <a href="#" className="flex flex-col items-center leading-none shrink-0">
          <span className="font-display italic text-[10px] sm:text-[11px] tracking-[0.3em] text-foreground/50 uppercase">Maison</span>
          <span className="font-display text-xl sm:text-2xl lg:text-3xl tracking-[0.35em] uppercase text-foreground">Sibérie</span>
          <span className="mt-1 hidden sm:inline text-[9px] tracking-[0.4em] text-gold uppercase">Красноярск · 2014</span>
        </a>
        <div className="hidden lg:flex items-center justify-end gap-6 text-[12px] tracking-[0.22em] uppercase text-foreground/75">
          <a href="#delivery" className="hover:text-foreground transition">Доставка</a>
          <a href="#salon" className="hover:text-foreground transition">Салон</a>
          <button className="ml-2 inline-flex items-center gap-2 rounded-full border border-foreground/25 px-4 py-2 hover:bg-foreground hover:text-cream transition-colors">
            <span>Корзина</span>
            <span className="text-foreground/50">·</span>
            <span>0</span>
          </button>
        </div>
        <button className="lg:hidden text-foreground/70 text-[11px] tracking-[0.25em] uppercase shrink-0">Меню</button>
      </div>
    </header>
  );
}

function Hero({ active, setActive }: { active: number; setActive: (n: number) => void }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 lg:pt-16 pb-16 lg:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left copy */}
        <div className="lg:col-span-5 relative z-10">
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <span className="h-px w-10 bg-gold" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-gold">Nouvelle Collection · Hiver</span>
          </div>
          <h1 className="font-display text-[42px] sm:text-6xl lg:text-[76px] leading-[0.98] tracking-tight text-foreground text-balance animate-fade-up" style={{ animationDelay: "120ms" }}>
            Пряничный <em className="font-script text-gold not-italic-fix" style={{ fontStyle: "italic" }}>Красноярск</em>
            <br />
            в каждой детали
          </h1>
          <p className="mt-7 max-w-md text-[15px] sm:text-base leading-relaxed text-foreground/70 animate-fade-up" style={{ animationDelay: "260ms" }}>
            Дом кондитерских искусств, где сибирский мёд встречается с парижской школой.
            Ручные пряники в форме городских достопримечательностей, макарон восемнадцати
            вкусов и торты, которые превращают каждый день в маленький праздник.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "400ms" }}>
            <a href="#collection" className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-cream text-[12px] tracking-[0.28em] uppercase hover:bg-foreground/85 transition-all">
              Смотреть коллекцию
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#landmarks" className="inline-flex items-center gap-3 text-[12px] tracking-[0.28em] uppercase text-foreground/75 hover:text-foreground border-b border-foreground/25 pb-1">
              <PlayIcon /> Смотреть ролик
            </a>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md animate-fade-up" style={{ animationDelay: "560ms" }}>
            {[
              ["12+", "лет мастерства"],
              ["47", "авторских рецептов"],
              ["24ч", "доставка по городу"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-foreground">{n}</div>
                <div className="mt-1 text-[10px] tracking-[0.22em] uppercase text-foreground/55">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — animated landmark reel */}
        <div className="lg:col-span-7 relative">
          <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] w-full">
            {/* frame ornaments */}
            <div className="pointer-events-none absolute -top-4 -left-4 h-24 w-24 border-t border-l border-gold/60" />
            <div className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 border-b border-r border-gold/60" />
            {/* floating pastel blobs */}
            <div aria-hidden className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-rose/40 blur-3xl animate-float-slow" />
            <div aria-hidden className="absolute -right-8 -bottom-6 h-52 w-52 rounded-full bg-pistachio/50 blur-3xl animate-drift" />

            <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-muted shadow-[0_40px_120px_-30px_rgba(120,80,40,0.35)]">
              {landmarks.map((l, i) => (
                <div
                  key={l.name}
                  className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
                >
                  <img
                    src={l.src}
                    alt={l.name}
                    className={`h-full w-full object-cover ${i === active ? "animate-ken-burns" : ""}`}
                  />
                </div>
              ))}
              {/* overlay gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              {/* caption */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-cream">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[10px] tracking-[0.35em] uppercase text-cream/70">
                      Film · Пряничный город
                    </div>
                    <div className="font-display text-2xl sm:text-3xl mt-1 tracking-wide">
                      {landmarks[active].name}
                    </div>
                    <div className="text-[11px] tracking-[0.22em] uppercase text-cream/70 mt-1">
                      {landmarks[active].tag}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {landmarks.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={`Кадр ${i + 1}`}
                        className={`h-[3px] transition-all rounded-full ${i === active ? "w-10 bg-cream" : "w-5 bg-cream/40"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* play badge */}
              <div className="absolute top-5 right-5 flex items-center gap-2 rounded-full bg-cream/85 backdrop-blur px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-rose animate-pulse" />
                Live · Ателье
              </div>
            </div>

            {/* floating small card */}
            <div className="hidden md:flex absolute -left-8 top-8 w-56 rounded-sm bg-cream/95 backdrop-blur border border-border shadow-xl p-4 gap-3 animate-float-slow">
              <div className="h-14 w-14 rounded-sm overflow-hidden shrink-0">
                <img src={macarons} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.22em] uppercase text-gold">Новинка</div>
                <div className="font-display text-lg leading-tight truncate">Роза & Личи</div>
                <div className="text-[11px] text-foreground/60">Макарон недели</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-foreground/40">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M2 0.5 L9 5 L2 9.5 Z" /></svg>
    </span>
  );
}

function Marquee() {
  const items = [
    "Ручная работа",
    "Сибирский мёд",
    "Французская школа",
    "Натуральные ингредиенты",
    "Доставка за 90 минут",
    "Индивидуальные заказы",
  ];
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
        <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-6">Maison Sibérie · Est. 2014</div>
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
            <div className="text-[11px] tracking-[0.35em] uppercase text-gold mb-3">La Collection</div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight">Витрина сезона</h2>
          </div>
          <a href="#" className="text-[12px] tracking-[0.28em] uppercase text-foreground/70 hover:text-foreground border-b border-foreground/30 pb-1">
            Вся коллекция →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {collection.map((p, i) => (
            <article
              key={p.title}
              className="group cursor-pointer animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-sm">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <button className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 rounded-full bg-cream/95 backdrop-blur py-2.5 text-[11px] tracking-[0.28em] uppercase text-foreground">
                  В корзину
                </button>
              </div>
              <div className="pt-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display text-xl sm:text-2xl leading-tight truncate">{p.title}</h3>
                  <p className="text-[12px] text-foreground/60 mt-1 truncate">{p.subtitle}</p>
                </div>
                <div className="text-[13px] tracking-wider text-foreground shrink-0 pt-1">{p.price}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Landmarks() {
  return (
    <section id="landmarks" className="relative py-24 sm:py-32 bg-[color-mix(in_oklab,var(--rose)_18%,var(--cream))]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-5">Édition Krasnoyarsk</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-balance">
            Наш город<br />из <em className="font-script text-gold" style={{ fontStyle: "italic" }}>пряника</em>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed max-w-md">
            Ограниченная серия пряничных достопримечательностей Красноярска. Часовня Параскевы Пятницы,
            Коммунальный мост, Театр оперы и балета — каждая работа расписывается вручную и
            упаковывается в фирменную коробку.
          </p>
          <div className="mt-8 space-y-4">
            {landmarks.map((l) => (
              <div key={l.name} className="flex items-center gap-4 border-b border-foreground/15 pb-4">
                <div className="h-14 w-14 rounded-sm overflow-hidden shrink-0">
                  <img src={l.src} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-lg leading-tight truncate">{l.name}</div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-foreground/55 mt-0.5">{l.tag}</div>
                </div>
                <div className="text-sm text-foreground/70 shrink-0">от 1 600 ₽</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm mt-8">
            <img src={heroChapel} alt="Часовня" className="h-full w-full object-cover animate-ken-burns" loading="lazy" />
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <img src={heroBridge} alt="Мост" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img src={heroOpera} alt="Опера" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
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
          <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">Livraison · Доставка</div>
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
          <img src={interior} alt="Салон Maison Sibérie" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b border-r border-gold/60" />
        </div>
        <div className="order-1 lg:order-2 lg:pl-8">
          <div className="text-[11px] tracking-[0.4em] uppercase text-gold mb-5">Le Salon</div>
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

function Footer() {
  return (
    <footer className="bg-foreground text-cream/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-[0.3em] uppercase text-cream">Maison Sibérie</div>
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
            <li>Макарон</li>
            <li>Торты</li>
            <li>Пряники</li>
            <li>Кофе на вынос</li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-cream/50 mb-4">Контакты</div>
          <ul className="space-y-2 text-sm">
            <li>+7 (391) 200-45-67</li>
            <li>hello@maison-siberie.ru</li>
            <li>пр. Мира, 102</li>
            <li>Красноярск, 660049</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-3 text-[11px] tracking-[0.25em] uppercase text-cream/45">
          <span>© 2026 Maison Sibérie</span>
          <span className="font-script text-gold text-base tracking-normal normal-case">avec amour · Krasnoyarsk</span>
          <span>Политика · Оферта</span>
        </div>
      </div>
    </footer>
  );
}
