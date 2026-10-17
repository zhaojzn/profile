import './link-arrow.css'

export default function LinkArrow({ direction = 'up-right' }) {
  return (
    <svg
      className="link-arrow"
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={direction === 'left' ? 'M13 8H3m4-4L3 8l4 4' : 'M4 12 12 4M4 4h8v8'}
      />
    </svg>
  )
}
