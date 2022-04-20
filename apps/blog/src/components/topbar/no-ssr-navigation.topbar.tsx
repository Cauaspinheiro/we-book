import React from 'react'
import { EmailPasswordAuth } from 'supertokens-auth-react/recipe/emailpassword'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import LoggedNavigationTopbar from './logged-nav.topbar'
import UnauthenticatedNavTopbar from './unauthenticated-nav.topbar'

const TopbarNavigation: React.FC = () => {
  const { doesSessionExist } = useSessionContext()

  if (doesSessionExist) return <LoggedNavigationTopbar />

  return <UnauthenticatedNavTopbar />
}

const WithAuthProviderTopbarNavigation = () => (
  <EmailPasswordAuth requireAuth={false}>
    <TopbarNavigation />
  </EmailPasswordAuth>
)

export default WithAuthProviderTopbarNavigation
