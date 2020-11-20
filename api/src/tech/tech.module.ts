import { Module } from '@nestjs/common';
import { TechService } from './tech.service';
import { TechController } from './tech.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports:[DbModule],
  controllers: [TechController],
  providers: [TechService]
})
export class TechModule {}
