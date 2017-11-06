import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sum' })
export class SumPipe implements PipeTransform {
    transform(items: any[], attr: string): any {
        if (items)
            return items.reduce((a,b) => b[attr] == undefined ? a : a + Number(b[attr]), 0);
        return 0;
    }
}