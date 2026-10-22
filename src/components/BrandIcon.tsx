import { siInstagram, siYoutube } from "simple-icons";

const icons = {
  instagram: siInstagram,
  linkedin: {
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.436zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM3.56 9h3.558v11.452H3.56V9z",
  },
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
