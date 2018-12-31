import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { FileUploaderComponent } from './file-uploader.component';
import {NgxsModule, Store} from '@ngxs/store';
import {AppState, IssueStateModel} from '../../appState';
import { TestStore } from '../../utils/testStore';

describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;
  let store: TestStore<IssueStateModel>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploaderComponent ],
      imports: [NgxsModule.forRoot([
        AppState
      ])],
      providers: [
        { provide: Store, useClass: TestStore }
      ]
    })
    .compileComponents();
  }));

  beforeEach((inject([Store], (testStore: TestStore<IssueStateModel>) => {
    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = testStore;
  })));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all components', function () {
     fixture = TestBed.createComponent(FileUploaderComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[type="file"]')).not.toBeNull();
  });

  it('should call file upload method on change', function () {
    spyOn(store, 'dispatch');
     fixture = TestBed.createComponent(FileUploaderComponent);
    fixture.detectChanges();
    const mockFile = new File([''], 'filename', { type: 'text/csv' });
    const mockEvt = { target: { files: [mockFile] } };
    const mockReader: FileReader = jasmine.createSpyObj('FileReader', ['readAsText', 'onload']);
    spyOn(window as any, 'FileReader').and.returnValue(mockReader);
    spyOn(component, 'onFileUpload').and.callThrough();
    component.onFileUpload(mockEvt as any);
    expect((window as any).FileReader).toHaveBeenCalled();
    expect(mockReader.readAsText).toHaveBeenCalledWith(mockFile);
    expect(component.onFileUpload).toHaveBeenCalledWith(mockEvt);

  });

  it('should show invalid file error on uploading non csv file', function () {
    fixture = TestBed.createComponent(FileUploaderComponent);
    fixture.detectChanges()
    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    spyOn(component, 'onFileUpload').and.callThrough();
    component.onFileUpload(mockEvt as any);
    fixture.detectChanges();
    expect(component.errorMessage).toBe(true);
  });
});
