import { GetServerSideProps, NextPage } from 'next'
import { HomeTimeline } from '../components/home-timeline'
import PageContainer from '../components/page-container'
import { Post } from '../domain/post'
import { api } from '../services/api'

export interface HomePageProps {
  posts: Post[]
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <PageContainer>
      <HomeTimeline initialData={posts} />
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  try {
    const { data: posts } = await api.get<Post[]>('/posts')

    return { props: { posts } }
  } catch (error) {
    return { props: { posts: [] } }
  }
}

export default HomePage
