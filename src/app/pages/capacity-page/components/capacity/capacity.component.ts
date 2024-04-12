import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { PositionModel } from 'src/app/shared/model';
import { Position } from 'src/app/shared/data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-capacity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss'],
})
export class CapacityComponent implements OnInit, DoCheck {
  private items: PositionModel[] = Position;

  PositionNameArray: { id: string; name: string }[] = [];
  public CompetenceNameArray: string[] = [];
  public PositionsArray: PositionModel[][] = [];
  public competencebyPosition: {
    PositionID: string;
    competences: PositionModel[];
  }[] = [];
  constructor(private notification: NotificationService) {}
  ngOnInit(): void {
    this.getPositionNames();
    this.getPositionByCompetences();
    this.getCompetences();
    // this.potisionsSecondHand();

    // console.log('Array :', this.PositionsArray);
  }

  // ham lay potision co name va id
  public getPositionNames(): void {
    const positionMap = new Map<string, { id: string; name: string }>();

    this.items.forEach((item) => {
      const key = item.PositionID + '-' + item.PositionName;
      if (!positionMap.has(key)) {
        positionMap.set(key, { id: item.PositionID, name: item.PositionName });
      }
    });

    this.PositionNameArray = Array.from(positionMap.values());
    // console.log('PositionName', this.PositionNameArray);
  }

  // ham lay competences
  public getCompetences(): string[] {
    const competenceNameSet = new Set<string>();
    this.items.forEach((item) => {
      competenceNameSet.add(item.CompetenceName);
    });
    this.CompetenceNameArray = Array.from(competenceNameSet);
    // console.log('CompetenceNameArray:', this.CompetenceNameArray);
    return this.CompetenceNameArray;
  }

  // ham lay danh sach item theo competences
  private getPositionByCompetences(): void {
    this.PositionsArray = this.items.reduce(
      (acc: PositionModel[][], item: PositionModel) => {
        const competenc = item.CompetenceName;

        const existingPositionIndex = acc.findIndex((competences) =>
          competences.some((position) => position.CompetenceName === competenc)
        );

        if (existingPositionIndex !== -1) {
          acc[existingPositionIndex].push(item);
        } else {
          acc.push([item]);
        }

        return acc;
      },
      []
    );
    // console.log('potision by competence:', this.PositionsArray);
  }
  // handle blur for competencelevel

  handleBlurLevel(item: PositionModel, event: any): void {
    //lay gia tri moi nhap vao
    const newValue = event?.target?.value;

    // Kiểm tra nếu giá trị không hợp lệ
    if (newValue < 1 || newValue > 5) {
      this.showNotification(
        'Giá trị phải nằm trong khoảng từ 1 đến 5',
        'error'
      );
      // neu khong hop le tra ve gia tri cu
      event.target.value = item.CompetenceLevel || '';

      return;
    }
    // lay index cua item tu mang
    const index = this.items.findIndex((i) => i === item);
    if (index !== -1) {
      const oldValueLevel = item.CompetenceLevel;

      // neu 1 trong 2 khong co gia tri , thi set banng gia tri tuong ung da nhap
      if (item.CompetenceLevelMax == null) {
        item.CompetenceLevelMax = newValue;
      }
      // neu la gia tri moi
      if (item.CompetenceLevel === newValue) {
        this.items[index] = item;
        this.showNotification(`Cập nhật thành công`, 'success');
      }
      // neu thay doi gia tri cu
      if (oldValueLevel !== newValue) {
        item.CompetenceLevel = newValue;
        this.items[index] = item;
        this.showNotification(`Cập nhật thành công`, 'success');
      }
    }
  }
  // handle blur for competencelevelmax
  handleBlurLevelMax(item: PositionModel, event: any): void {
    // lay gia tri nhap vao
    const newValue = event?.target?.value;

    // Kiểm tra nếu giá trị không hợp lệ
    if (newValue < 1 || newValue > 5) {
      this.showNotification(
        'Giá trị phải nằm trong khoảng từ 1 đến 5',
        'error'
      );
      // neu gia tri khong hop le , tra ve gia tri cu
      event.target.value = item.CompetenceLevelMax || '';

      return;
    }
    //loc  index của item trong mang
    const index = this.items.findIndex((i) => i === item);
    if (index !== -1) {
      //lay gia tri cu cua item
      const oldValueLevelMax = item.CompetenceLevelMax;

      //neu 1 trong 2 gia tri item =null , thi set gia tri con lai bang gia tri da nhap tuong ung
      if (item.CompetenceLevel == null) {
        item.CompetenceLevel = newValue;
      }
      // neu la gia tri moi
      if (item.CompetenceLevelMax === newValue) {
        this.items[index] = item;
        this.showNotification(`Cập nhật thành công`, 'success');
      }
      //neu da co gia tri cu
      if (oldValueLevelMax !== newValue) {
        item.CompetenceLevelMax = newValue;
        this.items[index] = item;
        this.showNotification(`Cập nhật thành công`, 'success');
      }
    }
  }

  // ham hien thi Notification
  showNotification(
    message: string,
    type: 'info' | 'none' | 'success' | 'warning' | 'error' | undefined = 'info'
  ): void {
    this.notification.show({
      content: message,
      animation: { type: 'fade', duration: 400 },
      position: { horizontal: 'left', vertical: 'bottom' },
      type: { style: type, icon: true },
      hideAfter: 5000, // Thời gian tự động ẩn thông báo sau 5 giây
      closable: true,
    });
  }

  ngDoCheck(): void {
    // console.log('this is array changes ', this.PositionsArray);
  }
  isEven(num: number): boolean {
    return num % 2 != 0;
  }
}
