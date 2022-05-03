import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import styles from './primary-button.module.css'

export interface PrimaryButtonProps {
  children: ReactNode
  className?: string
  onClick(): void
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      onClick={props.onClick}
      className={classNames(styles.primary_button, props.className)}
    >
      {children}
    </button>
  )
}
