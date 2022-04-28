import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { ValidationError } from 'yup'
import { Draft, DraftUser } from '../../domain/draft'
import { api } from '../../services/api'
import { useToastStore } from '../../stores/toast.store'
import { adaptFormToAPI } from '../../utils/api.adapter'
import { DraftValidator } from '../../validators/draft.validator'
import axios from 'axios'
import { PlusIcon } from '@heroicons/react/solid'

import styles from './edit-draft.module.css'
import Input from '../input'
import { AddContributorValidator } from '../../validators/add-contributor.validator'
import EditDraftContributors from './edit-draft-contributors'

export interface ExistingDraftHeaderProps {
  content: string
  title: string
  description: string
  ogCover: string
  id: string
  urlPath: string
  contributors: DraftUser[]
  isCreator: boolean

  children?: undefined
}

const ExistingDraftHeader: FC<ExistingDraftHeaderProps> = (props) => {
  const toast = useToastStore((s) => s.toast)
  const router = useRouter()
  const [addContributor, setAddContributor] = useState('')
  const [contributors, setContributors] = useState<DraftUser[]>(
    props.contributors,
  )

  const handleUpdate = async () => {
    try {
      const formFields = await DraftValidator.validate(props)

      const data = adaptFormToAPI(formFields)

      await api.put<Draft>(`/drafts/${props.id}`, data)

      toast({ title: 'Atualizado com sucesso!' })
    } catch (error) {
      if (error instanceof ValidationError) {
        return toast({
          title: 'Formulário inválido',
          description: error.message,
        })
      }

      toast({ title: 'Algo deu errado!' })
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

  const handleAddContributor = async () => {
    try {
      const data = await AddContributorValidator.validate({
        email: addContributor,
      })

      const { data: updatedDraft } = await api.post<Draft>(
        `/drafts/${props.id}/writers/add`,
        data,
      )

      toast({ title: 'Contribuidor adicionado com sucesso' })

      setAddContributor('')
      setContributors(updatedDraft.contributors)
    } catch (error) {
      if (error instanceof ValidationError) {
        toast({ title: 'Formulário inválido', description: error.message })
      }

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
    <div className={styles.existing_draft_header_container}>
      <div className={styles.edit_draft_aside_header}>
        <button className="primary-button" onClick={handleUpdate}>
          Atualizar
        </button>

        <button className="primary-button" onClick={handlePublish}>
          Publicar
        </button>
      </div>

      <div className={styles.edit_draft_add_contributor_container}>
        <Input
          label="Adicionar contribuidor"
          value={addContributor}
          setValue={setAddContributor}
          id="add-contributor"
          type="email"
          placeholder="Digite o email do contribuidor"
        />

        <button
          className={`primary-button ${styles.edit_draft_add_contributor_button}`}
          onClick={handleAddContributor}
        >
          <PlusIcon className={styles.edit_draft_add_contributor_button_icon} />
        </button>
      </div>

      <div className={styles.edit_draft_contributors_container}>
        <h2 className={styles.edit_draft_contributors_title}>Contribuidores</h2>

        <EditDraftContributors
          setContributors={setContributors}
          contributors={contributors}
          draftId={props.id}
          isCreator={props.isCreator}
        />
      </div>
    </div>
  )
}

export default ExistingDraftHeader
