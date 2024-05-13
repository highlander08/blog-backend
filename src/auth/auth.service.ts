import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserLoginDto } from './user-login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: UserLoginDto) {
    const user = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: loginDto.email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Bad credentials');
    } else {
      if (await this.verifyPassword(loginDto.password, user.password)) {
        const token = await this.jwtService.signAsync({
          email: user.email,
          id: user.id,
        });
        delete user.password;
        return { token, user };
      } else {
        throw new UnauthorizedException('Bad credentials');
      }
    }
  }
  async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const checkForUser = await this.repo.findOne({ where: { email: email } });
    if (checkForUser) {
      throw new BadRequestException('Email is already');
    } else {
      const user = new User();
      Object.assign(user, createUserDto);
      this.repo.create(user);
      await this.repo.save(user);
      delete user.password;
      return user;
    }
  }
}
