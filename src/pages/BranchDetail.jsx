import { Link, useParams } from "react-router-dom";
import { branches } from "../data/branches";
import styles from "./BranchDetail.module.css";

function BranchDetail() {
  const { id } = useParams();

  const branch = branches.find(
    (item) => item.id === id
  );

  if (!branch) {
    return (
      <section className={styles.container}>
        <h1>Sucursal no encontrada</h1>

        <Link to="/sucursales">
          Volver a sucursales
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <img
        src={branch.image}
        alt={branch.name}
        className={styles.image}
      />

      <h1>{branch.name}</h1>

      <p>{branch.address}</p>

      <a
        href={branch.locationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.locationButton}
      >
        Abrir ubicación
      </a>

      <Link
        to="/sucursales"
        className={styles.backLink}
      >
        Volver a sucursales
      </Link>

      <div className={styles.contactSection}>
        <h2>¿Quieres recibir información?</h2>

        <p>
          Puedes enviarnos una consulta sobre esta
          sucursal.
        </p>

        <Link
          to={`/contacto?sucursal=${branch.id}`}
          className={styles.contactButton}
        >
          Contactar
        </Link>
      </div>
    </section>
  );
}

export default BranchDetail;