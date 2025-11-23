import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Secret, SignOptions } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly config: ConfigService) {}

  signToken(payload: { id: number; name: string }) {
    const secret = this.config.get<string>('JWT_SECRET');
    const expiresInRaw = this.config.get<string>('JWT_EXPIRES_IN') || '1h';

    if (!secret) {
      throw new Error('JWT_SECRET is not set in environment');
    }

    // Normalize expiresIn into correct union type
    let expiresInValue: SignOptions['expiresIn'];

    // If it's only digits (e.g. "3600"), convert to number
    if (/^\d+$/.test(expiresInRaw)) {
      expiresInValue = Number(expiresInRaw);
    } else {
      // Otherwise treat as duration string (e.g. "1h")
      expiresInValue = expiresInRaw as SignOptions['expiresIn'];
    }

    const options: SignOptions = {
      expiresIn: expiresInValue,
    };

    const token = jwt.sign(
      {
        ...payload, // id, name
        sub: payload.id,
      },
      secret as Secret,
      options,
    );

    return { access_token: token };
  }

  verifyToken(token: string) {
    const secret = this.config.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET is not set');
    }

    try {
      return jwt.verify(token, secret as Secret);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async validateUser(username: string, password: string) {
    // Temporary validation (replace with DB logic later)
    if (username === 'demo' && password === 'demo') {
      return { id: 1, name: 'demo' };
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(user);
  }
}
