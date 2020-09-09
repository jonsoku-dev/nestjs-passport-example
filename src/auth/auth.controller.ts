import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './auth.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {
  }

  @Post('/signup')
  signup(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signup(authCredentialDto);
  }

  @Post('/signin')
  signin(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }


}
