import { FC } from 'react'
import { useQuery } from 'react-query'
import { Post } from '../../domain/post'
import { PostTimelineItem } from './post-timeline-item'
import { fetchPostTimeline } from './post-timeline.fetch'

import styles from './posts-timeline.module.css'

export interface PostsTimelineProps {
  initialPosts: Post[]
}

export const PostsTimeline: FC<PostsTimelineProps> = ({ initialPosts }) => {
  const { isLoading, error, data } = useQuery(
    'posts-timeline',
    fetchPostTimeline,
    { initialData: initialPosts, staleTime: 1000 * 60 },
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
        <PostTimelineItem key={post.id} post={post} />
      ))}
    </div>
  )
}
