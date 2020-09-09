import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
  }

  async signup(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signup(authCredentialDto);
  }

  async signin(authCredentialDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(authCredentialDto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
