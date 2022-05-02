import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { signOut } from 'supertokens-auth-react/recipe/emailpassword'
import { Profile } from '../../domain/profile'
import { api } from '../../services/api'
import axios from 'axios'

import styles from '../../styles/pages/profile.module.css'
import PageContainer from '../../components/page-container'
import { InternalError } from '../../components/internal-error'
import { ProfileHeader } from '../../components/profile-header'
import { ProfileNav } from '../../components/profile-nav'
import { PrimaryButton } from '../../components/primary-button'
import { LogoutIcon } from '@heroicons/react/solid'
import classNames from 'classnames'

export interface ProfilePageProps {
  profile: Profile | null
}

const ProfilePage: NextPage<ProfilePageProps> = ({ profile }) => {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()

    router.replace('/')
  }

  if (!profile) {
    return (
      <PageContainer>
        <InternalError />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <ProfileHeader name={profile.name} />

      <div className={styles.profile_container}>
        <ProfileNav />

        <div className={styles.profile_data_container}>
          <div
            className={classNames(
              styles.profile_data_item_container,
              styles.profile_data_item_button,
            )}
          >
            <PrimaryButton onClick={handleLogout}>
              <LogoutIcon className={styles.profile_data_item_icon} />
              Sair
            </PrimaryButton>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (
  ctx,
) => {
  if (!ctx.req.headers.cookie) {
    return { redirect: '/auth', props: { profile: null } }
  }

  try {
    const { data } = await api.get<Profile>('/profile/me', {
      headers: { cookie: String(ctx.req.headers.cookie) },
    })

    return { props: { profile: data } }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        return { redirect: '/auth', props: { profile: null } }
      }
    }

    return { props: { profile: null } }
  }
}

export default ProfilePage
