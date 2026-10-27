import { Link } from "react-router-dom";
import styles from "./BranchCard.module.css";

function BranchCard({ branch }) {
  return (
    <article className={styles.card}>
      <img
        src={branch.image}
        alt={branch.name}
        className={styles.image}
      />

      <div className={styles.content}>
        <h2>{branch.name}</h2>

        <p>{branch.address}</p>

        <Link
          to={`/sucursales/${branch.id}`}
          className={styles.button}
        >
          Ver ubicación
        </Link>
      </div>
    </article>
  );
}

export default BranchCard;