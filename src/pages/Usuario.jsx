import { Link, useParams } from 'react-router-dom';
import Contexto from '../context/Contexto';
import { useContext } from 'react';
import Swal from 'sweetalert2';

const Usuario = () => {
  const { nombre } = useParams();
  const { usuario, cerrar_sesion } = useContext(Contexto);

  const logout = () => {
    Swal.fire({
      icon: "success",
      title: "Cerrando sesion!",
      text: "Estas siendo redirigido"
    });
    cerrar_sesion();
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="tarjeta p-5 text-center">
            <span className="icono-circulo mb-3"><i className="fa-solid fa-user"></i></span>
            <h1 className="h3">Usuario: {nombre}</h1>
            <p className="text-muted mb-1">Correo: {usuario.correo}</p>
            <p className="text-muted">Esta página lee el nombre desde la URL: <code>/usuario/{nombre}</code></p>
            <Link to="/personajes" className="btn btn-morado me-2">Ver personajes</Link>
            <button onClick={() => logout()} className="btn btn-outline-morado">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuario;
