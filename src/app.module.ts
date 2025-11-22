import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';


@Module({
  imports: [AuthModule, BookmarkModule],
  controllers: [UserController, ProductController],
  providers: [ProductService],
})
export class AppModule {}
