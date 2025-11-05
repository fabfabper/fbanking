import { ApiClient } from "../client/ApiClient";
import { Payment, PaymentRequest } from "../types";

/**
 * Payments Service
 * Handles all payment and transfer operations
 */
export class PaymentsService {
  constructor(private client: ApiClient) {}

  /**
   * Create a new payment or transfer
   */
  async createPayment(data: PaymentRequest): Promise<Payment> {
    return this.client.post<Payment, PaymentRequest>("/payments", data);
  }

  /**
   * Get all payments for the current user
   */
  async getPayments(): Promise<Payment[]> {
    return this.client.get<Payment[]>("/payments");
  }

  /**
   * Get a specific payment by ID
   */
  async getPayment(paymentId: string): Promise<Payment> {
    return this.client.get<Payment>(`/payments/${paymentId}`);
  }

  /**
   * Cancel a pending payment
   */
  async cancelPayment(paymentId: string): Promise<Payment> {
    return this.client.post<Payment>(`/payments/${paymentId}/cancel`);
  }

  /**
   * Get scheduled payments
   */
  async getScheduledPayments(): Promise<Payment[]> {
    return this.client.get<Payment[]>("/payments/scheduled");
  }

  /**
   * Make an internal transfer between own accounts
   */
  async transferBetweenAccounts(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    description: string
  ): Promise<Payment> {
    return this.createPayment({
      fromAccountId,
      toAccountId,
      amount,
      currency: "CHF",
      category: "Transfer",
      description,
    });
  }

  /**
   * Pay a bill using IBAN
   */
  async payBill(
    fromAccountId: string,
    recipient: { name: string; iban: string; bic?: string },
    amount: number,
    description: string,
    scheduledDate?: string
  ): Promise<Payment> {
    return this.createPayment({
      fromAccountId,
      recipient,
      amount,
      currency: "CHF",
      category: "Bill Payment",
      description,
      scheduledDate,
    });
  }
}
