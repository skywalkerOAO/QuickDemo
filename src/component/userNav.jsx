import { useState, useEffect } from 'react'
import { Nav, Avatar, Dropdown, Modal, Icon } from '@douyinfe/semi-ui'
import { USER_COOKIE_NAME, TITLE } from '@/config'
import styles from './style/index.module.scss'
import { logout } from '@/cookie'
import img from '../assets/logo.gwm.svg'
import { Link } from 'react-router-dom'

const userNav = props => {
  const [loaded, setLoaded] = useState(false)
  const [username, setUsername] = useState('')
  const [gwid, setGwid] = useState('')
  const [confirmVis, setconfirmVis] = useState(false)

  useEffect(() => {
    ;(async function asyncFn() {
      setLoaded(true)
      setUsername(props.userinfo.user_name)
      setGwid(props.userinfo.user_code)
    })()
  }, [])

  function onClose() {
    setconfirmVis(false)
  }
  function Logout() {
    logout(USER_COOKIE_NAME)
    let url = './login'
    window.location.href = url
  }

  return (
    <>
      <Nav
        mode={'horizontal'}
        header={{
          logo: <img className={styles.topbar_logo_container} src={img} />,
          text: TITLE,
        }}
        footer={
          loaded ? (
            <Dropdown
              position='bottomRight'
              render={
                <Dropdown.Menu>
                  <Dropdown.Item
                    className={styles.dropdowns}
                    onClick={() => {
                      setconfirmVis(true)
                    }}
                  >
                    退出
                  </Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <span>{gwid.toUpperCase()}</span>
              <Avatar size='small' color='light-blue' style={{ margin: 4 }}>
                {username.charAt(username.length - 1)}
              </Avatar>
              <span>{username}</span>
            </Dropdown>
          ) : (
            <Link to={'/login'}>
              <span>登录</span>
            </Link>
          )
        }
      />
      <Modal title='确认退出系统？' visible={confirmVis} onOk={Logout} onCancel={onClose}></Modal>
    </>
  )
}
export default userNav
