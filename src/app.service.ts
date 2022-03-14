import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTransaction } from './dto/createTransaction.dto';
import { EthereumService } from './ethereum/ethereum.service';
import { FantomService } from './fantom/fantom.service';
// import { Address } from '@emurgo/cardano-serialization-lib-nodejs';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly ethereumService: EthereumService,
    private readonly fantomService: FantomService,
  ) {}

  async createTransaction(createTransaction: CreateTransaction) {
    console.log('REQUEST BODY', createTransaction);
    const {
      fromCoin,
      toCoin,
      fromAddress,
      toAddress,
      amount,
      hash,
      signature,
    } = createTransaction;

    const message = `${fromCoin} ${toCoin} ${toAddress} ${amount} ${hash}`;
    //FROM COIN Ethereum
    const isVerified = await this.ethereumService.verifySigner(
      message,
      signature,
      fromAddress,
    );

    console.log('isVerified', isVerified);

    if (!isVerified) {
      throw new BadRequestException('Signature is not valid');
    }

    const toAmount = await this.getToAmount(fromCoin, toCoin, amount);

    console.log('TO AMOUNT', toAmount);
    //TO COIN FANTOM
    return this.fantomService.transfer(toAddress, toAmount);
  }

  private async getToAmount(fromCoin, toCoin, fromAmount) {
    console.log('CONVERSION', fromCoin, toCoin, fromAmount);

    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fromCoin}&tsyms=${toCoin}&api_key=2bddccf182603a175db12737859bf41e4d9b0f341d8e3151e0433e434a910d16`,
      ),
    );
    return data.RAW[fromCoin][toCoin].PRICE * fromAmount;
  }
}
