import { NextPage } from 'next'

import { GetServerSideProps } from 'next'
import { Draft } from '../../../../domain/draft'
import { api } from '../../../../services/api'
import axios from 'axios'
import PageContainer from '../../../../components/page-container'
import { InternalError } from '../../../../components/internal-error'
import classNames from 'classnames'

import styles from '../../../../styles/pages/drafts/draft.module.css'
import sidebarStyles from '../../../../styles/components/sidebar.module.css'
import Link from 'next/link'
import { useToastStore } from '../../../../stores/toast.store'
import { useUserStore } from '../../../../stores/user.store'
import Input from '../../../../components/input'
import { PrimaryButton } from '../../../../components/primary-button'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/solid'

import contributorsStyles from '../../../../styles/pages/drafts/contributors.module.css'
import { AddContributorValidator } from '../../../../validators/add-contributor.validator'
import { ValidationError } from 'yup'

export interface EditDraftPageProps {
  draft: Draft | null
}

const EditDraftPage: NextPage<EditDraftPageProps> = ({ draft }) => {
  const userId = useUserStore((s) => s.userId)

  const toast = useToastStore((s) => s.toast)

  const [addContributorValue, setAddContributorValue] = useState('')
  const [contributors, setContributors] = useState(draft?.contributors || [])

  const handleAddContributor = async () => {
    try {
      const data = await AddContributorValidator.validate({
        email: addContributorValue,
      })

      const { data: updatedDraft } = await api.post<Draft>(
        `/drafts/${draft?.id}/writers/add`,
        data,
      )

      toast({ title: 'Contribuidor adicionado com sucesso' })

      setAddContributorValue('')
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
          <Link href={`/drafts/${draft.id}/edit`}>
            <a className={sidebarStyles.sidebar_container_item}>Informações</a>
          </Link>

          <Link href={`/drafts/${draft.id}/edit/contributors`}>
            <a
              className={classNames(
                sidebarStyles.sidebar_container_item,
                sidebarStyles.sidebar_container_item_active,
              )}
            >
              Contribuidores
            </a>
          </Link>
        </nav>

        <div className={contributorsStyles.contributors_container}>
          {userId === draft.creator.id && (
            <div className={contributorsStyles.add_contributor_container}>
              <Input
                setValue={setAddContributorValue}
                value={addContributorValue}
                label="Adicionar contribuidor"
                placeholder="Digite o email do contribuidor"
                id="add-contributor-value"
              />

              <PrimaryButton
                className={contributorsStyles.add_contributor_button}
                onClick={handleAddContributor}
              >
                <PlusIcon className={contributorsStyles.add_contributor_icon} />
              </PrimaryButton>
            </div>
          )}

          <div className={contributorsStyles.contributors_list_container}>
            {contributors.map((v) => (
              <div
                key={v.id}
                className={contributorsStyles.contributors_list_item}
              >
                <span>{v.name}</span>

                <button
                  className={contributorsStyles.contributors_list_item_button}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
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
