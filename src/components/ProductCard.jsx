import styles from "./ProductCard.module.css";

function ProductCard({
  productId,
  name,
  image,
  description,
  onOrder,
}) {
  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={image}
        alt={name}
        loading="lazy"
      />

      <h2 className={styles.name}>{name}</h2>

      <p className={styles.description}>{description}</p>

      <button
        type="button"
        className={styles.button}
        onClick={() => onOrder(productId)}
        aria-label={`Realizar pedido de ${name}`}
      >
        Realizar pedido
      </button>
    </article>
  );
}

export default ProductCard;
