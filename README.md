## wechat-validate v0.0.3

微信小程序表单数据验证插件

## 安装

```bash
npm install wechat-validate
```

## 使用说明

```javascript
// 在页面或组件中导入
import validate from 'wechat-validate'

Page({
  // 通过 behaviors 注入 validate 方法
  behaviors: [validate],
  data: {
    username: '张三',
    password: '666666'
  },
  // 定义表单数据的验证规则
  rules: {
    mobile: [
      { required: true, message: '请填写手机号码!' },
      { pattern: /^1[3-8]\d{9}$/, message: '请检查手机号码是否正确!' },
    ],
    code: [
      { required: true, message: '请填写短信验证码!' },
      { pattern: /^\d{6}$/, message: '请检查短信验证码是否正确!' }
    ]
  },

  getCode() {
    // 单独只验证 mobile 这个数据
    const { valid, dataKey, message } = this.validate('mobile')
    if(!valid) wx.showToast({title: message, icon: 'none'})

    // else do something
  },

  sendForm() {
    // 验证码 rules 中定义的全部数据
    const isAllValid = this.validate()
    if(!isAllValid) return

    // else request api
  }
})
```