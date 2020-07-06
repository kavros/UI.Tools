import { Component, Input, Optional, Host, OnInit } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'inline-edit',
  styleUrls: ['inline-edit.component.scss'],
  template: `
    <form (ngSubmit)="onSubmit()">
      <div >{{line1}}</div>
      <div >{{line2}}</div>
      <br>
      <mat-form-field>
        <mat-label>{{inputTitle}}</mat-label>
        <input matInput maxLength="140" name="comment" [(ngModel)]="comment">
        <mat-hint align="end">{{comment?.length || 0}}/140</mat-hint>
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">Άκυρο</button>
        <button mat-button type="submit" color="primary">Οκ</button>
      </div>
    </form>
  `
})
export class InlineEditComponent implements OnInit {
  private _value = '';
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.comment = this._value = x;
  }
  @Input() line1: string;
  @Input() line2: string;

  @Input() inputTitle;
  comment = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.comment = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.comment);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }
}
