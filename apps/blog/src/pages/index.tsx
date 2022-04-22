import { GetServerSideProps, NextPage } from 'next'
import PostsTimeline from '../components/posts-timeline'
import Topbar from '../components/topbar'
import { Post } from '../domain/post'
import { api } from '../services/api'
import styles from '../styles/pages/home.module.css'

export interface HomePageProps {
  posts: Post[]
}

const fetchPostsTimeline = async () => {
  const { data } = await api.get<Post[]>('/posts')

  return data
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <div className={styles.home_container}>
      <Topbar />

      <div className={styles.home_content_container}>
        <PostsTimeline
          initialPosts={posts}
          fetchPostsTimeline={fetchPostsTimeline}
        />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  try {
    const posts = await fetchPostsTimeline()

    return { props: { posts } }
  } catch (error) {
    return { props: { posts: [] } }
  }
}

export default HomePage
