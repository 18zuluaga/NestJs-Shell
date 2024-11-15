import {
  Injectable,
  NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
      const user: User = await this.usersService.findByEmail(email);
      const isMatch = await bcrypt.compare(pass, user?.password);
      if (!isMatch) {
        throw new NotFoundException(
          'User not found, Verify your credentials or contact your administrator to register'
        );
      }
      delete user.password;
      return user;
  }

  async register(CreateUserDto: CreateUserDto){
    const user = await this.usersService.findByEmail(CreateUserDto.email);
    if (user) {
      throw new NotFoundException('User already exists');
    }
    const password = await bcrypt.hash(CreateUserDto.password, 10);
    return this.usersService.create({...CreateUserDto, password});
  }

  async login(user: Partial<User>) {
    try {
      const verifiedUser = await this.validateUser(
        user.email,
        user.password
      );

      const payload = {
        id: verifiedUser.id,
        doc_number: verifiedUser.doc_number,
        name: verifiedUser.name,
        email: verifiedUser.email,
        personnelType: verifiedUser.personnel_type,
        role: verifiedUser.role,
      };
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
