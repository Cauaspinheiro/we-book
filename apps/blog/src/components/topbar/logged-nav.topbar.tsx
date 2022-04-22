import { FC } from 'react'

import {
  PlusIcon,
  PencilIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/solid'

import styles from './topbar.module.css'
import Link from 'next/link'
const LoggedNavigationTopbar: FC = () => {
  return (
    <div className={styles.topbar_navigation}>
      <Link href="/drafts/new">
        <a className={styles.topbar_primary_button}>
          <PlusIcon className={styles.topbar_icon} />
          <span>Criar</span>
        </a>
      </Link>

      <Link href="/posts">
        <a className={styles.topbar_secondary_button}>
          <DocumentTextIcon className={styles.topbar_icon} />
          <span>Posts</span>
        </a>
      </Link>

      <Link href="/drafts">
        <a className={styles.topbar_secondary_button}>
          <PencilIcon className={styles.topbar_icon} />
          <span>Rascunhos</span>
        </a>
      </Link>

      <Link href="/me">
        <a className={styles.topbar_secondary_button}>
          <UserIcon className={styles.topbar_icon} />
          <span>Perfil</span>
        </a>
      </Link>
    </div>
  )
}

export default LoggedNavigationTopbar
