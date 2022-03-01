import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthereumService } from './ethereum/ethereum.service';
import { FantomService } from './fantom/fantom.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  controllers: [AppController],
  providers: [AppService, EthereumService, FantomService],
})
export class AppModule {}
