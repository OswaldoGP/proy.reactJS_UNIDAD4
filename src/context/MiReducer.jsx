// estructura basica 
// una capa de logica (no se devuelve inf. solo manda)
// devuelve inf. primero recibe un estado, on obj vacio y despues una accion

// state => es el estado, si estas logeado etc, el acion es lo que haces por ejemplo logearte
// recibe un estado y devuelve un estado (state)

import type from "./type.js";

const MiReducer = (state={}, action) => {
    switch(action.type){
        case type.login:{
            return {
                logged:true,
                usuario:action.playload
            }
        }
        case type.logout:{
            return {
                logged:false,
                usuario:null
            }
        }
        default:{
            return state;
        }
    }

}

export default MiReducer;
