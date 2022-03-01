import { ApiProperty } from '@nestjs/swagger';

export enum Coin {
  ETH = 'ETH',
  FTM = 'FTM',
}
export class CreateTransaction {
  @ApiProperty()
  fromCoin: Coin;
  @ApiProperty()
  toCoin: Coin;
  @ApiProperty()
  fromAddress: string;
  @ApiProperty()
  toAddress: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  hash: string;
  @ApiProperty()
  signature: any;
}
