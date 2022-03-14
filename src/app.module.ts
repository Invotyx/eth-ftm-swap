import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthereumService } from './ethereum/ethereum.service';
import { FantomService } from './fantom/fantom.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/client'),
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, EthereumService, FantomService],
})
export class AppModule {}
