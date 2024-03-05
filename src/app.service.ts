import { Injectable } from '@nestjs/common';
import { Public } from 'src/decorators/skip-auth';

@Injectable()
export class AppService {
  @Public()
  get(): string {
    return 'Nothing to do here';
  }
}
