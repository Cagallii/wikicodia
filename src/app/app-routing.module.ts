import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ListArticleFavoriteComponent } from "./list-article-favorite/list-article-favorite.component";
import {ArticleConsultationComponent} from "./article-consultation/article-consultation.component";

const routes: Routes = [
  { path: "liste", component: ListArticleFavoriteComponent },
  { path: "", component: ArticleConsultationComponent},

];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
