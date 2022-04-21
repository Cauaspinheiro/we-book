import { FC } from 'react'
import styles from './topbar.module.css'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const TopbarNavigation = dynamic(() => import('./no-ssr-navigation.topbar'), {
  ssr: false,
})

const TopbarComponent: FC = () => {
  return (
    <div className={styles.topbar}>
      <Link href="/">
        <a>
          <h1 className={styles.topbar_title}>WeBook</h1>
        </a>
      </Link>

      <TopbarNavigation />
    </div>
  )
}

export default TopbarComponent
