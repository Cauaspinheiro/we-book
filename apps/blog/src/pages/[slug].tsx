import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Topbar from '../components/topbar'
import { markdownToHtml } from '../config/markdown.config'
import { Post } from '../domain/post'
import { api } from '../services/api'
import styles from '../styles/pages/post.module.css'
import { NextSeo } from 'next-seo'
import { useEffect } from 'react'

export interface PostPageProps {
  post: Post
  html: string
}

const PostPage: NextPage<PostPageProps> = ({ post, html }) => {
  useEffect(() => {
    const view = async () => {
      try {
        await api.post(`/posts/${post.id}/view`)
      } catch (error) {}
    }

    view()
  }, [post.id])

  return (
    <div className={styles.post_page_container}>
      <NextSeo
        title={`${post.title} - WeBook`}
        description={post.description}
        openGraph={{ images: [{ url: post.ogCover }] }}
      />

      <Topbar />

      <div className={styles.post_container}>
        <div>
          <h1 className={styles.post_title}>{post.title}</h1>

          <p className={styles.post_description}>{post.description}</p>

          <p className={styles.post_created_at}>
            {new Date(post.createdAt).toLocaleString('PT-BR', {
              timeStyle: 'short',
              hour12: false,
              dateStyle: 'long',
            })}
          </p>
        </div>

        <div className={styles.post_creators_container}>
          <div
            className={`${styles.post_publisher_container} ${
              !post.contributors.length
                ? styles.post_publisher_centered
                : undefined
            }`}
          >
            <h3 className={styles.post_creators_heading}>Criado por:</h3>

            <span className={styles.post_creators_title}>
              {post.publisher.name}
            </span>

            <span className={styles.post_creators_heading}>
              Usuário desde:{' '}
              <span className={styles.post_creators_created_at}>
                {new Date(post.publisher.createdAt).toLocaleString('PT-BR', {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            </span>
          </div>

          {!!post.contributors.length && (
            <div className={styles.post_contributors_container}>
              {post.contributors.map((v, index) => (
                <div key={v.id} className={styles.post_publisher_container}>
                  <h3 className={styles.post_creators_heading}>
                    {!index ? 'Contribuidores:' : ''}
                  </h3>

                  <span className={styles.post_creators_title}>{v.name}</span>

                  <span className={styles.post_creators_heading}>
                    Usuário desde:{' '}
                    <span className={styles.post_creators_created_at}>
                      {new Date(v.createdAt).toLocaleString('PT-BR', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <hr className={styles.post_divider} />

        <article
          className={styles.post_content_container}
          dangerouslySetInnerHTML={{ __html: html }}
        ></article>
      </div>
    </div>
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
