import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { useTypedStore } from 'src/app/stores/typed-store';
import { MatButtonModule } from '@angular/material/button';
import { SettingsActions } from 'src/app/stores/settings/settings.actions';
import { SettingsSelectors } from 'src/app/stores/settings/settings.selectors';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class SettingsComponent {
  private readonly _snackbar = inject(MatSnackBar);
  private readonly _store = useTypedStore();
  private readonly _settings = this._store.selectSignal(SettingsSelectors.all);

  public readonly formGroup = new FormGroup({
    projectId: new FormControl(this._settings().projectId || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    apiKey: new FormControl(this._settings().apiKey || '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    branch: new FormControl(this._settings().branch || '', {
      nonNullable: true,
      validators: [],
    }),
  });

  public onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const values = this.formGroup.getRawValue();
    this._store.dispatch(
      SettingsActions.set({
        settings: {
          ...this._settings(),
          projectId: values.projectId || '',
          apiKey: values.apiKey || '',
          branch: values.branch || '',
        },
      })
    );
    this._snackbar.open('saved', '', {
      duration: 1000,
    });
  }
}
