import { observable, action, runInAction } from 'mobx'
import axios from 'axios'
import { Toast } from '@douyinfe/semi-ui';
import api_Path from '../../API/index';
class store {

  @observable resd = {}
  @observable captcha_base64 = ""
  @observable captcha_key = ""
  @observable from_val = {}
  @action.bound Login = async (params = {}) => {
    try {
      let res = await axios.post(api_Path.login_services, params)
      runInAction(() => {
        this.resd = res.data

      })
    } catch (error) {
      Toast.info(`错误信息：${error}`)
    }
  }

  @action.bound Captcha = async (params = {}) => {
    try {
      let res = await axios.post(api_Path.captcha_services, params)
      runInAction(() => {
        this.captcha_base64 = res.data.captcha_img
        this.captcha_key = res.data.captcha_key
      })
    } catch (error) {
      Toast.info(`错误信息：${error}`)
    }
  }

}


export default new store()