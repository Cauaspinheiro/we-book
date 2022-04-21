import { FC, MouseEvent } from 'react'
import { Post } from '../../domain/post'
import styles from './posts-timeline.module.css'
import { ShareIcon } from '@heroicons/react/solid'

export interface PostTimelineItemProps {
  post: Post
  key: string
}

export const PostTimelineItem: FC<PostTimelineItemProps> = ({ post }) => {
  const copyToClipboard = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const url = `${window.location.host}/${post.id}`

    if (!window.navigator.clipboard) {
      return alert('Cannot copy value to clipboard')
    }

    window.navigator.clipboard?.writeText(url)
  }

  return (
    <a href={`/${post.id}`} className={styles.timeline_item_container}>
      <div className={styles.timeline_item_header}>
        <h2 className={styles.timeline_item_title}>Título do post</h2>

        <span className={styles.timeline_item_divider}>·</span>

        <h3 className={styles.timeline_item_publisher}>
          {post.publisher.name}
        </h3>
      </div>

      <p className={styles.timeline_item_description}>{post.content}</p>

      <div className={styles.timeline_item_footer_container}>
        <span className={styles.timeline_item_views}>
          {post.viewersCount} visualizações
        </span>

        <button
          onClick={(e) => copyToClipboard(e)}
          className={styles.timeline_item_share}
        >
          <ShareIcon className={styles.timeline_item_share_icon} />
          Compartilhar
        </button>

        <h3 className={styles.timeline_item_created_at}>
          {new Date(post.createdAt).toLocaleString('PT-BR', {
            timeStyle: 'short',
            hour12: false,
            dateStyle: 'long',
          })}
        </h3>
      </div>
    </a>
  )
}
