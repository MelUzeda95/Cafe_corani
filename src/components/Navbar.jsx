import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.navbar}>
      <Link
        to="/"
        className={styles.logo}
        aria-label="Café Corani, inicio"
      >
        <img
          src="/images/logo-corani.png"
          alt="Café Corani"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.nextElementSibling.style.display = "block";
          }}
        />
        <span className={styles.logoFallback}>CAFÉ CORANI</span>
      </Link>

      <nav className={styles.links} aria-label="Navegación principal">
        <NavLink
          to="/sucursales"
          className={({ isActive }) =>
            isActive ? styles.activeLink : ""
          }
        >
          Sucursales
        </NavLink>

        <NavLink
          to="/productos"
          className={({ isActive }) =>
            isActive ? styles.activeLink : ""
          }
        >
          Productos
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
