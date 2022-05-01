import { FC } from 'react'

import styles from './timeline-template.module.css'

export const EmptyTimeline: FC = () => {
  return (
    <div className={styles.alt_state_timeline_container}>
      <h1 className={styles.alt_state_timeline_title}>
        Nenhum post encontrado
      </h1>
    </div>
  )
}
