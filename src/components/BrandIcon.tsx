import { siInstagram, siYoutube } from "simple-icons";

const icons = {
  instagram: siInstagram,
  youtube: siYoutube,
} as const;

type BrandIconName = keyof typeof icons;

export function BrandIcon({
  name,
  className,
}: {
  name: BrandIconName;
  className?: string;
}) {
  const icon = icons[name];

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
    >
      <path d={icon.path} />
    </svg>
  );
}
