import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./styles.css";
import { PreviewIcon } from "./PreviewIcon.js";
export function PreviewToolbar({ subtitle, note, utilities, utilitiesLabel = "Preview utilities", variant = "bar", theme = "light", children, }) {
    return (_jsxs("header", { className: "ui-preview-toolbar ui-preview-toolbar--" + variant, "data-theme": theme, children: [_jsxs("div", { className: "ui-preview-toolbar__identity", children: [_jsx("span", { className: "ui-preview-toolbar__icon-badge", children: _jsx(PreviewIcon, {}) }), _jsxs("span", { className: "ui-preview-toolbar__identity-copy", children: [_jsx("strong", { className: "ui-preview-toolbar__title", children: "UI Preview" }), _jsx("span", { className: "ui-preview-toolbar__subtitle", children: subtitle })] })] }), _jsx("div", { className: "ui-preview-toolbar__controls", children: children }), utilities ? (_jsx("nav", { className: "ui-preview-toolbar__utilities", "aria-label": utilitiesLabel, children: utilities })) : null, note ? _jsx("p", { className: "ui-preview-toolbar__note", children: note }) : null] }));
}
