import { useReducer } from "react"
import { TapaConProductoCreate } from "../codegen_output"

interface FormState {
    inputValues: TapaConProductoCreate
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

const useNewTapasForm = () => {
    return useReducer(newTapasReducer, INITIAL_STATE)
}

export default useNewTapasForm 