import db from "../../../model/index_model.js";

const { User } = db;

const createUser = async (req, res) => {
    const { firstName, lastName, address, phone, longitude, latitude, password } = req.body;

    User.create({
        firstName,
        lastName,
        address,
        phone,
        longitude,
        latitude,
        password,
    })
    .then((user) => {
        res.status(201).json(user);
    })
    .catch((error) => {
        res.status(400).json({ error: error.message });
    });
}

export { createUser };