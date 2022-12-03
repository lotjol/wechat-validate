import validate from 'wechat-validate'

Page({
  behaviors: [validate],
  data: {
    mobile: '13212345678',
    nickname: '',
  },

  onLoad() {
    // const valid = this.validate()

    console.log(this.validate('nickname'))

    const { valid, dataKey, message } = this.validate('nickname')

    console.group(valid, dataKey, message)
  },
})
