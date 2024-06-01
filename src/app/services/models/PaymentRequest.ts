export class PaymentRequest {
  cardNumber ?: string;
  cardHolderName ?: string;
  expirationDate ?: string;
  cvv ?: string;
  amount ?: number;
  currency ?: string;
  billingAddress ?: string;
}
