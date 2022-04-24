import { FC } from 'react'
import { useQuery } from 'react-query'
import { Draft } from '../../domain/draft'
import { useUserStore } from '../../stores/user.store'

import styles from '../posts-timeline/posts-timeline.module.css'
import { DraftsTimelineItem } from './drafts-timeline-item'

export interface DraftsTimelineProps {
  initialDrafts: Draft[]
  fetchDraftsTimeline: () => Promise<Draft[]>
}

export const DraftsTimeline: FC<DraftsTimelineProps> = ({
  initialDrafts,
  fetchDraftsTimeline,
}) => {
  const { isLoading, error, data } = useQuery(
    'drafts-timeline',
    fetchDraftsTimeline,
    {
      initialData: initialDrafts,
      staleTime: 1000 * 60,
    },
  )

  const userId = useUserStore((s) => s.userId)

  if (!userId) {
    return (
      <div className={styles.timeline_container}>
        <h1 className={styles.timeline_title}>
          Você precisa estar logado para ver os seus rascunhos
        </h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={styles.timeline_container}>
        <h1 className={styles.timeline_title}>Carregando...</h1>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className={styles.timeline_container}>
        <h1 className={styles.timeline_title}>Algo deu errado!</h1>
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className={styles.timeline_container}>
        <h1 className={styles.timeline_title}>Sem nada para ver</h1>
      </div>
    )
  }

  return (
    <div className={styles.timeline_container}>
      {data.map((draft) => (
        <DraftsTimelineItem key={draft.id} draft={draft} />
      ))}
    </div>
  )
}
