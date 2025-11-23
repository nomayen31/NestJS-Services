import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('product')
@UseGuards(AuthGuard, RolesGuard) // apply to all routes in this controller
export class ProductController {
  // public for any authenticated user
  @Get()
  getProducts() {
    return [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }];
  }

  // admin-only route
  @Get('admin-only')
  @Roles('admin')
  adminOnly() {
    return { secret: 'admin info' };
  }

  // manager or admin
  @Get('manage')
  @Roles('manager', 'admin')
  manage() {
    return { message: 'manager or admin' };
  }
}
