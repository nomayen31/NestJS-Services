import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Secret, SignOptions } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly config: ConfigService) {}

  signToken(payload: { id: number; name: string; roles?: string[] }) {
    const secret = this.config.get<string>('JWT_SECRET');
    const expiresInRaw = this.config.get<string>('JWT_EXPIRES_IN') || '1h';

    if (!secret) throw new Error('JWT_SECRET is not set in environment');

    let expiresInValue: SignOptions['expiresIn'];
    if (/^\d+$/.test(expiresInRaw)) {
      expiresInValue = Number(expiresInRaw);
    } else {
      expiresInValue = expiresInRaw as SignOptions['expiresIn'];
    }

    const options: SignOptions = { expiresIn: expiresInValue };

    const token = jwt.sign(
      {
        ...payload,   // includes id, name, roles
        sub: payload.id,
      },
      secret as Secret,
      options,
    );

    return { access_token: token };
  }

  verifyToken(token: string) {
    const secret = this.config.get<string>('JWT_SECRET');
    if (!secret) throw new Error('JWT_SECRET is not set');

    try {
      return jwt.verify(token, secret as Secret);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // simple in-memory validation stub; in real app, check DB and password hash
  async validateUser(username: string, password: string) {
    // sample users with roles
    if (username === 'admin' && password === 'admin') {
      return { id: 1, name: 'admin', roles: ['admin'] };
    }
    if (username === 'manager' && password === 'manager') {
      return { id: 2, name: 'manager', roles: ['manager'] };
    }
    if (username === 'user' && password === 'user') {
      return { id: 3, name: 'user', roles: ['user'] };
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // include roles in the token payload
    return this.signToken({ id: user.id, name: user.name, roles: user.roles });
  }
}
