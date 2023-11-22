import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullReplacer'
})
export class NullReplacerPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    const defaultValue = !!args?.length
                      ? args[0] +=''
                      : '-';
                      
    return value === null || value === undefined
          ? defaultValue
          : value +='';
  }

}
