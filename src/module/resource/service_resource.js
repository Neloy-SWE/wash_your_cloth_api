import db from "../../model/index_model.js";

export const serviceResourceServiceList = async () => {
    try {
        const serviceList = await db.Service.findAll();

        return serviceList;

    } catch (error) {
        // console.log("service error", error);
        throw error;
    }
}