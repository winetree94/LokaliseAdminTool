import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { finalize, startWith, tap } from 'rxjs/operators';
import { useListAllKeys, useMultiUpdate } from 'src/app/pages/keys/keys.api';
import { SettingsSelectors } from 'src/app/stores/settings/settings.selectors';
import { useTypedStore } from 'src/app/stores/typed-store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { KeysActions } from 'src/app/stores/keys/keys.actions';
import { SettingsActions } from 'src/app/stores/settings/settings.actions';
import { KeysSelectors } from 'src/app/stores/keys/keys.selectors';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { LokaliseKey } from '../../stores/keys/keys.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { KeysSnapshotSelectors } from '../../stores/keys-snapshot/keys-snapshot.selectors';
import { isEqual } from 'lodash';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  PushPreviewComponent,
  PushPreviewDialogData,
} from './push-preview/push-preview.component';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ScrollingModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class KeysComponent {
  private readonly _snackbar = inject(MatSnackBar);
  private readonly _dialog = inject(MatDialog);
  private readonly _store = useTypedStore();
  private readonly _listAllKeys = useListAllKeys();
  private readonly _multiUpdate = useMultiUpdate();

  public readonly searchControl = new FormControl<string>('', {
    nonNullable: true,
  });
  public readonly snapshot = this._store.selectSignal(
    KeysSnapshotSelectors.entities
  );
  public readonly settings = this._store.selectSignal(SettingsSelectors.all);
  public readonly keys = this._store.selectSignal(KeysSelectors.all);

  public pulling = signal(false);

  public viewModel: WritableSignal<{
    [key: string]: {
      selected: boolean;
    };
  }> = signal({});

  public searchControlValue = toSignal(
    this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
    {
      initialValue: '',
    }
  );

  public tagControl = new FormControl<string>('', {
    nonNullable: true,
  });

  public searchFilteredKeys = computed(() => {
    const keys = this.keys();
    const searchValue = this.searchControlValue()
      .split(' ')
      .filter((v) => v);
    if (!searchValue.length) {
      return keys;
    }
    return keys.filter((key) => {
      return searchValue.includes(key.key_name.web);
    });
  });

  public selectedKeys = computed(() => {
    const viewModel = this.viewModel();
    const keys = this.keys();
    return keys.filter((key) => {
      return viewModel[key.key_id]?.selected;
    });
  });

  public filteredSelectedCount = computed(() => {
    const filtered = this.searchFilteredKeys();
    const viewModel = this.viewModel();
    return filtered.reduce((acc, cur) => {
      if (viewModel[cur.key_id]?.selected) {
        return acc + 1;
      }
      return acc;
    }, 0);
  });

  public toggleSelectAll(): void {
    const viewModel = this.viewModel();
    const filtered = this.searchFilteredKeys();
    const allSelected = filtered.every(
      (key) => viewModel[key.key_id]?.selected
    );
    this.viewModel.update((viewModel) => {
      filtered.forEach((key) => {
        if (!viewModel[key.key_id]) {
          viewModel[key.key_id] = {
            selected: false,
          };
        }
        viewModel[key.key_id].selected = !allSelected;
      });
      return viewModel;
    });
  }

  public toggleSelect(key: number): void {
    this.viewModel.update((viewModel) => {
      if (!viewModel[key]) {
        viewModel[key] = {
          selected: false,
        };
      }
      viewModel[key].selected = !viewModel[key].selected;
      return viewModel;
    });
  }

  public onSubmitTag(): void {
    if (!this.tagControl.value) {
      return;
    }
    this._store.dispatch(
      KeysActions.updateMany({
        updates: this.selectedKeys().map((key) => ({
          id: key.key_id,
          changes: {
            tags: [...key.tags, this.tagControl.value],
          },
        })),
      })
    );
  }

  public onPullClick(): void {
    if (this.pulling()) {
      return;
    }
    this.pulling.set(true);
    const settings = this.settings();
    this._listAllKeys({
      project_id: settings.projectId,
      branch: settings.branch,
    })
      .pipe(
        tap((res) => {
          this._store.dispatch(
            KeysActions.load({
              keys: res.map((key) => ({
                ...key,
                project_id: settings.projectId,
              })),
            })
          );
          this._store.dispatch(
            SettingsActions.set({
              settings: {
                ...settings,
                lastKeyFetched: new Date().toISOString(),
              },
            })
          );
        }),
        finalize(() => this.pulling.set(false))
      )
      .subscribe();
  }

  public trackByFn(index: number, item: LokaliseKey): any {
    return item.key_id;
  }

  public onPushClick(): void {
    const settings = this.settings();
    const snapshot = this.snapshot();
    const current = this.keys();

    const diff = current.filter((key) => {
      return !isEqual(key, snapshot[key.key_id]);
    });

    if (!diff.length) {
      this._snackbar.open('no diff ');
      return;
    }

    this._multiUpdate({
      project_id: settings.projectId,
      keys: diff.map((key) => ({
        key_id: key.key_id,
        tags: key.tags,
      })),
    })
      .pipe(
        finalize(() => {
          this._snackbar.open('successfully updated');
        })
      )
      .subscribe();
  }
}
