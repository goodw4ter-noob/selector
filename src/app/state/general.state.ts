import { StateContext, State, StateToken, Selector, Action, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import * as GeneralActions from './general.actions';
import { patch, append } from "@ngxs/store/operators"
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export interface ITodo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface GeneralStateModel {
  todos: ITodo[],
  page: number,
  isLastPage: boolean,
  isLoading: boolean,
  pageLimit: number
}

const GENERAL_STATE_TOKEN = new StateToken<GeneralStateModel>('generalState');

@State<GeneralStateModel>({
  name: GENERAL_STATE_TOKEN,
  defaults: {
    todos: [],
    page: 0,
    isLastPage: false,
    isLoading: true,
    pageLimit: 4,
  }
})
@Injectable()
export class GeneralState {

  constructor(
    private readonly http:HttpClient,
    private readonly store: Store
  ) {  }

  @Selector()
  static todos(state: GeneralStateModel) {
    return state.todos;
  }

  @Selector()
  static isLoading(state: GeneralStateModel) {
    return state.isLoading;
  }

  @Selector()
  static pageLimit(state: GeneralStateModel) {
    return state.pageLimit;
  }

  @Selector()
  static page(state: GeneralStateModel) {
    return state.page;
  }

  @Selector()
  static isLastPage(state: GeneralStateModel) {
    return state.isLastPage;
  }

  @Action(GeneralActions.LoadNewTodos)
  public loadNewTodosToState(
    { patchState }: StateContext<GeneralStateModel>,
    { page }: GeneralActions.LoadNewTodos
  ) {
    patchState({ isLoading: true })

    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos', {
      params: {
        _page: page
      }
    }).pipe(
      tap((data) => {
        this.store.dispatch(new GeneralActions.LoadNewTodosSuccess(data, page));
      }),
      catchError((err) => {
        return throwError(() => err.message);
      })
    )
  }

  @Action(GeneralActions.LoadNewTodosSuccess)
  public loadNewTodosToStateSuccess(
    { setState }: StateContext<GeneralStateModel>,
    { payload, page }: GeneralActions.LoadNewTodosSuccess,
  ) {
    const limit = this.store.selectSnapshot(GeneralState.pageLimit);
    let result: ITodo[] | undefined = undefined;

    setState(
      patch({
        isLoading: false,
        page,
        isLastPage: page === limit ? true : false,
        todos: append(result ? result : payload),
      })
    )
  }
}
