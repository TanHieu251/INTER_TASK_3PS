import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import {
  GridDataResult,
  PageChangeEvent,
  RowArgs,
  SelectableSettings,
  SelectionEvent,
} from '@progress/kendo-angular-grid';
import { questionBanks } from 'src/assets/data/question';
import { QuestionBank, QuestionStatus } from '../../models/questionBank.model';
import { Align } from '@progress/kendo-angular-popup';

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
    [QuestionStatus.Approved]: ['Xem chi tiết', 'Ngưng áp dụng'],
    [QuestionStatus.Discontinued]: ['Xem chi tiết', 'Phê duyệt', 'Trả về'],
    [QuestionStatus.Returned]: ['Chỉnh sửa', 'Gửi duyệt'],
  };

  public gridView: GridDataResult | null = null;
  public pageSize = 3;
  public size = [75, 50, 25];
  public skip = 0;
  // my selelction
  public mySelection: string[] = [];
  // dialogDelete
  public dialogDelete = false;
  // show popup
  public show: boolean = false;
  public showSecondPopup: boolean = false;
  // function popup
  public currentFunctions: { name: string }[] = [];
  //select question
  public selectedQuestion: QuestionBank | null = null;
  public selectedQuestioDialog: any | null = null;
  //selection key
  public mySelectionKey = (context: RowArgs) => context.dataItem;
  selectedRowitem = new Array<any>();
  count: number = 0;

  //popup
  @Input() anchor: any;
  @Input() anchor2: any;
  //search text
  @Input() searchText: string = '';
  // checked filter
  @Input() checkedValues: string[] = [];

  @Input() selectable: SelectableSettings = {
    enabled: true,
    mode: 'multiple',
    drag: true,
    checkboxOnly: true,
  };

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
  }
  public anchorAlign: Align = { horizontal: 'left', vertical: 'top' };
  public popupAlign: Align = { horizontal: 'right', vertical: 'top' };

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;
    this.loadItems();
  }

  public loadItems(): void {
    this.gridView = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length,
    };
  }

  // // lọc question bằng method search text
  // getSearchTextQuestionBank(): GridDataResult | null {
  //   if (!this.searchText.trim()) {
  //     return this.gridView;
  //   } else {
  //     console.log(this.searchText);
  //     const filteredResults = this.items.filter((item) =>
  //       item.title.toLowerCase().includes(this.searchText.toLowerCase())
  //     );
  //     console.log(filteredResults);
  //     return { data: filteredResults, total: filteredResults.length };
  //   }
  // }
  // //lọc question bằng method filter checkbox
  // filterCheckedQuestionBank(): GridDataResult | null {
  //   console.log('Checked values:', this.checkedValues);
  //   if (this.checkedValues && this.checkedValues.length > 0) {
  //     const filteredItems = this.items.filter((item) =>
  //       this.checkedValues.includes(item.status.toString())
  //     );

  //     return {
  //       data: filteredItems,
  //       total: filteredItems.length,
  //     };
  //   } else {
  //     // If no items are checked, return null or an empty GridDataResult
  //     return this.gridView; // or return { data: [], total: 0 };
  //   }
  // }

  //lọc sản phẩm
  combineFilters(): GridDataResult | null {
    // Lọc theo searchText
    let filteredItems = this.items;
    if (this.searchText.trim()) {
      filteredItems = filteredItems.filter((item) =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Lọc theo checkedValues
    if (this.checkedValues && this.checkedValues.length > 0) {
      filteredItems = filteredItems.filter((item) =>
        this.checkedValues.includes(item.status.toString())
      );
    }

    const startIndex = this.skip;
    const endIndex = Math.min(startIndex + this.pageSize, filteredItems.length);
    const dataForPage = filteredItems.slice(startIndex, endIndex);

    return {
      data: dataForPage,
      total: filteredItems.length,
    };
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
  // Lấy danh sách chức năng tương ứng với trạng thái của câu hỏi hiện tại

  onQuestionSelect(question: QuestionBank): void {
    if (question && question.status) {
      const status: QuestionStatus = question.status as QuestionStatus;
      this.currentFunctions = this.statusFunctionMap[status].map((name) => ({
        name,
      }));
      console.log(this.selectedQuestion);
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

  // function  các chức năng (thuưc hiện theo id)
  handleButton(selectedQuestion: QuestionBank | null, actionName: string) {
    if (selectedQuestion) {
      switch (actionName) {
        case 'Chỉnh sửa':
          selectedQuestion.status = QuestionStatus.Draft;
          this.closepopup();
          console.log('Updated question status to :', selectedQuestion);
          break;
        case 'Gửi duyệt':
          console.log('Updated question status to :', selectedQuestion);
          selectedQuestion.status = QuestionStatus.PendingApproval;
          this.closepopup();

          break;
        case 'Xóa câu hỏi':
          this.closepopup();
          this.openDeleteDialog(selectedQuestion);
          console.log(selectedQuestion);

          break;
        case 'Phê duyệt':
          console.log('Updated question status to :', selectedQuestion);
          selectedQuestion.status = QuestionStatus.Approved;
          this.closepopup();
          console.log('Updated question status to :', selectedQuestion);
          console.log('Phê duyệt', selectedQuestion);
          break;
        case 'Trả về':
          this.closepopup();
          console.log('Updated question status to :', selectedQuestion);
          selectedQuestion.status = QuestionStatus.Returned;
          break;
        case 'Ngưng áp dụng':
          console.log('Updated question status to Draft:', selectedQuestion);
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
    if (status == 'yes') {
      if (this.selectedQuestion) {
        this.deleteQuestion(this.selectedQuestion.id);
        // console.log(this.selectedQuestion.id);
      } else if (this.selectedRowitem) {
        this.selectedRowitem.forEach((item) => {
          this.deleteQuestion(item.id);
          this.showSecondPopup = false;
        });
      }
    } else this.dialogDelete = false;
  }
  // function xoa question
  deleteQuestion(questionId: number): void {
    console.log(this.gridView);
    const item = this.items.findIndex((item) => item.id == questionId);
    if (item !== -1) {
      this.items.splice(item, 1);
      this.dialogDelete = false;
      console.log(this.items);
      this.loadItems();
      return this.clearSelectedRows();
    } else {
      console.log('Error when delete item');
    }
  }

  // hien thi dialog delete
  public openDeleteDialog(question: any): void {
    this.dialogDelete = true;
    this.selectedQuestioDialog = question;
    console.log('open the big dialog', this.selectedQuestioDialog);
    console.log('dialog  open');
  }
  public closepopup(): void {
    this.show = false;
  }

  // togglePopupCheck(e: SelectionEvent) {
  //   if (e.selectedRows?.length) {
  //     e.selectedRows.forEach((row) => {
  //       this.selectedRowitem.push(row.dataItem);
  //     });

  //     this.anchor2 = this.anchor2;
  //     this.showSecondPopup = true;
  //     console.log('count', this.count);
  //   }
  //   if (e.deselectedRows?.length) {
  //     e.deselectedRows?.forEach((row) => {
  //       var index = this.selectedRowitem.findIndex(
  //         (item) => item.id == row.dataItem.id
  //       );
  //       this.selectedRowitem.splice(index, 1);

  //       if (this.selectedRowitem.length == 0) {
  //         // this.count = this.selectedRowitem.length;
  //         console.log('count length', this.count);
  //         this.anchor2 = this.anchor2;
  //         this.showSecondPopup = false;
  //       }
  //     });
  //   }
  //   this.count = this.selectedRowitem.length;
  //   console.log(this.selectedRowitem);
  // }

  togglePopupCheck(e: SelectionEvent) {
    if (e.selectedRows?.length) {
      e.selectedRows.forEach((row) => {
        this.selectedRowitem.push(row.dataItem);
      });
    }

    if (e.deselectedRows?.length) {
      e.deselectedRows?.forEach((row) => {
        var index = this.selectedRowitem.findIndex(
          (item) => item.id == row.dataItem.id
        );
        this.selectedRowitem.splice(index, 1);
      });
    }

    if (this.selectedRowitem.length > 0) {
      // Tạo một mảng để chứa tất cả các chức năng từ các câu hỏi đã chọn
      const allFunctions: string[] = [];
      this.selectedRowitem.forEach((item) => {
        // Lấy trạng thái của từng câu hỏi
        const status: QuestionStatus = item.status as QuestionStatus;
        // Lấy danh sách chức năng tương ứng với trạng thái của câu hỏi
        const functionsForStatus = this.statusFunctionMap[status];
        // Thêm các chức năng vào mảng allFunctions
        allFunctions.push(...functionsForStatus);
      });
      // Loại bỏ các chức năng trùng lặp và sắp xếp chúng theo thứ tự từ điển
      const uniqueFunctions = Array.from(new Set(allFunctions)).sort();
      // Tạo một mảng mới chứa các đối tượng có thuộc tính 'name' từ các chuỗi uniqueFunctions
      this.currentFunctions = uniqueFunctions.map((name) => ({ name }));
    } else {
      this.currentFunctions = []; // Nếu không có câu hỏi nào được chọn, đặt danh sách chức năng là rỗng
    }

    this.handleFunctionPopup2(this.selectedRowitem);
    this.count = this.selectedRowitem.length;
    this.anchor2 = this.anchor2;
    this.showSecondPopup = this.selectedRowitem.length > 0; // Hiển thị popup thứ hai nếu có ít nhất một câu hỏi được chọn
  }
  handleFunctionPopup2(func: any) {
    if (this.selectedRowitem) {
      this.selectedRowitem.forEach((item) => {
        const status: QuestionStatus = item.status as QuestionStatus;
        const functionsForStatus = this.statusFunctionMap[status];

        // Kiểm tra xem chức năng được chọn có tồn tại trong danh sách chức năng của trạng thái không
        if (functionsForStatus.includes(func.name)) {
          switch (func.name) {
            case 'Chỉnh sửa':
              if (item.status) item.status = QuestionStatus.Draft;
              this.showSecondPopup = false;
              console.log('Updated question status to :', item);

              break;
            case 'Gửi duyệt':
              item.status = QuestionStatus.PendingApproval;
              this.showSecondPopup = false;
              this.clearSelectedRows();
              console.log('Updated question status to :', item);
              break;
            case 'Xóa câu hỏi':
              this.showSecondPopup = false;
              this.openDeleteDialog(item);
              console.log('item of delete:', item);
              break;
            case 'Phê duyệt':
              item.status = QuestionStatus.Approved;
              this.showSecondPopup = false;
              console.log('Updated question status to :', item);
              console.log('Phê duyệt', item);
              break;
            case 'Trả về':
              item.status = QuestionStatus.Returned;
              this.showSecondPopup = false;
              console.log('Updated question status to :', item);
              break;
            case 'Ngưng áp dụng':
              this.showSecondPopup = false;
              item.status = QuestionStatus.Discontinued;
              console.log('Updated question status to Draft:', item);
              console.log('Phê duyệt', item);
              break;
            default:
              break;
          }
        } else {
          console.log('Function not available for current status');
        }
      });
      // console.log(this.selectedRowitem);
    } else {
      console.log('No question selected.');
    }
  }
  clearSelectedRows() {
    this.selectedRowitem = [];
  }
  closePopup2() {
    this.clearSelectedRows();
    this.showSecondPopup = false;
  }

  splitCamelCase(text: string): string {
    return text.replace(/([A-Z])/g, ' $1').trim();
  }
}
