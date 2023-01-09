import { Injectable } from '@nestjs/common';
import { User } from './dto/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async saveUser(
    email: string,
    pwd: string,
    name: string,
    basketOwner: boolean,
  ): Promise<void> {
    const createdUser = this.userRepository.create({
      email,
      pwd,
      name,
      basketOwner,
    });

    try {
      await this.userRepository.save(createdUser);
    } catch (e) {
      throw Error(e);
    }
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.createQueryBuilder('user').getMany();
  }
}
