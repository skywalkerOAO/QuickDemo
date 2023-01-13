import Layout from '../../layout';
import { Form, Button, Card, Toast, Modal, Input } from '@douyinfe/semi-ui'
import CryptoJS from 'crypto-js'
import store from './store'
import { useNavigate } from 'react-router-dom';
import { Encrypt, Decrypt } from '../../Utils/crypto'
import { onLogin, getUserInfo } from '../../cookie'
import styles from './index.module.scss'
import { useEffect, useState } from 'react';
export default function Login() {


    const [modalvis, setModalvis] = useState(false)
    const [captval, setCaptval] = useState()
    useEffect(() => {
        //setModalvis(true)
    }, [])

    // react-router-dom v6
    // 使用useNavigate进行跳转
    const navigate = useNavigate();
    const goHome = () => {
        // 向 navigate 方法中传入要跳转的 path 路径
        navigate("/");
    };
    // 提交方法
    async function submit(v) {
        store.from_val = v
        // 密码AES加密(接口必须使用加密后的密码)
        v.password = encrypt(v)
        // 请求接口
        await store.Login(v)
        if (store.resd.key === "AU_0006") {
            Toast.error('用户名或密码错误，请重新输入')
            return
        }
        if (store.resd.key === "AU_0011") {
            Toast.error('连续5次用户名或密码错误，请输入验证码')
            await store.Captcha(v)
            setModalvis(true)
            return
        }
        // "S_0000"是请求成功后的标识
        if (store.resd.key === "S_0000") {
            // 登录成功保存用户信息至cookie
            setCookie(store.resd.result.user_info)
            Toast.success(`登录成功，欢迎您【${store.resd.result.user_info.user_name}】`)
            // 返回主页
            goHome()
        }
        console.log(store.from_val)
    }
    async function submit2() {
        setModalvis(false)
        store.from_val.captcha_code = captval
        store.from_val.captcha_key = store.captcha_key
        //密码AES加密(接口必须使用加密后的密码)
        let s_account = store.from_val.account
        //请求接
        await store.Login(store.from_val)
        if (store.resd.key === "AU_0011") {
            await store.Captcha(store.from_val)
            console.log('store.from_val', store.from_val)
            setModalvis(true)
            return
        }
        if(store.resd.key === 'AU_0009'){
            Toast.error('用户名或密码错误，请重新输入！')
        }
        if (store.resd.key === "AU_0008") {
            Toast.error('验证码错误，请重新输入！')
            let a = { account: s_account }
            await store.Captcha(a)
            setModalvis(true)
            return
        }
        // "S_0000"是请求成功后的标识
        if (store.resd.key === "S_0000") {
            // 登录成功保存用户信息至cookie
            setCookie(store.resd.result.user_info)
            Toast.success(`登录成功，欢迎您【${store.resd.result.user_info.user_name}】`)
            // 返回主页
            goHome()
        }
    }
    // 保存cookie方法
    function setCookie(data) {
        // 用户信息AES加密
        data = Encrypt(data)
        // 保存用户信息至cookie
        onLogin(data, 'blp_gwm_userinfo')
    }

    // 加密规则
    function encrypt(v) {
        let $key = v.account + '000000';
        let $pwd = v.password
        let key = CryptoJS.enc.Utf8.parse($key);
        let pwd = CryptoJS.enc.Utf8.parse($pwd);
        let encrypted = CryptoJS.AES.encrypt(pwd, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        let encryptedPwd = encrypted.toString();
        return encryptedPwd
    }
    function captchaValueChange(v) {
        setCaptval(v)
    }
    return (
        <>
            <Layout>
                <div className={styles.container} >
                    <Card className={styles.card_Con} title='登录'>
                        <Form style={{ width: 350 }} onSubmit={submit}>
                            <Form.Input field="account" label='用户名/工号' />
                            <Form.Input mode="password" field="password"  label='密码' />
                            <Button className={styles.submitbtn} htmlType="submit">提交</Button>
                        </Form>
                    </Card>
                </div>
            </Layout>
            <Modal
                title="请输入验证码"
                visible={modalvis}
                onOk={submit2}
                onCancel={(modalvis) => { modalvis ? setModalvis(false) : null }}
                closeOnEsc={true}
            >
                <Input onChange={captchaValueChange}></Input>
                <img src={`data:image/png;base64,${store.captcha_base64}`}></img>
            </Modal>
        </>
    );
} 