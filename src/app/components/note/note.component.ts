import { Component, OnInit, OnDestroy, Output,Input, EventEmitter  } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { NoteService } from './note.service'
declare var $ :any;

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, OnDestroy {
  
  public noteWrite:boolean = false
  public noteRead:boolean = true
  public readNote:boolean = false
  private unsubscribe$ = new Subject();
  @Input() orderForNote:any = { note : [] }
  @Input() nameNote = ""
  @Input() user = ""
  @Input() userView = ""


  constructor(private noteService:NoteService) {

  }

  public ngOnInit() {
    //.pipe(takeUntil(this.unsubscribe$))   view == true
    /*for (const key in this.orderForNote.note) {
      if(this.orderForNote.note[key].userView == this.user && this.orderForNote.note[key].view == false){
        this.orderForNote.note[key].view = true
        this.readNote = true
      }
    }*/
    this.editor()
  }

  editor(){
    $(function () {
      $('.textarea').wysihtml5()
    })
  }

  public sendNote(text, display){
    let note = {
      view:false,
      text:text,
      name:this.nameNote,
      user:this.user,
      userView:this.userView
    }
    this.noteService.sendNote(this.orderForNote.PRIMARY_KEY, note)
    this.noteWrite = false
    this.noteRead = true
    if(display){
      $('#displayNoteWrite').modal('toggle');
    }
    
  }

  public setNoteWrite(){
    this.noteWrite = true
    this.noteRead = false
  }

  public setNoteRead(){
    this.noteWrite = false
    this.noteRead = true
  }

  public setReadNote(){
    console.log("ler")
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log("destruir")
  }
    
}
