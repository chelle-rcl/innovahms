export default function Footer() {
  return (
    <footer className="border-t border-innova-gold/70 bg-innova-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-4 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} INNOVA-HMS. All rights reserved.</p>
      </div>
    </footer>
  );
}