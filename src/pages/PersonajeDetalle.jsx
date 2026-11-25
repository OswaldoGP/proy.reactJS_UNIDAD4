import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Personaje from "../components/Personaje";

const PersonajeDetalle = () => {

  // la URL de la API viene del archivo .env
  const API = import.meta.env.VITE_API_URL;

  const refContenedor = useRef();
  const { id } = useParams();

  const [datos, setDatos] = useState(null);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {

    const controlador = new AbortController();

    setCargando(true);
    setDatos(null);
    setError("");

    fetch(`${API}/${id}`, {
      signal: controlador.signal
    })
      .then(respuesta => {
        if (!respuesta.ok) {
          throw new Error("Personaje no encontrado");
        }

        return respuesta.json();
      })
      .then(respuestaJSON => {
        setDatos(respuestaJSON);
      })
      .catch(error => {
        if (error.name !== "AbortError") {
          setError("No se encontró el personaje.");
        }
      })
      .finally(() => {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      });

    return () => controlador.abort();

  }, [id]);

  
  const cambiarTema = (e) => {

    const contenedor = refContenedor.current;

    const esOscuro =
      contenedor.getAttribute("data-bs-theme") === "dark";

    contenedor.setAttribute(
      "data-bs-theme",
      esOscuro ? "light" : "dark"
    );

    e.target.textContent = esOscuro
      ? "Modo oscuro"
      : "Modo claro";

  };

  return (

    <div
      ref={refContenedor}
      data-bs-theme="dark"
      className="min-vh-100 bg-body text-body"
    >

      <div className="container pt-4">

        <div className="d-flex justify-content-end mb-3">

          <button
            className="btn btn-secondary"
            onClick={cambiarTema}
          >
            Modo oscuro
          </button>

        </div>

        <div>
          <h1 id="titulo">Rick and Morty</h1>
        </div>

        <div className="row justify-content-center">

          {cargando && (
            <div className="text-center mt-4">
              <div className="spinner-border"></div>
              <p>Cargando personaje...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center mt-3">
              {error}
            </div>
          )}

          {datos && (
            <Personaje
              key={datos.id}
              id={datos.id}
              name={datos.name}
              gender={datos.gender}
              species={datos.species}
              image={datos.image}
            />
          )}

        </div>

        <div className="text-center mt-4">
          <Link to="/personajes" className="btn btn-primary">
            Regresar a personajes
          </Link>
        </div>

      </div>

    </div>

  );

};

export default PersonajeDetalle;
