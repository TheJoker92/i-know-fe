import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading: boolean = false
  isError: boolean = false

  constructor() { }
}
