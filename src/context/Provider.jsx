import Contexto from "./Contexto";
import { useReducer } from "react";
import miReducer from "./MiReducer";
import type from "./type";

// dispatch para modificar el valor, y lo guarda
// use state vs : reduce -->  const [logeado, dispatch] = useReducer(miReducer, {}, inicio);
// hook, tambien guarda logica, bloques de codigo los guarda

// revisa si ya habia una sesion guardada en el localStorage
const inicio = () => {
    const user = localStorage.getItem("usuario");
    return {
        logged: !!user,
        usuario: JSON.parse(user)
    }
}

const Provider = ({children}) => {
    const [logeado, dispatch] = useReducer(miReducer, {}, inicio);

    const login = (sesion) => {
        const action = {
            type: type.login,
            playload: sesion
        }
        localStorage.setItem('usuario', JSON.stringify(sesion));
        dispatch(action);
    }

    const cerrar_sesion = () => {
        const action = {
            type: type.logout,
            playload: null
        }
        localStorage.removeItem('usuario');
        dispatch(action);
    }

    return (
        <Contexto.Provider value={{...logeado, login, cerrar_sesion}}>
            {children}
        </Contexto.Provider>
    )
}

export default Provider;
