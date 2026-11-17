import _sfc_main$1 from "./time-picker.vue.js";
import _sfc_main from "./time-range-picker.vue.js";
import { withInstall } from "../utils/install.js";
import { timePickerEmits, timePickerProps, timeRangePickerEmits, timeRangePickerProps } from "./types.js";
const TimeRangePicker = withInstall(_sfc_main, "ATimeRangePicker");
const InstalledTimePicker = withInstall(_sfc_main$1, "ATimePicker");
InstalledTimePicker.RangePicker = TimeRangePicker;
export {
  InstalledTimePicker as TimePicker,
  TimeRangePicker,
  InstalledTimePicker as default,
  timePickerEmits,
  timePickerProps,
  timeRangePickerEmits,
  timeRangePickerProps
};
