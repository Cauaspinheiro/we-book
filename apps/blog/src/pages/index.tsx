import { NextPage } from 'next'
import Topbar from '../components/topbar'
import styles from '../styles/pages/home.module.css'

const HomePage: NextPage = () => {
  return (
    <div className={styles.home_container}>
      <Topbar />

      <div className={styles.home_content_container}>
        <div className={styles.home_content_timeline}>
          <h1 className={styles.home_title}>Posts recentes</h1>
        </div>
      </div>
    </div>
  )
}

export default HomePage
