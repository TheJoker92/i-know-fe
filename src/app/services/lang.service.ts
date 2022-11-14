import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  lang = "en"
  constructor() { }

  setITLang() {
    this.lang = langEnum.ITALIAN
  }

  setEN_UKLang() {
    this.lang = langEnum.ENGLISH_UK
  }
}

export enum langEnum {
  ITALIAN = "it",
  ENGLISH_UK = "en"
}
