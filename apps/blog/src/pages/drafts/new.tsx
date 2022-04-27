import { NextPage } from 'next'
import { EditDraft } from '../../components/edit-draft'
import Topbar from '../../components/topbar'
import { useUserStore } from '../../stores/user.store'

import styles from '../../styles/pages/drafts/draft.module.css'

const NewDraftPage: NextPage = () => {
  const userId = useUserStore((s) => s.userId)

  if (!userId) {
    return (
      <div className={styles.draft_container}>
        <Topbar />

        <div className={styles.draft_content_container}>
          <h1 className={styles.draft_title}>
            Você precisa estar logado para criar um novo rascunho
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.draft_container}>
      <Topbar />

      <div className={styles.draft_content_container}>
        <EditDraft />
      </div>
    </div>
  )
}

export default NewDraftPage
