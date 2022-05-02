import { GetServerSideProps, NextPage } from 'next'
import { Profile } from '../../domain/profile'
import { api } from '../../services/api'
import axios from 'axios'

import styles from '../../styles/pages/profile.module.css'
import PageContainer from '../../components/page-container'
import { InternalError } from '../../components/internal-error'
import { ProfileHeader } from '../../components/profile-header'
import { ProfileNav } from '../../components/profile-nav'

export interface ProfilePageProps {
  profile: Profile | null
}

const ProfilePage: NextPage<ProfilePageProps> = ({ profile }) => {
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
          <div className={styles.profile_data_item_container}>
            <span className={styles.profile_data_item_heading}>Email</span>

            <h3 className={styles.profile_data_item_value}>{profile.email}</h3>
          </div>

          <div className={styles.profile_data_item_container}>
            <span className={styles.profile_data_item_heading}>
              Data de criação
            </span>

            <h3 className={styles.profile_data_item_value}>
              {new Date(profile.createdAt).toLocaleString('PT-BR', {
                dateStyle: 'long',
                timeStyle: 'short',
                hour12: false,
              })}
            </h3>
          </div>

          <div className={styles.profile_data_item_container}>
            <span className={styles.profile_data_item_heading}>
              Visualizações em seus posts
            </span>

            <h3 className={styles.profile_data_item_value}>
              {profile.totalViews} visualizações
            </h3>
          </div>

          <div className={styles.profile_data_item_container}>
            <span className={styles.profile_data_item_heading}>
              Posts visualizados
            </span>

            <h3 className={styles.profile_data_item_value}>
              {profile.totalPostsViewed} visualizações
            </h3>
          </div>

          <div className={styles.profile_data_item_container}>
            <span className={styles.profile_data_item_heading}>
              Posts publicados
            </span>

            <h3 className={styles.profile_data_item_value}>
              {profile.totalPublications} posts
            </h3>
          </div>

          <div className={styles.profile_data_item_container}>
            <span className={styles.profile_data_item_heading}>
              Posts contribuídos
            </span>

            <h3 className={styles.profile_data_item_value}>
              {profile.totalContributions} posts
            </h3>
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
    return {
      redirect: {
        destination: '/auth',
      },
      props: { profile: null },
    }
  }

  try {
    const { data } = await api.get<Profile>('/profile/me', {
      headers: { cookie: String(ctx.req.headers.cookie) },
    })

    return { props: { profile: data } }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        return {
          redirect: {
            destination: '/auth',
          },
          props: { profile: null },
        }
      }
    }

    return { props: { profile: null } }
  }
}

export default ProfilePage
