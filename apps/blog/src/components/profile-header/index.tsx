import { FC } from 'react'

import styles from './profile-header.module.css'

export interface ProfileHeaderProps {
  name: string
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({ name }) => {
  return (
    <div className={styles.profile_header_container}>
      <h1>Seu perfil - {name}</h1>
    </div>
  )
}
