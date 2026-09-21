import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/amor")({
  head: () => ({
    meta: [
      { title: "Árbol corazón de flores amarillas" },
      {
        name: "description",
        content:
          "Una vista romántica donde una raíz crea un árbol y flores amarillas caen formando un corazón.",
      },
      { property: "og:title", content: "Árbol corazón de flores amarillas" },
      {
        property: "og:description",
        content: "Flores amarillas, viento suave y un poema de amor en una escena animada.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoveStory,
});

type AnimatedPetal = {
  x: number;
  y: number;
  startX: number;
  delay: number;
  size: number;
  tone: number;
};

type CustomStyle = CSSProperties & Record<`--${string}`, string>;

const HEART_PETALS: AnimatedPetal[] = Array.from({ length: 96 }, (_, index) => {
  const t = (index / 96) * Math.PI * 2;
  const heartX = 16 * Math.sin(t) ** 3;
  const heartY = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  const shimmer = Math.sin(index * 2.41);
  const drift = Math.cos(index * 1.73);

  return {
    x: heartX * 10 + shimmer * 8,
    y: -heartY * 9 + drift * 6 - 28,
    startX: (index % 2 === 0 ? -1 : 1) * (180 + ((index * 37) % 260)),
    delay: 2.9 + (index % 18) * 0.12,
    size: 7 + (index % 5) * 2,
    tone: (index % 4) + 1,
  };
});

const WIND_PETALS: AnimatedPetal[] = Array.from({ length: 26 }, (_, index) => ({
  x: 68 + Math.sin(index * 1.2) * 115,
  y: -118 + Math.cos(index * 1.9) * 82,
  startX: 95 + (index % 6) * 22,
  delay: 7.4 + (index % 13) * 0.35,
  size: 6 + (index % 4) * 2,
  tone: (index % 4) + 1,
}));

function petalStyle(petal: AnimatedPetal): CustomStyle {
  return {
    "--x": `${petal.x}px`,
    "--y": `${petal.y}px`,
    "--start-x": `${petal.startX}px`,
    "--delay": `${petal.delay}s`,
    "--size": `${petal.size}px`,
  };
}

function LoveStory() {
  return (
    <div className="love-story">
      <div className="story-sparks" aria-hidden="true" />
      <main className="story-stage" aria-label="Árbol de amor con flores amarillas">
        <section className="poem-panel" aria-label="Poema de amor">
          <p>Para el amor de mi vida:</p>
          <p>
            Si pudiera guardar un lugar seguro en el mundo, lo haría justo a tu lado.
          </p>
          <p>
            Donde caen flores amarillas, mi corazón aprende a quedarse.
          </p>
          <p>
            Y si el viento mueve las ramas, que también lleve mi promesa: amarte bonito,
            todos los días.
          </p>
        </section>

        <section className="tree-stage" aria-label="Árbol formando un corazón">
          <svg className="heart-tree" viewBox="0 0 520 520" aria-hidden="true">
            <path
              className="tree-path tree-root"
              pathLength="1"
              d="M260 454 C222 450 196 436 166 418 C128 395 102 406 72 421 M260 454 C293 449 318 432 348 412 C383 389 419 396 452 421 M260 454 C254 428 259 408 274 389"
            />
            <path className="tree-path tree-trunk" pathLength="1" d="M260 454 C263 386 271 323 260 246" />
            <path className="tree-path branch branch-1" pathLength="1" d="M264 304 C219 287 197 255 172 226" />
            <path className="tree-path branch branch-2" pathLength="1" d="M265 286 C311 263 332 232 360 203" />
            <path className="tree-path branch branch-3" pathLength="1" d="M261 255 C225 221 213 184 191 150" />
            <path className="tree-path branch branch-4" pathLength="1" d="M260 244 C300 217 326 178 347 134" />
            <path className="tree-path branch branch-5" pathLength="1" d="M260 222 C260 183 258 146 266 104" />
          </svg>

          <div className="heart-canopy" aria-hidden="true">
            {HEART_PETALS.map((petal, index) => (
              <span
                key={index}
                className={`heart-petal petal-tone-${petal.tone}`}
                style={petalStyle(petal)}
              />
            ))}
          </div>

          <div className="wind-petals" aria-hidden="true">
            {WIND_PETALS.map((petal, index) => (
              <span
                key={index}
                className={`wind-petal petal-tone-${petal.tone}`}
                style={petalStyle(petal)}
              />
            ))}
          </div>
        </section>

        <PixelGarden />
      </main>
    </div>
  );
}

function PixelGarden() {
  return (
    <div className="pixel-garden pixel-garden--story" aria-hidden="true">
      {Array.from({ length: 58 }, (_, index) => (
        <span key={index} className={`pixel-flower pixel-flower-${(index % 12) + 1}`} />
      ))}
      <div className="pixel-grass" />
    </div>
  );
}