import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
  }

  async signup(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signup(authCredentialDto);
  }

  async signin(authCredentialDto: AuthCredentialsDto): Promise<void> {
    const username = await this.userRepository.validateUserPassword(authCredentialDto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
