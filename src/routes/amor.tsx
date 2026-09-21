import type { CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import landscapeUrl from "@/assets/paisaje-colinas-pixel.png";

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

/**
 * Position and size are in "stage units": left/top are percentages of the tree stage
 * and size/drift are cqw (1% of the stage width), so the canopy scales with the tree.
 */
type Heart = {
  left: number;
  top: number;
  size: number;
  rotate: number;
  delay: number;
  startX: number;
  tone: number;
  driftX: number;
  driftY: number;
};

type CustomStyle = CSSProperties & Record<`--${string}`, string>;

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Mostly mid yellows; deep gold and pale yellow are the accents (tones 1-6, dark to light).
const TONE_WEIGHTS = [0.12, 0.26, 0.28, 0.2, 0.1, 0.04];

function pickTone(roll: number) {
  let total = 0;
  for (const [index, weight] of TONE_WEIGHTS.entries()) {
    total += weight;
    if (roll < total) return index + 1;
  }
  return TONE_WEIGHTS.length;
}

// Implicit heart curve, y pointing up.
function insideHeart(x: number, y: number) {
  return (x * x + y * y - 1) ** 3 - x * x * y ** 3 <= 0;
}

const HEART_SCALE = 31;
const HEART_CENTER_TOP = 40;

const CANOPY_HEARTS: Heart[] = (() => {
  const random = seededRandom(14);
  const hearts: Heart[] = [];

  while (hearts.length < 300) {
    const x = random() * 2.5 - 1.25;
    const y = random() * 2.4 - 1.1;
    if (!insideHeart(x, y)) continue;

    hearts.push({
      left: 50 + x * HEART_SCALE,
      top: HEART_CENTER_TOP - y * HEART_SCALE,
      size: 4.4 + random() * 3.2,
      rotate: (random() - 0.5) * 90,
      delay: 2.5 + random() * 2.6,
      startX: (random() - 0.5) * 520,
      tone: pickTone(random()),
      driftX: 0,
      driftY: 0,
    });
  }

  return hearts;
})();

const WIND_HEARTS: Heart[] = (() => {
  const random = seededRandom(7);

  return Array.from({ length: 22 }, (_, index) => ({
    left: 25 + random() * 55,
    top: 22 + random() * 40,
    size: 3 + random() * 2.4,
    rotate: 0,
    delay: 7.4 + (index % 11) * 0.4,
    startX: 0,
    tone: pickTone(random()),
    driftX: 12 + random() * 22,
    driftY: 30 + random() * 14,
  }));
})();

function heartStyle(heart: Heart): CustomStyle {
  return {
    "--left": `${heart.left.toFixed(2)}`,
    "--top": `${heart.top.toFixed(2)}`,
    "--size": `${heart.size.toFixed(2)}`,
    "--rotate": `${heart.rotate.toFixed(0)}deg`,
    "--start-x": `${heart.startX.toFixed(0)}px`,
    "--delay": `${heart.delay.toFixed(2)}s`,
    "--drift-x": `${heart.driftX.toFixed(1)}`,
    "--drift-y": `${heart.driftY.toFixed(1)}`,
  };
}

function LoveStory() {
  return (
    <div className="love-story">
      <img className="pixel-landscape" src={landscapeUrl} alt="" aria-hidden="true" />
      <div className="story-sparks" aria-hidden="true" />
      <main className="story-stage" aria-label="Árbol de amor con corazones">
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
              d="M254 503 C238 501 222 495 204 500 M266 503 C282 501 298 495 316 500"
            />
            <path className="tree-path tree-trunk" pathLength="1" d="M260 506 C258 460 262 410 260 340 C259 310 258 290 258 270" />
            <path className="tree-path branch branch-1" pathLength="1" d="M259 330 C240 300 205 270 172 235 C150 212 130 190 112 158" />
            <path className="tree-path branch branch-2" pathLength="1" d="M261 320 C282 292 318 262 350 232 C372 210 392 188 410 160" />
            <path className="tree-path branch branch-3" pathLength="1" d="M259 285 C250 240 236 205 224 160 C216 132 206 108 196 84" />
            <path className="tree-path branch branch-4" pathLength="1" d="M261 275 C270 232 286 198 298 156 C305 128 314 106 324 82" />
            <path className="tree-path branch branch-5" pathLength="1" d="M172 235 C160 222 148 222 132 226" />
            <path className="tree-path branch branch-6" pathLength="1" d="M350 232 C364 224 378 226 392 230" />
            <path className="tree-path branch branch-7" pathLength="1" d="M259 290 C258 240 260 190 260 130" />
            <path className="tree-path branch branch-8" pathLength="1" d="M224 160 C212 152 200 152 186 158" />
            <path className="bark-detail" pathLength="1" d="M254 480 C262 450 253 425 259 395 M262 372 C257 355 263 338 259 318" />
          </svg>

          <div className="heart-canopy" aria-hidden="true">
            {CANOPY_HEARTS.map((heart, index) => (
              <span
                key={index}
                className={`heart-piece canopy-heart heart-tone-${heart.tone}`}
                style={heartStyle(heart)}
              />
            ))}
          </div>

          <div className="wind-hearts" aria-hidden="true">
            {WIND_HEARTS.map((heart, index) => (
              <span
                key={index}
                className={`heart-piece wind-heart heart-tone-${heart.tone}`}
                style={heartStyle(heart)}
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
