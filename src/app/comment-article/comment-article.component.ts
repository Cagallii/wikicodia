import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import{ArticleService} from '../services/article.service';
import Article from '../model/Article';
import { AppService } from '../app.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-comment-article',
  templateUrl: './comment-article.component.html',
  styleUrls: ['./comment-article.component.css']
})
export class CommentArticleComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private articleService :ArticleService,     
    private app: AppService, private router: Router, private activatedRoute: ActivatedRoute) {

    }

  commentArticleForm: FormGroup;
  comAdmin: string;
  id: number;
  // updatedArticle: Article = new Article();
  // this.updatedArticle = this.articleService.getOneArticle(1);

  ngOnInit() {
    this.commentArticleForm = new FormGroup({
      comAdmin: new FormControl('', [Validators.required])
    });

    //this.activatedRoute.queryParams.subscribe(params => {
      // this.id = params['id'];
      this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
      // console.log(params['id']);
    // });
  }

  hasError(controlName: string, errorName: string){
    return this.commentArticleForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.commentArticleForm.invalid) {
      return;
    }
    else if (this.app.authenticated) {
      this.comAdmin = this.commentArticleForm.controls['comAdmin'].value;
      this.articleService.comment(this.id, this.comAdmin).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/articles/pending']);
        },
        error => console.log(error));
    }
  }

  onCancel() {
    this.commentArticleForm.reset();
    this.router.navigate(['/articles/pending']);
  }

}
