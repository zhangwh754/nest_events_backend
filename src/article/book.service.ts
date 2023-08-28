import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Book } from './entity/book.entity'
import { PaginationDto } from '@/app/dto'
import { paginate } from '@/app/pagination'
import { Tag } from './entity/tag.entity'
import { CreateBookDto } from './dto/create-book.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  /**
   * @description: 全部分页
   */
  public async findAll(paginationDto: PaginationDto) {
    const query = this.getBookQuery().leftJoinAndSelect('book.tags', 'tag')

    return paginate(query, paginationDto, { alias: 'book' })
  }

  /**
   * @description: 根据id查找一个
   */
  public findOne(id: number) {
    try {
      return this.getBookQuery().where(`id = :id`, { id }).getOne()
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 新增
   */
  public async create(createBookDto: CreateBookDto) {
    try {
      if (await this.findOneByName(createBookDto.name)) {
        throw new HttpException(`name:${createBookDto.name}已存在`, 400)
      }
      // const {
      //   raw: { insertId },
      // } =
      await this.getBookQuery().insert().into(Book).values(createBookDto).execute()

      return '创建成功'
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 新增标签
   */
  public async addTag(bookId: number, tagIds: number[]) {
    try {
      const existingIds = await this.tagRepository
        .createQueryBuilder('tag')
        .where('id IN (:...tagIds)', { tagIds })
        .getCount()

      if (tagIds.length !== existingIds) throw new HttpException('部分id不存在', 400)

      await this.getBookQuery().relation(Book, 'tags').of(bookId).add(tagIds)
      return '新增标签成功'
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 根据id删除
   */
  public async remove(id: number) {
    try {
      const res = await this.getBookQuery().delete().from(Book).where(`id = :id`, { id }).execute()
      if (res.affected != 0) return '删除成功'
      throw new HttpException(`id:${id}不存在`, 400)
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 根据id更新
   */
  public async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const res = await this.getBookQuery().update(Book).set(updateBookDto).where(`id = :id`, { id }).execute()
      if (res.affected != 0) return '更新成功'
      throw new HttpException(`id:${id}不存在`, 400)
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 根据name查询
   */
  private findOneByName(name: string) {
    try {
      return this.getBookQuery().where(`name = :name`, { name }).getOne()
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 创建基础查询器
   */
  private getBookQuery() {
    return this.bookRepository.createQueryBuilder('book')
  }
}
