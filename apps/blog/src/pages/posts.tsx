import { GetServerSideProps, NextPage } from 'next'
import Topbar from '../components/topbar'
import { UserPostsTimeline } from '../components/user-posts-timeline'
import { UserPost } from '../domain/user-post'
import { api } from '../services/api'
import styles from '../styles/pages/posts.module.css'

export interface MyPostsPageProps {
  posts: UserPost[]
}

const MyPostsPage: NextPage<MyPostsPageProps> = ({ posts }) => {
  return (
    <div className={styles.posts_container}>
      <Topbar />

      <div className={styles.posts_content_container}>
        <UserPostsTimeline initialPosts={posts} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<MyPostsPageProps> = async (
  ctx,
) => {
  try {
    const { data: posts } = await api.get<UserPost[]>('/posts/me', {
      headers: { cookie: String(ctx.req.headers.cookie) },
    })

    return { props: { posts } }
  } catch (error) {
    return { props: { posts: [] } }
  }
}

export default MyPostsPage
