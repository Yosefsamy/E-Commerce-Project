import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: string, numberOfChars:number): string {
    return value.split(" ").splice(0,numberOfChars).join(" ");
  }

}
