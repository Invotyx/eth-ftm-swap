import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateTransaction } from './dto/createTransaction.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createTransaction(@Body() createTransaction: CreateTransaction) {
    return this.appService.createTransaction(createTransaction);
  }
}
