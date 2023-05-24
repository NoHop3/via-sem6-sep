export interface RegisteredUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  year?: number;
}

export interface User extends RegisteredUser {
  id: string;
  loggedUser: RegisteredUser;
  token: string;
}
