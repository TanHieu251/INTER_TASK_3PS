import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { QuestionBankService } from '../../shared/services/question-bank.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit {
  constructor(private questionBankService: QuestionBankService) {}
  ngOnInit(): void {
    this.getStatus();
  }

  status: any[] = [];
  i: any[] = [];
  getStatus(): void {
    this.questionBankService.getStatus().subscribe((status) => {
      this.status = status;
      console.log('status', status);
    });
  }
}
