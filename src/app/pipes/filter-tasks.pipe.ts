import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {

  transform(tasks: any[], status: string): any[] {
    return tasks.filter(task => task.status === status);
  }

}
