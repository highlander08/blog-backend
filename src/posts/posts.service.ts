import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    // const slug = createPostDto.title.split(' ').join('_').toLocaleLowerCase();
    const post = new Post();
    post.userId = user.id;
    Object.assign(post, createPostDto);
    this.repo.create(post);
    return await this.repo.save(post);
  }

  async findAll(query?: string) {
    const myQuery = this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.user', 'user');

    if (!(Object.keys(query).length === 0) && query.constructor === Object) {
      const queryKeys = Object.keys(query);

      // check if key title is present in query
      if (queryKeys.includes('title')) {
        myQuery.where('post.title LIKE :title', {
          title: `%${query['title']}%`,
        });
      }
      // check if key sort is present in query
      if (queryKeys.includes('sort')) {
        myQuery.orderBy('post.title', query['sort'].toUpperCase());
      }
      // check if key category is present in query
      if (queryKeys.includes('category')) {
        myQuery.andWhere('category.title = :cat', { cat: query['category'] });
      }
      return myQuery.getMany();
    } else {
      return myQuery.getMany();
    }
  }

  async findOne(id: string) {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) throw new BadRequestException('Not found post');
    return post;
  }

  async findBySlug(slug: string) {
    try {
      const post = await this.repo.findOneOrFail({ where: { slug } });
      return post;
    } catch (error) {
      throw new BadRequestException(`Post ${slug} not found`);
    }
  }

  async update(slug: string, updatePostDto: UpdatePostDto) {
    const post = await this.repo.findOne({ where: { slug } });
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    post.modifiedOn = new Date(Date.now());
    post.category = updatePostDto.category;
    Object.assign(post, updatePostDto);
    return this.repo.save(post);
  }

  async remove(id: string) {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    await this.repo.remove(post);
    return { success: true, post };
  }
}
