import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../../shared/container/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Matheus',
      email: 'matheus@hotmail.com',
      password: 'secret',
      password_confirmation: 'secret',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'Matheus',
      email: 'matheus@hotmail.com',
      password: 'secret',
      password_confirmation: 'secret',
    });

    expect(
      createUser.execute({
        name: 'Matheus',
        email: 'matheus@hotmail.com',
        password: 'secret',
        password_confirmation: 'secret',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user with incorrect passwords', async () => {
    expect(createUser.execute({
      name: 'Matheus',
      email: 'matheus@hotmail.com',
      password: 'secret',
      password_confirmation: 'secret01',
    })).rejects.toBeInstanceOf(AppError);
  });
});
