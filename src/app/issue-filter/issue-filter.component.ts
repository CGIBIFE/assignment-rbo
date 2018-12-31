import {Component, Input, OnInit} from '@angular/core';
import {Store, Select} from '@ngxs/store';
import { LessThan, GreaterThan  } from '../../actions/issueManagement.actions';

@Component({
  selector: 'app-issue-filter',
  templateUrl: './issue-filter.component.html',
  styleUrls: ['./issue-filter.component.sass']
})
export class IssueFilterComponent implements OnInit {
  selectedFilter: string;
  count: number;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onFilterChange(event) {
    this.selectedFilter = event.target.value;
  }

  filterIssues() {
   if (this.selectedFilter === 'lessThan') {
     this.store.dispatch(new LessThan(this.count));
   } else if (this.selectedFilter === 'greaterThan') {
     this.store.dispatch(new GreaterThan(this.count));
   }
  }

}
