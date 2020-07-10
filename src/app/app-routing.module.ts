import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ListArticleFavoriteComponent } from "./list-article-favorite/list-article-favorite.component";

import { AdminCategoryMgmtComponent } from "./admin-category-mgmt/admin-category-mgmt.component";
import { AdminTypeMgmtComponent } from "./admin-type-mgmt/admin-type-mgmt.component";
import { AdminLanguageMgmtComponent } from "./admin-language-mgmt/admin-language-mgmt.component";
import { AdminFrameworkMgmtComponent } from "./admin-framework-mgmt/admin-framework-mgmt.component";

import { AddCategoryComponent } from "./add-category/add-category.component";
import { AddTypeComponent } from "./add-type/add-type.component";
import { AddLanguageComponent } from "./add-language/add-language.component";
import { AddFrameworkComponent } from "./add-framework/add-framework.component";

const routes: Routes = [
  { path: "liste", component: ListArticleFavoriteComponent },
  { path: "categories/all", component: AdminCategoryMgmtComponent },
  { path: "types/all", component: AdminTypeMgmtComponent },
  { path: "langages/all", component: AdminLanguageMgmtComponent },
  { path: "frameworks/all", component: AdminFrameworkMgmtComponent },
  { path: "categories/creation", component: AddCategoryComponent },
  { path: "types/creation", component: AddTypeComponent },
  { path: "langages/creation", component: AddLanguageComponent },
  { path: "frameworks/creation", component: AddFrameworkComponent },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
