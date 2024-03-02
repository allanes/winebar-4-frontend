import { useReducer } from "react"
import { Medico } from "../codegen_output"

interface FormState {
    inputValues: Medico
}

const INITIAL_STATE = {
    id: 12345678,
    nombre: "Nombre",
    apellido: "Apellido",
    email: "email@gmail.com",
    telefono: "03814567899",
    especialidad: "Clínico",
    consultorio: ""
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

const newDoctorReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
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

const useNewDoctorForm = () => {
    return useReducer(newDoctorReducer, INITIAL_STATE)
}

export default useNewDoctorForm 