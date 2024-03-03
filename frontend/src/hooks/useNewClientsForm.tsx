import { useReducer } from "react"
import { Cliente } from "../codegen_output"

interface FormState {
    inputValues: Cliente
}

const INITIAL_STATE = {
    id: 12,
    nombre: "Nombre",
    activa: true
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

const newClientReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
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

const useNewClientForm = () => {
    return useReducer(newClientReducer, INITIAL_STATE)
}

export default useNewClientForm 