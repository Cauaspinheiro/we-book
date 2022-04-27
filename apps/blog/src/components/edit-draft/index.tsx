import { FC, useState } from 'react'
import { Draft } from '../../domain/draft'
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
  const [cover, setCover] = useState(draft?.ogCover || '')
  const [urlPath, setUrlPath] = useState(draft?.urlPath || '')
  const [description, setDescription] = useState(draft?.description || '')
  const [content, setContent] = useState(draft?.content || '')

  return (
    <div className={styles.edit_draft_container}>
      <div className={styles.edit_draft_info_container}>
        <div className={styles.edit_draft_info_header}>
          <Input id="title" label="Título" value={title} setValue={setTitle} />

          <Input
            type="url"
            label="Link cover"
            id="cover"
            value={cover}
            setValue={setCover}
          />
        </div>

        <Input
          type="url"
          label="Caminho do post"
          id="uri"
          value={urlPath}
          setValue={setUrlPath}
        />

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
            ogCover={cover}
            id={draft.id}
            urlPath={urlPath}
          />
        ) : (
          <NewDraftHeader
            description={description}
            title={title}
            content={content}
            ogCover={cover}
            urlPath={urlPath}
          />
        )}
      </aside>
    </div>
  )
}
