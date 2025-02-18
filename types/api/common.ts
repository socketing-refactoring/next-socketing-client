export interface ApiErrorResponse {
  code: number;
  message: string;
  errors?: [
    {
      field: string;
      value: string;
      reason: string;
    },
  ];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}
