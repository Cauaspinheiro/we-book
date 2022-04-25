import { LogoutIcon } from '@heroicons/react/solid'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { signOut } from 'supertokens-auth-react/recipe/emailpassword'
import Topbar from '../components/topbar'
import { Profile } from '../domain/profile'
import { api } from '../services/api'

import styles from '../styles/pages/profile.module.css'

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
      <div className={styles.profile_container}>
        <Topbar />

        <div className={styles.profile_content_container}>
          <h1 className={styles.profile_title}>Algo deu errado!</h1>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.profile_container}>
      <Topbar />

      <div className={styles.profile_content_container}>
        <div className={styles.profile_header_container}>
          <h1 className={styles.profile_title}>{profile.name}</h1>

          <div className={styles.profile_email_creation_container}>
            <div className={styles.profile_info_container}>
              <span className={styles.profile_info_heading}>
                Data de criação:
              </span>

              <span className={styles.profile_info_value}>
                {new Date(profile.createdAt).toLocaleString('PT-BR', {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>

            <div className={styles.profile_info_container}>
              <span className={styles.profile_info_heading}>Email:</span>

              <span className={styles.profile_info_value}>{profile.email}</span>
            </div>
          </div>
        </div>

        <div className={styles.profile_usage_info_container}>
          <div className={styles.profile_info_container}>
            <span className={styles.profile_info_heading}>
              Visualizações em seus posts:
            </span>

            <span className={styles.profile_info_value}>
              {profile.totalViews}
            </span>
          </div>

          <div className={styles.profile_info_container}>
            <span className={styles.profile_info_heading}>
              Posts visualizados:
            </span>

            <span className={styles.profile_info_value}>
              {profile.totalPostsViewed}
            </span>
          </div>

          <div className={styles.profile_info_container}>
            <span className={styles.profile_info_heading}>
              Posts publicados:
            </span>

            <span className={styles.profile_info_value}>
              {profile.totalPublications}
            </span>
          </div>

          <div className={styles.profile_info_container}>
            <span className={styles.profile_info_heading}>
              Posts contribuídos:
            </span>

            <span className={styles.profile_info_value}>
              {profile.totalContributions}
            </span>
          </div>
        </div>

        <div className={styles.profile_actions_container}>
          <h2 className={styles.profile_actions_title}>Ações</h2>

          <div className={styles.profile_actions_item_container}>
            <button onClick={handleLogout} className={styles.profile_action}>
              <LogoutIcon className={styles.profile_icon} />
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (
  ctx,
) => {
  try {
    const { data } = await api.get<Profile>('/profile/me', {
      headers: { cookie: String(ctx.req.headers.cookie) },
    })

    return { props: { profile: data } }
  } catch (error) {
    return { props: { profile: null } }
  }
}

export default ProfilePage
