import { generateError } from "./manager_error.js";

export const getPagination = (query = {}) => {
    const currentPage = query.currentPage === undefined
        ? 0
        : Number(query.currentPage);
    const pageSize = query.pageSize === undefined
        ? 15
        : Number(query.pageSize);
    const search = typeof query.search === "string" ? query.search.trim() : "";

    if (!Number.isSafeInteger(currentPage) || currentPage < 0
        || !Number.isSafeInteger(pageSize) || pageSize < 1 || pageSize > 100
        || !Number.isSafeInteger(currentPage * pageSize)
        || (query.search !== undefined && typeof query.search !== "string")
        || search.length > 100) {
        generateError("Invalid list query", 400);
    }

    return {
        currentPage,
        pageSize,
        limit: pageSize,
        offset: currentPage * pageSize,
        search,
        searchPattern: `%${search.replace(/[\\%_]/g, "\\$&")}%`,
    };
};

export const getPaginatedResult = ({
    currentPage,
    pageSize,
    totalItem,
    items,
}) => ({
    currentPage,
    pageSize,
    totalItem,
    items,
});
