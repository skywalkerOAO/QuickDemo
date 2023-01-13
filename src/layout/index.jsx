import React from 'react'
import styles from './index.module.scss'

/* 自动调整页面大小，并使子节点适应 */
class Layout extends React.Component {
    state = {
        height: 0,
    };
   
    handleResize = () => {
        this.setState({
          height:document.documentElement.clientHeight
        })
      }
    componentDidMount() {
       this.handleResize()
       window.addEventListener('resize', this.handleResize)
    }
    componentWillUnmount() {
        // 一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
        window.removeEventListener('resize', this.handleResize)
      }
    render() {
      
        return (
            <div  className={styles.container} style={{height:this.state.height-1}}>
              {this.props.children}
            </div>
        );
    }
}

export default Layout;
