import { NavLink } from "react-router-dom";
import Contexto from "../context/Contexto";
import { useContext } from "react";
import Swal from "sweetalert2";

const Home = () => {
  const {usuario, cerrar_sesion} = useContext(Contexto);

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
      <div className="hero p-5 text-center mb-4">
        <h1>Home</h1>
        <p className="mb-0">Bienvenido, {usuario.usuario}</p>
      </div>
      <div className="text-center">
        <NavLink to="/personajes" className="btn btn-morado me-2">Ver personajes</NavLink>
        <NavLink to={`/usuario/${usuario.usuario}`} className="btn btn-outline-morado me-2">Mi perfil</NavLink>
        <button onClick={() => logout()} className="btn btn-danger">Cerrar Sesion</button>
      </div>
    </div>
  )
}

export default Home;
