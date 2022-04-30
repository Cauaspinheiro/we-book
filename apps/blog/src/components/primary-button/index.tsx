import { FC, ReactNode } from 'react'
import styles from './primary-button.module.css'

export interface PrimaryButtonProps {
  children: ReactNode
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children }) => {
  return <button className={styles.primary_button}>{children}</button>
}
