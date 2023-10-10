import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    // console.log(history.state.data);
    this.message = history.state.data
    $('#alertModal').modal('show');
  }
}
