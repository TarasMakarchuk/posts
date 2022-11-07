import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User creating' })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  };

  @ApiOperation({ summary: 'User updating' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Put()
  update(@Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(dto);
  };

  @ApiOperation({ summary: 'Get all users list' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  };

  @ApiOperation({ summary: 'Give the user a role' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  };

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  };

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.usersService.remove(id);
  };
}
