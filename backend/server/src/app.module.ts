import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminModule } from './admin/admin.module';
import { CurrencyModule } from './currency/currency.module';
import { VtpassModule } from './vtpass/vtpass.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PinModule } from './pin/pin.module';



@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true
  }), AuthModule, UsersModule, AdminAuthModule, AdminModule, CurrencyModule, VtpassModule, TransactionsModule, PinModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
