import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit{
  category_id! : string

  constructor(private el: ElementRef, private router: Router, private _route: ActivatedRoute) { }
  ngOnInit(){
    this.category_id = this._route.snapshot.params['category_id']
    $('#staticBackdrop').modal('show');
  }
}
