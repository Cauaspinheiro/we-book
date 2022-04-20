import { NextPage } from 'next'
import styles from '../styles/pages/home.module.css'

const HomePage: NextPage = () => {
  return (
    <div className={styles.home_container}>
      <h1 className={styles.home_title}>Blog coming soon!</h1>
    </div>
  )
}

export default HomePage
