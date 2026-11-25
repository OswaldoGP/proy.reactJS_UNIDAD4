import { useEffect, useState } from "react";
import Personaje from "../components/Personaje";

const Personajes = () => {
  // la URL de la API viene del archivo .env
  const API = import.meta.env.VITE_API_URL;

  const [personajes, setPersonajes] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // cada vez que cambia lo que se escribe en el buscador se vuelve a llamar a la API
  useEffect(() => {
    setCargando(true);
    setError("");

    fetch(`${API}?name=${buscar}`)
      .then(respuesta => respuesta.json())
      .then(respuestaJSON => {
        if (respuestaJSON.results) {
          setPersonajes(respuestaJSON.results);
        } else {
          setPersonajes([]);
          setError("No se encontraron personajes con ese nombre.");
        }
      })
      .catch(() => {
        setError("No se pudo conectar con la API.");
      })
      .finally(() => {
        setCargando(false);
      });
  }, [buscar]);

  return (
    <div className="container py-4">
      <h1 className="mb-3">Personajes de Rick and Morty</h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Buscar personaje por nombre..."
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
      />

      {cargando && (
        <div className="text-center mt-4">
          <div className="spinner-border"></div>
          <p>Cargando personajes...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      <div className="row">
        {personajes.map(personaje => (
          <Personaje
            key={personaje.id}
            id={personaje.id}
            name={personaje.name}
            gender={personaje.gender}
            species={personaje.species}
            image={personaje.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Personajes;
