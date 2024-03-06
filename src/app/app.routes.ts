import { Routes } from '@angular/router';
import { ListComponent } from './pages/tasks/list/list.component';
import { DetailComponent } from './pages/tasks/detail/detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'detail', component: DetailComponent },
];
