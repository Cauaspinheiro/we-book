import { GetServerSideProps, NextPage } from 'next'
import PageContainer from '../components/page-container'
import { PostsTimeline } from '../components/posts-timeline'
import { UserPost } from '../domain/user-post'
import { api } from '../services/api'

export interface MyPostsPageProps {
  posts: UserPost[]
}

const MyPostsPage: NextPage<MyPostsPageProps> = ({ posts }) => {
  return (
    <PageContainer>
      <PostsTimeline initialData={posts} />
    </PageContainer>
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
