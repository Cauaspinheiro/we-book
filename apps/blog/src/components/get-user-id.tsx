import { FC, Fragment, useEffect } from 'react'
import { EmailPasswordAuth } from 'supertokens-auth-react/recipe/emailpassword'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import { useUserStore } from '../stores/user.store'

const GetUserId: FC = () => {
  const setUserId = useUserStore((s) => s.setUserId)
  const { userId } = useSessionContext()

  useEffect(() => {
    if (userId !== 'DEFAULT_USER_ID') setUserId(userId)
    else setUserId(null)
  }, [setUserId, userId])

  return <Fragment />
}

const WithAuthProviderGetUserId = () => (
  <EmailPasswordAuth requireAuth={false}>
    <GetUserId />
  </EmailPasswordAuth>
)

export default WithAuthProviderGetUserId
