import { USER_COOKIE_NAME } from '@/config'
import { getUserInfo } from '@/cookie.js'
import { Decrypt } from '@/Utils/crypto'

export function getUser(){
    let a = getUserInfo(USER_COOKIE_NAME)
    let b
    if (!a) {
      return b
    }
    a = Decrypt(a)
    a = JSON.parse(a)
    return a
  }
