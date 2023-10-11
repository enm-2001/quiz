import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  title! : string
  message! : string

  constructor(){ }
  ngOnInit(){
    this.message = history.state.data
    $('#alertModal').modal('show');
  }
}
