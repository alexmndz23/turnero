import ApplicationLogo from '@/Components/ApplicationLogo'
import NavLink from '@/Components/NavLink'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { usePage, Link } from '@inertiajs/react'
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Navbar
} from '@nextui-org/react'
import { useState } from 'react'

export default function AuthenticatedLayout ({ header, children }) {
  const user = usePage().props.auth.user

  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)

  return (
    <>
      <Navbar isBordered isBlurred={false} maxWidth='xl' classNames={{ wrapper: 'sm:px-6 lg:px-8' }}>
        <NavbarBrand>
          <ApplicationLogo className='block h-9 w-auto fill-current text-gray-800 dark:text-gray-200' />
          {/* <p className='font-bold'>Turnero</p> */}
        </NavbarBrand>
        <NavbarContent
          className='hidden sm:flex gap-4'
          justify='center'
        >
          <NavbarItem>
            <NavLink
              href={route('dashboard')}
              active={route().current('dashboard')}
            >
              Dashboard
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              href={route('area.index')}
              active={route().current('area.index')}
            >
              Areas
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink
              href={route('user.index')}
              active={route().current('user.index')}
            >
              Users
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem className='hidden lg:flex'>
            <Dropdown>
              <DropdownTrigger>
                <Button variant='light'>{user.name}</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label='Link Actions'>
                <DropdownItem>
                  <Link
                    href={route('user.edit', user.id)}
                    className='block'
                  >
                    Profile
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key='logout'

                >
                  <Link
                    href={route('logout')}
                    method='post'
                    className='block'
                  >
                    Log Out
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main>{children}</main>
    </>
  )
}
