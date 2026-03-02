// components/Avatar.tsx
export default function Avatar({
  initials,
  bg,
  size = "w-10 h-10",
  textSize = "text-sm",
}: {
  initials: string;
  bg: string;
  size?: string;
  textSize?: string;
}) {
  return (
    <div
      className={`${size} capitalize rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${textSize}`}
      style={{ background: bg }}
    >
      {initials}
    </div>
  );
}
