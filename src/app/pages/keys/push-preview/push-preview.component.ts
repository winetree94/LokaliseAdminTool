import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LokaliseKey } from '../../../stores/keys/keys.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface PushPreviewDialogData {
  diff: LokaliseKey[];
}

@Component({
  selector: 'app-push-preview',
  templateUrl: './push-preview.component.html',
  styleUrls: ['./push-preview.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class PushPreviewComponent {
  public readonly data = inject<PushPreviewDialogData>(MAT_DIALOG_DATA);
  public readonly ref =
    inject<MatDialogRef<PushPreviewDialogData>>(MatDialogRef);

  public stringified = this.data.diff.map((key) => JSON.stringify(key));
}
