import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/config/nav";

export function Sidebar() {
  return (
    <aside className="glass flex h-full w-60 flex-col gap-8 rounded-2xl p-5">
      <Logo />

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className="glass-hover flex items-center gap-3 rounded-xl px-4 py-3 text-left"
            >
              <Icon className="h-5 w-5 text-[var(--color-text-muted)]" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
