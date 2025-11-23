import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

@Get('status')
getStatus() {
  const isConnected = this.databaseService.isConnected();

  return {
    connected: isConnected,
    message: isConnected ? 'Database is connected' : 'Database is NOT connected',
  };
}

}
