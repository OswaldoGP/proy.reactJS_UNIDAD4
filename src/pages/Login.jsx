import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Contexto from "../context/Contexto";
import { useContext } from "react";
import Swal from "sweetalert2";
import { buscarPorCorreo } from "../utils/usuarios";

const Login = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const {login} = useContext(Contexto);
  const navegacion = useNavigate();

  const validacion = {
    usuario: {
      required: "El campo usuario es requerido!",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Ingresa un correo valido, por ejemplo xx@gmail.com"
      }
    },
    password: {
      required: "El campo contraseña es requerido!"
    }
  }

  // como no tenemos una API de login, se buscan los usuarios
  // que se guardaron en el localStorage desde el Registro
  const onSubmit = (data) => {
    const encontrado = buscarPorCorreo(data.usuario);

    if (encontrado && encontrado.password === data.password) {
      login({ usuario: encontrado.nombre, correo: encontrado.correo });
      Swal.fire({
        icon: "success", title: "Acceso correcto!", text: "Estas siendo redirigido..."
      });
      navegacion("/", {replace: true});
    } else {
      Swal.fire({
        icon: "error", title: "Datos incorrectos", text: "El usuario o la contraseña no son correctos"
      });
    }
  }

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="row justify-content-center">
        <div className="col-md-5 tarjeta p-4">
          <h1 className="h4 text-center mb-3">Iniciar Sesion</h1>

          {errors.usuario && <p className="text-danger">{errors.usuario.message}</p>}
          <label htmlFor="usuario">Usuario (correo)</label>
          <input {...register("usuario", validacion.usuario)} id="usuario" type="text" className="form-control mb-3" placeholder="xx@gmail.com" />

          {errors.password && <p className="text-danger">{errors.password.message}</p>}
          <label htmlFor="password">Password</label>
          <input {...register("password", validacion.password)} id="password" type="password" className="form-control mb-3" placeholder="password" />

          <button type="submit" className="btn btn-morado mb-3 w-100">Iniciar Sesion</button>
          <NavLink to="/registro" className="btn btn-outline-morado mb-3 w-100">Registrarse</NavLink>
        </div>
      </form>
    </div>
  )
}

export default Login;
