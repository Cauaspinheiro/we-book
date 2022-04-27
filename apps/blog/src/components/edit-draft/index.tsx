import { FC, useState } from 'react'
import Input from '../input'
import TextArea from '../input/text-area'

import styles from './edit-draft.module.css'
import NewDraftHeader from './new-draft-header'

export const EditDraft: FC = () => {
  const [title, setTitle] = useState('')
  const [cover, setCover] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')

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
        <NewDraftHeader
          description={description}
          title={title}
          content={content}
          cover={cover}
        />
      </aside>
    </div>
  )
}
