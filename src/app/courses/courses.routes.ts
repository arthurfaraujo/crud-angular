import { Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/courses/courses.component').then(
        (m) => m.CoursesComponent
      ),
  },
];