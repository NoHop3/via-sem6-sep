import { RegisteredUser } from "../../shared/models/user";

export interface SignInProps {
  signIn: (username: string, password: string) => void;
}

export interface SignUpProps {
  signUp: (user: RegisteredUser) => void;
}
