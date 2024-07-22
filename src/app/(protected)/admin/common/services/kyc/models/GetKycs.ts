// params
export interface IGetKycsParams {
  page: number;
  perPage: number;
  status: KycStatus
  username: string;
}

// response
export interface IGetKycsResponse {
  success: boolean;
  message: string;
  data:    IGetKycsResponseData;
}

export interface IGetKycsResponseData {
  kycs:       Kyc[];
  pagination: Pagination;
}

export interface Kyc {
  _id:                string;
  userId:             string;
  BVN:                string;
  docType:            string;
  docImg:             string;
  selfieImg:          string;
  verificationStatus: string;
  createdAt:          string;
  updatedAt:          string;
  __v:                number;
  remark?:            string;
  user:               User;
  id:                 string;
}

export interface User {
  _id:               string;
  userType:          string;
  email:             string;
  interests:         string[];
  referrer:          string;
  isAdmin:           boolean;
  isEmailVerified:   boolean;
  isDeleted:         boolean;
  fullName?:         string;
  gender?:           string;
  organizationName?: string;
  organizationId?:   string;
}

export interface Pagination {
  total:       number;
  perPage:     number;
  currentPage: number;
  totalPages:  number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export enum KycStatus {
  Pending = 'pending',
  Rejected = 'rejected',
  Completed = 'completed',
}