// npm install xlsx 安装 xlsx
import moment from "moment/moment"
import  {write,utils,read} from "xlsx"


function workbook2blob(workbook:any) {
  // 生成excel的配置项
  let wopts = {
    // 要生成的文件类型
    bookType: "xlsx",
    //是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    bookSST: false,
    type: 'binary',
  }
  var wbout = write(workbook, wopts)

  // 将字符串转ArrayBuffer
  function s2ab(s: string) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for(var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }

  let buf = s2ab(wbout)
  var blob = new Blob([buf], {
    type: "application/octet-stream",
  })
  return blob
}

// 将blob对象 创建bloburl,然后用a标签实现弹出下载框
function openDownloadDialog(blob:any, fileName:any) {
  if(typeof blob === "object" && blob instanceof Blob) {
    blob = URL.createObjectURL(blob) // 创建blob地址
  }
  var aLink = document.createElement("a")
  aLink.href = blob
  // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
  aLink.download = fileName || ""
  var event
  if(window.MouseEvent) event = new MouseEvent("click")
  //   移动端
  else {
    event = document.createEvent("MouseEvents")
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  }
  aLink.dispatchEvent(event)
}


/*  导出为Excel  */
// Excel表格样式
// sheetData = [
//   {
//     name: "",//表名
//     // Excel表格内容
//     dataList: [
//       {
//         name: "value",// name单元格名字:value数据内容
//       },
//     ],
//   },
// ]
// name 保存的文件名字
export function exportExcel(sheetData:any) {
// 创建一个新的空的workbook
  let wb = utils.book_new()
  utils.book_append_sheet(wb, utils.json_to_sheet(sheetData),"")
  const workbookBlob = workbook2blob(wb)
  openDownloadDialog(workbookBlob, moment().format("YYYY-MM-DD")+"变化点导出数据"+ ".xlsx")
}

/*  Excel表格导入为JSON  */
export function readExcel(file: Blob) { // 表格导入
  const fileReader = new FileReader()
  fileReader.onload = (ev) => {
    try {
      const data = ev.target?.result
      const workbook = read(data, { type: "binary" })
      let params: { name: string; dataList: unknown[] }[] = []
      // 取对应表生成json表格内容
      workbook.SheetNames.forEach(item => {
        params.push({
          name: item,
          dataList: utils.sheet_to_json(workbook.Sheets[item]),
        })
      })
      return params
      // 重写数据
    } catch (e) {
      return false
    }
  }
  fileReader.readAsBinaryString(file)
}
// 导入使用说明 readExcel(file) file对象类型的Excel文件
