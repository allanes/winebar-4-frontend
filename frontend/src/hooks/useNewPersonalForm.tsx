import { useReducer } from "react"
import { PersonalInternoCreate } from "../codegen_output"

interface FormState {
    inputValues: PersonalInternoCreate
}

const INITIAL_STATE = {
    id: 12345,
    nombre: "Nombre",
    apellido: "Apellido",
    // Fecha de nacimiento",
    telefono: "381",
    contra_sin_hash: "secret pass"
    // email,
    // Tarjeta,
    // Rol,
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

const newPersonalInternoReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
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

const useNewPersonalInternoForm = () => {
    return useReducer(newPersonalInternoReducer, INITIAL_STATE)
}

export default useNewPersonalInternoForm 