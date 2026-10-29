import type { ReactNode } from "react";
import "./styles.css";
import { PreviewIcon } from "./PreviewIcon.js";

export type PreviewToolbarProps = {
  subtitle: string;
  note?: string;
  utilities?: ReactNode;
  utilitiesLabel?: string;
  variant?: "bar" | "card";
  theme?: "light" | "dark";
  children: ReactNode;
};

export function PreviewToolbar({
  subtitle,
  note,
  utilities,
  utilitiesLabel = "Preview utilities",
  variant = "bar",
  theme = "light",
  children,
}: PreviewToolbarProps) {
  return (
    <header
      className={"ui-preview-toolbar ui-preview-toolbar--" + variant}
      data-theme={theme}
    >
      <div className="ui-preview-toolbar__identity">
        <span className="ui-preview-toolbar__icon-badge"><PreviewIcon /></span>
        <span className="ui-preview-toolbar__identity-copy">
          <strong className="ui-preview-toolbar__title">UI Preview</strong>
          <span className="ui-preview-toolbar__subtitle">{subtitle}</span>
        </span>
      </div>
      <div className="ui-preview-toolbar__controls">{children}</div>
      {utilities ? (
        <nav className="ui-preview-toolbar__utilities" aria-label={utilitiesLabel}>
          {utilities}
        </nav>
      ) : null}
      {note ? <p className="ui-preview-toolbar__note">{note}</p> : null}
    </header>
  );
}
