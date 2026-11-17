import Alert from "./alert/index.js";
import BadgeWithRibbon, { BadgeRibbon } from "./badge/index.js";
import Breadcrumb from "./breadcrumb/index.js";
import Button from "./button/index.js";
import Card, { CardGrid, CardMeta } from "./card/index.js";
import { Cascader as InstalledCascader } from "./cascader/index.js";
import Checkbox, { CheckboxGroup } from "./checkbox/index.js";
import { Combobox } from "./combobox/index.js";
import ConfigProvider from "./config-provider/index.js";
import Descriptions from "./descriptions/index.js";
import InstalledDatePicker, { DateRangePicker } from "./date-picker/index.js";
import Divider from "./divider/index.js";
import Drawer from "./drawer/index.js";
import Dropdown, { DropdownButton } from "./dropdown/index.js";
import Empty from "./empty/index.js";
import { PRESENTED_IMAGE_DEFAULT, PRESENTED_IMAGE_SIMPLE } from "./empty/index.js";
import Flex from "./flex/index.js";
import Form, { FormItem, FormList } from "./form/index.js";
import Grid from "./grid/index.js";
import { Col, Row } from "./grid/index.js";
import Icon from "./icon/index.js";
import Input from "./input/index.js";
import InputNumber from "./input-number/index.js";
import Menu from "./menu/index.js";
import Message from "./message/public.js";
import Modal from "./modal/index.js";
import Pagination from "./pagination/index.js";
import Popconfirm from "./popconfirm/index.js";
import Popover from "./popover/index.js";
import Radio, { RadioGroup } from "./radio/index.js";
import Select from "./select/index.js";
import Skeleton from "./skeleton/index.js";
import Space from "./space/index.js";
import Spin from "./spin/index.js";
import Steps from "./steps/index.js";
import Switch from "./switch/index.js";
import Splitter, { SplitterPanel } from "./splitter/index.js";
import Table from "./table/index.js";
import Tag, { CheckableTag, TagGroup } from "./tag/index.js";
import Tabs from "./tabs/index.js";
import InstalledTimePicker, { TimeRangePicker } from "./time-picker/index.js";
import Textarea from "./textarea/index.js";
import { Tree as InstalledTree } from "./tree/index.js";
import { TreeSelect as InstalledTreeSelect } from "./tree-select/index.js";
import Tooltip from "./tooltip/index.js";
import Typography, { Title, Text, Paragraph, Link } from "./typography/index.js";
import { Upload as InstalledUpload } from "./upload/index.js";
const components = [
  Button,
  InstalledCascader,
  Combobox,
  ConfigProvider,
  Space,
  Divider,
  InstalledDatePicker,
  DateRangePicker,
  InstalledTimePicker,
  TimeRangePicker,
  InstalledUpload,
  InstalledTree,
  InstalledTreeSelect,
  Flex,
  Grid,
  Icon,
  Typography,
  Title,
  Text,
  Paragraph,
  Link,
  Tag,
  CheckableTag,
  TagGroup,
  BadgeWithRibbon,
  BadgeRibbon,
  Alert,
  Message,
  Modal,
  Drawer,
  Tooltip,
  Popover,
  Popconfirm,
  Spin,
  Skeleton,
  Empty,
  Breadcrumb,
  Dropdown,
  DropdownButton,
  Menu,
  Tabs,
  Steps,
  Input,
  Textarea,
  InputNumber,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  Splitter,
  SplitterPanel,
  Card,
  CardGrid,
  CardMeta,
  Descriptions,
  Pagination,
  Select,
  Form,
  FormItem,
  FormList,
  Table
];
const AheartUI = {
  install(app) {
    components.forEach((component) => app.use(component));
  }
};
const AheartUI$1 = AheartUI;
export {
  DropdownButton as ADropdownButton,
  FormItem as AFormItem,
  FormList as AFormList,
  AheartUI,
  Alert,
  BadgeWithRibbon as Badge,
  BadgeRibbon,
  Breadcrumb,
  Button,
  Card,
  CardGrid,
  CardMeta,
  InstalledCascader as Cascader,
  CheckableTag,
  Checkbox,
  CheckboxGroup,
  Col,
  Combobox,
  ConfigProvider,
  InstalledDatePicker as DatePicker,
  DateRangePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  DropdownButton,
  Empty,
  Flex,
  Form,
  FormItem,
  FormList,
  Grid,
  Icon,
  Input,
  InputNumber,
  Link,
  Menu,
  Message,
  Modal,
  PRESENTED_IMAGE_DEFAULT,
  PRESENTED_IMAGE_SIMPLE,
  Pagination,
  Paragraph,
  Popconfirm,
  Popover,
  Radio,
  RadioGroup,
  Row,
  Select,
  Skeleton,
  Space,
  Spin,
  Splitter,
  SplitterPanel,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TagGroup,
  Text,
  Textarea,
  InstalledTimePicker as TimePicker,
  TimeRangePicker,
  Title,
  Tooltip,
  InstalledTree as Tree,
  InstalledTreeSelect as TreeSelect,
  Typography,
  InstalledUpload as Upload,
  AheartUI$1 as default
};
