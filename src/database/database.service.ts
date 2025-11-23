import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  private connected = false;

  onModuleInit() {
    console.log('DatabaseService initialized…');
    this.connect();
  }

  connect() {
    this.connected = true;
    console.log('Database connected successfully!');
  }

  onApplicationShutdown(signal?: string) {
    console.log('Application shutting down… signal:', signal);
    this.disconnect();
  }

  disconnect() {
    this.connected = false;
    console.log('Database disconnected!');
  }

  // 🔥 THIS METHOD WAS MISSING
  isConnected() {
    return this.connected;
  }
}
