import { Module } from '@nestjs/common';
import { VtpassController } from './vtpass.controller';
import { VtpassService } from './vtpass.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VtpassController],
  providers: [VtpassService, PrismaService]
})
export class VtpassModule {}
