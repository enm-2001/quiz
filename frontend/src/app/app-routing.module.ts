import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddQuestionComponent } from './admin/add-question/add-question.component';
import { StartQuizComponent } from './components/start-quiz/start-quiz.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AdminGuard } from './auth/auth.guard';
import { UserGuard } from './auth/user.guard';
import { AdminQuestionsComponent } from './admin/admin-questions/admin-questions.component';
import { AlertComponent } from './components/alert/alert.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: '' , component: DashboardComponent},
  { path: 'signup' , component: RegisterComponent, canActivate: [UserGuard]},
  { path: 'login' , component: LoginComponent, canActivate: [UserGuard]},
  { path: 'admin', component: AdminDashboardComponent},
  { path: 'admin-users', component: AdminUsersComponent, canActivate: [AdminGuard]},
  { path: 'admin-categories', component: AdminCategoriesComponent, canActivate: [AdminGuard]},
  { path: 'admin-questions/:category_id', component: AdminQuestionsComponent, canActivate: [AdminGuard]},
  { path: 'add-category', component: AddCategoryComponent, canActivate: [AdminGuard]},
  { path: 'add-question/:category_id', component: AddQuestionComponent, canActivate: [AdminGuard]},
  { path: 'start-quiz/:category_id', component: StartQuizComponent, canActivate: [UserGuard]},
  { path: 'questions/:category_id', component: QuestionsComponent, canActivate: [UserGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [UserGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [UserGuard]},
  { path: 'evaluation', component: EvaluationComponent},
  { path: 'alert', component: AlertComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
