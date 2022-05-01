import { ArrowRightIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Post } from '../../domain/post'
import { api } from '../../services/api'
import { TimelineTemplate } from '../timeline-template'
import {
  TimelineTemplateItem,
  TimelineTemplateItemFooterLink,
} from '../timeline-template/timeline-template-item'

export interface HomeTimelineProps {
  initialData: Post[]
}

export const HomeTimeline: FC<HomeTimelineProps> = ({ initialData }) => {
  const queryData = useQuery(
    'home-timeline',
    async () => {
      const { data } = await api.get<Post[]>('/posts')

      return data
    },
    {
      initialData,
      staleTime: 1000 * 60,
    },
  )

  return (
    <TimelineTemplate
      {...queryData}
      renderItem={(post: Post) => {
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
          </TimelineTemplateItem>
        )
      }}
    />
  )
}
