export const TITLE = "徐水动力分公司 | 不良品管理平台"// 平台名称
export const HTML_TITLE = "徐水动力不良品录入平台(本地)"// 页面名称
export const USER_COOKIE_NAME = "blp_gwm_userinfo" // 该项目的cookie名称
export const ICON = "./react.svg" //存放在public下的ico文件

export function SET_ICON() {
    let $favicon = document.createElement("link")
    $favicon.type="image/svg+xml"
    $favicon.rel = "icon"
    $favicon.href = ICON 
    document.head.appendChild($favicon)
}
export function SET_TITLE() {
    document.title = HTML_TITLE
}