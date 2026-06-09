export default function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-red-400 text-sm">Something went wrong: {message}</p>
    </div>
  );
}
