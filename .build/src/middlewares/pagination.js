"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
function paginate(items, currentLimit, currentPage) {
    const page = currentPage || 1;
    const limit = currentLimit || 10;
    const offset = (page - 1) * limit;
    const paginatedItems = items.slice(offset).slice(0, limit);
    const totalPages = Math.ceil(items.length / limit);
    return {
        page: page,
        limit: limit,
        previousPage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        totalItems: items.length,
        totalPages: totalPages,
        data: paginatedItems
    };
}
exports.paginate = paginate;
