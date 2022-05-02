import { FC } from 'react'

import styles from './internal-error.module.css'

export const InternalError: FC = () => {
  return (
    <div className={styles.internal_error_container}>
      <h1 className={styles.internal_error_title}>Algo deu errado...</h1>

      <h2 className={styles.internal_error_subtitle}>
        Tente novamente mais tarde
      </h2>
    </div>
  )
}
