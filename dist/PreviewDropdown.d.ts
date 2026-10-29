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
export declare function PreviewDropdown({ label, value, options, onSelect }: PreviewDropdownProps): import("react").JSX.Element;
