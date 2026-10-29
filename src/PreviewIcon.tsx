import "./styles.css";

export function PreviewIcon() {
  return (
    <svg
      aria-label="UI Preview"
      role="img"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>UI Preview</title>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3.5 8.5h17" />
      <circle cx="6.5" cy="6.2" r="0.45" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="6.2" r="0.45" fill="currentColor" stroke="none" />
      <path d="M8.1 14.2c1-1.35 2.3-2.05 3.9-2.05s2.9.7 3.9 2.05c-1 1.35-2.3 2.05-3.9 2.05s-2.9-.7-3.9-2.05Z" />
      <circle cx="12" cy="14.2" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}
