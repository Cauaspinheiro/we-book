import { FC, ReactNode } from 'react'
import styles from './primary-button.module.css'

export interface PrimaryButtonProps {
  children: ReactNode
  onClick(): void
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button onClick={props.onClick} className={styles.primary_button}>
      {children}
    </button>
  )
}
