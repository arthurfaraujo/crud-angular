import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  getAllCourses() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first()
      // delay(5000),
      // tap((courses) => console.log(courses))
    );
  }

  createCourse(course: Course) {
    return this.httpClient.post<Course>(this.API, course);
  }

  deleteCourse(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
