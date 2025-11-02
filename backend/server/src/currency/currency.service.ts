import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ConvertDto } from './dto/convert.dto';

@Injectable()
export class CurrencyService {
    private readonly API_URL = 'https://api.exchangerate-api.com/v4/latest'


    constructor (private prisma: PrismaService) {}

    async convert (convertdto: ConvertDto, userId: number) {
        const { from, to, amount } = convertdto

        const res = await fetch (`${this.API_URL}/${from}`, {
            method: 'GET'
        })
        if (!res.ok) throw new Error("failed to fetch exchange rate data")
        
        const data = await res.json()

        const rate = data.rates[to]
        if(!rate) throw new Error(`Invalid currency: ${to}`);

        const convertedAmount = rate * amount


        await this.prisma.conversionHistory.create({
            data: {
            userId,
            fromCurrency: from,
            toCurrency: to,
            amount,
            rate,
            convertedAmount,
            },
        });

        return { rate, convertedAmount };
    }
}

