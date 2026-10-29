import "./styles.css";

export function PreviewIcon() {
  return (
    <svg
      aria-label="UI Preview"
      role="img"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>UI Preview</title>
      <rect x="2.75" y="3.25" width="18.5" height="17.5" rx="3.5" />
      <path d="M3.25 8.5h17.5" />
      <circle cx="6.1" cy="5.9" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="5.9" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="10.9" cy="5.9" r="0.55" fill="currentColor" stroke="none" />
      <path d="M6.2 11.8h1.9M6.2 14.7h1.9M6.2 17.6h1.9" strokeWidth="1.7" />
      <rect
        x="10.1"
        y="10.8"
        width="8.15"
        height="7.9"
        rx="1.7"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="none"
      />
      <path
        d="m14.18 12.1.9 1.82 1.82.9-1.82.9-.9 1.82-.9-1.82-1.82-.9 1.82-.9z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
