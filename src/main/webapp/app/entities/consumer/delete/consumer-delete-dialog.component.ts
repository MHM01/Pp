import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsumer } from '../consumer.model';
import { ConsumerService } from '../service/consumer.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './consumer-delete-dialog.component.html',
})
export class ConsumerDeleteDialogComponent {
  consumer?: IConsumer;

  constructor(protected consumerService: ConsumerService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.consumerService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
