export default function ErrorMessage({ message, isError = true }) {
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-red-400 text-sm">
        {isError ? `Something went wrong: ${message}` : message}
      </p>
    </div>
  );
}