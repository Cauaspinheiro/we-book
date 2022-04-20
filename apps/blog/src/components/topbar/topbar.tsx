import { FC } from 'react'
import { EmailPasswordAuth } from 'supertokens-auth-react/recipe/emailpassword'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import LoggedNavigationTopbar from './logged-nav.topbar'
import UnauthenticatedNavTopbar from './unauthenticated-nav.topbar'
import styles from './topbar.module.css'

const TopbarComponent: FC = () => {
  const { doesSessionExist } = useSessionContext()

  return (
    <div className={styles.topbar}>
      <h1>WeBook</h1>

      {doesSessionExist ? (
        <LoggedNavigationTopbar />
      ) : (
        <UnauthenticatedNavTopbar />
      )}
    </div>
  )
}

const WithAuthProviderTopbar = () => (
  <EmailPasswordAuth requireAuth={false}>
    <TopbarComponent />
  </EmailPasswordAuth>
)

export default WithAuthProviderTopbar
