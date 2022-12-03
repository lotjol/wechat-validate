// components/form-validate/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  rules: {
    password: [
      {
        required: true,
        message: '密码不能为空!',
      },
    ],
  },

  attached() {
    this.validate()
  },

  /**
   * 组件的方法列表
   */
  methods: {},
})
