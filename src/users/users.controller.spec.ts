import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    createUser: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    updateUser: jest.fn().mockImplementation(dto => ({
      ...dto
    })),
    getAll: jest.fn(),
    addRole: jest.fn(),
    ban: jest.fn(),
    remove: jest.fn(),
  };

  const mockJwtService = {
    canActivate: jest.fn(),
  };

  const userDto = {
    firstName: "User",
    lastName: "User",
    email: "user@gmail.com",
    password: "111"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('should create a user ', () => {
    expect(controller.create(userDto)).toEqual({
      id: expect.any(Number),
      firstName: userDto.firstName,
      lastName: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
    });

    expect(mockUsersService.createUser).toHaveBeenCalledWith(userDto);
  });

  it('should update a user ', () => {
    const dto = {
      userId: 1,
      firstName: 'User1',
    };

    expect(controller.update(dto)).toEqual(dto)
    expect(mockUsersService.updateUser).toHaveBeenCalled();
  });


});
