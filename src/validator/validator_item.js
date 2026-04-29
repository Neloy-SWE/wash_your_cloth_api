import { generateError } from "../utils/manager_error.js";

const validatorItem = (item, itemList, errorMessage, errorCode) => {
    if (!itemList.includes(item)) {
        generateError(errorMessage, errorCode);
    }
}

export default validatorItem;