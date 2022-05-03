import { FC } from 'react'
import Input from '../input'
import TextArea from '../input/text-area'

import styles from './draft-editor.module.css'

interface DraftEditorFieldProps {
  value: string
  setValue(value: string): void
}

export interface DraftEditorProps {
  title: DraftEditorFieldProps
  urlPath: DraftEditorFieldProps
  description: DraftEditorFieldProps
  content: DraftEditorFieldProps
}

export const DraftEditor: FC<DraftEditorProps> = (props) => {
  return (
    <div className={styles.draft_editor_container}>
      <div className={styles.draft_editor_header}>
        <Input
          id="title"
          label="Título"
          value={props.title.value}
          setValue={props.title.setValue}
        />

        <Input
          type="url"
          label="Caminho do post (opcional)"
          id="uri"
          value={props.urlPath.value}
          setValue={props.urlPath.setValue}
        />
      </div>

      <TextArea
        label="Descrição"
        id="description"
        value={props.description.value}
        setValue={props.description.setValue}
      />

      <TextArea
        label="Conteúdo"
        id="content"
        resize="infinite"
        value={props.content.value}
        setValue={props.content.setValue}
      />
    </div>
  )
}
