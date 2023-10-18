import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Modal } from 'bootstrap';
// declare var $: any;
@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit{
  category_id! : string
  // modalRef!: BsModalRef;
  @ViewChild('startQuiz',{static: true}) dialogRef! : ElementRef
  // @ViewChild('startQuiz') dialog!: ElementRef;
  // @ViewChild('modalTemplate') startModal!: TemplateRef<any>;

  private confirmDialog! : Modal
  constructor(private el: ElementRef, private router: Router, private _route: ActivatedRoute) { }
  ngOnInit(){
    this.category_id = this._route.snapshot.params['category_id']
  
    // this.modalRef = this.modalService.show(this.startModal);
    // const modal = new bootstrap.Modal(this.startQuiz.nativeElement);
    // modal.show();
    // console.log(this.dialogRef)

    // myModal.show(this.dialogRef.nativeElement)
    // console.log(this.dialogRef.nativeElement.classList)
    // this.dialogRef.nativeElement.addEventListener('show.bs.modal', (event: any) => {
    //   this.processDialogEvent(event);
    // })
    // $('#staticBackdrop').modal('show');
    this.confirmDialog = new Modal(this.dialogRef.nativeElement)
    this.confirmDialog.show()
  }

  // private processDialogEvent(evt: Event){
  //   console.log(`${evt.type}`);
    
  // }
}
