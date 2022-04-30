import { FC } from 'react'
import { PrimaryButtonProps } from './index'
import styles from './primary-button.module.css'

export interface PrimaryButtonLinkProps extends PrimaryButtonProps {
  href?: string
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
