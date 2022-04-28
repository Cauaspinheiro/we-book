import { FC, MouseEvent, useEffect, useState } from 'react'
import { Post } from '../../domain/post'
import styles from './posts-timeline.module.css'
import { ShareIcon } from '@heroicons/react/solid'
import Link from 'next/link'

import { useToastStore } from '../../stores/toast.store'

export interface PostTimelineItemProps {
  post: Post
  key: string
}

export const PostTimelineItem: FC<PostTimelineItemProps> = ({ post }) => {
  const toast = useToastStore((v) => v.toast)

  const [isSafeContext, setIsSafeContext] = useState(true)

  useEffect(() => {
    if (!window.navigator?.clipboard) {
      setIsSafeContext(false)
    }
  }, [])

  const copyToClipboard = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const url = `${window.location.host}/${post.urlPath}`

    window.navigator.clipboard.writeText(url)

    toast({
      title: 'Link copiado!',
    })
  }

  return (
    <Link href={`/${post.urlPath}`}>
      <a className={styles.timeline_item_container}>
        <div className={styles.timeline_item_header}>
          <h2 className={styles.timeline_item_title}>{post.title}</h2>

          <span className={styles.timeline_item_divider}>·</span>

          <h3 className={styles.timeline_item_publisher}>
            {post.publisher.name}
          </h3>
        </div>

        <p className={styles.timeline_item_description}>{post.description}</p>

        <div className={styles.timeline_item_footer_container}>
          <span className={styles.timeline_item_views}>
            {post.viewersCount} visualizações
          </span>

          {isSafeContext && (
            <button
              onClick={copyToClipboard}
              className={styles.timeline_item_share}
            >
              <ShareIcon className={styles.timeline_item_share_icon} />
              Compartilhar
            </button>
          )}

          <h3 className={styles.timeline_item_created_at}>
            {new Date(post.createdAt).toLocaleString('PT-BR', {
              timeStyle: 'short',
              hour12: false,
              dateStyle: 'long',
            })}
          </h3>
        </div>
      </a>
    </Link>
  )
}
