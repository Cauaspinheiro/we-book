import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Draft } from '../../domain/draft'
import { api } from '../../services/api'
import { useToastStore } from '../../stores/toast.store'
import { useUserStore } from '../../stores/user.store'
import { TimelineTemplate } from '../timeline-template'
import {
  TimelineTemplateItem,
  TimelineTemplateItemFooterButton,
  TimelineTemplateItemFooterLink,
} from '../timeline-template/timeline-template-item'

export interface DraftsTimelineProps {
  initialData: Draft[]
}

export const DraftsTimeline: FC<DraftsTimelineProps> = ({ initialData }) => {
  const toast = useToastStore((s) => s.toast)
  const userId = useUserStore((s) => s.userId)

  const queryData = useQuery(
    'drafts-timeline',
    async () => {
      const { data } = await api.get<Draft[]>('/drafts')

      return data
    },
    {
      initialData,
      staleTime: 1000 * 60,
    },
  )

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja deletar esse post? Essa ação é irreversível')) {
      return
    }

    try {
      await api.delete(`/drafts/${id}`)

      queryData.refetch()
    } catch (error) {
      toast({ title: 'Algo deu errado!', description: String(error) })
    }
  }

  return (
    <TimelineTemplate
      {...queryData}
      renderItem={(post: Draft) => {
        return (
          <TimelineTemplateItem
            key={post.id}
            item={{
              createdAt: post.createdAt,
              creatorName: post.creator.name,
              description: post.description || 'Sem descrição',
              title: post.title,
            }}
          >
            <TimelineTemplateItemFooterLink
              href={`/drafts/${post.id}/edit`}
              icon={PencilIcon}
              label="Editar"
            />

            {post.creator.id === userId && (
              <TimelineTemplateItemFooterButton
                onPress={() => handleDelete(post.id)}
                icon={TrashIcon}
                label="Deletar"
              />
            )}
          </TimelineTemplateItem>
        )
      }}
    />
  )
}
