
import { useState } from "react";
import styles from "./OrderModal.module.css";

function OrderModal({ product, onClose }) {
  const [customerName, setCustomerName] = useState("");
  const [grind, setGrind] = useState("Molido");
  const [presentation, setPresentation] = useState("250 g");
  const [submitted, setSubmitted] = useState(false);

  if (!product) return null;

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className={styles.modalOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Cerrar formulario"
        >
          ×
        </button>

        {submitted ? (
          <div className={styles.success}>
            <h2 id="order-title">¡Gracias, {customerName}!</h2>
            <p>
              Tu selección de {product.name} está lista para continuar
              con el proceso de pedido.
            </p>
            <p className={styles.notice}>
              Esta es una demostración de la interfaz. El pedido todavía
              no se ha enviado a un sistema de ventas.
            </p>
            <button
              type="button"
              className={styles.submitButton}
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <h2 id="order-title">Realizar pedido</h2>
            <p className={styles.productSelected}>
              Producto: <strong>{product.name}</strong>
            </p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="customerName">Nombre completo</label>
              <input
                id="customerName"
                name="customerName"
                type="text"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Escribe tu nombre"
                autoComplete="name"
                required
              />

              <label htmlFor="grind">Tipo de molienda</label>
              <select
                id="grind"
                name="grind"
                value={grind}
                onChange={(event) => setGrind(event.target.value)}
                required
              >
                <option value="En grano">En grano</option>
                <option value="Molido">Molido</option>
              </select>

              <label htmlFor="presentation">Presentación</label>
              <select
                id="presentation"
                name="presentation"
                value={presentation}
                onChange={(event) => setPresentation(event.target.value)}
                required
              >
                <option value="250 g">250 g</option>
                <option value="500 g">500 g</option>
                <option value="1 kg">1 kg</option>
              </select>

              <button type="submit" className={styles.submitButton}>
                Confirmar selección
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default OrderModal;
