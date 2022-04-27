import { useRouter } from 'next/router'
import { FC } from 'react'
import { ValidationError } from 'yup'
import { Draft } from '../../domain/draft'
import { api } from '../../services/api'
import { useToastStore } from '../../stores/toast.store'
import { adaptFormToAPI } from '../../utils/api.adapter'
import { DraftValidator } from '../../validators/draft.validator'

import styles from './edit-draft.module.css'

export interface NewDraftHeaderProps {
  content: string
  title: string
  description: string
  cover: string

  children?: undefined
}

const NewDraftHeader: FC<NewDraftHeaderProps> = (props) => {
  const toast = useToastStore((s) => s.toast)
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      const formFields = await DraftValidator.validate(props)

      const data = adaptFormToAPI(formFields)

      const {
        data: { id },
      } = await api.post<Draft>('/drafts', data)

      router.replace(`/drafts/${id}/edit`)
    } catch (error) {
      if (error instanceof ValidationError) {
        toast({ title: 'Formulário inválido', description: error.message })
      }
    }
  }

  return (
    <div className={styles.edit_draft_aside_header}>
      <button
        className="primary-button"
        style={{
          width: '100%',
          justifyContent: 'center',
        }}
        onClick={handleSubmit}
      >
        Criar
      </button>
    </div>
  )
}

export default NewDraftHeader
