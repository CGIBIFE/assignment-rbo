import { State, Action, StateContext } from '@ngxs/store';
import { LoadIssues, LowToHigh, HighToLow, LessThan, GreaterThan } from './actions/issueManagement.actions';

​

export interface IssueStateModel {
  issues: object;
  issuesBackup: object;
}

@State<IssueStateModel>({
  name: 'issues',
  defaults: {
    issues: {},
    issuesBackup: {}
  }
})

export class AppState {
  @Action(LoadIssues)
  loadIssues(ctx: StateContext<IssueStateModel>, action: LoadIssues) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      issues: action.data,
      issuesBackup: action.data,
    });
  }

  @Action(LowToHigh)
  lowToHigh(ctx: StateContext<IssueStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      issues: {head: state.issues['head'], body: state.issues['body'].sort((a, b) => a['Issue count'] - b['Issue count'])}
    });
  }

  @Action(HighToLow)
  highToLow(ctx: StateContext<IssueStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      issues: {head: state.issues['head'], body: state.issues['body'].sort((a, b) => b['Issue count'] - a['Issue count'])}
    });
  }

  @Action(LessThan)
  lessThan(ctx: StateContext<IssueStateModel>, action: LessThan) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      issues: {head: state.issuesBackup['head'], body: state.issuesBackup['body'].filter(item => item['Issue count'] < action.count) }
    });
  }

  @Action(GreaterThan)
  greaterThan(ctx: StateContext<IssueStateModel>, action: GreaterThan) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      issues: {head: state.issuesBackup['head'], body: state.issuesBackup['body'].filter(item => item['Issue count'] > action.count) }
    });
  }
}
