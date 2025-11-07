// dto/list-services.dto.ts
export class ListServicesDto {
  // maybe none required for simple GET
}

// dto/variation-codes.dto.ts
export class VariationCodesDto {
  serviceID: string;
}

// dto/purchase-service.dto.ts
export class PurchaseServiceDto {
  requestId: string;
  serviceID: string;
  billersCode: string;      // e.g., phone number or smartcard
  variation_code: string;
  amount?: number;          // optional: if user selects variation with fixed price, you might omit
  phone?: string;           // some services require recipient phone
}

// dto/requery-transaction.dto.ts
export class RequeryTransactionDto {
  request_id: string;
}
