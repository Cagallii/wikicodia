import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ListArticleFavoriteComponent } from "./list-article-favorite/list-article-favorite.component";
import { ListArticleAwaitingValidationComponent } from "./list-article-awaiting-validation/list-article-awaiting-validation.component";
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateArticleComponent } from "./create-article/create-article.component";
import { ListArticleCreatedComponent } from "./list-article-created/list-article-created.component";
import { UserSettingsComponent } from "./user-settings/user-settings.component";
import { AdministratorRoleManagementComponent } from "./administrator-role-management/administrator-role-management.component";
import { ArticleCategoryComponent } from "./article-category/article-category.component";
import { UserProfilComponent } from "./user-profil/user-profil.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ArticleConsultationComponent } from "./article-consultation/article-consultation.component";

import { AdminCategoryMgmtComponent } from "./admin-category-mgmt/admin-category-mgmt.component";
import { AdminTypeMgmtComponent } from "./admin-type-mgmt/admin-type-mgmt.component";
import { AdminLanguageMgmtComponent } from "./admin-language-mgmt/admin-language-mgmt.component";
import { AdminFrameworkMgmtComponent } from "./admin-framework-mgmt/admin-framework-mgmt.component";

import { AddCategoryComponent } from "./add-category/add-category.component";
import { AddTypeComponent } from "./add-type/add-type.component";
import { AddLanguageComponent } from "./add-language/add-language.component";
import { AddFrameworkComponent } from "./add-framework/add-framework.component";
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "userProfil",component : UserProfilComponent},
  { path: "liste", component: ListArticleFavoriteComponent },
  { path: "categories/all", component: AdminCategoryMgmtComponent },
  { path: "types/all", component: AdminTypeMgmtComponent },
  { path: "langages/all", component: AdminLanguageMgmtComponent },
  { path: "frameworks/all", component: AdminFrameworkMgmtComponent },
  { path: "categories/creation", component: AddCategoryComponent },
  { path: "types/creation", component: AddTypeComponent },
  { path: "langages/creation", component: AddLanguageComponent },
  { path: "frameworks/creation", component: AddFrameworkComponent },
  { path: "connexion", component: LoginComponent },
  { path: "articleConsultation", component: ArticleConsultationComponent},
  { path: "createArticle", component: CreateArticleComponent },
  { path: "createdArticles", component: ListArticleCreatedComponent},
  { path: "articles/pending", component: ListArticleAwaitingValidationComponent},
  { path: "userSettings",component: UserSettingsComponent },
  { path: "roleManagement",component: AdministratorRoleManagementComponent},
  { path: "AddOrEditCategory",component: ArticleCategoryComponent},
  { path: "goHome",component: HomePageComponent},
  { path: "register",component: RegisterComponent},
  { path: "profil",component: UserProfilComponent},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
