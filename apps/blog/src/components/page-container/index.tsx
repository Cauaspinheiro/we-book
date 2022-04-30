import { FC, ReactNode } from 'react'
import Topbar from '../topbar'

import styles from './page-container.module.css'

export interface PageContainerProps {
  children: ReactNode
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <div className={styles.page_container}>
      <Topbar />

      <div className={styles.page_container_content}>{children}</div>
    </div>
  )
}

export default PageContainer
