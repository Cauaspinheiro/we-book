import React from 'react'
import { useUserStore } from '../../stores/user.store'
import LoggedNavigationTopbar from './logged-nav.topbar'
import UnauthenticatedNavTopbar from './unauthenticated-nav.topbar'

export const TopbarNavigation: React.FC = () => {
  const { userId } = useUserStore()

  if (userId) return <LoggedNavigationTopbar />

  return <UnauthenticatedNavTopbar />
}
