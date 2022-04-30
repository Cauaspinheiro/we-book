import { FC, Fragment } from 'react'

import { LoginIcon } from '@heroicons/react/solid'

import styles from './topbar.module.css'
import Link from 'next/link'
import { PrimaryButtonLink } from '../primary-button/as-link'

export const UnauthenticatedNavigation: FC = () => {
  return (
    <Fragment>
      <Link href="/auth" passHref>
        <PrimaryButtonLink>
          <LoginIcon className={styles.topbar_icon} />

          <span>Entrar</span>
        </PrimaryButtonLink>
      </Link>
    </Fragment>
  )
}
