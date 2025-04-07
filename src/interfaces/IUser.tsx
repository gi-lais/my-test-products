export interface IUser {
    id?: string;
    name: string;
    surname: string;
    cpf: string;
    email: string;
    password: string;
    gender: string;
    birthdate: string;
    address: {
      cep: string;
      city: string;
      state: string;
      street: string;
      district: string;
      complement?: string;
    };
}      