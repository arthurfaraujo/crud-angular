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

  save(course: Partial<Course>) {
    return course._id ? this.update(course) : this.create(course);
  }

  private create(course: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, course);
  }

  private update(course: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${course._id}`, course);
  }

  deleteCourse(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  getById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }
}
