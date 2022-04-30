import React from 'react'
import { useUserStore } from '../../stores/user.store'
import { AuthenticatedNavigation } from './authenticated-navigation'
import { UnauthenticatedNavigation } from './unauthenticated-navigation'

export const TopbarNavigation: React.FC = () => {
  const { userId } = useUserStore()

  if (userId) return <AuthenticatedNavigation />

  return <UnauthenticatedNavigation />
}
