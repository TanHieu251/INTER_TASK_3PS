import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { questionBanks } from 'src/assets/data/question';
import { QuestionBank, QuestionStatus } from '../../models/questionBank.model';
import { PopupRef } from '@progress/kendo-angular-popup';

@Component({
  selector: 'app-quenstionbank',
  templateUrl: './quenstionbank.component.html',
  styleUrls: ['./quenstionbank.component.css'],
})
export class QuenstionbankComponent implements OnInit {
  statusFunctionMap: { [key in QuestionStatus]: string[] } = {
    [QuestionStatus.Draft]: ['Chỉnh sửa', 'Gửi duyệt', 'Xóa câu hỏi'],
    [QuestionStatus.PendingApproval]: ['Phê duyệt', 'Trả về'],
    [QuestionStatus.Approved]: ['Ngưng áp dụng'],
    [QuestionStatus.Discontinued]: ['Trả về'],
    [QuestionStatus.Returned]: ['Chỉnh sửa'],
  };

  public gridView: GridDataResult | null = null;
  public pageSize = 5;
  public skip = 0;
  public mySelection: string[] = [];

  @Input() anchor: any;
  @Input() searchText: string = '';
  private items: QuestionBank[] = questionBanks;

  private toggleText: string = 'Hide';
  public show: boolean = false;
  public currentFunctions: string[] = [];
  public selectedQuestion: QuestionBank | null = null;

  public onToggle(el: any): void {
    this.anchor = el;
    this.show = !this.show;
  }
  constructor() {
    this.loadItems();
  }
  ngOnInit(): void {
    this.getSearchTextQuestionBank();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  public loadItems(): void {
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length,
    };
  }
  getSearchTextQuestionBank(): QuestionBank[] {
    if (!this.searchText.trim()) {
      return this.items;
    } else {
      console.log(this.searchText);
      const filteredResults = this.items.filter((item) =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
      console.log(filteredResults);
      return filteredResults;
    }
  }
  checkStatus(status: QuestionStatus): void {
    switch (status) {
      case QuestionStatus.Draft:
        console.log('Trạng thái soạn thảo');
        console.log(status);
        break;
      case QuestionStatus.PendingApproval:
        console.log('Trạng thái chờ duyệt');
        break;
      case QuestionStatus.Approved:
        console.log('Trạng thái đã duyệt');
        break;
      case QuestionStatus.Discontinued:
        console.log('Trạng thái đã ngưng');
        break;
      case QuestionStatus.Returned:
        console.log('Trạng thái đã trả lại');
        break;
      default:
        console.log('Trạng thái không xác định');
        break;
    }
  }
  onQuestionSelect(question: QuestionBank): void {
    if (question && question.status) {
      const status: QuestionStatus = question.status as QuestionStatus;
      // Lấy danh sách chức năng tương ứng với trạng thái của câu hỏi hiện tại
      this.currentFunctions = this.statusFunctionMap[status];
      console.log('Currenfunction', this.currentFunctions);
    } else {
      // Nếu không có câu hỏi hoặc trạng thái, gán danh sách chức năng là rỗng
      this.currentFunctions = [];
      console.log('Không có function');
    }
  }

  toggleAndCheck(dataItem: any, anchor: any): void {
    this.onToggle(anchor); // Gọi hàm onToggle trước
    this.checkStatus(dataItem.status); // Gọi hàm checkStatus sau
    this.onQuestionSelect(dataItem);
    this.selectedQuestion = dataItem;
  }

  getStatusText(status: QuestionStatus): string {
    switch (status) {
      case QuestionStatus.Draft:
        return 'Đang soạn thảo';
      case QuestionStatus.PendingApproval:
        return 'Gửi duyệt';
      case QuestionStatus.Approved:
        return 'Duyệt áp dụng ';
      case QuestionStatus.Discontinued:
        return 'Ngưng áp dụng';
      case QuestionStatus.Returned:
        return 'Trả về';
      default:
        return 'Không xác định';
    }
  }
  getStatusColor(status: QuestionStatus): string {
    switch (status) {
      case QuestionStatus.Draft:
        return 'black'; // Màu đen cho trạng thái "Đang soạn thảo"
      case QuestionStatus.PendingApproval:
        return 'blue'; // Màu xanh cho trạng thái "Chờ duyệt"
      case QuestionStatus.Approved:
        return 'green'; // Màu xanh lá cây cho trạng thái "Đã duyệt"
      case QuestionStatus.Discontinued:
        return 'red'; // Màu cam cho trạng thái "Đã ngưng"
      case QuestionStatus.Returned:
        return 'goldenrod'; // Màu vàng cho trạng thái "Đã trả lại"
      default:
        return 'black'; // Mặc định là màu đen
    }
  }
}
