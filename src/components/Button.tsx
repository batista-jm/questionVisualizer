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
      className={`px-4 py-2 ml-2 flex-1 ${
        isActive ? "bg-purple-500 rounded-lg" : ""
      }
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
