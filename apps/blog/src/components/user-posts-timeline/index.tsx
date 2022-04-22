import { FC } from 'react'
import { useQuery } from 'react-query'
import { UserPost } from '../../domain/user-post'

import styles from '../posts-timeline/posts-timeline.module.css'
import { UserPostsTimelineItem } from './user-posts-timeline-item'

export interface UserPostsTimelineProps {
  initialPosts: UserPost[]
  fetchPostsTimeline: () => Promise<UserPost[]>
}

export const UserPostsTimeline: FC<UserPostsTimelineProps> = ({
  initialPosts,
  fetchPostsTimeline,
}) => {
  const { isLoading, error, data } = useQuery(
    'user-posts-timeline',
    fetchPostsTimeline,
    {
      initialData: initialPosts,
      staleTime: 1000 * 60,
    },
  )

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
      {data.map((post) => (
        <UserPostsTimelineItem key={post.id} post={post} />
      ))}
    </div>
  )
}
