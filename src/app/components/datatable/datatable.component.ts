import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from "@angular/core";
import { FormControl, FormGroup, FormGroupDirective } from "@angular/forms";
import * as FileSaver from "file-saver";
import * as _ from "lodash";
import * as moment from "moment";
import { NzModalService, NzNotificationService } from "ng-zorro-antd";
import * as Papa from "papaparse";
import { Observable } from "rxjs";
import { filter } from "../../utils";
import { EditorModalComponent } from "../editor-modal/editor-modal.component";
import { Column, ColumnType, EditorType, FilterType } from "./column";

@Component({
  selector: "rc-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"],
})
export class DatatableComponent implements OnInit, OnChanges {
  @ViewChild("editTextCellTpl", { static: false })
  public editTextCellTpl: TemplateRef<any>;
  @ViewChild("editDateCellTpl", { static: false })
  public editDateCellTpl: TemplateRef<any>;
  @ViewChild("dateCellTpl", { static: true }) public dateCellTpl: TemplateRef<
    any
  >;
  @ViewChild("hdrTpl", { static: true }) public hdrTpl: TemplateRef<any>;
  @ViewChild("dataTable", { static: true }) public table: any;
  @ViewChild("editingDialogTpl", { static: false })
  public editingDialogTpl: any;
  @Input() public rowDetailsHeight: number | Function;
  @Input() public rowDetailsTemplate: TemplateRef<any>;
  @Input() public columns: Column[];
  @Input() public title: string;
  @Input() public rows: object[];
  @Input() public filters: {} = {};
  @Input() public sorts: any = [];
  @Input() public rowClass: any;
  @Output() public editComplete: EventEmitter<object> = new EventEmitter();
  @Output() public filterUpdate: EventEmitter<object> = new EventEmitter();
  @Output() public editingFormChange: EventEmitter<
    FormGroup
  > = new EventEmitter<FormGroup>();

  public renderColumns: Column[];
  public isLoading = true;

  public lodash = _;

  private sourceRows: object[];
  private editableColumns: Column[];

  constructor(
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  public ngOnInit(): void {
    this.initColumnConfigs();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns && changes.columns.currentValue) {
      this.initColumnConfigs();
    }

    if (changes.rows && changes.rows.currentValue instanceof Array) {
      this.sourceRows = [...changes.rows.currentValue];
      this.isLoading = false;
      this.filterData();
    } else if (changes.rows && changes.rows.currentValue === null) {
      this.sourceRows = [];
      this.isLoading = true;
      this.filterData();
    }

    if (changes.filters && !_.isEmpty(changes.filters.currentValue)) {
      this.filterData();
    }
  }

  public onFilterUpdated(prop: any, value: any): void {
    this.filterUpdate.emit({ prop, value });
    this.filterData();
  }

  public onFilterInputSelect(event: Event): void {
    // Fix If the filtered data is not empty, the input can not be all selected (Ctrl + a).
    // https://project.rightcapital.com/secure/RapidBoard.jspa?rapidView=2&view=detail&selectedIssue=PROJ-4486&quickFilter=3
    event.stopPropagation();
  }

  public exportCsv(): void {
    const columns = _(this.columns)
      .filter(column => column.exportable)
      .uniqBy(column => column.prop)
      .value();

    const dateColumns = _.filter(columns, column => {
      return column.type === ColumnType.date;
    });

    const customRenderColumns = _.filter(columns, column => {
      return column.exportRender instanceof Function;
    });

    const data = _(this.rows)
      .map(row => {
        const result = {};
        _.each(columns, (column: Column) => {
          result[column.prop] = _.get(row, column.prop);
        });

        return result;
      })
      // Process date props
      .map(row => {
        _.each(dateColumns, (column: Column) => {
          if (!row[column.prop] || !moment(row[column.prop]).isValid()) {
            return;
          }
          row[column.prop] = moment(row[column.prop]).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });

        return row;
      })
      // Process custom render
      .map(row => {
        _.each(customRenderColumns, (column: Column) => {
          row[column.prop] = column.exportRender(row[column.prop]);
        });

        return row;
      })
      .map(row => {
        const result = {};
        _.each(columns, (column: Column) => {
          result[column.name] = _.get(row, column.prop);
        });

        return result;
      })
      .value();

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const date = moment().format("YYYYMMDD");
    FileSaver.saveAs(blob, `admin-${date}.csv`);
  }

  public onEditRow(
    row: any,
    extraTpl?: TemplateRef<any>,
    formControls?: { [key: string]: FormControl }
  ): void {
    if (this.editableColumns.length === 0 && !extraTpl) {
      return;
    }

    const loadingEvent = new EventEmitter<boolean>();
    const onSubmitEvent = new EventEmitter<any>();
    const onFormChangeEvent = new EventEmitter<FormGroupDirective>();

    const formGroup = new FormGroup({});

    _.forEach(this.editableColumns, (column: Column) => {
      if (column.editor.FormControl) {
        const formControl = _.clone(column.editor.FormControl);
        formControl.setValue(row[column.prop]);
        formGroup.setControl(column.prop, formControl);
      } else {
        formGroup.setControl(column.prop, new FormControl(row[column.prop]));
      }
    });

    _.each(formControls, (control, name) => {
      formGroup.setControl(name, control);
    });

    const createModal = (showRow = null): any => {
      return this.modalService.create({
        nzTitle: "Edit",
        nzContent: EditorModalComponent,
        nzComponentParams: {
          loadingEvent: loadingEvent,
          onSubmitEvent: onSubmitEvent,
          onFormChangeEvent: onFormChangeEvent,
          data: {
            columns: _.clone(this.editableColumns),
            row: showRow ? _.clone(showRow) : _.clone(row),
            extraTpl: _.clone(extraTpl),
            formGroup: formGroup,
          },
        },
        nzFooter: null,
        nzZIndex: 900,
      });
    };

    let modalRef = createModal();

    onSubmitEvent.subscribe(editedRow => {
      loadingEvent.emit(true);

      const updateComplete = (observable: Observable<any>): any => {
        observable.subscribe(
          () => {
            _.assign(row, editedRow);
            this.notification.success("Congratulations", "Updated");
            modalRef.destroy();
          },
          error => {
            loadingEvent.emit(false);
            modalRef.destroy();
            modalRef = createModal(editedRow);
            error.alert();
          }
        );
      };

      this.editComplete.emit({
        row: editedRow,
        complete: updateComplete.bind(this),
      });
    });

    onFormChangeEvent.subscribe((form: FormGroupDirective) => {
      this.editingFormChange.emit(form.form);
    });
  }

  private initColumnConfigs(): void {
    this.columns.forEach((column: Column) => {
      if (column.type === undefined) {
        column.type = ColumnType.text;
      }

      if (column.visible === undefined) {
        column.visible = true;
      }

      if (column.exportable === undefined) {
        column.exportable = true;
      }

      // Filters
      if (
        typeof column.filter === "object" &&
        column.filter.type === FilterType.dropdown &&
        this.filters[column.prop] === undefined
      ) {
        this.filters[column.prop] = "*";
      }

      if (column.filter === undefined) {
        column.filter = {
          type: FilterType.text,
          disabled: false,
          visible: true,
        };
      }

      if (column.filter === false) {
        column.filter = {
          type: FilterType.text,
          disabled: false,
          visible: false,
        };
      }

      if (column.filter.exactMatch === undefined) {
        if (column.prop === "id" || _.endsWith(column.prop, "_id")) {
          column.filter.exactMatch = true;
        }
      }

      if (column.filter.visible === undefined) {
        column.filter.visible = true;
      }

      // Editor
      if (column.editor === undefined) {
        column.editor = { type: EditorType.text };
      }

      // Header Template
      if (column.headerTemplate === undefined) {
        column.headerTemplate = this.hdrTpl;
      }

      // Cell Template
      if (column.cellTemplate === undefined) {
        if (column.type === ColumnType.date) {
          column.cellTemplate = this.dateCellTpl;
        }
      }

      // Sortable
      if (
        typeof column.filter === "object" &&
        column.filter.type === FilterType.dropdown
      ) {
        column.sortable = false;
      }

      // Min width
      if (column.filter !== false && column.width < 80) {
        column.width = 80;
      }
    });

    this.editableColumns = _.filter(this.columns, { editable: true });
    this.renderColumns = _.filter(this.columns, { visible: true });
  }

  private filterData(): void {
    const exactMatchColumns = this.getExactMatchColumns();

    const numberColumns = this.getNumberColumns();

    _(numberColumns).each(column => {
      if (this.filters[column]) {
        this.filters[column] = this.filters[column].replace(/[^\d\.\-]/g, "");
      }
    });

    this.rows = filter(this.sourceRows, this.filters, exactMatchColumns);
  }

  private getNumberColumns(): string[] {
    return _(this.columns)
      .filter(column => {
        return column.type === ColumnType.number;
      })
      .map(column => {
        return column.prop;
      })
      .value();
  }

  private getExactMatchColumns(): string[] {
    const columns = _.filter(this.columns, (column: Column) => {
      if (!column.filter) {
        return false;
      }

      return (
        column.filter.type === FilterType.dropdown || column.filter.exactMatch
      );
    });

    return _.map(columns, (column: Column) => {
      return column.prop;
    });
  }
}
