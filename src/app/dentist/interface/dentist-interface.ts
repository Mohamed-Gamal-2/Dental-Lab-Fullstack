export interface DentistInterface {
  _id?: string;
  createdBy?: string;
  type: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  __v?: number;
  createdAt?: Date;
  updatedAt?: Date;
  cases: [
    {
      comments?: string;
      createdAt?: Date;
      createdBy?: string;
      deadLine?: Date;
      doctorId?: String;
      pationName?: string;
      price?: number;
      serial?: number;
      shade?: string;
      teethNumber?: string[];
      tryIn?: boolean;
      typeOfWork?: string;
      updatedAt?: Date;
      __v?: number;
      _id?: string;
    }
  ];
}
