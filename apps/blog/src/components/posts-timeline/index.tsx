import { ArrowRightIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Post } from '../../domain/post'
import { UserPost } from '../../domain/user-post'
import { api } from '../../services/api'
import { useToastStore } from '../../stores/toast.store'
import { TimelineTemplate } from '../timeline-template'
import {
  TimelineTemplateItem,
  TimelineTemplateItemFooterButton,
  TimelineTemplateItemFooterLink,
} from '../timeline-template/timeline-template-item'

export interface PostsTimelineProps {
  initialData: UserPost[]
}

export const PostsTimeline: FC<PostsTimelineProps> = ({ initialData }) => {
  const toast = useToastStore((s) => s.toast)

  const queryData = useQuery(
    'posts-timeline',
    async () => {
      const { data } = await api.get<Post[]>('/posts/me')

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
      await api.delete(`/posts/${id}`)

      queryData.refetch()
    } catch (error) {
      toast({ title: 'Algo deu errado!', description: String(error) })
    }
  }

  return (
    <TimelineTemplate
      {...queryData}
      renderItem={(post: UserPost) => {
        return (
          <TimelineTemplateItem
            key={post.id}
            item={{
              createdAt: post.createdAt,
              creatorName: post.publisher.name,
              description: post.description,
              title: post.title,
              views: post.viewersCount,
            }}
          >
            <TimelineTemplateItemFooterLink
              href={post.urlPath}
              icon={ArrowRightIcon}
              label="Ler mais"
            />
            {post.hasDraft && (
              <TimelineTemplateItemFooterLink
                href={`/drafts/${post.id}/edit`}
                icon={PencilIcon}
                label="Editar"
              />
            )}
            {post.isPublisher && (
              <TimelineTemplateItemFooterButton
                onPress={() => handleDelete(post.id)}
                icon={TrashIcon}
                label="Deletar post"
              />
            )}
          </TimelineTemplateItem>
        )
      }}
    />
  )
}
