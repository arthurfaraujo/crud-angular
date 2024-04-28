import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    AsyncPipe,
    MatIconModule,
    CategoryPipe,
    MatSnackBarModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  displayedColumns: string[] = ['name', 'category', 'actions'];
  courses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.courses$ = this.coursesService.getAllCourses().pipe(
      catchError(() => {
        this.onError('There was an error when getting the courses...');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    // console.log(this.route);
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onDelete(id: number) {
    this.coursesService.deleteCourse(id).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onDeleteError(),
    });
  }

  private onDeleteError() {
    this.snackBar.open('There was an error...', 'Close', { duration: 3000 });
  }

  private onSuccess() {
    this.snackBar.open('Course deleted successfully!', 'Close', {
      duration: 3000,
    });
  }
}
