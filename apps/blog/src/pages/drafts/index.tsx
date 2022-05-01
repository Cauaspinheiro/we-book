import { GetServerSideProps, NextPage } from 'next'
import { DraftsTimeline } from '../../components/drafts-timeline'

import { Draft } from '../../domain/draft'
import { api } from '../../services/api'
import PageContainer from '../../components/page-container'

export interface DraftsPageProps {
  drafts: Draft[]
}

const DraftsPage: NextPage<DraftsPageProps> = ({ drafts }) => {
  return (
    <PageContainer>
      <DraftsTimeline initialData={drafts} />
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps<DraftsPageProps> = async (
  ctx,
) => {
  try {
    const { data: drafts } = await api.get<Draft[]>('drafts', {
      headers: { cookie: String(ctx.req.headers.cookie) },
    })

    return { props: { drafts } }
  } catch (error) {
    return { props: { drafts: [] } }
  }
}

export default DraftsPage
