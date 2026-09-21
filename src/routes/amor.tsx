import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import cloudLandscape from "@/assets/paisaje-nubes-pixel.png.asset.json";

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

const HEART_LEAVES: AnimatedPetal[] = Array.from({ length: 68 }, (_, index) => {
  const t = (index / 68) * Math.PI * 2;
  const radius = 0.42 + ((index * 17) % 53) / 100;
  const heartX = 16 * Math.sin(t) ** 3;
  const heartY = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

  return {
    x: heartX * 9.5 * radius + Math.sin(index * 3.1) * 10,
    y: -heartY * 8.8 * radius - 28 + Math.cos(index * 2.2) * 8,
    startX: 0,
    delay: 2.45 + (index % 14) * 0.07,
    size: 9 + (index % 4) * 2,
    tone: (index % 3) + 1,
  };
});

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
      <img className="pixel-landscape" src={cloudLandscape.url} alt="" aria-hidden="true" />
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
              d="M258 500 C222 498 193 485 157 469 C120 452 85 468 52 481 M258 500 C296 498 328 480 363 464 C400 447 438 462 472 480 M258 500 C236 480 218 469 188 462 M258 500 C282 478 305 469 337 463"
            />
            <path className="tree-path tree-trunk" pathLength="1" d="M258 493 C249 430 261 360 258 282 C256 248 248 218 235 190" />
            <path className="tree-path branch branch-1" pathLength="1" d="M256 370 C218 342 190 309 145 286 C119 273 98 247 78 219" />
            <path className="tree-path branch branch-2" pathLength="1" d="M260 349 C301 320 329 294 374 276 C405 263 430 240 448 213" />
            <path className="tree-path branch branch-3" pathLength="1" d="M249 299 C213 270 192 236 167 201 C150 177 126 158 105 143" />
            <path className="tree-path branch branch-4" pathLength="1" d="M261 285 C294 254 321 220 351 183 C371 158 391 139 414 124" />
            <path className="tree-path branch branch-5" pathLength="1" d="M244 237 C222 198 220 158 214 116 C210 87 199 65 187 44" />
            <path className="tree-path branch branch-6" pathLength="1" d="M268 253 C284 210 286 169 301 124 C311 94 313 66 310 40" />
            <path className="tree-path branch branch-7" pathLength="1" d="M185 225 C161 215 139 205 118 184" />
            <path className="tree-path branch branch-8" pathLength="1" d="M340 196 C363 189 385 174 404 153" />
            <path className="bark-detail" pathLength="1" d="M245 466 C266 432 244 407 264 372 M246 343 C263 326 248 305 261 287" />
          </svg>

          <div className="heart-canopy" aria-hidden="true">
            {HEART_LEAVES.map((leaf, index) => (
              <span
                key={`leaf-${index}`}
                className={`heart-leaf leaf-tone-${leaf.tone}`}
                style={petalStyle(leaf)}
              />
            ))}
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
      {Array.from({ length: 86 }, (_, index) => (
        <span key={index} className="pixel-flower" style={flowerStyle(index)} />
      ))}
      <div className="pixel-grass" />
    </div>
  );
}

function flowerStyle(index: number): CustomStyle {
  return {
    "--flower-left": `${1 + ((index * 6.7) % 98)}%`,
    "--flower-bottom": `${18 + ((index * 11) % 47)}%`,
    "--flower-scale": `${0.62 + ((index * 7) % 10) / 12}`,
    "--flower-delay": `${-((index * 0.14) % 2.8)}s`,
  };
}