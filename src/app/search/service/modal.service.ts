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
    //dialogConfig.height = "94%";
    //dialogConfig.width = "99%";
    dialogConfig.maxWidth = "90vw";
    return dialogConfig;
  }

}
