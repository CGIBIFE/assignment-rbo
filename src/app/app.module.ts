import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import {AppState} from '../appState';
import { AppComponent } from './app.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { IssueViewerComponent } from './issue-viewer/issue-viewer.component';
import { IssueFilterComponent } from './issue-filter/issue-filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    IssueViewerComponent,
    IssueFilterComponent,
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      AppState
    ]),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
