// import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VtpassService {
//   private readonly baseUrl = process.env.VTPASS_BASE_URL || 'https://sandbox.vtpass.com/api';
//   private readonly username = process.env.VTPASS_USERNAME;
//   private readonly password = process.env.VTPASS_PASSWORD;
//   private readonly secretKey = process.env.VTPASS_SECRET_KEY;

    private base = process.env.VTPASS_BASE_URL || 'https://sandbox.vtpass.com/api';
    private authHeader: string


    constructor(
        // private http: HttpService,
        private prisma: PrismaService
    ) {}
}
