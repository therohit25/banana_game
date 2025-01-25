export interface IUserInput {
  name?: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}
