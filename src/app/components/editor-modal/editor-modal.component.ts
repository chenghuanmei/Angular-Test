import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  TemplateRef
} from "@angular/core";
import { FormGroupDirective, NgForm } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import * as _ from "lodash";
import * as moment from "moment";
import { NzModalRef, NzModalService } from "ng-zorro-antd";
import { Column, ColumnType } from "../datatable/column";

@Component({
  selector: "rc-editor-modal",
  templateUrl: "./editor-modal.component.html",
  styleUrls: ["./editor-modal.component.scss"],
})
export class EditorModalComponent implements OnInit {
  public columns: Array<Column>;
  public row: any;
  public extraTpl?: TemplateRef<any>;
  public loading;
  public formGroup: FormGroup;

  @Input() public loadingEvent: EventEmitter<boolean>;
  @Input() public onSubmitEvent: EventEmitter<boolean>;
  @Input() public onFormChangeEvent: EventEmitter<FormGroupDirective>;
  @Input() public data: any;

  constructor(
    private modalRef: NzModalRef,
    private modalService: NzModalService
  ) {}

  public ngOnInit(): void {
    this.loadingEvent.subscribe(loading => {
      this.loading = loading;
    });

    this.formGroup = this.data.formGroup;
    this.columns = this.data.columns;
    this.row = this.data.row;
    this.extraTpl = this.data.extraTpl;

    _(this.columns)
      .filter({ editor: { type: "datepicker" } })
      .each(column => {
        const date = moment(this.row[column.prop]);
        const value = date.isValid() ? date.toDate() : null;
        this.formGroup.controls[column.prop].setValue(value);
      });

    _(this.columns)
      .filter({ editor: { type: "dropdown", multiple: true } })
      .each(column => {
        const selected = [];

        _.forEach(this.row[column.prop], (value: string, keyName: string) => {
          if (value) {
            selected.push(keyName);
          }
        });

        this.formGroup.controls[column.prop].setValue(selected);
        this.row[column.prop] = selected;
      });
  }

  public handleCancel(): void {
    this.modalRef.destroy("onCancel");
  }

  public onChange(form: FormGroupDirective): void {
    // ngModelChange will trigger before form value change.
    // wait to next tick to emit the event.
    setTimeout(() => {
      this.onFormChangeEvent.emit(form);
    });
  }

  public onSubmit(form: NgForm): void {
    if (!form.dirty) {
      this.modalRef.close();

      return;
    }

    const inputs = form.value;

    const dateColumns = _.filter(this.columns, { type: ColumnType.date });

    for (const column of dateColumns) {
      const momentDate = moment(inputs[column.prop]);
      if (
        !momentDate.isValid() ||
        momentDate.isAfter("2099-12-31T23:59:59") ||
        momentDate.isBefore("1990-01-01T00:00:00")
      ) {
        this.modalService.error({
          nzTitle: "ERROR",
          nzContent: column.name + ` is not a valid date`,
          nzZIndex: 1100,
        });

        return;
      }

      inputs[column.prop] = momentDate
        .hours(23)
        .minutes(59)
        .seconds(59)
        .format();
    }

    _(this.columns)
      .filter({ editor: { type: "dropdown", multiple: true } })
      .each(column => {
        const object = {};

        _.forEach(column.editor.options, option => {
          object[option.value] = _.includes(inputs[column.prop], option.value);
        });

        inputs[column.prop] = object;
      });

    const data = _.assign(_.clone(this.row), inputs);

    this.onSubmitEvent.emit(data);
  }
}
