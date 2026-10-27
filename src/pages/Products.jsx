
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import styles from "./Products.module.css";

const products = [
  {
    productId: 1,
    name: "Café Corani",
    image: "/images/cafe-corani.jpg",
    description:
      "Café cultivado en Colomi, Cochabamba, con aroma y sabor auténtico de nuestra tierra.",
  },
  {
    productId: 2,
    name: "Café Brewtopia",
    image: "/images/brewtopia.jpg",
    description:
      "Una mezcla aromática y equilibrada, perfecta para disfrutar cada pequeño espacio.",
  },
  {
    productId: 3,
    name: "Café BrewSage",
    image: "/images/brewsage.jpg",
    description:
      "Un café de carácter intenso y sofisticado para quienes buscan una experiencia especial.",
  },
];

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fullName, setFullName] = useState("");
  const [grindType, setGrindType] = useState("");
  const [presentation, setPresentation] = useState("250 g");
  const [message, setMessage] = useState("");

  function handleOrder(productId) {
    const product = products.find(
      (item) => item.productId === productId
    );

    setSelectedProduct(product);
    setFullName("");
    setGrindType("");
    setPresentation("250 g");
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    setMessage(
      `Pedido solicitado para ${selectedProduct.name}. ¡Gracias, ${fullName}!`
    );
    setSelectedProduct(null);
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>CAFÉ CORANI</p>
        <h1>El sabor de nuestros orígenes</h1>
        <p>
          Descubre el aroma y la esencia de nuestro café de grano.
        </p>
      </section>

      <section className={styles.catalog}>
        <h2>Nuestros cafés</h2>
        <p className={styles.intro}>
          Encuentra tu favorito y disfruta cada taza.
        </p>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.productId}
              {...product}
              onOrder={handleOrder}
            />
          ))}
        </div>

        {message && (
          <p className={styles.notice} role="status">
            {message}
          </p>
        )}
      </section>

      {selectedProduct && (
        <div
          className={styles.overlay}
          onClick={() => setSelectedProduct(null)}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.close}
              onClick={() => setSelectedProduct(null)}
              aria-label="Cerrar formulario"
            >
              ×
            </button>

            <h2 id="order-title">Realizar pedido</h2>
            <p className={styles.productName}>
              {selectedProduct.name}
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="fullName">Nombre completo</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event) =>
                  setFullName(event.target.value)
                }
                placeholder="Ingresa tu nombre"
                required
              />

              <label htmlFor="grindType">Tipo de molienda</label>
              <select
                id="grindType"
                value={grindType}
                onChange={(event) =>
                  setGrindType(event.target.value)
                }
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="Grano entero">Grano entero</option>
                <option value="Molido fino">Molido fino</option>
                <option value="Molido medio">Molido medio</option>
                <option value="Molido grueso">Molido grueso</option>
              </select>

              <label htmlFor="presentation">Presentación</label>
              <select
                id="presentation"
                value={presentation}
                onChange={(event) =>
                  setPresentation(event.target.value)
                }
                required
              >
                <option value="125 g">125 g</option>
                <option value="250 g">250 g</option>
                <option value="500 g">500 g</option>
                <option value="1 kg">1 kg</option>
              </select>

              <button type="submit" className={styles.submit}>
                Enviar
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default Products;
