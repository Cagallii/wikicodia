import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ListArticleFavoriteComponent } from "./list-article-favorite/list-article-favorite.component";
import { AdminCategoryMgmtComponent } from "./admin-category-mgmt/admin-category-mgmt.component";
import { AdminTypeMgmtComponent } from "./admin-type-mgmt/admin-type-mgmt.component";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { AddTypeComponent } from "./add-type/add-type.component";

const routes: Routes = [
  { path: "liste", component: ListArticleFavoriteComponent },
  { path: "categories/all", component: AdminCategoryMgmtComponent },
  { path: "types/all", component: AdminTypeMgmtComponent },
  { path: "categories/creation", component: AddCategoryComponent },
  { path: "types/creation", component: AddTypeComponent },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
