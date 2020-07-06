import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ListArticleFavoriteComponent } from "./list-article-favorite/list-article-favorite.component";
import { CreateArticleComponent } from "./create-article/create-article.component";
import { ListArticleCreatedComponent } from "./list-article-created/list-article-created.component";
import { UserSettingsComponent } from "./user-settings/user-settings.component";
import { AdministratorRoleManagementComponent } from "./administrator-role-management/administrator-role-management.component";
import { EditTypeComponent } from "./edit-type/edit-type.component";
import { ArticleCategoryComponent } from "./article-category/article-category.component";
import { EditLanguageComponent } from "./edit-language/edit-language.component";
import { UserProfilComponent } from "./user-profil/user-profil.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { AddLanguageAndTypeComponent } from "./add-language-and-type/add-language-and-type.component";

const routes: Routes = [
  { path: "userProfil",component : UserProfilComponent},
  { path: "liste", component: ListArticleFavoriteComponent },
  { path: "createArticle", component: CreateArticleComponent },
  { path: "createdArticles", component: ListArticleCreatedComponent},
  { path: "userSettings",component: UserSettingsComponent },
  { path: "roleManagement",component: AdministratorRoleManagementComponent},
  { path: "editType",component: EditTypeComponent},
  { path: "AddOrEditCategory",component: ArticleCategoryComponent},
  { path: "editLanguage",component: EditLanguageComponent},
  { path: "goHome",component: HomePageComponent},
  { path: "addTypeAndLanguage",component: AddLanguageAndTypeComponent},
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
