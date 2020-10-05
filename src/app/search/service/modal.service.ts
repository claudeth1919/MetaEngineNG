import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  getConfigModal(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "answer-modal";
    dialogConfig.height = "100%";
    dialogConfig.width = "100%";
    return dialogConfig;
  }

}
