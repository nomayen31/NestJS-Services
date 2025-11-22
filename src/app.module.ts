import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [AuthModule, BookmarkModule, EmployeeModule, CategoryModule],
  controllers: [UserController, ProductController],
  providers: [ProductService],
})
export class AppModule {}
