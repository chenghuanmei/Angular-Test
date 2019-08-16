import { TemplateRef } from "@angular/core";
import { FormControl } from "@angular/forms";

export interface Column {
  prop?: string;
  name?: string;
  type?: ColumnType;
  editable?: boolean;
  visible?: boolean;
  frozenLeft?: boolean;
  frozenRight?: boolean;
  editor?: {
    type: EditorType;
    multiple?: boolean;
    options?: Array<{ label: string; value: any }>;
    hint?: string;
    FormControl?: FormControl;
  };
  sortable?: boolean;
  exportable?: boolean;
  exportRender?: Function;
  width?: number;
  filter?: {
    exactMatch?: boolean; // this is enabled by default if column.prop equals to `id` or ends with `_id`
    disabled?: boolean;
    visible?: boolean;
    type?: FilterType;
    options?: Array<{
      label: string;
      value: any;
    }>;
  };
  headerTemplate?: TemplateRef<any>;
  cellTemplate?: TemplateRef<any>;
}

export enum ColumnType {
  text = "text",
  date = "date",
  array = "array",
  number = "number",
}
export enum EditorType {
  text = "text",
  datepicker = "datepicker",
  dropdown = "dorpdown",
}
export enum FilterType {
  text = "text",
  dropdown = "dropdown",
  number = "number",
}
