export interface IkycResponse {
  kycs: Kyc[];
  pagination: Pagination;
}

export interface Kyc {
  _id: string;
  userId: string;
  BVN: string;
  docType: string;
  docImg: string;
  selfieImg: string;
  verificationStatus: KycStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reason?: string;
  status?: KycStatus;
}

export interface Pagination {
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type KycStatus = "completed" | "rejected" | "pending"