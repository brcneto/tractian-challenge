"use client";

import Link from "next/link";
import { ReactNode } from "react";
import NavLinkIcon from "./icons/NavLink";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-1 py-1 px-2 rounded-sm bg-primary text-white text-xs font-[600]"
      >
        <NavLinkIcon />
        {children}
      </Link>
    </li>
  );
}
