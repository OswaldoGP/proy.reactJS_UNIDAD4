import { NavLink, Link } from 'react-router-dom';
import Contexto from '../context/Contexto';
import { useContext } from 'react';
import Swal from 'sweetalert2';

const Navbar = () => {
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
    <nav className="navbar navbar-expand-lg navbar-dark navbar-morado">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">
          <i className="fa-solid fa-flask me-2"></i>Proyecto 003
        </Link>

        {/* los enlaces solo se ven si hay sesion iniciada */}
        {usuario && (
          <div className="d-flex align-items-center gap-2">
            <NavLink className="nav-link" to="/">Inicio</NavLink>
            <NavLink className="nav-link" to="/personajes">Personajes</NavLink>
            <NavLink className="nav-link" to={`/usuario/${usuario.usuario}`}>Perfil</NavLink>
            <button onClick={() => logout()} className="btn btn-sm btn-outline-light">Cerrar sesion</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
