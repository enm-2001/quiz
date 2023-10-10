import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit{
  // showModal! : boolean 
  category_id! : string

  constructor(private el: ElementRef, private router: Router, private _route: ActivatedRoute) { }
  ngOnInit(){
    this.category_id = this._route.snapshot.params['category_id']
    // console.log(this.category_id);
    $('#staticBackdrop').modal('show');
    // this.showModal = true
  }

  // startQuiz(){
  //   const modalDiv = this.el.nativeElement.querySelector('#exampleModal');
  //   modalDiv.classList.remove('fade');
  //   this.router.navigate(['/questions'])
  // }
}
