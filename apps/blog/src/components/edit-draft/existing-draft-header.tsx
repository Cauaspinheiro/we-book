import { useRouter } from 'next/router'
import { FC } from 'react'
import { ValidationError } from 'yup'
import { Draft } from '../../domain/draft'
import { api } from '../../services/api'
import { useToastStore } from '../../stores/toast.store'
import { adaptFormToAPI } from '../../utils/api.adapter'
import { DraftValidator } from '../../validators/draft.validator'
import axios from 'axios'

import styles from './edit-draft.module.css'

export interface ExistingDraftHeaderProps {
  content: string
  title: string
  description: string
  ogCover: string
  id: string
  urlPath: string

  children?: undefined
}

const ExistingDraftHeader: FC<ExistingDraftHeaderProps> = (props) => {
  const toast = useToastStore((s) => s.toast)
  const router = useRouter()

  const handleUpdate = async () => {
    try {
      const formFields = await DraftValidator.validate(props)

      const data = adaptFormToAPI(formFields)

      await api.put<Draft>(`/drafts/${props.id}`, data)

      toast({ title: 'Atualizado com sucesso!' })
    } catch (error) {
      if (error instanceof ValidationError) {
        toast({ title: 'Formulário inválido', description: error.message })
      }
    }
  }

  const handlePublish = async () => {
    try {
      const { data: uri } = await api.post<Draft>(`/drafts/${props.id}/publish`)

      router.push(`/${uri}`)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response?.status < 500 && error.response?.status >= 400) {
          return toast({
            title: 'Algo deu errado!',
            description: error.response?.data.message,
          })
        }
      }

      return toast({ title: 'Algo deu errado!' })
    }
  }

  return (
    <div className={styles.edit_draft_aside_header}>
      <button className="primary-button" onClick={handleUpdate}>
        Atualizar
      </button>

      <button className="primary-button" onClick={handlePublish}>
        Publicar
      </button>
    </div>
  )
}

export default ExistingDraftHeader
