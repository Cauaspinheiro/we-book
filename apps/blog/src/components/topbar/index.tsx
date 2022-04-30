import { FC } from 'react'
import styles from './topbar.module.css'
import Link from 'next/link'
import { TopbarNavigation } from './topbar-navigation'

const Topbar: FC = () => {
  return (
    <div className={styles.topbar_container}>
      <nav className={styles.topbar}>
        <Link href="/">
          <a>
            <h1 className={styles.topbar_title}>WeBook</h1>
          </a>
        </Link>

        <TopbarNavigation />
      </nav>
    </div>
  )
}

export default Topbar
