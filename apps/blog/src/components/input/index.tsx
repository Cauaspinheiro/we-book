import { FC } from 'react'

import styles from './input.module.css'

export interface InputProps {
  label: string
  type?: 'url' | 'text' | 'email'
  id: string
  value: string
  setValue(value: string): void
  placeholder?: string
}

const Input: FC<InputProps> = (props) => {
  return (
    <div className={styles.input_container}>
      <label className={styles.input_label} htmlFor={props.id}>
        {props.label}
      </label>

      <input
        className={styles.input}
        id={props.id}
        type={props.type || 'text'}
        onChange={(e) => props.setValue(e.target.value)}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default Input
