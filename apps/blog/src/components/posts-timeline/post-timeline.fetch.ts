import { Post } from '../../domain/post'
import { api } from '../../services/api'

export const fetchPostTimeline = async () => {
  const { data } = await api.get<Post[]>('/posts')

  return data
}
