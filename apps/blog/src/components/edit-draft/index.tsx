import { FC, useState } from 'react'
import { Draft } from '../../domain/draft'
import { useUserStore } from '../../stores/user.store'
import Input from '../input'
import TextArea from '../input/text-area'

import styles from './edit-draft.module.css'
import ExistingDraftHeader from './existing-draft-header'
import NewDraftHeader from './new-draft-header'

export interface EditDraftProps {
  draft?: Draft
}

export const EditDraft: FC<EditDraftProps> = ({ draft }) => {
  const [title, setTitle] = useState(draft?.title || '')
  const [urlPath, setUrlPath] = useState(draft?.urlPath || '')
  const [description, setDescription] = useState(draft?.description || '')
  const [content, setContent] = useState(draft?.content || '')
  const userId = useUserStore((s) => s.userId)

  return (
    <div className={styles.edit_draft_container}>
      <div className={styles.edit_draft_info_container}>
        <div className={styles.edit_draft_info_header}>
          <Input id="title" label="Título" value={title} setValue={setTitle} />

          <Input
            type="url"
            label="Caminho do post"
            id="uri"
            value={urlPath}
            setValue={setUrlPath}
          />
        </div>

        <TextArea
          label="Descrição"
          id="description"
          value={description}
          setValue={setDescription}
        />

        <TextArea
          label="Conteúdo"
          id="content"
          resize="infinite"
          value={content}
          setValue={setContent}
        />
      </div>

      <aside className={styles.edit_draft_aside}>
        {draft?.id ? (
          <ExistingDraftHeader
            description={description}
            title={title}
            content={content}
            id={draft.id}
            urlPath={urlPath}
            contributors={draft.contributors}
            isCreator={draft.creator.id === userId}
          />
        ) : (
          <NewDraftHeader
            description={description}
            title={title}
            content={content}
            urlPath={urlPath}
          />
        )}
      </aside>
    </div>
  )
}
