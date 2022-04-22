import { Post } from './post'

export interface UserPost extends Post {
  isPublisher: boolean
}
