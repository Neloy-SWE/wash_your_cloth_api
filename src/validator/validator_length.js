import { generateError } from "../utils/manager_error.js";

const validatorLength = (value, length = 4) => {
    if (value.length !== length) {
        generateError("Invalid length", 400);
    }
}

export default validatorLength;