import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const slug = createPostDto.title.split(' ').join('_').toLocaleLowerCase();
    return await this.repo.insert({ ...createPostDto, slug });
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    const post = await this.repo.findOne({ where: { id } });
    if (post) throw new BadRequestException('Not found post');
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.repo.update(id, updatePostDto);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
