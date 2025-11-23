import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';   // <-- import ConfigModule
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { EmployeeModule } from './employee/employee.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { CustomerModule } from './customer/customer.module';
import { MyNameController } from './my-name/my-name.controller';

@Module({
  imports: [
    // Load .env file globally → Now process.env.JWT_SECRET will work everywhere
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    BookmarkModule,
    EmployeeModule,
    CategoryModule,
    StudentModule,
    CustomerModule,
  ],
  controllers: [UserController, ProductController, MyNameController],
  providers: [ProductService],
})
export class AppModule {}
