import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  @Output() confirmDelete = new EventEmitter<boolean>();

  onCancel() {
    this.confirmDelete.emit(false);
  }

  onConfirm() {
    this.confirmDelete.emit(true);
  }
}
