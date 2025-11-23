import { Controller, Post, Body } from '@nestjs/common';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';

@Controller('my-name')
export class MyNameController {

  @Post('custom')
  customPost(
    @Body('name', new UppercasePipe()) name: string,
    @Body() body: any,
  ) {
    return {
      message: 'Data received successfully!',
      receivedName: name,
      fullBody: body,
    };
  }

}
