import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from "./user.model";
import { getModelToken } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { Role } from "../roles/roles.model";

describe('UsersService', () => {
  let service: UsersService;
  let roleService: RolesService;

  const mockUsersRepository = {
    findOne: jest.fn().mockImplementation((email) => null),
    $set: jest.fn().mockImplementation(() => ''),
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

  const mockRoleRepository = {
    findOne: jest.fn().mockImplementation(role => role),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getModelToken(Role),
          useValue: mockRoleRepository,
        }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    roleService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(roleService).toBeDefined();
  });

  it('should create a new user record and return it', async () => {
    const dto = { firstName: 'Test', lastName: 'Test', email: 'test', password: 'test' }
    expect(await service.createUser(dto)).toEqual({
      id: expect.any(Number),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      roles: {
        id: expect.any(Number),
        value: "USER",
        description: expect.any(String),
        UserRoles: {
          id: expect.any(Number),
          roleId: expect.any(Number),
          userId: expect.any(Number),
        }
      }
    });
  });
});
