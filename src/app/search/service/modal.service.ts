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

    dialogConfig.minWidth = "300px";
    dialogConfig.minHeight = "200px";
    
    return dialogConfig;
  }

  getConfigFullModal(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "answer-modal";
    dialogConfig.height = "100%";
    dialogConfig.width = "100%";
    dialogConfig.maxWidth = "100%";
    dialogConfig.maxHeight = "100%";
    return dialogConfig;
  }

}
