import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sum' })
export class SumPipe implements PipeTransform {
    transform(items: any[], attr: string): any {
        if (!items)
            return 0;
        
        return items.reduce((a,b) => b[attr] == undefined ? a : a + b[attr].length, 0);
    }
}