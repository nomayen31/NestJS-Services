import { Controller, Get } from '@nestjs/common';

@Controller('user') // Controller Decorator
export class UserController {
    @Get()
    getUser(){
        return 'User data Fatch !!!!!'
    }
}
