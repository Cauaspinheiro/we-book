import { FC, ReactNode } from 'react'
import styles from './primary-button.module.css'

export interface PrimaryButtonLinkProps {
  href?: string
  children: ReactNode
}

export const PrimaryButtonLink: FC<PrimaryButtonLinkProps> = ({
  children,
  ...props
}) => {
  return (
    <a className={styles.primary_button} href={props.href}>
      {children}
    </a>
  )
}
