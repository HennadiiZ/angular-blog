import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
// import { QuillModule } from 'ngx-quill';
// import   Delta  from 'quill';
// import diff from 'fast-diff';


@NgModule({
   imports: [
      HttpClientModule,
      // QuillModule.forRoot(),
   ],
   exports: [
      HttpClientModule,
      // QuillModule
   ]
})

export class  SharedModule{

}

