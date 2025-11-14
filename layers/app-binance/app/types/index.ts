export enum TRANSACTION_TYPE {
  DEPOSIT = "deposit",
  SPEND = "spend",
  CONVERT = "convert",
}

export interface CoinTransaction {
  id: string;
  type: TRANSACTION_TYPE;
  amount: number;
  reason?: string;
  meta?: Record<string, any>; // chi tiết thêm như tỉ lệ, old/new balance
  createdAt: number;
}
