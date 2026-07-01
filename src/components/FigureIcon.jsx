export default function FigureIcon({
  imageUrl,
  primary = '#E8333D',
  secondary = '#14171c',
  size = 64,
  className,
  alt = '',
}) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={alt}
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain' }}
      />
    );
  }

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <ellipse cx="32" cy="52" rx="15" ry="6" fill={secondary} opacity="0.35" />
      <path d="M14 24c-4-7-2-15 5-13 2 4 2 9 1 13z" fill={primary} />
      <path d="M50 24c4-7 2-15-5-13-2 4-2 9-1 13z" fill={primary} />
      <circle cx="32" cy="29" r="21" fill={primary} />
      <rect x="14" y="25" width="36" height="11" rx="5.5" fill={secondary} />
      <circle cx="23" cy="30.5" r="3.4" fill="#fff" />
      <circle cx="41" cy="30.5" r="3.4" fill="#fff" />
      <path d="M16 25c4-2 28-2 32 0" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />
      <path d="M22 46c2 4 18 4 20 0" stroke={secondary} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
