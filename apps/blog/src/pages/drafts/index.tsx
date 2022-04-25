import { GetServerSideProps, NextPage } from 'next'
import Topbar from '../../components/topbar'
import { DraftsTimeline } from '../../components/drafts-timeline'

import styles from '../../styles/pages/drafts/drafts.module.css'
import { Draft } from '../../domain/draft'
import { api } from '../../services/api'

export interface DraftsPageProps {
  drafts: Draft[]
}

const DraftsPage: NextPage<DraftsPageProps> = ({ drafts }) => {
  return (
    <div className={styles.drafts_container}>
      <Topbar />

      <div className={styles.drafts_content_container}>
        <DraftsTimeline initialDrafts={drafts} />
      </div>
    </div>
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
