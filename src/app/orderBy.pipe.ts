import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderByPipe {
    transform(array: Array<any>, args: string[]): Array<string> {
        if (!array) {
            return array;
        }
        array.sort((a: any, b: any) => {

            for (let i in args) {
                if (a[args[i]] < b[args[i]]) {
                    return -1;
                } else if (a[args[i]] > b[args[i]]) {
                    return 1;
                }
            }
            return 0;
        });
        return array;
    }
}