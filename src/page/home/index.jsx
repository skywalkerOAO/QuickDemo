import React from 'react'
import { Button } from '@douyinfe/semi-ui'
import { getUser } from '@/Utils/common'
import { Nav } from '@/component'
import Layout from '@/layout'
import styles from './index.module.scss'
import store from './store'
class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    console.log(getUser())
  }

  render() {
    return (
      <Layout>
        <div className={styles.container}>
          <Nav userinfo={getUser()} />
          <Button>Click me!</Button>
        </div>
      </Layout>
    )
  }
}

export default Home
