import { TrashIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { DraftUser } from '../../domain/draft'
import { api } from '../../services/api'
import { useToastStore } from '../../stores/toast.store'

import styles from './edit-draft.module.css'

export interface EditDraftContributorItemProps {
  contributor: DraftUser
  draftId: string
  onContributorDeleted(contributorId: string): void
  isCreator: boolean
}

const EditDraftContributorItem: FC<EditDraftContributorItemProps> = ({
  contributor,
  ...props
}) => {
  const toast = useToastStore((s) => s.toast)

  const handleDeleteButton = async () => {
    try {
      if (!confirm('Deseja remover esse contribuidor?')) return

      await api.put(`/drafts/${props.draftId}/writers/remove/${contributor.id}`)

      props.onContributorDeleted(contributor.id)
    } catch (error) {
      toast({ title: 'Algo deu errado!' })
    }
  }

  return (
    <div className={styles.edit_draft_add_contributors_item_container}>
      <span className={styles.edit_draft_add_contributors_item_title}>
        {contributor.email}
      </span>

      {props.isCreator && (
        <button onClick={handleDeleteButton}>
          <TrashIcon className={styles.edit_draft_add_contributors_item_icon} />
        </button>
      )}
    </div>
  )
}

export default EditDraftContributorItem
