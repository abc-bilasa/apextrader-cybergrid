export default function AppNav({ activeView, onChange }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <nav className="flex gap-1 p-1 rounded-lg border border-cyan-500/20 bg-slate-900/50" aria-label="Main">
      {tabs.map((tab) => {
        const selected = activeView === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-md text-xs uppercase tracking-wider font-semibold transition-colors ${
              selected
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-cyan-300 border border-transparent'
            }`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
