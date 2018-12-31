import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { IssueFilterComponent } from './issue-filter.component';
import {FormsModule} from '@angular/forms';
import {NgxsModule, Store} from '@ngxs/store';
import {AppState, IssueStateModel} from '../../appState';
import { TestStore } from '../../utils/testStore';
import { LessThan, GreaterThan } from '../../actions/issueManagement.actions';

describe('IssueFilterComponent', () => {
  let component: IssueFilterComponent;
  let fixture: ComponentFixture<IssueFilterComponent>;
  let store: TestStore<IssueStateModel>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueFilterComponent ],
      imports: [FormsModule, NgxsModule.forRoot([
        AppState
      ])],
      providers: [
        { provide: Store, useClass: TestStore }
      ]
    })
    .compileComponents();
  }));

  beforeEach((inject([Store], (testStore: TestStore<IssueStateModel>) => {
    fixture = TestBed.createComponent(IssueFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = testStore;
  })));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all components', () => {
    fixture = TestBed.createComponent(IssueFilterComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('Filter data based on issue count:');
    expect(compiled.querySelector('select')).not.toBeNull();
    expect(compiled.querySelector('button')).not.toBeNull();
  });

  it('should dispatch action to filter issue', () => {
    spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(IssueFilterComponent);
    fixture.detectChanges();
    const instance = fixture.componentInstance;
    instance.selectedFilter = 'lessThan';
    instance.filterIssues();
    expect(store.dispatch).toHaveBeenCalledWith(new LessThan(instance.count ));
    instance.selectedFilter = 'greaterThan';
    instance.filterIssues();
    expect(store.dispatch).toHaveBeenCalledWith(new GreaterThan(instance.count ));
  });

  it('should set selected filter option on selecting ', function () {
    fixture = TestBed.createComponent(IssueFilterComponent);
    fixture.detectChanges();
    const instance = fixture.componentInstance;
    const evt = {target: {
      value: 'test'
      }};
    instance.onFilterChange(evt);
    expect(instance.selectedFilter).toBe('test');
  });
});
