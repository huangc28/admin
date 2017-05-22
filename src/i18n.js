/* eslint-disable */

import i18next from 'i18next'

export default i18next.init({
  lng: 'tw',
  resources: {
    'tw': {
      translation: {
        'hello': '你好',
        'Log Out': '登出',
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
      }
    },
  },
}, (err, t) => {
  console.log(i18next.t('hello'))
})