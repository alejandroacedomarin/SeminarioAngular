import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  getUsers() {
    return this.http.get<User[]>('http://127.0.0.1:3000/user');
  }

  postUsers(newUser : User |undefined) {
    return this.http.post('http://127.0.0.1:3000/user', newUser);
  }
  getPosts(editUser : String ) {
    return this.http.get<Post[]>('http://127.0.0.1:3000/postsuser/'+ editUser);
  }
  postPost(post : Post ) {
    return this.http.post('http://127.0.0.1:3000/post', post);
  }
  deletePost(post: Post ) {
    return this.http.delete('http://127.0.0.1:3000/post/'+post._id);
  }
  
  updateUser(editUser : User) {
    return this.http.put('http://127.0.0.1:3000/user/'+ editUser._id,editUser);
  }
}
