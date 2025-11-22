import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';


@Module({
  imports: [AuthModule, BookmarkModule, EmployeeModule],
  controllers: [UserController, ProductController],
  providers: [ProductService],
})
export class AppModule {}
