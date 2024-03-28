import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule, NgIf, UpperCasePipe} from '@angular/common';
import { Post } from '../models/post';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';import { UserDetailsComponent } from '../user-details/user-details.component';
;

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
  imports: [ NgIf, UpperCasePipe, CommonModule,PostDetailsComponent, ReactiveFormsModule],
  standalone: true,
})
export class PostDetailsComponent {
  posts: Post[] = [];
  @Input() user?: User;
  @Input() selectedUser?: Boolean;
  @Output() goBack = new EventEmitter<void>();
  @Output() postUpdated = new EventEmitter<Post>();
  @Output() deselect = new EventEmitter<void>();
  selectedPost?: Post ;
  userUpdated?: User;
  showAddUserForm: boolean = false;
  isPostSelected: boolean = false;
  


  editPostForm: FormGroup;


  /* editPost: Post=   {  '_id': '',
 
 'title':'',
 'author':'',
 'content':''
 
}; */
constructor(public userService: UserService, private formBuilder: FormBuilder) {
  this.editPostForm = this.formBuilder.group({
    
    _id: ['', [Validators.required]],
    title: ['', [Validators.required]],
    author: ['', [Validators.required]],
    content: ['', [Validators.required]]
  });

  // Comprobar si hay un usuario recibido como entrada y actualizar el formulario si es necesario
}






  ngOnInit() {
    if (this.user) {
      this.updateFormWithPostData(this.user);
    }   
  }
  updateFormWithPostData(user:User){
    this.userService.getPosts(user._id).subscribe (posts =>{
      this.posts = posts;
      console.log(posts);})
      
      console.log("estas dentro machote:"+user._id)
      /* this.post =   {
        '_id': this.editUser?._id!,
      'name': {
       'first_name': this.editUser?.name.first_name!,
       'middle_name': this.editUser?.name.middle_name!,
       'last_name': this.editUser?.name.last_name!,
     },
     'email':this.editUser?.email!,
     'phone_number':this.editUser?.phone_number!,
     'gender': this.editUser?.gender! ,
     'posts': this.editUser?.posts!
    } 
      this.userUpdated.emit(this.editUser);
    }); */
  }
  update: boolean= false;
  updateEdit(state: boolean) {
    this.update = state;
    console.log("Cambio modo edición/lectura", this.update);
  }
  

  updatePost() {

    const formData = this.editPostForm.value;
    this.selectedPost = {
     // Usamos el _id del usuario actual
      _id:formData._id,
      title: formData.title,
      author: formData.author,
      content: formData.content
    }; 
    

     this.userService.postPost(this.selectedPost).subscribe (selectedPost =>{
      this.selectedPost =   {
        '_id': this.selectedPost?._id!,
      
     'title':this.selectedPost?.title!,
     'content':this.selectedPost?.content!,
     'author': this.selectedPost?.author! 
     
    } 
      
    });
  }
  deletePost() {

    const formData = this.editPostForm.value;
    this.selectedPost = {
     // Usamos el _id del usuario actual
      _id:formData._id,
      title: formData.title,
      author: formData.author,
      content: formData.content
    }; 
    

     this.userService.deletePost(this.selectedPost).subscribe ((res: any) => {
      
    });
     
    
  }
  

  onSelect(post: Post){
    this.isPostSelected=true;
    this.selectedPost = post;
    console.log(this.selectedPost)
     /* this.editUser = user;
    this.userSelected.emit(true);
    
     this.userService.postUsers(this.editUser).subscribe((res: any) => {
      console.log("Usuario añadido!!!", res.post);
      PostDetailsComponent.posts.push(res.post);
      
    }); */
  }
   editPost(){}
   
}