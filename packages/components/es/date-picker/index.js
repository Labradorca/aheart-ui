import _sfc_main$1 from "./date-picker.vue.js";
import _sfc_main from "./date-range-picker.vue.js";
import { withInstall } from "../utils/install.js";
import { datePickerEmits, datePickerProps, dateRangePickerEmits, dateRangePickerProps } from "./types.js";
const DateRangePicker = withInstall(
  _sfc_main,
  "ADateRangePicker"
);
const InstalledDatePicker = withInstall(_sfc_main$1, "ADatePicker");
InstalledDatePicker.RangePicker = DateRangePicker;
export {
  InstalledDatePicker as DatePicker,
  DateRangePicker,
  datePickerEmits,
  datePickerProps,
  dateRangePickerEmits,
  dateRangePickerProps,
  InstalledDatePicker as default
};
