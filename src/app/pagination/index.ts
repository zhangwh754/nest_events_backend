import { SelectQueryBuilder } from 'typeorm'

export interface Pagination {
  pageNum: number
  pageSize?: number
}

/**
 * @description: 传入Query Builder，返回分页结果
 * @param {SelectQueryBuilder} qb
 * @param {Pagination} options pageNum必传
 */
export async function paginate<T>(qb: SelectQueryBuilder<T>, options: Pagination) {
  const offset = options.pageSize * (options.pageNum - 1)

  const data = await qb.take(options.pageSize).offset(offset).orderBy('id', 'DESC').getMany()

  const total = await qb.getCount()

  return {
    pageNum: options.pageNum,
    pageSize: options.pageSize,
    total,
    data,
  }
}
