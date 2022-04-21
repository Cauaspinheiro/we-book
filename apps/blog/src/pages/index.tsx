import { GetServerSideProps, NextPage } from 'next'
import PostsTimeline from '../components/posts-timeline'
import { fetchPostTimeline } from '../components/posts-timeline/post-timeline.fetch'
import Topbar from '../components/topbar'
import { Post } from '../domain/post'
import styles from '../styles/pages/home.module.css'

export interface HomePageProps {
  posts: Post[]
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <div className={styles.home_container}>
      <Topbar />

      <div className={styles.home_content_container}>
        <PostsTimeline initialPosts={posts} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  try {
    const posts = await fetchPostTimeline()

    return { props: { posts } }
  } catch (error) {
    return { props: { posts: [] } }
  }
}

export default HomePage
