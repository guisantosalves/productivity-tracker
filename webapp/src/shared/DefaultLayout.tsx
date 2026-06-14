import {
  BookmarkCheck,
  CheckCircle2,
  LayoutDashboard,
  ListTodo,
  LogOut,
  TrendingUp,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router";

export const DefaultLayout = () => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { id: "tasks", label: "Tasks", icon: ListTodo, path: "/task" },
    {
      id: "Categoria",
      label: "Categoria",
      icon: BookmarkCheck,
      path: "/task-category",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="flex bo">
      <aside className="w-56 shrink-0 h-screen sticky top-0 flex flex-col border-r border-border bg-card bg-white">
        <div className="px-6 py-6 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
              <TrendingUp size={13} className="text-primary-foreground" />
            </div>
            <span
              className="tracking-tight"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "-0.01em",
              }}
            >
              Productivity
            </span>
          </div>
          <p
            className="mt-1"
            style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}
          >
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ id, label, icon: Icon, path }) => (
            <button
              key={id}
              onClick={() => {
                navigate(path);
              }}
              //   className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-left ${
              //     //   activePage === id
              //     //     ? "bg-primary text-primary-foreground"
              //     //     :
              //     "text-muted-foreground hover:bg-accent hover:text-foreground"
              //   }`}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-left hover:bg-[#ffedba] `}
              style={{
                fontSize: "0.8125rem",
                fontWeight: 400, //activePage === id ? 500 : 400,
                cursor: "pointer",
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-border space-y-3">
          <button
            key={"logout-btn-layout"}
            onClick={() => {}}
            //   className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-left ${
            //     //   activePage === id
            //     //     ? "bg-primary text-primary-foreground"
            //     //     :
            //     "text-muted-foreground hover:bg-accent hover:text-foreground"
            //   }`}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-left hover:bg-[#ffedba] `}
            style={{
              fontSize: "0.8125rem",
              fontWeight: 400, //activePage === id ? 500 : 400,
              cursor: "pointer",
            }}
          >
            <LogOut />
            <span>Sair</span>
          </button>
        </div>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
