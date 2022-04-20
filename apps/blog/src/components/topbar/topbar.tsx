import { FC } from 'react'
import styles from './topbar.module.css'
import dynamic from 'next/dynamic'

const TopbarNavigation = dynamic(() => import('./no-ssr-navigation.topbar'), {
  ssr: false,
})

const TopbarComponent: FC = () => {
  return (
    <div className={styles.topbar}>
      <h1 className={styles.topbar_title}>WeBook</h1>

      <TopbarNavigation />
    </div>
  )
}

export default TopbarComponent
