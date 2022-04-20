import { FC } from 'react'

import { PlusIcon } from '@heroicons/react/solid'

import styles from './topbar.module.css'

const UnauthenticatedNavTopbar: FC = () => {
  return (
    <div className={styles.topbar_navigation}>
      <a href="#" className={styles.topbar_primary_button}>
        <PlusIcon className={styles.topbar_icon} />
        Criar conta
      </a>
    </div>
  )
}

export default UnauthenticatedNavTopbar
