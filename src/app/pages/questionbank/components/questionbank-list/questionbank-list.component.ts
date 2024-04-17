import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { QuestionBankService } from '../../shared/services/question-bank.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections'; // Import SelectionModel
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-questionbank-list',

  templateUrl: './questionbank-list.component.html',
  styleUrl: './questionbank-list.component.css',
})
export class QuestionbankListComponent
  implements OnInit, AfterViewInit, OnChanges
{
  data: any[] = [];
  @Input() searchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'select',
    'title',
    'group',
    'time',
    'status',
    'popup',
  ];
  dataSource = new MatTableDataSource<any>(this.data);
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort) sort!: MatSort;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  logSelection() {
    this.selection.selected.forEach((s) => console.log(s.name));
  }

  constructor(private questionBankService: QuestionBankService) {}

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.applyFilter();
  }
  ngOnInit(): void {
    this.getQuestion();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchText'] && !changes['searchText'].firstChange) {
      this.applyFilter();
    }
  }

  getQuestion(): void {
    this.questionBankService.getQuestions().subscribe((questions) => {
      this.data = questions;
      this.dataSource.data = this.data;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    console.log(filterValue);
    this.dataSource.filter = filterValue;
  }
}
