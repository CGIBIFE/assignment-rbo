import {Component, OnInit} from '@angular/core';
import {parseCSV} from '../../utils/parseCSV';
import {Store, Select} from '@ngxs/store';
import {LoadIssues} from '../../actions/issueManagement.actions';
import {AppState, IssueStateModel} from '../../appState';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.sass']
})
export class FileUploaderComponent implements OnInit {
  @Select(AppState) issues$: Observable<IssueStateModel>;
  errorMessage = false;
  constructor(private store: Store) {
  }

  onFileUpload = (event) => {
   const file = event.target.files[0];
    if (file.type === 'text/csv') {
      this.errorMessage = false;
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e => {
        this.store.dispatch(new LoadIssues(parseCSV(e.target['result'])));
      });
    } else {
      this.errorMessage = true;
    }
  }

  ngOnInit() {
  }

}
