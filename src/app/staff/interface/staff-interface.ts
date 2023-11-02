export interface StaffInterface {
  _id?: string;
  createdBy?: string;
  ssn: number;
  name: string;
  jobTitle: string;
  age: number;
  salary: number;
  phone: string;
  email: string;
  gender: string;
  role?: string;
  __v?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
