import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Book } from './entity/book.entity'
import { paginate } from '@/app/pagination'
import { PaginationDto } from '@/app/dto'
import { Tag } from './entity/tag.entity'
import { CreateTagDto } from './dto/create-tag.dto'
import { UpdateBookDto } from './dto/update-book.dto'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {}

  /**
   * @description: 分页查询
   */
  public async findAll(paginationDto: PaginationDto) {
    try {
      return await paginate(this.getTagQuery(), paginationDto)
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 根据id查询
   */
  public async findOne(id: number) {
    try {
      return this.getTagQuery().where(`id = :id`, { id }).getOne()
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 创建
   */
  public async create(createTagDto: CreateTagDto) {
    try {
      if (await this.findOneByName(createTagDto.name)) {
        throw new HttpException(`name:${createTagDto.name}已存在`, 400)
      }
      await this.getTagQuery().insert().into(Tag).values(createTagDto).execute()
      return '创建成功'
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 删除
   */
  public async remove(id: number) {
    try {
      const res = await this.getTagQuery().delete().from(Tag).where(`id = :id`, { id }).execute()
      if (res.affected != 0) return '删除成功'
      throw new HttpException(`id:${id}不存在`, 400)
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 更新
   */
  public async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      if (await this.findOneByName(updateBookDto.name)) {
        throw new HttpException(`name:${updateBookDto.name}已存在`, 400)
      }
      const res = await this.getTagQuery().update(Tag).where(`id = :id`, { id }).set(updateBookDto).execute()
      if (res.affected != 0) return '更新成功'
      throw new HttpException(`id:${id}已存在`, 400)
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 根据name查询
   */
  private findOneByName(name: string) {
    try {
      return this.getTagQuery().where(`name = :name`, { name }).getOne()
    } catch (error) {
      throw error
    }
  }

  /**
   * @description: 创建基础查询器
   */
  private getTagQuery() {
    return this.tagRepository.createQueryBuilder('tag')
  }
}
