import { NextPage } from 'next'
import PageContainer from '../../components/page-container'

import { DraftEditor } from '../../components/draft-editor'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ValidationError } from 'yup'
import { Draft } from '../../domain/draft'
import { api } from '../../services/api'
import { useToastStore } from '../../stores/toast.store'
import { adaptFormToAPI } from '../../utils/api.adapter'
import { DraftValidator } from '../../validators/draft.validator'
import { PrimaryButton } from '../../components/primary-button'
import classNames from 'classnames'

import styles from '../../styles/pages/drafts/draft.module.css'
import sidebarStyles from '../../styles/components/sidebar.module.css'

const NewDraftPage: NextPage = () => {
  const [title, setTitle] = useState('')
  const [urlPath, setUrlPath] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')

  const toast = useToastStore((s) => s.toast)
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      const formFields = await DraftValidator.validate({
        title,
        urlPath,
        description,
        content,
      })

      const data = adaptFormToAPI(formFields)

      const { data: newDraft } = await api.post<Draft>('/drafts', data)

      router.replace(`/drafts/${newDraft.id}/edit`)
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

  return (
    <PageContainer>
      <div className={styles.draft_container}>
        <nav
          className={classNames(
            sidebarStyles.sidebar_container,
            styles.draft_sidebar,
          )}
        >
          <PrimaryButton onClick={handleSubmit}>Criar post</PrimaryButton>
        </nav>

        <DraftEditor
          title={{ value: title, setValue: setTitle }}
          urlPath={{ value: urlPath, setValue: setUrlPath }}
          content={{ value: content, setValue: setContent }}
          description={{ value: description, setValue: setDescription }}
        />
      </div>
    </PageContainer>
  )
}

export default NewDraftPage
