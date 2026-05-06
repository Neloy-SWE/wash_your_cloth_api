import { generateError } from "../utils/manager_error.js";

const validatorEntry = (entry, entryList, errorMessage, errorCode) => {
    if (!entryList.includes(entry)) {
        generateError(errorMessage, errorCode);
    }
}

export default validatorEntry;