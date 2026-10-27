import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { branches } from "../data/branches";
import styles from "./Contact.module.css";

function Contact() {
  const [searchParams] = useSearchParams();

  const branchId = searchParams.get("sucursal");

  const selectedBranch = branches.find(
    (branch) => branch.id === branchId
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedForm = localStorage.getItem(
      "cafeCoraniContactForm"
    );

    if (savedForm) {
      setFormData(JSON.parse(savedForm));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cafeCoraniContactForm",
      JSON.stringify(formData)
    );
  }, [formData]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Ingresa un correo electrónico válido.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message =
        "El mensaje debe tener al menos 10 caracteres.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitted(true);
  }

  function handleClear() {
    const emptyForm = {
      name: "",
      email: "",
      message: "",
    };

    setFormData(emptyForm);
    setErrors({});
    setSubmitted(false);

    localStorage.removeItem(
      "cafeCoraniContactForm"
    );
  }

  if (submitted) {
    return (
      <section className={styles.container}>
        <div className={styles.success}>
          <h1>¡Consulta enviada!</h1>

          <p>
            Gracias, {formData.name}. Hemos recibido
            tu consulta correctamente.
          </p>

          {selectedBranch && (
            <p>
              Sucursal seleccionada:{" "}
              <strong>
                {selectedBranch.name}
              </strong>
            </p>
          )}

          <Link
            to="/sucursales"
            className={styles.button}
          >
            Volver a sucursales
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h1>Contáctanos</h1>

      {selectedBranch && (
        <p className={styles.branch}>
          Consulta sobre:{" "}
          <strong>{selectedBranch.name}</strong>
        </p>
      )}

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={styles.field}>
          <label htmlFor="name">
            Nombre completo
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Escribe tu nombre"
          />

          {errors.name && (
            <span className={styles.error}>
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">
            Correo electrónico
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />

          {errors.email && (
            <span className={styles.error}>
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="message">
            Mensaje
          </label>

          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Escribe tu consulta..."
            rows="5"
          />

          {errors.message && (
            <span className={styles.error}>
              {errors.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={styles.button}
        >
          Enviar consulta
        </button>

        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
        >
          Limpiar formulario
        </button>
      </form>
    </section>
  );
}

export default Contact;