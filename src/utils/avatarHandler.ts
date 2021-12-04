import { Avatar } from '@/@types/profile'
import DefaultAvatar from '@/assets/images/default-avatar.jpg'

export function avatarHandler(avatar: Avatar | null) {
  return avatar ? avatar.url : DefaultAvatar
}
