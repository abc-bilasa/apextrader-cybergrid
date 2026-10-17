export default function Dashboard({ session }) {
  return (
    <div className="min-h-screen bg-cyber-dark text-slate-100 p-6">
      <p className="text-cyan-400 font-mono text-sm">
        Dashboard — {session?.user?.email ?? 'trader'}
      </p>
    </div>
  );
}
