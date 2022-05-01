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
import { useRouter } from 'next/router'
import classNames from 'classnames'

export const AuthenticatedNavigation: FC = () => {
  const { pathname: link } = useRouter()

  const getLinkClassNames = (url: string) => {
    return classNames(styles.topbar_link, {
      [styles.topbar_link_active]: link === url,
    })
  }

  return (
    <Fragment>
      <Link href="/posts">
        <a className={getLinkClassNames('/posts')}>
          <DocumentTextIcon className={styles.topbar_icon} />
          <span>Posts</span>
        </a>
      </Link>

      <Link href="/drafts">
        <a className={getLinkClassNames('/drafts')}>
          <PencilIcon className={styles.topbar_icon} />
          <span>Rascunhos</span>
        </a>
      </Link>

      <Link href="/me">
        <a className={getLinkClassNames('/me')}>
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
