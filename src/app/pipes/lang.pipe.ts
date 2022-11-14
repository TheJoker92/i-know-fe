import { Pipe, PipeTransform } from '@angular/core';
import * as dict from './lang.json'
import { LangService } from '../services/lang.service';
@Pipe({
  name: 'lang'
})
export class LangPipe implements PipeTransform {

  dictJSON: any
  constructor(private langService: LangService) {
    this.dictJSON = JSON.parse(JSON.stringify(dict))
  }

  transform(value: string): string {
    return this.dictJSON[this.langService.lang][value];
  }

}
