import { FC, ReactNode } from 'react'

import styles from './timeline-template.module.css'
import Link from 'next/link'

export interface TimelineTemplateItemProps {
  item: {
    title: string
    description: string
    creatorName: string
    createdAt: string
    views?: string | number
  }
  children: ReactNode
}

export const TimelineTemplateItem: FC<TimelineTemplateItemProps> = ({
  item,
  children,
}) => {
  return (
    <div className={styles.timeline_item_container}>
      <h2 className={styles.timeline_item_title}>{item.title}</h2>

      <h3 className={styles.timeline_item_subtitle}>{item.creatorName}</h3>

      <p className={styles.timeline_item_body}>{item.description}</p>

      <div className={styles.timeline_item_footer}>
        <h3 className={styles.timeline_item_footer_text}>
          {new Date(item.createdAt).toLocaleString('PT-BR', {
            timeStyle: 'short',
            hour12: false,
            dateStyle: 'long',
          })}
        </h3>

        {item.views !== undefined && (
          <span className={styles.timeline_item_footer_text}>·</span>
        )}

        {item.views !== undefined && (
          <h3 className={styles.timeline_item_footer_text}>
            {item.views} visualizações
          </h3>
        )}
      </div>

      <div className={styles.timeline_item_actions_container}>{children}</div>
    </div>
  )
}

export const TimelineTemplateItemFooterLink: FC<{
  href: string
  label: ReactNode
  icon: FC<{ className: string }>
}> = (props) => {
  return (
    <Link href={props.href}>
      <a className={styles.timeline_item_link}>
        {props.label}
        <props.icon className={styles.timeline_item_link_icon} />
      </a>
    </Link>
  )
}

export const TimelineTemplateItemFooterButton: FC<{
  onPress(): void
  label: ReactNode
  icon: FC<{ className: string }>
}> = (props) => {
  return (
    <button
      onClick={() => props.onPress()}
      className={styles.timeline_item_link}
    >
      {props.label}
      <props.icon className={styles.timeline_item_link_icon} />
    </button>
  )
}
