import { Post } from '../models/post';
export interface User {
    //id: number;
    _id: string;
    name: {
      first_name: string,
      middle_name:string,
      last_name:string,
    },
    email:string,
    phone_number:string,
    gender:string,
    posts: Post[]
  }