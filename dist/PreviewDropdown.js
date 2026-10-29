"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./styles.css";
export function PreviewDropdown({ label, value, options, onSelect }) {
    const selected = options.find((option) => option.value === value);
    return (_jsxs("details", { className: "ui-preview-dropdown", onClickCapture: (event) => {
            if (event.target instanceof HTMLElement && event.target.closest("[data-ui-preview-option]")) {
                event.currentTarget.open = false;
            }
        }, onKeyDown: (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                event.currentTarget.open = false;
                event.currentTarget.querySelector("summary")?.focus();
            }
        }, onBlur: (event) => {
            const next = event.relatedTarget;
            if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
                event.currentTarget.open = false;
            }
        }, children: [_jsxs("summary", { className: "ui-preview-dropdown__trigger", children: [_jsx("span", { className: "ui-preview-dropdown__label", children: label }), _jsx("span", { className: "ui-preview-dropdown__value", children: selected?.label ?? value }), _jsx("span", { className: "ui-preview-dropdown__chevron", "aria-hidden": "true" })] }), _jsx("div", { className: "ui-preview-dropdown__menu", role: "group", "aria-label": label + " options", children: options.map((option) => {
                    const isSelected = option.value === value;
                    return option.href ? (_jsxs("a", { className: "ui-preview-dropdown__option", href: option.href, "aria-current": isSelected ? "page" : undefined, "data-ui-preview-option": "", children: [_jsx("span", { children: option.label }), _jsx("span", { className: "ui-preview-dropdown__mark", "aria-hidden": "true", children: isSelected ? "✓" : "" })] }, option.value)) : (_jsxs("button", { className: "ui-preview-dropdown__option", type: "button", "aria-pressed": isSelected, "data-ui-preview-option": "", onClick: () => onSelect?.(option.value), children: [_jsx("span", { children: option.label }), _jsx("span", { className: "ui-preview-dropdown__mark", "aria-hidden": "true", children: isSelected ? "✓" : "" })] }, option.value));
                }) })] }));
}
