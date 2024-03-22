import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { questionBanks } from 'src/assets/data/question';
import { QuestionBank, QuestionStatus } from '../../models/questionBank.model';

@Component({
  selector: 'app-quenstionbank',
  templateUrl: './quenstionbank.component.html',
  styleUrls: ['./quenstionbank.component.css'],
})
export class QuenstionbankComponent implements OnInit {
  statusFunctionMap: { [key in QuestionStatus]: string[] } = {
    [QuestionStatus.Draft]: [
      'Xem chi tiết',
      'Chỉnh sửa',
      'Gửi duyệt',
      'Xóa câu hỏi',
    ],
    [QuestionStatus.PendingApproval]: ['Phê duyệt', 'Trả về'],
    [QuestionStatus.Approved]: ['Chỉnh sửa', 'Xem chi tiết', 'Ngưng áp dụng'],
    [QuestionStatus.Discontinued]: ['Xem chi tiết', 'Phê duyệt', 'Trả về'],
    [QuestionStatus.Returned]: ['Chỉnh sửa', 'Gửi duyệt'],
  };

  public gridView: GridDataResult | null = null;
  public pageSize = 5;
  public skip = 0;
  public mySelection: string[] = [];
  public dialogDelete = false;
  public show: boolean = false;
  // public dialogDelete: boolean = false;
  public currentFunctions: { name: string }[] = [];
  public selectedQuestion: QuestionBank | null = null;

  @Input() anchor: any;
  @Input() searchText: string = '';
  @Input() checkedValues: string[] = [];

  private items: QuestionBank[] = questionBanks;

  public onToggle(el: any): void {
    this.anchor = el;
    this.show = !this.show;
  }
  constructor() {
    this.loadItems();
  }
  ngOnInit(): void {
    this.currentFunctions = [];

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

  // lọc question bằng method search text
  getSearchTextQuestionBank(): GridDataResult | null {
    if (!this.searchText.trim()) {
      return this.gridView;
    } else {
      console.log(this.searchText);
      const filteredResults = this.items.filter((item) =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
      console.log(filteredResults);
      return { data: filteredResults, total: filteredResults.length };
    }
  }
  //lọc question bằng method filter checkbox
  filterCheckedQuestionBank(): GridDataResult | null {
    console.log('Checked values:', this.checkedValues);
    if (this.checkedValues && this.checkedValues.length > 0) {
      const filteredItems = this.items.filter((item) =>
        this.checkedValues.includes(item.status.toString())
      );
      return {
        data: filteredItems,
        total: filteredItems.length,
      };
    } else {
      // If no items are checked, return null or an empty GridDataResult
      return this.gridView; // or return { data: [], total: 0 };
    }
  }
  //kiem tra trang thai status
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
      this.currentFunctions = this.statusFunctionMap[status].map((name) => ({
        name,
      }));
      console.log('Current Functions:', this.currentFunctions);
    } else {
      this.currentFunctions = [];
      console.log('Không có function');
    }
  }

  toggleAndCheck(dataItem: any, anchor: any): void {
    this.onToggle(anchor);
    this.checkStatus(dataItem.status);
    this.onQuestionSelect(dataItem);
    this.selectedQuestion = dataItem;
    this.handleButton(this.selectedQuestion, dataItem);
  }
  // chuyen doi text cho status (soan_thao -> đang soạn thảo)
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
  //  chỉnh màu sắc cho từng status
  getStatusColor(status: QuestionStatus): string {
    switch (status) {
      case QuestionStatus.Draft:
        return 'black';
      case QuestionStatus.PendingApproval:
        return 'blue';
      case QuestionStatus.Approved:
        return 'green';
      case QuestionStatus.Discontinued:
        return 'red';
      case QuestionStatus.Returned:
        return 'goldenrod';
      default:
        return 'black';
    }
  }

  handleButton(selectedQuestion: QuestionBank | null, actionName: string) {
    if (selectedQuestion) {
      switch (actionName) {
        case 'Chỉnh sửa':
          selectedQuestion.status = QuestionStatus.Draft;
          this.closepopup();
          console.log('Updated question status to Draft:', selectedQuestion);
          break;
        case 'Gửi duyệt':
          selectedQuestion.status = QuestionStatus.PendingApproval;
          this.closepopup();

          break;
        case 'Xóa câu hỏi':
          this.closepopup();
          this.open();

          break;
        case 'Phê duyệt':
          selectedQuestion.status = QuestionStatus.Approved;
          this.closepopup();
          console.log('Phê duyệt', selectedQuestion);
          break;
        case 'Trả về':
          this.closepopup();
          selectedQuestion.status = QuestionStatus.Returned;
          break;
        case 'Ngưng áp dụng':
          selectedQuestion.status = QuestionStatus.Discontinued;
          this.closepopup();
          console.log('Phê duyệt', selectedQuestion);
          break;
        default:
      }
    } else {
      console.log('No question selected.');
    }
  }

  // xóa question khi nhấn xác nhận xóa từ dialog
  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.dialogDelete = false;
    if (status == 'yes') {
      if (this.selectedQuestion) {
        this.deleteQuestion(this.selectedQuestion.id);
        console.log(this.selectedQuestion.id);
      }
    }
  }

  deleteQuestion(questionId: number): void {
    console.log(this.gridView);
    const item = this.items.findIndex((item) => item.id == questionId);
    if (item !== -1) {
      this.items.splice(item, 1);
      console.log(this.items);
      this.loadItems();
    } else {
      console.log('Error when delete item');
    }
  }

  public open(): void {
    this.dialogDelete = true;
    console.log('dialog  open');
  }
  public closepopup(): void {
    this.show = !this.show;
  }
}
