import { generateError } from "../utils/manager_error.js";

const validatorLength = (value, length) => {
    if (value.length !== Number(length)) {
        generateError("Invalid length", 400);
    }
}

export default validatorLength;