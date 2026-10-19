export default function ProfileSection({ id, title, description, icon: Icon, children }) {
  return (
    <section
      id={id}
      className="cyber-card rounded-xl border border-cyan-500/10 overflow-hidden"
      aria-labelledby={`${id}-title`}
    >
      <div className="border-b border-cyan-500/10 bg-slate-900/40 px-5 py-4">
        <h2 id={`${id}-title`} className="cyber-section-title flex items-center gap-2 text-base">
          {Icon ? <Icon className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden /> : null}
          {title}
        </h2>
        {description ? (
          <p className="text-[10px] text-slate-500 mt-1 max-w-prose">{description}</p>
        ) : null}
      </div>
      <div className="p-5 flex flex-col gap-4">{children}</div>
    </section>
  );
}
