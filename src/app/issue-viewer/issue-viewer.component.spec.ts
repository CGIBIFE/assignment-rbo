import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { IssueViewerComponent } from './issue-viewer.component';
import {NgxsModule, Store} from '@ngxs/store';
import {AppState, IssueStateModel} from '../../appState';
import { TestStore } from '../../utils/testStore';
import {HighToLow, LowToHigh} from '../../actions/issueManagement.actions';

describe('IssueViewerComponent', () => {
  let component: IssueViewerComponent;
  let fixture: ComponentFixture<IssueViewerComponent>;
  let store: TestStore<IssueStateModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueViewerComponent ],
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
    fixture = TestBed.createComponent(IssueViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = testStore;
  })));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all componenr', function () {
    fixture = TestBed.createComponent(IssueViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('table')).not.toBeNull();
    component.head = ['head1', 'head2'];
    component.body = [ {'head1': 'some item', 'head2': 'some item'} ];
    fixture.detectChanges();
    expect(compiled.querySelectorAll('th').length).toEqual(2);
    expect(compiled.querySelectorAll('td').length).toEqual(2);
  });

  it('should dispatch actions on sorting is clicked', () => {
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(IssueViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.onFilterChange('lowToHigh');
    expect(store.dispatch).toHaveBeenCalledWith(new LowToHigh());
    component.onFilterChange('highToLow');
    expect(store.dispatch).toHaveBeenCalledWith(new HighToLow());
  })
});
