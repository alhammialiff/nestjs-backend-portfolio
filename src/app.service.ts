import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerSignal(): string {
    return 'Server is running on port 3000';
  }
}
