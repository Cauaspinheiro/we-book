import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { markdownToHtml } from '../config/markdown.config'
import { Post } from '../domain/post'
import { api } from '../services/api'
import styles from '../styles/pages/post.module.css'
import { NextSeo } from 'next-seo'
import { useEffect } from 'react'
import PageContainer from '../components/page-container'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { PrimaryButton } from '../components/primary-button'
import { useRouter } from 'next/router'

export interface PostPageProps {
  post: Post
  html: string
}

const PostPage: NextPage<PostPageProps> = ({ post, html }) => {
  const router = useRouter()

  const handleGoBack = () => router.back()

  useEffect(() => {
    const view = async () => {
      try {
        await api.post(`/posts/${post.id}/view`)
      } catch (error) {}
    }

    view()
  }, [post.id])

  return (
    <PageContainer>
      <NextSeo
        title={`${post.title} - WeBook`}
        description={post.description}
      />

      <div className={styles.post_container}>
        <div className={styles.post_heading_container}>
          <h1 className={styles.post_heading_title}>{post.title}</h1>

          <h2 className={styles.post_heading_subtitle}>{post.description}</h2>

          <div className={styles.post_heading_data_container}>
            <div className={styles.post_heading_creator_container}>
              <span className={styles.post_heading_section_heading}>Autor</span>

              <h3 className={styles.post_heading_creator}>
                {post.publisher.name}
              </h3>
            </div>

            <h3 className={styles.post_heading_created_at}>
              {new Date(post.createdAt).toLocaleString('PT-BR', {
                timeStyle: 'short',
                hour12: false,
                dateStyle: 'long',
              })}
            </h3>
          </div>

          {post.contributors.length > 0 && (
            <div className={styles.post_contributors_container}>
              <h3 className={styles.post_heading_section_heading}>
                Contribuidores
              </h3>

              <div className={styles.post_contributors}>
                {post.contributors.map((v) => (
                  <p key={v.id}>{v.name}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        <article
          className={styles.post_content}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className={styles.post_footer_container}>
          <PrimaryButton onClick={handleGoBack}>
            <ArrowLeftIcon className={styles.post_footer_icon} />
            Voltar
          </PrimaryButton>
        </div>
      </div>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps<PostPageProps> = async (ctx) => {
  try {
    if (!ctx.params?.slug) throw new Error('Slug not set')

    const slug = ctx.params.slug as string

    const { data } = await api.get<Post>(`/posts/${slug}`)

    const html = await markdownToHtml(data.content)

    return { props: { post: data, html }, revalidate: 60 * 60 }
  } catch (error) {
    return { props: {}, notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await api.get<string[]>('/posts/paths', {
      headers: { secret: String(process.env.BLOG_API_SECRET) },
    })

    const paths = data.map((slug) => ({ params: { slug } }))

    return { paths, fallback: 'blocking' }
  } catch (error) {
    return { paths: [], fallback: 'blocking' }
  }
}

export default PostPage
