import { SelectQueryBuilder } from 'typeorm'

export interface Pagination {
  pageNum: number
  pageSize?: number
}

interface Options {
  alias?: string
}

/**
 * @description: 传入Query Builder，返回分页结果
 * @param {SelectQueryBuilder} qb
 * @param {Pagination} paginationOption pageNum必传
 * @param {Options} options 配置
 */
export async function paginate<T>(
  qb: SelectQueryBuilder<T>,
  paginationOption: Pagination,
  options: Options = { alias: '' }
) {
  const offset = paginationOption.pageSize * (paginationOption.pageNum - 1)

  const orderByKey = options.alias ? `${options.alias}.id` : 'id'

  const data = await qb.take(paginationOption.pageSize).offset(offset).orderBy(orderByKey, 'DESC').getMany()

  const total = await qb.getCount()

  return {
    pageNum: paginationOption.pageNum,
    pageSize: paginationOption.pageSize,
    total,
    data,
  }
}
