import {Component, OnInit} from '@angular/core';
import {Store, Select} from '@ngxs/store';
import {AppState, IssueStateModel} from '../appState';
import {Observable} from 'rxjs';
import {withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @Select(AppState) issues$: Observable<IssueStateModel>;
  issueList = {};
  showIssueManager = false;
  constructor(private store: Store) {
  }

  requestNewUpload() {
    this.showIssueManager = false;
  }

  ngOnInit() {
    this.issues$.pipe(
      withLatestFrom(this.issues$)
    ).subscribe(([issues]) => {
      this.issueList = issues;
      if (Object.keys(issues.issues).length > 0) {
          this.showIssueManager = true;
      }
    });
  }
}
