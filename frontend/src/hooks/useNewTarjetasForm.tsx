import { useReducer } from "react"
import { TarjetaCreate } from "../codegen_output"

interface FormState {
    inputValues: TarjetaCreate
}

const INITIAL_STATE = {
    // raw_rfid: "12345",
    // rol_nombre: "Cliente",
    raw_rfid: "",
    rol_nombre: "",
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

const newTarjetasReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
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

const useNewTarjetasForm = () => {
    return useReducer(newTarjetasReducer, INITIAL_STATE)
}

export default useNewTarjetasForm 