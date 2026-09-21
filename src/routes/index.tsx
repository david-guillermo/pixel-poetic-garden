import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jardín amarillo de amor" },
      {
        name: "description",
        content: "Una landing romántica con jardín pixel art, botón animado y una sorpresa de árbol-corazón.",
      },
      { property: "og:title", content: "Jardín amarillo de amor" },
      {
        property: "og:description",
        content: "Presiona el botón que cae del cielo para ver florecer un árbol-corazón amarillo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="love-home">
      <div className="heart-sky" aria-hidden="true" />
      <main className="love-home__center" aria-label="Entrada al jardín de amor">
        <div className="fall-button-wrap">
          <Button asChild variant="romance" size="love" className="press-button">
            <Link to="/amor">Presióname</Link>
          </Button>
        </div>
      </main>
      <PixelGarden />
    </div>
  );
}

function PixelGarden() {
  return (
    <div className="pixel-garden" aria-hidden="true">
      {Array.from({ length: 48 }, (_, index) => (
        <span key={index} className={`pixel-flower pixel-flower-${(index % 12) + 1}`} />
      ))}
      <div className="pixel-grass" />
    </div>
  );
}
