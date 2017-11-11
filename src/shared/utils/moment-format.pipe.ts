import { Pipe, PipeTransform } from '@angular/core';

//import * as moment from 'moment-timezone';
declare var moment;

@Pipe({ name: 'momentFormat' })
export class MomentFormatPipe implements PipeTransform {
    transform(value: any, format: string) {
        return moment(value).format(format);
    }
}
