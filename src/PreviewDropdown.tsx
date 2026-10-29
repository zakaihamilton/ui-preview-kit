"use client";

import "./styles.css";

export type PreviewDropdownOption = {
  value: string;
  label: string;
  href?: string;
};

export type PreviewDropdownProps = {
  label: string;
  value: string;
  options: PreviewDropdownOption[];
  onSelect?: (value: string) => void;
};

export function PreviewDropdown({ label, value, options, onSelect }: PreviewDropdownProps) {
  const selected = options.find((option) => option.value === value);

  return (
    <details
      className="ui-preview-dropdown"
      onClickCapture={(event) => {
        if (event.target instanceof HTMLElement && event.target.closest("[data-ui-preview-option]")) {
          event.currentTarget.open = false;
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          event.currentTarget.open = false;
        }
      }}
    >
      <summary className="ui-preview-dropdown__trigger">
        <span className="ui-preview-dropdown__label">{label}</span>
        <span className="ui-preview-dropdown__value">{selected?.label ?? value}</span>
        <span className="ui-preview-dropdown__chevron" aria-hidden="true" />
      </summary>
      <div className="ui-preview-dropdown__menu" role="group" aria-label={label + " options"}>
        {options.map((option) => {
          const isSelected = option.value === value;
          return option.href ? (
            <a
              key={option.value}
              className="ui-preview-dropdown__option"
              href={option.href}
              aria-current={isSelected ? "page" : undefined}
              data-ui-preview-option=""
            >
              <span>{option.label}</span>
              <span className="ui-preview-dropdown__mark" aria-hidden="true">
                {isSelected ? "✓" : ""}
              </span>
            </a>
          ) : (
            <button
              key={option.value}
              className="ui-preview-dropdown__option"
              type="button"
              aria-pressed={isSelected}
              data-ui-preview-option=""
              onClick={() => onSelect?.(option.value)}
            >
              <span>{option.label}</span>
              <span className="ui-preview-dropdown__mark" aria-hidden="true">
                {isSelected ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>
    </details>
  );
}
