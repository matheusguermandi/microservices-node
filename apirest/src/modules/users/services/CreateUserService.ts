import { inject, injectable } from 'tsyringe';

import Users from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IUsersDTO from '@modules/users/dtos/IUsersDTO';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({
    name,
    email,
    password,
    password_confirmation,
  }: IUsersDTO): Promise<Users> {
    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError('Email address already used.');
    }

    if (password !== password_confirmation) {
      throw new AppError('Password and confirmation password do not match.');
    }

    const hashedPassword = await this.hashProvider.generateHash(String(password));

    const users = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return users;
  }
}

export default CreateUserService;