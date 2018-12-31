import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { IssueViewerComponent } from './issue-viewer/issue-viewer.component';
import { IssueFilterComponent } from './issue-filter/issue-filter.component';
import { FormsModule } from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {AppState} from '../appState';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FileUploaderComponent,
        IssueViewerComponent,
        IssueFilterComponent,
      ],
      imports: [FormsModule, NgxsModule.forRoot([
        AppState
      ])]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render all components', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Issue Manage');
    expect(compiled.querySelector('p').textContent).toContain('Upload issue log file to manage log');
    expect(compiled.querySelector('input[type="file"]')).not.toBeNull();
  });

  it('should hide file upload when issue manager is active', function () {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const instance = fixture.debugElement.componentInstance;
    instance.showIssueManager = true;
    fixture.detectChanges();
    expect(compiled.querySelector('input[type="file"]')).toBeNull();
    expect(compiled.querySelector('a').textContent).toContain('Upload different log!');
    expect(compiled.querySelector('app-issue-filter')).not.toBeNull();
    expect(compiled.querySelector('app-issue-viewer')).not.toBeNull();
  });

  it('should show file upload on clicking requestNewUpload', function () {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const instanse = fixture.componentInstance;
    instanse.requestNewUpload();
    expect(instanse.showIssueManager).toBe(false);

  });

});
