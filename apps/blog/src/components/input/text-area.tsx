import { FC } from 'react'

import styles from './input.module.css'

export interface TextAreaProps {
  id: string
  label: string
  value: string
  setValue(value: string): void
  resize?: 'none' | 'large' | 'infinite'
}

const resizesClasses = {
  none: styles.text_area_resize_none,
  large: styles.text_area_resize_large,
  infinite: styles.text_area_resize_infinite,
}

const TextArea: FC<TextAreaProps> = (props) => {
  return (
    <div className={styles.input_container}>
      <label className={styles.input_label} htmlFor={props.id}>
        {props.label}
      </label>

      <textarea
        className={`${styles.input} ${resizesClasses[props.resize || 'none']}`}
        id={props.id}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  )
}

export default TextArea
