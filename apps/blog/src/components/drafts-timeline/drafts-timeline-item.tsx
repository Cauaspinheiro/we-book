import { FC, MouseEvent } from 'react'

import styles from '../posts-timeline/posts-timeline.module.css'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useToastStore } from '../../stores/toast.store'
import { api } from '../../services/api'
import { useRouter } from 'next/router'
import { Draft } from '../../domain/draft'
import { useUserStore } from '../../stores/user.store'

export interface DraftsTimelineItemProps {
  draft: Draft
  key: string
}

export const DraftsTimelineItem: FC<DraftsTimelineItemProps> = ({ draft }) => {
  const toast = useToastStore((v) => v.toast)
  const router = useRouter()

  const userId = useUserStore((s) => s.userId)

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!confirm('Deseja deletar esse draft mesmo? Essa ação é irreversível')) {
      return
    }

    try {
      await api.delete(`/drafts/${draft.id}`)

      // need to reload to find draft in the server-side
      router.reload()
    } catch (error) {
      toast({ title: 'Algo deu errado!', description: String(error) })
    }
  }

  return (
    <div className={styles.timeline_item_container}>
      <div className={styles.timeline_item_header}>
        <h2 className={styles.timeline_item_title}>{draft.title}</h2>

        <span className={styles.timeline_item_divider}>·</span>

        <h3 className={styles.timeline_item_publisher}>{draft.creator.name}</h3>

        <div className={styles.timeline_item_manage_container}>
          <Link href={`/drafts/${draft.id}/edit`}>
            <a className={styles.timeline_item_manage_item}>
              <PencilIcon className={styles.timeline_item_manage_icon} />
            </a>
          </Link>

          {userId === draft.creator.id && (
            <button
              className={styles.timeline_item_manage_item}
              onClick={handleDelete}
            >
              <TrashIcon className={styles.timeline_item_manage_icon} />
            </button>
          )}
        </div>
      </div>

      <p className={styles.timeline_item_description}>
        {draft.description || 'Sem descrição'}
      </p>

      <div className={styles.timeline_item_footer_container}>
        <h3 className={styles.timeline_item_created_at}>
          {new Date(draft.createdAt).toLocaleString('PT-BR', {
            timeStyle: 'short',
            hour12: false,
            dateStyle: 'long',
          })}
        </h3>
      </div>
    </div>
  )
}
