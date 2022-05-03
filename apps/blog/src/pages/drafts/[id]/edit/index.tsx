import { NextPage } from 'next'

import { GetServerSideProps } from 'next'
import { Draft } from '../../../../domain/draft'
import { api } from '../../../../services/api'
import axios from 'axios'
import PageContainer from '../../../../components/page-container'
import { InternalError } from '../../../../components/internal-error'
import classNames from 'classnames'
import { DraftEditor } from '../../../../components/draft-editor'
import { useState } from 'react'

import styles from '../../../../styles/pages/drafts/draft.module.css'
import sidebarStyles from '../../../../styles/components/sidebar.module.css'
import { PrimaryButton } from '../../../../components/primary-button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useToastStore } from '../../../../stores/toast.store'
import { DraftValidator } from '../../../../validators/draft.validator'
import { adaptFormToAPI } from '../../../../utils/api.adapter'
import { ValidationError } from 'yup'
import { useUserStore } from '../../../../stores/user.store'

export interface EditDraftPageProps {
  draft: Draft | null
}

const EditDraftPage: NextPage<EditDraftPageProps> = ({ draft }) => {
  const [title, setTitle] = useState(draft?.title || '')
  const [urlPath, setUrlPath] = useState(draft?.urlPath || '')
  const [description, setDescription] = useState(draft?.description || '')
  const [content, setContent] = useState(draft?.content || '')

  const userId = useUserStore((s) => s.userId)

  const toast = useToastStore((s) => s.toast)
  const router = useRouter()

  const handleUpdate = async () => {
    try {
      const formFields = await DraftValidator.validate({
        title,
        urlPath,
        description,
        content,
      })

      const data = adaptFormToAPI(formFields)

      await api.put<Draft>(`/drafts/${draft?.id}`, data)

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
      const { data: uri } = await api.post<Draft>(
        `/drafts/${draft?.id}/publish`,
      )

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

  if (!draft) {
    return (
      <PageContainer>
        <InternalError />
      </PageContainer>
    )
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
          <PrimaryButton
            className={styles.draft_sidebar_button}
            onClick={handleUpdate}
          >
            Atualizar
          </PrimaryButton>

          {userId === draft.creator.id && (
            <PrimaryButton
              className={styles.draft_sidebar_button}
              onClick={handlePublish}
            >
              Publicar
            </PrimaryButton>
          )}

          <Link href={`/drafts/${draft.id}/edit/contributors`}>
            <a className={sidebarStyles.sidebar_container_item}>
              Contribuidores
            </a>
          </Link>
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

export const getServerSideProps: GetServerSideProps<
  EditDraftPageProps
> = async (ctx) => {
  try {
    const { data } = await api.get(`/drafts/${String(ctx.params?.id)}`, {
      headers: { cookie: String(ctx.req.headers.cookie) },
    })

    return { props: { draft: data } }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return { notFound: true }
      }
    }

    return { props: { draft: null } }
  }
}

export default EditDraftPage
