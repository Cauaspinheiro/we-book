import { FC } from 'react'

import { LoginIcon } from '@heroicons/react/solid'

import styles from './topbar.module.css'
import Link from 'next/link'

const UnauthenticatedNavTopbar: FC = () => {
  return (
    <div className={styles.topbar_navigation}>
      <Link href="/auth">
        <a className={styles.topbar_primary_button}>
          <LoginIcon className={styles.topbar_icon} />
          <span>Entrar</span>
        </a>
      </Link>
    </div>
  )
}

export default UnauthenticatedNavTopbar
