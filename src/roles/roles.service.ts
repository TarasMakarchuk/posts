import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  };

  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } });
  };

  async getRoleById(id: number) {
    return await this.roleRepository.findOne({ where: { id }, include: { all: true } });
  };

  async getAllRoles() {
    return await this.roleRepository.findAll({ include: { all: true } });
  };

  async remove(id: number) {
    const role = await this.getRoleById(id);
    if (!role) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
    }
    await this.roleRepository.destroy({ where: { id } });

    return `Success, role ${role.value} with id ${id} was deleted`;
  };
}
