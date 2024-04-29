import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

export const courseResolver: ResolveFn<Course> = (route, state): Observable<Course> => {

  if (route.params && route.params['id']) {
    const service = inject(CoursesService);

    return service.getById(route.params['id'])
  }

  return of({_id: '', name: '', category: ''});
};
