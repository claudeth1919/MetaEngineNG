import { Injectable } from '@angular/core';
import { LoadingComponent } from '../loading/loading.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isOpen:boolean = false;
  private myDialogRef: MatDialogRef<LoadingComponent>;
  constructor(public dialog: MatDialog, public overlay: Overlay) { }

  public show(){
    if (!this.isOpen){
      this.myDialogRef = this.dialog.open(LoadingComponent, {  disableClose: true, autoFocus: false, scrollStrategy: this.overlay.scrollStrategies.noop()});
      this.isOpen = true;
    }
  }
  public hide(){
    this.myDialogRef.close();
    this.isOpen = false;
  }

  public hideAll() {
    this.dialog.closeAll();
    this.isOpen = false;
  }
}
