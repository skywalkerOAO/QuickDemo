/*
 * @Description: 
 * @Author: Hex575A
 * @Date: 2021-11-13 15:16:09
 * @LastEditTime: 2023-01-12 15:57:45
 * @LastEditors: Please set LastEditors
 * @references: 
 */
import cookie from 'react-cookies'

export const getUserInfo = (name) => {
  return cookie.load(name)
}

// 用户登录，保存cookie
export const onLogin = (user,name) => {
  let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000 * 30);//30days
  cookie.save(name, user, { path: '/' , expires: inFifteenMinutes })
}

// 用户登出，删除cookie
export const logout = (name) => {
  cookie.remove(name)
}
