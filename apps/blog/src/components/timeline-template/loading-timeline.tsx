import { FC } from 'react'

import styles from './timeline-template.module.css'

export const LoadingTimeline: FC = () => {
  return (
    <div className={styles.alt_state_timeline_container}>
      <h1 className={styles.alt_state_timeline_title}>Carregando...</h1>
    </div>
  )
}
