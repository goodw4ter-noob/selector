import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store'
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { GeneralState, ITodo } from '../state/general.state';
import { LoadNewTodos } from '../state/general.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class TodoLoadingService {
  public searchChange$ = new BehaviorSubject('');
  public readyTodos!: ITodo[];

  @Select(GeneralState.isLoading)
  public isLoading$!: Observable<boolean>;

  @Select(GeneralState.todos)
  public todos$!: Observable<ITodo[]>;

  constructor(
    private readonly store: Store,
  ) {
    this.initTodos();
    this.filterElement();
    this.todos$.subscribe((data) => {
      this.readyTodos = data;
    })
  }

  private filterElement() {
    this.searchChange$.asObservable()
      .pipe(
        untilDestroyed(this),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(() => this.showSearchResult(this.searchChange$.value))
      )
      .subscribe();
  }

  private showSearchResult(value: string) {
    return this.todos$
      .pipe(
        untilDestroyed(this),
        map((res) => {
          return res.filter(el => el.title.includes(value));
        }),
        map((el) => {
          this.readyTodos = el;
        })
      )
  }

  public onSearch(value: string): void {
    this.searchChange$.next(value);
  }

  public loadNewTodos() {
    const page = this.store.selectSnapshot(GeneralState.page);
    const isLoading = this.store.selectSnapshot(GeneralState.isLoading);
    const isLastPage = this.store.selectSnapshot(GeneralState.isLastPage);

    if (isLoading || isLastPage) return;

    this.store.dispatch(new LoadNewTodos(page + 1));
  }

  private initTodos() {
    this.store.dispatch(new LoadNewTodos(1));
  }

}
