import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import OrderModal from "./components/OrderModal";
import styles from "./App.module.css";

const products = [
  {
    id: "corani",
    name: "Café Corani",
    image: "/images/cafe-corani.jpg",
    description:
      "Café cultivado en Colomi, Distrito 6, a 1600 msnm, en un área tropical de Bolivia. Su cultivo aprovecha las condiciones naturales de la región para ofrecer un café de origen local.",
  },
  {
    id: "brewtopia",
    name: "Café Brewtopia",
    image: "/images/brewtopia.jpg",
    description:
      "Una mezcla aromática y equilibrada, con notas suaves y un sabor envolvente que convierte cada taza en un pequeño escape.",
  },
  {
    id: "brewsage",
    name: "Café BrewSage",
    image: "/images/brewsage.jpg",
    description:
      "Un café de carácter intenso y sofisticado, con un perfil profundo y aromático para quienes disfrutan una experiencia con personalidad.",
  },
];

function Home({ onOrder }) {
  return (
    <main className={styles.homePage}>
      <section
        className={styles.productGrid}
        aria-label="Nuestros cafés"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            name={product.name}
            image={product.image}
            description={product.description}
            onOrder={onOrder}
          />
        ))}
      </section>
    </main>
  );
}

function Branches() {
  return (
    <main className={styles.infoPage}>
      <h1>Nuestras sucursales</h1>
      <p>Pronto encontrarás aquí las direcciones de Café Corani.</p>
      <Link to="/">Volver al catálogo</Link>
    </main>
  );
}

function Orders() {
  return (
    <main className={styles.infoPage}>
      <h1>Realizar pedido</h1>
      <p>Selecciona un café en el catálogo para personalizar tu pedido.</p>
      <Link to="/">Ver nuestros cafés</Link>
    </main>
  );
}

function NotFound() {
  return (
    <main className={styles.infoPage}>
      <h1>Página no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleOrder(productId) {
    const product = products.find((item) => item.id === productId);
    setSelectedProduct(product ?? null);
  }

  function closeModal() {
    setSelectedProduct(null);
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home onOrder={handleOrder} />} />
        <Route
          path="/productos"
          element={<Home onOrder={handleOrder} />}
        />
        <Route path="/sucursales" element={<Branches />} />
        <Route path="/pedido" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default App;