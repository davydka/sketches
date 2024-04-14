import React from "react";
import Link from "next/link";
import {cn} from "@/utils/styles";
import {
  Nav,
  NavContent,
  NavItem,
  NavLabel,
  NavSeparator,
  NavTrigger,
} from "@/components/Nav"
import Icon from '@/assets/icons/comedy-and-tragedy.svg'

const pages = [
  '01',
  '02'
]

const LinkItem = ({href, children}: { href: string, children: React.ReactNode }) => {
  return (
    <Link href={href} className='w-full inline-block hover:bg-neutral-800 p-2 rounded'>
      {children}
    </Link>
  )
}

const Header = ({className}: {
  className?: string;
}) => {
  return (
    <div className={cn(className)}>
      <Nav>
        <NavTrigger className='focus:outline-none'>
          <Icon className='h-6 w-6'/>
        </NavTrigger>
        <NavContent sideOffset={12} className='bg-black ml-4'>
          <NavLabel>
            <LinkItem href='/'>
              ≼⓪≽
            </LinkItem>
          </NavLabel>

          <NavSeparator/>

          {pages.map((page) => (
            <NavItem key={page}><LinkItem href={page}>{page}</LinkItem></NavItem>
          ))}
        </NavContent>
      </Nav>
    </div>
  )
}

export default Header
