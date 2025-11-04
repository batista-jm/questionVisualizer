export default function Button({
  title,
  onClick,
  isActive,
}: {
  title: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <button
      className={` body px-4 py-2 ml-2 flex-1 transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] rounded-lg ${
        isActive ? "shadow-[0_0_15px_rgba(255,255,255,0.8)]  " : ""
      }
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
