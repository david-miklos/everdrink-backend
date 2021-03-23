import { UserDto } from "../../user/dto/user.dto";

export interface SignInStatusInterface {
  payload: Object,
  access_token: string,
  expires_in: string
}
