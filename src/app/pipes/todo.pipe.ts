import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from '../state/general.state';

@Pipe({
  name: 'todo'
})
export class TodoPipe implements PipeTransform {

  transform(value: ITodo): string {
    return `${value.id}. ${value.title}`;
  }

}
