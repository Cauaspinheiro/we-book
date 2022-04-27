import { NextPage } from 'next'
import Topbar from '../../../components/topbar'
import { useUserStore } from '../../../stores/user.store'

import styles from '../../../styles/pages/drafts/draft.module.css'
import { GetServerSideProps } from 'next'
import { Draft } from '../../../domain/draft'
import { api } from '../../../services/api'
import axios from 'axios'
import { EditDraft } from '../../../components/edit-draft'

export interface EditDraftPageProps {
  draft: Draft | null
}

const EditDraftPage: NextPage<EditDraftPageProps> = ({ draft }) => {
  const userId = useUserStore((s) => s.userId)

  if (!userId) {
    return (
      <div className={styles.draft_container}>
        <Topbar />

        <div className={styles.draft_content_container}>
          <h1 className={styles.draft_title}>
            Você precisa estar logado para editar um rascunho
          </h1>
        </div>
      </div>
    )
  }

  if (!draft) {
    return (
      <div className={styles.draft_container}>
        <Topbar />

        <div className={styles.draft_content_container}>
          <h1 className={styles.draft_title}>Algo deu errado!</h1>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.draft_container}>
      <Topbar />

      <div className={styles.draft_content_container}>
        <EditDraft draft={draft} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  EditDraftPageProps
> = async (ctx) => {
  try {
    const { data } = await api.get(`/drafts/${String(ctx.params?.id)}`, {
      headers: { cookie: String(ctx.req.headers.cookie) },
    })

    return { props: { draft: data } }
  } catch (error) {
    console.log(error)

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return { notFound: true }
      }
    }

    return { props: { draft: null } }
  }
}

export default EditDraftPage
