import { FC } from 'react'
import styles from './topbar.module.css'
import Link from 'next/link'
import { TopbarNavigation } from './navigation.topbar'

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
