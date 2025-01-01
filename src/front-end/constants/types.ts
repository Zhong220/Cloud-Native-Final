export type Transaction = {
  Name: string;
  timestamp: string;
  Payer: string;
  Debter: string[];
  Amount: number;
};

export type RootStackParamList = {
  splitbill: { newTransaction?: Transaction };
  addbill: undefined;
};
