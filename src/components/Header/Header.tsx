import React from "react";
import Link from "next/link";
import { cn } from "@/utils/styles";
import {
  Nav,
  NavContent,
  NavItem,
  NavLabel,
  NavSeparator,
  NavTrigger,
} from "@/components/Nav";
import ComedyAndTragedy from "@/assets/icons/comedy-and-tragedy.svg";

const pages = ["01", "02"];

const LinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="inline-block w-full rounded p-2 hover:bg-neutral-800"
    >
      {children}
    </Link>
  );
};

const Header = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className)}>
      <Nav>
        <NavTrigger className="focus:outline-none">
          <ComedyAndTragedy className="h-10 w-10" />
        </NavTrigger>
        <NavContent sideOffset={12} className="ml-4 bg-black">
          <NavLabel>
            <LinkItem href="/">≼⓪≽</LinkItem>
          </NavLabel>

          <NavSeparator />

          {pages.map((page) => (
            <NavItem key={page}>
              <LinkItem href={page}>{page}</LinkItem>
            </NavItem>
          ))}
        </NavContent>
      </Nav>
    </div>
  );
};

export default Header;
