import { useReducer } from "react"
import { Tapa } from "../codegen_output"

interface FormState {
    inputValues: {
        titulo: string,
        descripcion: string,
        precio: number,
        stock: number,
        foto: string,
    }
}

const INITIAL_STATE = {
    titulo: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    foto: ''
}

type FormReducerAction = {
    type: "change_value",
    payload: {
        inputName: string,
        inputValue: string
    }
} | {
    type: "clear"
}

const newTapasReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
    switch (action.type) {
        case "change_value":
            const { inputName, inputValue } = action.payload
            return {
                ...state,
                [inputName]: inputValue
            }

        case "clear":
            return INITIAL_STATE

        default:
            return state
    }
}

const useNewTapasForm = (tapa?: Tapa) => {
    const initialState = tapa ? {
        titulo: tapa.producto.titulo,
        descripcion: tapa.producto.descripcion || '',
        precio: tapa.producto.precio,
        stock: tapa.producto.stock,
        foto: tapa.foto || ''
    } : INITIAL_STATE
    return useReducer(newTapasReducer, initialState)
}

export default useNewTapasForm