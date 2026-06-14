import { type LucideProps } from "lucide-react";
import React from "react";

interface HeaderProps {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export const Header: React.FC<HeaderProps> = ({ title, Icon }) => {
  return (
    <div className="shrink-0 flex-1 py-4">
      <div className="flex align-items-center gap-2">
        <Icon size={50} />
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "2rem",
            letterSpacing: "2px",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};
