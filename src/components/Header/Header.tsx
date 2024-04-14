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

const Header = ({className}: {
  className?: string;
}) => {
  return (
    <div className={cn(className)}>
      <Nav>

        <NavTrigger className='focus:outline-none'>
          <Icon className='h-6 w-6'/>
        </NavTrigger>
        <NavContent className='bg-black'>
          <NavLabel>
            <Link href='/'>
              ≼⓪≽
            </Link>
          </NavLabel>
          <NavSeparator/>
          <NavItem>
            <Link href='/01'>
              01
            </Link>
          </NavItem>
        </NavContent>
      </Nav>
    </div>
  )
}

export default Header
