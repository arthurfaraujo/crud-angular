import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './courses-form.component.html',
  styleUrl: './courses-form.component.scss',
})
export class CoursesFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      _id: [undefined],
      name: [null],
      category: [null],
    });
  }

  onSubmit() {
    this.service.createCourse(this.form.value).subscribe(
      {
        next: () => this.onSuccess(),
        error: () => this.onError()
      }
    );
  }

  onCancel() {}

  private onError() {
    this.snackBar.open('There was an error...', 'Close', {duration: 3000})
  }

  private onSuccess() {
    this.snackBar.open('Course created successfully!', 'Close', {duration: 3000})
  }
}
