import { Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
// declare var $: any;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  title! : string
  message! : string
  private confirmDialog! : Modal
  @ViewChild('alert',{static: true}) dialogRef! : ElementRef

  constructor(){ }
  ngOnInit(){
    this.message = history.state.data
    this.confirmDialog = new Modal(this.dialogRef.nativeElement)
    this.confirmDialog.show()
    // $('#alertModal').modal('show');
  }
}
