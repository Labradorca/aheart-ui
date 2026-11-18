"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const alert_index = require("./alert/index.js");
const badge_index = require("./badge/index.js");
const breadcrumb_index = require("./breadcrumb/index.js");
const button_index = require("./button/index.js");
const card_index = require("./card/index.js");
const cascader_index = require("./cascader/index.js");
const checkbox_index = require("./checkbox/index.js");
const combobox_index = require("./combobox/index.js");
const configProvider_index = require("./config-provider/index.js");
const descriptions_index = require("./descriptions/index.js");
const datePicker_index = require("./date-picker/index.js");
const divider_index = require("./divider/index.js");
const drawer_index = require("./drawer/index.js");
const dropdown_index = require("./dropdown/index.js");
const empty_index = require("./empty/index.js");
const flex_index = require("./flex/index.js");
const form_index = require("./form/index.js");
const grid_index = require("./grid/index.js");
const icon_index = require("./icon/index.js");
const input_index = require("./input/index.js");
const inputNumber_index = require("./input-number/index.js");
const menu_index = require("./menu/index.js");
const _public = require("./message/public.js");
const modal_index = require("./modal/index.js");
const pagination_index = require("./pagination/index.js");
const popconfirm_index = require("./popconfirm/index.js");
const popover_index = require("./popover/index.js");
const radio_index = require("./radio/index.js");
const select_index = require("./select/index.js");
const skeleton_index = require("./skeleton/index.js");
const space_index = require("./space/index.js");
const spin_index = require("./spin/index.js");
const steps_index = require("./steps/index.js");
const switch_index = require("./switch/index.js");
const splitter_index = require("./splitter/index.js");
const table_index = require("./table/index.js");
const tag_index = require("./tag/index.js");
const tabs_index = require("./tabs/index.js");
const timePicker_index = require("./time-picker/index.js");
const textarea_index = require("./textarea/index.js");
const tree_index = require("./tree/index.js");
const treeSelect_index = require("./tree-select/index.js");
const tooltip_index = require("./tooltip/index.js");
const typography_index = require("./typography/index.js");
const upload_index = require("./upload/index.js");
const components = [
  button_index.default,
  cascader_index.Cascader,
  combobox_index.Combobox,
  configProvider_index.default,
  space_index.default,
  divider_index.default,
  datePicker_index.default,
  datePicker_index.DateRangePicker,
  timePicker_index.default,
  timePicker_index.TimeRangePicker,
  upload_index.Upload,
  tree_index.Tree,
  treeSelect_index.TreeSelect,
  flex_index.default,
  grid_index.default,
  icon_index.default,
  typography_index.default,
  typography_index.Title,
  typography_index.Text,
  typography_index.Paragraph,
  typography_index.Link,
  tag_index.default,
  tag_index.CheckableTag,
  tag_index.TagGroup,
  badge_index.default,
  badge_index.BadgeRibbon,
  alert_index.default,
  _public.default,
  modal_index.default,
  drawer_index.default,
  tooltip_index.default,
  popover_index.default,
  popconfirm_index.default,
  spin_index.default,
  skeleton_index.default,
  empty_index.default,
  breadcrumb_index.default,
  dropdown_index.default,
  dropdown_index.DropdownButton,
  menu_index.default,
  tabs_index.default,
  steps_index.default,
  input_index.default,
  textarea_index.default,
  inputNumber_index.default,
  checkbox_index.default,
  checkbox_index.CheckboxGroup,
  radio_index.default,
  radio_index.RadioGroup,
  switch_index.default,
  splitter_index.default,
  splitter_index.SplitterPanel,
  card_index.default,
  card_index.CardGrid,
  card_index.CardMeta,
  descriptions_index.default,
  pagination_index.default,
  select_index.default,
  form_index.default,
  form_index.FormItem,
  form_index.FormList,
  table_index.default
];
const AheartUI = {
  install(app) {
    components.forEach((component) => app.use(component));
  }
};
const AheartUI$1 = AheartUI;
exports.Alert = alert_index.default;
exports.Badge = badge_index.default;
exports.BadgeRibbon = badge_index.BadgeRibbon;
exports.Breadcrumb = breadcrumb_index.default;
exports.Button = button_index.default;
exports.Card = card_index.default;
exports.CardGrid = card_index.CardGrid;
exports.CardMeta = card_index.CardMeta;
exports.Cascader = cascader_index.Cascader;
exports.Checkbox = checkbox_index.default;
exports.CheckboxGroup = checkbox_index.CheckboxGroup;
exports.Combobox = combobox_index.Combobox;
exports.ConfigProvider = configProvider_index.default;
exports.Descriptions = descriptions_index.default;
exports.DatePicker = datePicker_index.default;
exports.DateRangePicker = datePicker_index.DateRangePicker;
exports.Divider = divider_index.default;
exports.Drawer = drawer_index.default;
exports.ADropdownButton = dropdown_index.DropdownButton;
exports.Dropdown = dropdown_index.default;
exports.DropdownButton = dropdown_index.DropdownButton;
exports.Empty = empty_index.default;
exports.PRESENTED_IMAGE_DEFAULT = empty_index.PRESENTED_IMAGE_DEFAULT;
exports.PRESENTED_IMAGE_SIMPLE = empty_index.PRESENTED_IMAGE_SIMPLE;
exports.Flex = flex_index.default;
exports.AFormItem = form_index.FormItem;
exports.AFormList = form_index.FormList;
exports.Form = form_index.default;
exports.FormItem = form_index.FormItem;
exports.FormList = form_index.FormList;
exports.Col = grid_index.Col;
exports.Grid = grid_index.default;
exports.Row = grid_index.Row;
exports.Icon = icon_index.default;
exports.Input = input_index.default;
exports.InputNumber = inputNumber_index.default;
exports.Menu = menu_index.default;
exports.Message = _public.default;
exports.Modal = modal_index.default;
exports.Pagination = pagination_index.default;
exports.Popconfirm = popconfirm_index.default;
exports.Popover = popover_index.default;
exports.Radio = radio_index.default;
exports.RadioGroup = radio_index.RadioGroup;
exports.Select = select_index.default;
exports.Skeleton = skeleton_index.default;
exports.Space = space_index.default;
exports.Spin = spin_index.default;
exports.Steps = steps_index.default;
exports.Switch = switch_index.default;
exports.Splitter = splitter_index.default;
exports.SplitterPanel = splitter_index.SplitterPanel;
exports.Table = table_index.default;
exports.CheckableTag = tag_index.CheckableTag;
exports.Tag = tag_index.default;
exports.TagGroup = tag_index.TagGroup;
exports.Tabs = tabs_index.default;
exports.TimePicker = timePicker_index.default;
exports.TimeRangePicker = timePicker_index.TimeRangePicker;
exports.Textarea = textarea_index.default;
exports.Tree = tree_index.Tree;
exports.TreeSelect = treeSelect_index.TreeSelect;
exports.Tooltip = tooltip_index.default;
exports.Link = typography_index.Link;
exports.Paragraph = typography_index.Paragraph;
exports.Text = typography_index.Text;
exports.Title = typography_index.Title;
exports.Typography = typography_index.default;
exports.Upload = upload_index.Upload;
exports.AheartUI = AheartUI;
exports.default = AheartUI$1;
