import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubscriptionn } from '../subscriptionn.model';
import { SubscriptionnService } from '../service/subscriptionn.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './subscriptionn-delete-dialog.component.html',
})
export class SubscriptionnDeleteDialogComponent {
  subscriptionn?: ISubscriptionn;

  constructor(protected subscriptionnService: SubscriptionnService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.subscriptionnService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
