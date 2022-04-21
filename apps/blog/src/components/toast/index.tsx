import { FC, Fragment } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'

import styles from './toast.module.css'

import { useToastStore } from '../../stores/toast.store'

export interface ToastProps {
  open: boolean
  onOpenChange(open: boolean): void
  duration?: number
  children?: undefined
}

export const Toast: FC<ToastProps> = ({ ...props }) => {
  const toastData = useToastStore((s) => s.toastData)

  return (
    <Fragment>
      <ToastPrimitive.Root
        className={styles.toast_container}
        {...props}
        duration={props.duration || 300}
      >
        <div className={styles.toast_data_container}>
          <ToastPrimitive.Title className={styles.toast_title}>
            {toastData.title}
          </ToastPrimitive.Title>
          <ToastPrimitive.Description className={styles.toast_description}>
            {toastData.description}
          </ToastPrimitive.Description>
        </div>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport className={styles.toast_viewport} />
    </Fragment>
  )
}
