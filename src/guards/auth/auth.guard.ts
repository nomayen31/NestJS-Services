import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Expect header: Authorization: Bearer <token>
    const authHeader = request.headers['authorization'] || request.headers['Authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid Authorization header format. Expected: Bearer <token>');
    }

    const token = parts[1];

    try {
      // Use environment variable for secret, fallback to a default only for dev (avoid in production)
      const secret = process.env.JWT_SECRET || 'change_this_secret_in_production';

      // verify returns the decoded payload if valid
      const payload = jwt.verify(token, secret);

      // Attach user info (payload) to request for controllers to use
      request.user = payload;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
