import { FC, MouseEvent, useEffect, useState } from 'react'

import styles from '../posts-timeline/posts-timeline.module.css'
import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useToastStore } from '../../stores/toast.store'
import { api } from '../../services/api'
import { useRouter } from 'next/router'
import { UserPost } from '../../domain/user-post'

export interface UserPostsTimelineItemProps {
  post: UserPost
  key: string
}

export const UserPostsTimelineItem: FC<UserPostsTimelineItemProps> = ({
  post,
}) => {
  const toast = useToastStore((v) => v.toast)
  const router = useRouter()

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

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!confirm('Deseja deletar esse post mesmo? Essa ação é irreversível')) {
      return
    }

    try {
      await api.delete(`/posts/${post.id}`)

      // need to reload to find posts in the server-side
      router.reload()
    } catch (error) {
      toast({ title: 'Algo deu errado!', description: String(error) })
    }
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

          <div className={styles.timeline_item_manage_container}>
            <Link href={`/drafts/${post.urlPath}/edit`}>
              <a className={styles.timeline_item_manage_item}>
                <PencilIcon className={styles.timeline_item_manage_icon} />
              </a>
            </Link>

            {post.isPublisher && (
              <button
                className={styles.timeline_item_manage_item}
                onClick={handleDelete}
              >
                <TrashIcon className={styles.timeline_item_manage_icon} />
              </button>
            )}
          </div>
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
