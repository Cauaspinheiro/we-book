import { FC } from 'react'

import styles from './timeline-template.module.css'

export const ErrorTimeline: FC = () => {
  return (
    <div className={styles.alt_state_timeline_container}>
      <h1 className={styles.alt_state_timeline_title}>Algo deu errado...</h1>

      <h2 className={styles.alt_state_timeline_subtitle}>
        Tente novamente mais tarde
      </h2>
    </div>
  )
}
