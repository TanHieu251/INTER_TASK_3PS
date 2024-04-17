import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  status,
  questionBanks,
} from 'src/app/pages/questionbank/shared/data/questionBank';

@Injectable({
  providedIn: 'root',
})
export class QuestionBankService {
  status = status;
  questions = questionBanks;
  constructor() {}

  getStatus(): Observable<any[]> {
    return of(this.status);
  }
  getQuestions(): Observable<any[]> {
    return of(this.questions);
  }
}
