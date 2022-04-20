import { FC } from 'react'

import {
  PlusIcon,
  PencilIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/solid'

import styles from './topbar.module.css'
const LoggedNavigationTopbar: FC = () => {
  return (
    <div className={styles.topbar_navigation}>
      <a href="#" className={styles.topbar_primary_button}>
        <PlusIcon className={styles.topbar_icon} />
        Criar
      </a>

      <a href="#" className={styles.topbar_secondary_button}>
        <DocumentTextIcon className={styles.topbar_icon} />
        Posts
      </a>

      <a href="#" className={styles.topbar_secondary_button}>
        <PencilIcon className={styles.topbar_icon} />
        Rascunhos
      </a>

      <a href="#" className={styles.topbar_secondary_button}>
        <UserIcon className={styles.topbar_icon} />
        Perfil
      </a>
    </div>
  )
}

export default LoggedNavigationTopbar
