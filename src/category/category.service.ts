import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    Object.assign(category, createCategoryDto);
    this.repo.create(category);
    return await this.repo.save(category);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    return await this.repo.findOne({ where: { id } });
  }
  

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.repo.findOne({ where: { id } });
    if (category) throw new BadRequestException('Not found category');
    Object.assign(category, updateCategoryDto);
    return await this.repo.save(updateCategoryDto);
  }

  async remove(id: string, res: Response) {
    const category = await this.repo.findOne({ where: { id } });
    if (category) throw new BadRequestException('Not found category');
    try {
      await this.repo.remove(category);
      return res.status(200).json({ success: true, category: category });
    } catch (error) {
      throw new BadRequestException('Operation failed');
    }
  }
}
