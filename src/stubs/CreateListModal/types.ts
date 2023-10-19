export type CreateListFormState = {
  name: string;
  description: string;
};

export type CreateListResponse = {
  success: boolean;
  status_code: number;
  status_message: string;
  list_id: number;
  failure?: boolean;
  error?: string;
};
