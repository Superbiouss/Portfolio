export function DottedGrid() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none opacity-50"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)`,
        backgroundSize: "30px 30px",
        backgroundPosition: "0 0",
      }}
      aria-hidden="true"
    />
  );
}
