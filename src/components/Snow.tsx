import { useMemo } from "react";

export function Snow({ count = 40 }: { count?: number }) {
  const flakes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 5;
        return {
          i,
          left: Math.random() * 100,
          size,
          delay: Math.random() * -20,
          duration: 14 + Math.random() * 18,
          drift: (Math.random() - 0.5) * 120,
          opacity: 0.35 + Math.random() * 0.55,
        };
      }),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {flakes.map((f) => (
        <span
          key={f.i}
          className="absolute top-0 rounded-full bg-white blur-[1px] animate-snow"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            boxShadow: "0 0 6px rgba(255,255,255,0.6)",
            // @ts-expect-error CSS var
            "--snow-x": `${f.drift}px`,
          }}
        />
      ))}
    </div>
  );
}