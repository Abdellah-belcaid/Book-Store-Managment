import { Role } from "./role.enum";
export class User {
  id: number | undefined;
  name: string = '';
  email: string = '';
  Image_Path: string = '';
  imageData: string = '';
  username: string = '';
  password: string = '';
  token: string = '';
  createTime :Date;
  role: Role = Role.USER;
}



