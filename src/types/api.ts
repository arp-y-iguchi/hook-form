type responseAddress = {
  address1: string;
  address2: string;
  address3: string;
  zipCode: string;
};

export type response = {
  status: number;
  message: string;
  results: responseAddress[] | null;
};
