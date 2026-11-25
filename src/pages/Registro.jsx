import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { buscarPorCorreo, guardarUsuario } from "../utils/usuarios";

const Registro = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const navegacion = useNavigate();

  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

  const validacion = {
    nombre: {
      required: "El campo nombre es requerido!",
      pattern: { value: soloLetras, message: "El nombre solo permite letras y espacios" }
    },
    ap_paterno: {
      required: "El campo apellido paterno es requerido!",
      pattern: { value: soloLetras, message: "El apellido paterno solo permite letras y espacios" }
    },
    ap_materno: {
      required: "El campo apellido materno es requerido!",
      pattern: { value: soloLetras, message: "El apellido materno solo permite letras y espacios" }
    },
    correo: {
      required: "El campo correo es requerido!",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Ingresa un email valido, por ejemplo xx@gmail.com"
      }
    },
    password: {
      required: "El campo contraseña es requerido!",
      pattern: {
        value: /^(?=.*[A-Z]).{8,30}$/,
        message: "Minimo 8 caracteres y una mayuscula"
      }
    },
    fecha_nacimiento: {
      required: "La fecha de nacimiento es obligatoria"
    }
  }

  const onSubmit = (data) => {
    if (buscarPorCorreo(data.correo)) {
      Swal.fire({
        icon: "error", title: "Correo ya registrado", text: "Intenta iniciar sesion con ese correo."
      });
      return;
    }
    guardarUsuario({ ...data, nombre: data.nombre.trim() });
    Swal.fire({
      icon: "success", title: "Cuenta creada", text: "Ahora inicia sesion"
    }).then(() => navegacion("/login"));
  }

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="row justify-content-center">
        <div className="col-md-6 col-lg-5 tarjeta p-4">
          <div className="text-center mb-3">
            <span className="icono-circulo mb-2"><i className="fa-solid fa-user-plus"></i></span>
            <h1 className="h4">Registro</h1>
          </div>

          {errors.nombre && <p className="text-danger">{errors.nombre.message}</p>}
          <label htmlFor="nombre">Nombre</label>
          <input {...register("nombre", validacion.nombre)} id="nombre" type="text" className="form-control mb-3" placeholder="Nombre" />

          {errors.ap_paterno && <p className="text-danger">{errors.ap_paterno.message}</p>}
          <label htmlFor="ap_paterno">Apellido paterno</label>
          <input {...register("ap_paterno", validacion.ap_paterno)} id="ap_paterno" type="text" className="form-control mb-3" placeholder="Apellido paterno" />

          {errors.ap_materno && <p className="text-danger">{errors.ap_materno.message}</p>}
          <label htmlFor="ap_materno">Apellido materno</label>
          <input {...register("ap_materno", validacion.ap_materno)} id="ap_materno" type="text" className="form-control mb-3" placeholder="Apellido materno" />

          {errors.correo && <p className="text-danger">{errors.correo.message}</p>}
          <label htmlFor="correo">Correo</label>
          <input {...register("correo", validacion.correo)} id="correo" type="text" className="form-control mb-3" placeholder="xx@gmail.com" />

          {errors.password && <p className="text-danger">{errors.password.message}</p>}
          <label htmlFor="password">Contraseña</label>
          <input {...register("password", validacion.password)} id="password" type="password" className="form-control mb-3" placeholder="Minimo 8 caracteres" />

          {errors.fecha_nacimiento && <p className="text-danger">{errors.fecha_nacimiento.message}</p>}
          <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
          <input {...register("fecha_nacimiento", validacion.fecha_nacimiento)} id="fecha_nacimiento" type="date" className="form-control mb-3" />

          <button type="submit" className="btn btn-morado mb-3 w-100">Crear cuenta</button>
          <NavLink to="/login" className="btn btn-outline-morado w-100">Ya tengo cuenta, iniciar sesion</NavLink>
        </div>
      </form>
    </div>
  )
}

export default Registro;
