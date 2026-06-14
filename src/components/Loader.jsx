export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-3 py-12">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-3.5 h-3.5 rounded-full bg-f1-red"
          style={{
            animation: "f1-light 1s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}