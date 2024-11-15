import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import CreateUsers from './users.seed';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    const userSeeders = new CreateUsers();
    await userSeeders.run(this.dataSource);
  }
}
