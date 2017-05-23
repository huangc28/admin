/* eslint-disable */

import i18next from 'i18next'

export default i18next.init({
  lng: 'tw',
  resources: {
    'tw': {
      translation: {
        'hello': '你好',
        'Xin Yi': '新譯',
        'email': '郵件地址',
        'password': '密碼',
        'Select Photo': '選擇圖片',
        'Login': '登入',
        'Log Out': '登出',
        'Create': '建立',
        'ideas': '採購想法',
        'purchase order': '採購清單',
        'PROCURE': '採購',
        'ALL': '全部',
        'NEW': '新建立',
        'TO BE APPROVED': '待通過',
        'APPROVED': '已通過',
        'REWORK': '重做',
        'REJECT': '拒絕',
        'Product Name': '產品名稱',
        'Thumbnail': '縮圖',
        'Proposer Name': '提出者',
        'Created At': '建立於',
        'Updated At': '修改於',
        'Actions': '動作',
        'Product Name': '產品名稱',
        'Net Weight': '淨重',
        'Product Cost': '產品價格',
        'Approxmiate Pack Weight': '大約重量',
        'Battery': '電池',
        'Branded': '貼標',
        'Fragile': '易碎',
        'Color': '顏色',
        'Width': '寬度',
        'Height': '高度',
        'Length': '長度',
        'Accessories': '配件',
        'Remark': '備註',
        'Upload': '上傳',
        'Remove Preview': '刪除預覽',
        'Save': '保存',
        'Save & Submit': '保存並提交',
        'Reset': '重置',
        'Edit': '修改',
        'Delete': '刪除',
      }
    },
  },
}, (err, t) => {
  console.log(i18next.t('hello'))
})
