/// <reference path="./wechat.d.ts" />

export default Behavior({
  methods: {
    checkKey(datakey: string) {
      if (!this.rules) return console.warn('==== 未定义 rules 验证规则! ====')
      // 验证结果
      let result = { valid: true, datakey, message: 'validate:ok' }
      for (let ruleKey in this.rules[datakey]) {
        const rule = this.rules[datakey][ruleKey]
        // 处理验证规则
        if (rule.required) rule.pattern = /[\S]+/
        const reg = new RegExp(rule.pattern!)

        // 验证数据
        const valid = reg.test(this.data[datakey])
        // 验证结果
        if (!valid) {
          result.valid = valid
          result.message = rule.message
          break
        }
      }
      return result
    },
    validate(key: string) {
      if (key) return this.checkKey(key)
      for (let dataKey in this.rules) {
        const { valid, message } = this.checkKey(dataKey)!
        if (!valid) {
          wx.showToast({ title: message, icon: 'none' })
          return valid
        }
      }
      return true
    },
  },
})
