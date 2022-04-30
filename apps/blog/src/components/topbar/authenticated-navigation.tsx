import { FC, Fragment } from 'react'

import {
  PlusIcon,
  PencilIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/solid'

import styles from './topbar.module.css'
import Link from 'next/link'
import { PrimaryButtonLink } from '../primary-button/as-link'

export const AuthenticatedNavigation: FC = () => {
  return (
    <Fragment>
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

      <Link href="/drafts/new" passHref>
        <PrimaryButtonLink>
          <PlusIcon className={styles.topbar_icon} />
          <span>Criar</span>
        </PrimaryButtonLink>
      </Link>
    </Fragment>
  )
}
