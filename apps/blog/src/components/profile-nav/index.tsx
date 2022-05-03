import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import styles from '../../styles/components/sidebar.module.css'

export const ProfileNav: FC = () => {
  const { pathname: link } = useRouter()

  const getLinkClassNames = (url: string) => {
    return classNames(styles.sidebar_container_item, {
      [styles.sidebar_container_item_active]: link === url,
    })
  }

  return (
    <aside className={styles.sidebar_container}>
      <Link href="/me">
        <a className={getLinkClassNames('/me')}>Seu dados</a>
      </Link>

      <Link href="/me/account">
        <a className={getLinkClassNames('/me/account')}>Sua conta</a>
      </Link>
    </aside>
  )
}
