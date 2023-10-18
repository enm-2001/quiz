import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { StartQuizComponent } from './components/start-quiz/start-quiz.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AddQuestionComponent } from './admin/add-question/add-question.component';
import { AdminQuestionsComponent } from './admin/admin-questions/admin-questions.component';
import { AlertComponent } from './components/alert/alert.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { SettingsComponent } from './components/settings/settings.component';
import { QuizChartComponent } from './components/quiz-chart/quiz-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PageNotFoundComponent,
    NavbarComponent,
    BannerComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminCategoriesComponent,
    AddCategoryComponent,
    CategoriesComponent,
    StartQuizComponent,
    QuestionsComponent,
    AddQuestionComponent,
    AdminQuestionsComponent,
    AlertComponent,
    ProfileComponent,
    EvaluationComponent,
    SettingsComponent,
    QuizChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
