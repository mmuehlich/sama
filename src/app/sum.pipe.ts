import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sum' })
export class SumPipe implements PipeTransform {
    transform(items: any[], attr: string): any {
        if (!items)
            return 0;
        return items.reduce((a,b) => b[attr] == undefined ? a : a + Number(b[attr]), 0);
    }
}

@Pipe({ name: 'sumLength' })
export class SumLengthPipe implements PipeTransform {
    transform(items: any[], attr: string, property: string, label: string): any {
        if (!items)
            return 0;
        var c = 0;
        for (var i in items) {
            for (var j in items[i][attr]) {
                if (items[i][attr][j][property].length > 0) {
                    c++;
                }
            }
        }
        return c === 0 ? '' : c + ' ' + label;
    }
}