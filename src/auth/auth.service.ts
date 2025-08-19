import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PersonService } from '../person/person.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => PersonService))
    private readonly personService: PersonService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.personService.findOneByEmail(email);

    if (
      user &&
      (await bcrypt.compare(password, user.password)) &&
      user.status
    ) {
      return user;
    }

    return null;
  }

  async getUserDetails(userId: number): Promise<any> {
    const user = await this.personService.findOneWithFarm(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async canUserRemoveInstrument(userToken: string): Promise<boolean> {
    const decodedToken = this.jwtService.decode(userToken) as any;

    if (!decodedToken || !decodedToken.sub) {
      throw new UnauthorizedException('Invalid token.');
    }

    const user = await this.getUserDetails(decodedToken.sub);

    if (user && user.person_type === 'Administrator') {
      return true;
    }
    return false;
  }
}
