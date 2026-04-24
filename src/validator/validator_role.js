const validatorRole = (value) => {
    const validRoles  = ["user", "shop"];
    if (!validRoles.includes(value)) {
        throw new Error("Invalid role. Role must be either 'user' or 'shop'.");
    }
}

export default validatorRole;