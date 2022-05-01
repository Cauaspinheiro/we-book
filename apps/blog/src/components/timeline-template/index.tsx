import { FC, ReactNode } from 'react'
import { EmptyTimeline } from './empty-timeline'
import { ErrorTimeline } from './error-timeline'
import { LoadingTimeline } from './loading-timeline'

import styles from './timeline-template.module.css'

export interface TimelineTemplateProps {
  error: unknown
  isLoading: boolean
  data?: any[]
  renderItem(item: any): ReactNode
}

export const TimelineTemplate: FC<TimelineTemplateProps> = (props) => {
  if (props.isLoading) return <LoadingTimeline />

  if (props.error) return <ErrorTimeline />

  if (!props.data || !props.data.length) return <EmptyTimeline />

  return (
    <div className={styles.timeline_container}>
      {props.data.map(props.renderItem)}
    </div>
  )
}
