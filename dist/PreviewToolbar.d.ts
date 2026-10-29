import type { ReactNode } from "react";
import "./styles.css";
export type PreviewToolbarProps = {
    subtitle: string;
    note?: string;
    utilities?: ReactNode;
    utilitiesLabel?: string;
    variant?: "bar" | "card";
    theme?: "light" | "dark";
    children: ReactNode;
};
export declare function PreviewToolbar({ subtitle, note, utilities, utilitiesLabel, variant, theme, children, }: PreviewToolbarProps): import("react").JSX.Element;
