
import { useEffect, useState } from "react";
import styles from "./CoffeeApi.module.css";

const API_URLS = {
  hot: "https://api.sampleapis.com/coffee/hot",
  iced: "https://api.sampleapis.com/coffee/iced",
};

function CoffeeApi() {
  const [category, setCategory] = useState("hot");
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCoffees() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(API_URLS[category], {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Error al consultar la API: ${response.status}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("La respuesta de la API no es válida.");
        }

        setCoffees(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "No pudimos cargar los cafés. Comprueba tu conexión e inténtalo de nuevo."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchCoffees();

    return () => controller.abort();
  }, [category]);

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>EXPLORA NUEVOS SABORES</p>

        <h2>Descubre más cafés</h2>

        <p>
          Conoce diferentes preparaciones y encuentra
          inspiración para tu próxima taza.
        </p>
      </div>

      <div
        className={styles.filters}
        aria-label="Filtrar cafés por temperatura"
      >
        <button
          type="button"
          className={
            category === "hot"
              ? styles.activeFilter
              : styles.filter
          }
          aria-pressed={category === "hot"}
          onClick={() => setCategory("hot")}
        >
          Cafés calientes
        </button>

        <button
          type="button"
          className={
            category === "iced"
              ? styles.activeFilter
              : styles.filter
          }
          aria-pressed={category === "iced"}
          onClick={() => setCategory("iced")}
        >
          Cafés fríos
        </button>
      </div>

      {loading && (
        <p className={styles.status} role="status">
          Cargando cafés...
        </p>
      )}

      {error && (
        <div className={styles.error} role="alert">
          <p>{error}</p>

          <button
            type="button"
            className={styles.retry}
            onClick={() => {
              setCategory((current) =>
                current === "hot" ? "iced" : "hot"
              );
            }}
          >
            Probar otra categoría
          </button>
        </div>
      )}

      {!loading && !error && coffees.length === 0 && (
        <p className={styles.status}>
          No hay cafés disponibles en esta categoría.
        </p>
      )}

      {!loading && !error && coffees.length > 0 && (
        <>
          <p className={styles.resultCount}>
            {coffees.length} preparaciones encontradas
          </p>

          <div className={styles.grid}>
            {coffees.map((coffee, index) => (
              <article
                className={styles.card}
                key={`${category}-${coffee.id ?? index}`}
              >
                <div className={styles.imageWrapper}>
                  <span className={styles.imageFallback}>
                    ☕ Café
                  </span>

                  {coffee.image && (
                    <img
                      className={styles.image}
                      src={coffee.image}
                      alt={coffee.title || "Preparación de café"}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>

                <div className={styles.cardContent}>
                  <h3>
                    {coffee.title || "Café sin nombre"}
                  </h3>

                  <p className={styles.description}>
                    {coffee.description ||
                      "Descubre esta preparación de café."}
                  </p>

                  {Array.isArray(coffee.ingredients) &&
                    coffee.ingredients.length > 0 && (
                      <div className={styles.ingredients}>
                        <h4>Ingredientes</h4>

                        <ul>
                          {coffee.ingredients.map(
                            (ingredient, ingredientIndex) => (
                              <li key={ingredientIndex}>
                                {ingredient}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default CoffeeApi;
