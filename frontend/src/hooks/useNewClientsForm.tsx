import { useReducer } from "react";
import { ClienteCreate, DetallesAdicionalesForUI } from "../codegen_output";

interface FormState {
    inputValues: ClienteCreate & DetallesAdicionalesForUI;
}

const INITIAL_STATE: FormState["inputValues"] = {
    nombre: "",
    dni: null,
    apellido: null,
    email: null,
    'teléfono': null,
    domicilio: null,
};

type FormReducerAction = {
    type: "change_value",
    payload: {
        inputName: string,
        inputValue: string
    }
} | {
    type: "clear"
};

const newClientReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
    switch (action.type) {
        case "change_value":
            const { inputName, inputValue } = action.payload;
            return {
                ...state,
                [inputName]: inputValue
            };

        case "clear":
            return INITIAL_STATE;

        default:
            return state;
    }
};

const useNewClientForm = () => {
    return useReducer(newClientReducer, INITIAL_STATE);
};

export default useNewClientForm;