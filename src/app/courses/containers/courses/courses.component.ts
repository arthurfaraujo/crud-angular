import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    MatSnackBarModule,
    CoursesListComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.refresh();
  }

  private refresh() {
    this.courses$ = this.coursesService.getAll().pipe(
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
    this.coursesService.delete(id).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError('There was an error deleting the course...'),
    });
    this.refresh();
  }

  onEdit(id: string) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  /* private onDeleteError() {
    this.snackBar.open('There was an error deleting the course...', 'Close', { duration: 3000 });
  } */

  private onSuccess() {
    this.snackBar.open('Course deleted successfully!', 'Close', {
      duration: 3000,
    });
  }
}
