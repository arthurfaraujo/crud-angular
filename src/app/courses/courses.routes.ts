import { Routes } from '@angular/router';
import { CoursesComponent } from './containers/courses/courses.component';
import { courseResolver } from './guards/course.resolver';

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./containers/courses/courses.component').then(
        (m) => m.CoursesComponent
      ),
  },
  {
    path: 'new',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/courses-form/courses-form.component').then(
        (m) => m.CoursesFormComponent
      ),
    resolve: { course: courseResolver },
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/courses-form/courses-form.component').then(
        (m) => m.CoursesFormComponent
      ),
    resolve: { course: courseResolver },
  },
];
