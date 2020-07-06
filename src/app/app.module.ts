import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatCardModule, MatToolbar, MatButtonModule } from "@angular/material";
import {MatIconModule} from '@angular/material/icon';


import {A11yModule} from '@angular/cdk/a11y';
// import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
// import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';


import { AppComponent } from "./app.component";
import { AboutComponent } from "./about/about.component";
import { AddLanguageAndTypeComponent } from "./add-language-and-type/add-language-and-type.component";
import { AdministratorRoleManagementComponent } from "./administrator-role-management/administrator-role-management.component";
import { ArticleAwaitingValidationComponent } from "./article-awaiting-validation/article-awaiting-validation.component";
import { EditLanguageComponent } from "./edit-language/edit-language.component";
import { EditTypeComponent } from "./edit-type/edit-type.component";
import { ArticlePromotedHomeComponent } from "./article-promoted-home/article-promoted-home.component";
import { ArticleSuggestionHomeComponent } from "./article-suggestion-home/article-suggestion-home.component";
import { ArticleConsultationComponent } from "./article-consultation/article-consultation.component";
import { CarouselArticleComponent } from "./carousel-article/carousel-article.component";
import { CreateArticleComponent } from "./create-article/create-article.component";
import { ListArticleCreatedComponent } from "./list-article-created/list-article-created.component";
import { ListArticleFavoriteComponent } from "./list-article-favorite/list-article-favorite.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AdvancedSearchComponent } from "./advanced-search/advanced-search.component";
import { QuickSearchComponent } from "./quick-search/quick-search.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { UserProfilComponent } from "./user-profil/user-profil.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AddLanguageAndTypeComponent,
    AdministratorRoleManagementComponent,
    ArticleAwaitingValidationComponent,
    EditLanguageComponent,
    EditTypeComponent,
    ArticlePromotedHomeComponent,
    ArticleSuggestionHomeComponent,
    ArticleConsultationComponent,
    CarouselArticleComponent,
    CreateArticleComponent,
    ListArticleCreatedComponent,
    ListArticleFavoriteComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    AdvancedSearchComponent,
    QuickSearchComponent,
    SearchResultComponent,
    ToolbarComponent,
    UserProfilComponent,
    MatToolbar,
  ],
  imports: [BrowserModule, AppRoutingModule, MatCardModule, MatButtonModule, MatIconModule,
  
    A11yModule,
    // ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    // MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
