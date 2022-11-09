import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../src/users/user.model';
import { RolesModule } from '../src/roles/roles.module';
import { UsersService } from '../src/users/users.service';
import { RolesService } from '../src/roles/roles.service';
import { Role } from '../src/roles/roles.model';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockUsers = [{ id: 1, firstName: 'test', lastName: 'test', password: 'test' }];

  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    create: jest.fn().mockImplementation(user => Promise.resolve({
      id: Date.now(),
      ...user,
      roles: {
        id: 2,
        value: "USER",
        description: "User",
        UserRoles: {
          id: 1,
          roleId: 2,
          userId: 9,
        }
      },
    })),
  };

  const  mockRolesRepository = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        RolesModule
      ],
      providers: [
        UsersService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getModelToken(Role),
          useValue: mockRolesRepository,
        }],
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect('Content-type', /json/)
      .expect(200)
      .expect(mockUsers);
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ firstName: 345 })
      .expect(201)
      .expect('Content-type', /json/)
      .then(response => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          firstName: 'test',
        });
      })
  });

  it('/users (POST) --> 400 on validation error', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ firstName: 'test' })
      .expect('Content-type', /json/)
      .expect(400);
  });

});
