import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ConvertDto } from './dto/convert.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';


@Controller('currency')
export class CurrencyController {
    constructor(private currencyService: CurrencyService) {}

    @UseGuards(JwtAuthGuard)
    @Post('convert')
    convert (@Body() convertdto:ConvertDto, @Request() req) {
        const userId = req.user.userId
        return this.currencyService.convert(convertdto, userId);
    }
}
