import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-article-consultation',
  templateUrl: './article-consultation.component.html',
  styleUrls: ['./article-consultation.component.css']
})
export class ArticleConsultationComponent implements OnInit {

  constructor(private dialog: MatDialog) { }


  openDialog() {

    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "50%";


    // dialogConfig.data = {
    //   id: 1,
    //   title: 'Angular For Beginners'
    // };

    this.dialog.open(ArticleConsultationComponentDialog, dialogConfig);

    const dialogRef = this.dialog.open(ArticleConsultationComponentDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }


  ngOnInit() {
  }


}



@Component({
  selector: 'app-article-consultation-dialog',
  templateUrl: 'article-consultation-dialog.html',
  styleUrls: ['./article-consultation.component.css']

})
export class ArticleConsultationComponentDialog {

  form: FormGroup;
  // depreciated:boolean;
  // doesntwork:boolean;
  // otherreason:boolean;
  // description:string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ArticleConsultationComponentDialog>,
    @Inject(MAT_DIALOG_DATA) data) {
      // depreciated = data.depreciated;
      // doesntwork = data.doesntwork;
      // this.otherreason = data.otherreason;
      // this.description = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
      depreciated: [false],
      doesntwork: [false],
      otherreason: [false],
      description: [""],
      });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}

