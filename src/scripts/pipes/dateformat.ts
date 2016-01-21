import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(input: string): Date {
    return new Date(input);
  }

}