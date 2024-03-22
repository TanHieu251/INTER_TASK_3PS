export enum QuestionStatus {
  Draft = 'soan_thao',
  PendingApproval = 'gui_duyet',
  Approved = 'duyet_ap_dung',
  Discontinued = 'ngung_apdung',
  Returned = 'tra_Ve',
}

export class QuestionBank {
  id: number = 0;
  title: string = '';
  group: string = '';
  time: number = 0;
  code?: string;
  typeQuestion?: string;
  status: string = '';
}
