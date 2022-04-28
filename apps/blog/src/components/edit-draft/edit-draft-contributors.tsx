import { FC } from 'react'
import { DraftUser } from '../../domain/draft'
import EditDraftContributorItem from './edit-draft-contributor-item'
import * as ScrollPrimitive from '@radix-ui/react-scroll-area'

import styles from './edit-draft.module.css'

export interface EditDraftContributorsProps {
  contributors: DraftUser[]
  setContributors(contributors: DraftUser[]): void
  draftId: string
  isCreator: boolean
}

const EditDraftContributors: FC<EditDraftContributorsProps> = ({
  contributors,
  ...props
}) => {
  const handleDeleteContributor = (id: string) => {
    const newContributors = contributors.filter((v) => v.id !== id)

    props.setContributors([...newContributors])
  }

  if (!contributors.length) {
    return (
      <span className={styles.edit_draft_empty_contributors_title}>
        Sem contribuidores
      </span>
    )
  }

  return (
    <ScrollPrimitive.Root
      className={styles.edit_draft_contributors_scroll}
      style={{
        height: contributors.length * 44 + 28 + (contributors.length - 1) * 2,
      }}
    >
      <ScrollPrimitive.Viewport
        className={styles.edit_draft_contributors_scroll_viewport}
      >
        <div
          className={styles.edit_draft_contributors_scroll_content_container}
        >
          <div className={styles.edit_draft_contributors_scroll_content}>
            {contributors.map((v) => (
              <EditDraftContributorItem
                contributor={v}
                key={v.id}
                draftId={props.draftId}
                onContributorDeleted={handleDeleteContributor}
                isCreator={props.isCreator}
              />
            ))}
          </div>
        </div>
      </ScrollPrimitive.Viewport>

      <ScrollPrimitive.Scrollbar
        orientation="horizontal"
        className={styles.edit_draft_contributors_scrollbar}
      >
        <ScrollPrimitive.Thumb
          className={styles.edit_draft_contributors_scroll_thumb}
        />
      </ScrollPrimitive.Scrollbar>

      <ScrollPrimitive.Scrollbar
        orientation="vertical"
        className={styles.edit_draft_contributors_scrollbar}
      >
        <ScrollPrimitive.Thumb
          className={styles.edit_draft_contributors_scroll_thumb}
        />
      </ScrollPrimitive.Scrollbar>

      <ScrollPrimitive.Corner
        className={styles.edit_draft_contributors_scroll_corner}
      />
    </ScrollPrimitive.Root>
  )
}

export default EditDraftContributors
