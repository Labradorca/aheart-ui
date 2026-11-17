import { defineComponent as x, ref as k, computed as y, openBlock as a, createElementBlock as n, normalizeClass as g, createElementVNode as B, createTextVNode as C, toDisplayString as m, createCommentVNode as v, createBlock as t, unref as o } from "vue";
import { CheckboxGroup as S } from "aheart-ui/checkbox";
import { DatePicker as T, DateRangePicker as h } from "aheart-ui/date-picker";
import { Input as D } from "aheart-ui/input";
import { InputNumber as E } from "aheart-ui/input-number";
import { RadioGroup as N } from "aheart-ui/radio";
import { Select as P } from "aheart-ui/select";
import { Switch as q } from "aheart-ui/switch";
import { Textarea as I } from "aheart-ui/textarea";
import { TimePicker as R, TimeRangePicker as w } from "aheart-ui/time-picker";
import { TreeSelect as A } from "aheart-ui/tree-select";
import { Upload as G } from "aheart-ui/upload";
const j = ["data-field-key", "aria-invalid", "aria-describedby"], z = ["id", "for"], L = {
  key: 0,
  class: "aheart-ai-form__required",
  "aria-hidden": "true"
}, F = ["id"], H = ["id"], le = /* @__PURE__ */ x({
  __name: "form-field",
  props: {
    field: {},
    value: {},
    disabled: { type: Boolean },
    error: {}
  },
  emits: ["update"],
  setup(e, { expose: c, emit: V }) {
    const r = e, i = V, s = k(), f = k(), U = y(
      () => (r.field.options ?? []).map((b) => ({
        key: b.value,
        title: b.label,
        disabled: b.disabled
      }))
    ), u = y(
      () => [r.field.description && `${r.field.key}-description`, r.error && `${r.field.key}-error`].filter(Boolean).join(" ") || void 0
    ), $ = y(
      () => r.field.type === "date-range" || r.field.type === "time-range" ? `${r.field.key}-start` : r.field.key
    );
    return c({
      focus: () => {
        var b, l;
        if (f.value) {
          f.value.focus("start");
          return;
        }
        (l = (b = s.value) == null ? void 0 : b.querySelector('input, button, [role="combobox"], [tabindex="0"]')) == null || l.focus({ preventScroll: !0 });
      }
    }), (b, l) => (a(), n("div", {
      ref_key: "fieldElement",
      ref: s,
      class: g(["aheart-ai-form__field", { "is-error": !!e.error, "is-disabled": e.disabled }]),
      "data-field-key": e.field.key,
      "aria-invalid": e.error ? "true" : void 0,
      "aria-describedby": u.value,
      tabindex: "-1"
    }, [
      B("label", {
        id: `${e.field.key}-label`,
        for: $.value
      }, [
        C(m(e.field.label) + " ", 1),
        e.field.required ? (a(), n("span", L, "*")) : v("", !0)
      ], 8, z),
      e.field.description ? (a(), n("p", {
        key: 0,
        id: `${e.field.key}-description`,
        class: "aheart-ai-form__field-description"
      }, m(e.field.description), 9, F)) : v("", !0),
      e.field.type === "textarea" ? (a(), t(o(I), {
        key: 1,
        id: e.field.key,
        "aria-labelledby": `${e.field.key}-label`,
        "aria-describedby": u.value,
        "model-value": e.value,
        placeholder: e.field.placeholder,
        disabled: e.disabled,
        "onUpdate:modelValue": l[0] || (l[0] = (d) => i("update", d))
      }, null, 8, ["id", "aria-labelledby", "aria-describedby", "model-value", "placeholder", "disabled"])) : e.field.type === "tree-select" ? (a(), t(o(A), {
        key: 2,
        id: e.field.key,
        "labelled-by": `${e.field.key}-label`,
        "model-value": e.value,
        "tree-data": U.value,
        multiple: Array.isArray(e.value),
        disabled: e.disabled,
        "onUpdate:modelValue": l[1] || (l[1] = (d) => i("update", d))
      }, null, 8, ["id", "labelled-by", "model-value", "tree-data", "multiple", "disabled"])) : e.field.type === "upload" ? (a(), t(o(G), {
        key: 3,
        "file-list": e.value,
        disabled: e.disabled,
        "onUpdate:fileList": l[2] || (l[2] = (d) => i("update", d))
      }, null, 8, ["file-list", "disabled"])) : e.field.type === "radio" ? (a(), t(o(N), {
        key: 4,
        "model-value": e.value,
        options: e.field.options,
        disabled: e.disabled,
        "onUpdate:modelValue": l[3] || (l[3] = (d) => i("update", d))
      }, null, 8, ["model-value", "options", "disabled"])) : e.field.type === "checkbox" ? (a(), t(o(S), {
        key: 5,
        "model-value": e.value,
        options: e.field.options,
        disabled: e.disabled,
        "onUpdate:modelValue": l[4] || (l[4] = (d) => i("update", d))
      }, null, 8, ["model-value", "options", "disabled"])) : e.field.type === "select" ? (a(), t(o(P), {
        key: 6,
        id: e.field.key,
        "labelled-by": `${e.field.key}-label`,
        "model-value": e.value,
        disabled: e.disabled,
        options: e.field.options,
        "onUpdate:modelValue": l[5] || (l[5] = (d) => i("update", d))
      }, null, 8, ["id", "labelled-by", "model-value", "disabled", "options"])) : e.field.type === "switch" ? (a(), t(o(q), {
        key: 7,
        id: e.field.key,
        "model-value": !!e.value,
        disabled: e.disabled,
        "onUpdate:modelValue": l[6] || (l[6] = (d) => i("update", d))
      }, null, 8, ["id", "model-value", "disabled"])) : e.field.type === "number" ? (a(), t(o(E), {
        key: 8,
        id: e.field.key,
        "model-value": e.value,
        placeholder: e.field.placeholder,
        disabled: e.disabled,
        "onUpdate:modelValue": l[7] || (l[7] = (d) => i("update", d))
      }, null, 8, ["id", "model-value", "placeholder", "disabled"])) : e.field.type === "date" ? (a(), t(o(T), {
        key: 9,
        id: e.field.key,
        "labelled-by": `${e.field.key}-label`,
        "described-by": u.value,
        status: e.error ? "error" : void 0,
        "model-value": e.value,
        placeholder: e.field.placeholder,
        disabled: e.disabled,
        "onUpdate:modelValue": l[8] || (l[8] = (d) => i("update", d))
      }, null, 8, ["id", "labelled-by", "described-by", "status", "model-value", "placeholder", "disabled"])) : e.field.type === "date-range" ? (a(), t(o(h), {
        key: 10,
        ref_key: "rangeControl",
        ref: f,
        id: e.field.key,
        "labelled-by": `${e.field.key}-label`,
        "described-by": u.value,
        status: e.error ? "error" : void 0,
        "model-value": e.value,
        disabled: e.disabled,
        "onUpdate:modelValue": l[9] || (l[9] = (d) => i("update", d))
      }, null, 8, ["id", "labelled-by", "described-by", "status", "model-value", "disabled"])) : e.field.type === "time" ? (a(), t(o(R), {
        key: 11,
        id: e.field.key,
        "labelled-by": `${e.field.key}-label`,
        "described-by": u.value,
        status: e.error ? "error" : void 0,
        "model-value": e.value,
        placeholder: e.field.placeholder,
        disabled: e.disabled,
        "onUpdate:modelValue": l[10] || (l[10] = (d) => i("update", d))
      }, null, 8, ["id", "labelled-by", "described-by", "status", "model-value", "placeholder", "disabled"])) : e.field.type === "time-range" ? (a(), t(o(w), {
        key: 12,
        ref_key: "rangeControl",
        ref: f,
        id: e.field.key,
        "labelled-by": `${e.field.key}-label`,
        "described-by": u.value,
        status: e.error ? "error" : void 0,
        "model-value": e.value,
        disabled: e.disabled,
        "onUpdate:modelValue": l[11] || (l[11] = (d) => i("update", d))
      }, null, 8, ["id", "labelled-by", "described-by", "status", "model-value", "disabled"])) : (a(), t(o(D), {
        key: 13,
        id: e.field.key,
        "model-value": e.value,
        placeholder: e.field.placeholder,
        disabled: e.disabled,
        "aria-describedby": u.value,
        "onUpdate:modelValue": l[12] || (l[12] = (d) => i("update", d))
      }, null, 8, ["id", "model-value", "placeholder", "disabled", "aria-describedby"])),
      e.error ? (a(), n("p", {
        key: 14,
        id: `${e.field.key}-error`,
        class: "aheart-ai-form__field-error",
        role: "alert"
      }, m(e.error), 9, H)) : v("", !0)
    ], 10, j));
  }
});
export {
  le as default
};
