import { ITodo } from "./general.state"

export class LoadNewTodos {
  static readonly type = '[General State] Load New Todos'
  constructor(public page: number) {}
}

export class LoadNewTodosSuccess {
  static readonly type = '[General State] Load New Todos Success'
  constructor(public payload: ITodo[], public page: number) {}
}
