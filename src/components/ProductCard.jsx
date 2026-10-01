import { useState } from "react";

function ProductCard() {
  const [presentacion, setPresentacion] = useState("250 g");

  const presentaciones = ["250 g", "500 g", "1 kg"];

  const handleContactar = () => {
    const numeroWhatsApp = "59175262648";

    const mensaje = `Hola, estoy interesado en Café Corani, presentación de ${presentacion}.`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(url, "_blank");
  };

  return (
    <article className="product-card">

      <div className="product-image">
        <img
          src="/images/cafe-corani.jpg"
          alt="Café Corani"
        />
      </div>

      <div className="product-info">

        <h2>Café Corani</h2>

        <p className="description">
          Café cultivado en Colomi, Distrito 6, a 1600 msnm,
          en un área tropical de Bolivia. Un café de origen
          local, cultivado en las condiciones naturales de la región.
        </p>

        <div className="presentation-section">

          <span className="presentation-title">
            Presentaciones
          </span>

          <div className="presentation-options">
            {presentaciones.map((item) => (
              <button
                key={item}
                onClick={() => setPresentacion(item)}
                className={`presentation ${
                  presentacion === item ? "active" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>

        </div>
        <p className="selected-presentation">
          Presentación:{" "}
          <strong>{presentacion}</strong>
        </p>

        <button
          className="contact-button"
          onClick={handleContactar}
        >
          Contactar
        </button>

      </div>
    </article>
  );
}

export default ProductCard;