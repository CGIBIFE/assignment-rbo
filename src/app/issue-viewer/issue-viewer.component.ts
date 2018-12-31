import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store, Select} from '@ngxs/store';
import { LowToHigh, HighToLow  } from '../../actions/issueManagement.actions';

@Component({
  selector: 'app-issue-viewer',
  templateUrl: './issue-viewer.component.html',
  styleUrls: ['./issue-viewer.component.sass']
})
export class IssueViewerComponent implements OnInit, OnChanges {
  head: string[];
  body: any[];
  @Input() issues: Observable<object>;
  constructor(private store: Store) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    const {head, body} = changes.issues.currentValue.issues;
    this.head = head;
    this.body = body;
  }

  onFilterChange(event) {
    switch (event) {
      case 'lowToHigh':
        this.store.dispatch(new LowToHigh())
        break;
      case 'highToLow':
        this.store.dispatch(new HighToLow())
        break;
    }
  }

}

