export default function ErrorMessage({ message, isError = true }) {
  return (
    <div className="flex items-center justify-center py-12">
      <p className={`text-xs tracking-[0.05em] ${isError ? "text-f1-red" : "text-white/50"}`}>
        {isError ? `Something went wrong: ${message}` : message}
      </p>
    </div>
  );
}