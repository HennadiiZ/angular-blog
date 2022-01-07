import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/post.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  pSub!: Subscription
  // constructor(private auth: AuthService) { }
  constructor(private postsService: PostService) { }

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts=>{
         this.posts = posts;
    })
  }


  // test(){
  //   console.log(this.auth.token)
  // }

  remove(id: any){

  }

  ngOnDestroy(){
    if(this.pSub){
        this.pSub.unsubscribe()
    }
  }



}
