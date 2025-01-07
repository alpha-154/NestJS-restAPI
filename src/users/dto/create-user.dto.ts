import { IsEmail, IsNotEmpty, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsEnum(['admin', 'customer', 'user'], {
    message: 'role must be admin, customer or user',
  })
  role: 'admin' | 'customer' | 'user';
}
