import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./courses/courses.component').then(
        (mod) => mod.CoursesComponent
      ),
  }
];
