export class PaginationController {
  static getPagination(page: number, size: number) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  }

  static getPagingData(data: any, page: number, limit: number) {
    const { count: totalItems, rows } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, rows, totalPages, currentPage };
  }
}
