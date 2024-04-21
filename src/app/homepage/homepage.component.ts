import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';

import { Course } from './model/course';
import { CoursesService } from './services/courses.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatToolbarModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  displayedColumns: string[] = ['name', 'category'];
  courses: Observable<Course[]>;

  constructor(private coursesService: CoursesService) {
    this.courses = this.coursesService.getAllCourses();
  }
}
