import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'xk5oC@example.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane',
      email: 'xk5oC@example.com',
      role: 'admin',
    },
    {
      id: 3,
      name: 'Main',
      email: 'xk5oC@example.com',
      role: 'customer',
    },
    {
      id: 4,
      name: 'Nothing',
      email: 'xk5oC@example.com',
      role: 'user',
    },
    {
      id: 5,
      name: 'something',
      email: 'xk5oC@example.com',
      role: 'admin',
    },
  ];

  findAll(role?: 'admin' | 'customer' | 'user') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray.length) throw new NotFoundException('Users not found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users = [...this.users, newUser];
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
