export function MobileBottomContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col justify-between gap-4 bg-white shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)]">
      <div className="px-8 py-4">{children}</div>
    </div>
  );
}
