import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserController } from './user/user.controller';


@Module({
  imports: [AuthModule, BookmarkModule],
  controllers: [UserController],
})
export class AppModule {}
