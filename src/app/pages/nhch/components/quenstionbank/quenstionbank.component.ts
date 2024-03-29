import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
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
import { NotificationService } from '@progress/kendo-angular-notification';

import {
  eyeIcon,
  pencilIcon,
  redoIcon,
  trashIcon,
  checkOutlineIcon,
  undoIcon,
  minusCircleIcon,
  SVGIcon,
} from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-quenstionbank',
  templateUrl: './quenstionbank.component.html',
  styleUrls: ['./quenstionbank.component.css'],
})
export class QuenstionbankComponent implements OnInit {
  statusFunctionMap: {
    [key in QuestionStatus]: { name: string; icon: string }[];
  } = {
    [QuestionStatus.Draft]: [
      { name: 'Xem chi tiết', icon: 'fa-regular fa-eye' },
      { name: 'Chỉnh sửa', icon: 'fa-solid fa-pen' },
      { name: 'Gửi duyệt', icon: 'fa-solid fa-share' },
      { name: 'Xóa câu hỏi', icon: 'fa-regular fa-trash-can' },
    ],
    [QuestionStatus.PendingApproval]: [
      { name: 'Phê duyệt', icon: 'fa-regular fa-circle-check' },
      { name: 'Trả về', icon: 'fas fa-share transform' },
    ],
    [QuestionStatus.Approved]: [
      { name: 'Xem chi tiết', icon: 'fa-regular fa-eye' },
      { name: 'Ngưng áp dụng', icon: 'fa-solid fa-ban' },
    ],
    [QuestionStatus.Discontinued]: [
      { name: 'Xem chi tiết', icon: 'fa-regular fa-eye' },
      { name: 'Phê duyệt', icon: 'fa-regular fa-circle-check' },
      { name: 'Trả về', icon: 'fas fa-share transform rotate-180' },
    ],
    [QuestionStatus.Returned]: [
      { name: 'Chỉnh sửa', icon: 'fa-solid fa-pen' },
      { name: 'Gửi duyệt', icon: 'fa-solid fa-share' },
    ],
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
  public currentFunctions: { name: string; icon: string }[] = [];
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
  @Output() popup2Shown: EventEmitter<boolean> = new EventEmitter<boolean>();

  private items: QuestionBank[] = questionBanks;

  public onToggle(el: any): void {
    this.anchor = el;
    this.show = !this.show;
  }
  constructor(private notification: NotificationService) {
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
      this.currentFunctions = this.statusFunctionMap[status].map(
        ({ name, icon }) => ({ name, icon })
      );
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

    if (this.showSecondPopup) {
      this.showSecondPopup = false;
    }

    // Hiển thị popup 1
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
          if (!selectedQuestion.code || !selectedQuestion.typeQuestion) {
            this.showNotification(
              `Không thể gửi duyệt ${selectedQuestion.title}: Thiếu mã hoặc loại câu hỏi`,
              'warning'
            );
          } else {
            selectedQuestion.status = QuestionStatus.PendingApproval;
            this.showNotification(
              `Gửi duyệt thành công ${selectedQuestion.title}`,
              'success'
            );
          }
          this.closepopup();

          break;
        case 'Xóa câu hỏi':
          this.closepopup();
          this.openDeleteDialog(selectedQuestion);
          console.log(selectedQuestion);

          break;
        case 'Phê duyệt':
          console.log('Updated question status to :', selectedQuestion);
          this.showNotification('Phê duyệt thành công', 'success');
          selectedQuestion.status = QuestionStatus.Approved;
          this.closepopup();
          console.log('Updated question status to :', selectedQuestion);
          console.log('Phê duyệt', selectedQuestion);
          break;
        case 'Trả về':
          this.closepopup();
          this.showNotification('Trả về thành công', 'success');
          console.log('Updated question status to :', selectedQuestion);
          selectedQuestion.status = QuestionStatus.Returned;
          break;
        case 'Ngưng áp dụng':
          this.showNotification('Ngưng áp dụng', 'success');
          console.log('Updated question status to Draft:', selectedQuestion);
          selectedQuestion.status = QuestionStatus.Discontinued;
          this.closepopup();
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
        console.log('popup1');
        this.deleteQuestion(this.selectedQuestion.id);
        // console.log(this.selectedQuestion.id);
      } else if (this.selectedRowitem) {
        this.selectedRowitem.forEach((item) => {
          this.deleteQuestion(item.id);
          console.log('popup2');
          this.showSecondPopup = false;
        });
      }
    } else this.dialogDelete = false;
  }
  // function xoa question
  // deleteQuestion(questionId: number): void {
  //   console.log(this.gridView);
  //   const item = this.items.findIndex((item) => item.id == questionId);
  //   if (item !== -1) {
  //     this.items.splice(item, 1);
  //     this.dialogDelete = false;
  //     console.log(this.items);
  //     this.loadItems();
  //     return this.clearSelectedRows();
  //   } else {
  //     console.log('Error when delete item');
  //   }
  // }
  deleteQuestion(questionId: number): void {
    console.log(this.gridView);
    const itemIndex = this.items.findIndex((item) => item.id === questionId);

    if (itemIndex !== -1) {
      // Check if the item's status is "soan_thao" (Draft)
      if (this.items[itemIndex].status === QuestionStatus.Draft) {
        this.items.splice(itemIndex, 1);
        this.showNotification(
          `Xoá thành công ${this.items[itemIndex].title}`,
          'success'
        );
        console.log('Question deleted successfully.');
      } else {
        this.showNotification(
          `Xoá không thành công ${this.items[itemIndex].title}`,
          'warning'
        );
      }

      this.dialogDelete = false;
      console.log(this.items);
      this.loadItems();
      this.clearSelectedRows();
    } else {
      console.log('Question not found.');
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
    this.clearSelectedRows();
    if (e.selectedRows?.length) {
      e.selectedRows.forEach((row) => {
        this.selectedRowitem.push(row.dataItem);
        this.showSecondPopup = true;
        this.show = false;
        this.popup2Shown.emit(true);
      });
    }

    if (e.deselectedRows?.length) {
      e.deselectedRows?.forEach((row) => {
        const index = this.selectedRowitem.findIndex(
          (item) => item.id == row.dataItem.id
        );
        if (index !== -1) {
          this.selectedRowitem.splice(index, 1);
        }
      });
    }

    if (this.selectedRowitem.length > 0) {
      const allFunctions: { name: string; icon: string }[] = [];
      this.selectedRowitem.forEach((item) => {
        const status: QuestionStatus = item.status as QuestionStatus;
        if (status in this.statusFunctionMap) {
          // Check if status is a valid key
          const functionsForStatus = this.statusFunctionMap[status];
          allFunctions.push(...functionsForStatus); // Push all functions for each item
        } else {
          console.error(`Invalid status: ${status}`);
        }
      });
      const uniqueFunctions = Array.from(
        new Set(allFunctions.map((func) => func.name))
      ).sort();
      this.currentFunctions = uniqueFunctions.map((name, icon) => ({
        name,
        icon: allFunctions.find((func) => func.name === name)?.icon || '',
      }));
    } else {
      this.currentFunctions = [];
      this.showSecondPopup = false;
      this.popup2Shown.emit(false);
      this.show = false;
    }

    this.handleFunctionPopup2(this.selectedRowitem);
    this.count = this.selectedRowitem.length;
    this.anchor2 = this.anchor2;
    this.showSecondPopup = this.selectedRowitem.length > 0;
  }

  handleFunctionPopup2(func: any) {
    // Check if any questions are selected
    if (!this.selectedRowitem || this.selectedRowitem.length === 0) {
      console.log('No question selected.');
      return;
    }

    this.selectedRowitem.forEach((item) => {
      const status: QuestionStatus = item.status as QuestionStatus;

      const functionsForStatus = this.statusFunctionMap[status]?.map(
        ({ name }) => name
      );

      console.log('functionsForStatus:', functionsForStatus);
      console.log('func check:', func.name);

      // Check if the function is allowed for this question's status
      if (functionsForStatus?.includes(func.name)) {
        switch (func.name) {
          case 'Chỉnh sửa':
            if (item.status) {
              item.status = QuestionStatus.Draft;
              console.log('Updated question status to Draft:', item);
            }
            this.closePopup2();
            break;
          case 'Gửi duyệt':
            if (!item.code || !item.typeQuestion) {
              this.showNotification(
                `Không thể gửi duyệt ${item.title}: Thiếu mã hoặc loại câu hỏi`,
                'warning'
              );
            } else {
              item.status = QuestionStatus.PendingApproval;
              this.showNotification(
                `Gửi duyệt thành công ${item.title}`,
                'success'
              );
              this.closePopup2();
              this.clearSelectedRows();
            }
            console.log('Updated question status to PendingApproval:', item);
            break;
          case 'Xóa câu hỏi':
            this.deleteQuestion(item.id);
            this.closePopup2();

            break;
          case 'Phê duyệt':
            item.status = QuestionStatus.Approved;
            this.showNotification('Phê duyệt thành công', 'success');
            this.clearSelectedRows();
            console.log('Updated question status to Approved:', item);
            this.closePopup2();

            break;
          case 'Trả về':
            item.status = QuestionStatus.Returned;
            this.showNotification('Trả về thành công', 'success');
            this.clearSelectedRows();
            console.log('Updated question status to Returned:', item);
            this.closePopup2();

            break;
          case 'Ngưng áp dụng':
            item.status = QuestionStatus.Discontinued;
            this.showNotification('Ngưng áp dụng thành công', 'success');
            this.clearSelectedRows();
            console.log('Updated question status to Discontinued:', item);
            this.closePopup2();

            break;
          default:
            break;
        }
      } else {
        console.log('Function not available for current status');
        console.log('funcName:', func.name);
      }
    });
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

  //show notification
  showNotification(
    message: string,
    type: 'info' | 'none' | 'success' | 'warning' | 'error' | undefined = 'info'
  ): void {
    this.notification.show({
      content: message,
      animation: { type: 'fade', duration: 400 },
      position: { horizontal: 'left', vertical: 'bottom' },
      type: { style: type, icon: true },
      hideAfter: 100,
      closable: true,
    });
  }
}
