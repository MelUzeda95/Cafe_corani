import BranchCard from "../components/BranchCard";
import { branches } from "../data/branches";
import styles from "./Branches.module.css";

function Branches() {
  return (
    <section className={styles.container}>
      <h1>Nuestras sucursales</h1>

      <p className={styles.subtitle}>
        Encuentra tu sucursal Café Corani más cercana.
      </p>

      <div className={styles.list}>
        {branches.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
          />
        ))}
      </div>
    </section>
  );
}

export default Branches;