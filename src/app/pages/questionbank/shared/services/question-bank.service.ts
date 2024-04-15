import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { status } from 'src/app/pages/questionbank/shared/data/questionBank';

@Injectable({
  providedIn: 'root',
})
export class QuestionBankService {
  status = status;
  constructor() {}

  getStatus(): Observable<any[]> {
    return of(this.status);
  }
}
