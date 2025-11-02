import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, PrismaService]
})
export class CurrencyModule {}
