Component({
  properties: {
    position: {
      type: String,
      value: 'bottom'
    },
    show: {
      type: Boolean,
      value: true
    },
    selected: {
      type: Number,
      value: 0
    },
    color: {
      type: String,
      value: '#707070'
    },
    selectedColor: {
      type: String,
      value: '#F9C748'
    },
    borderStyle: {
      type: String,
      value: '#f6f6f6'
    },
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    backgroundImg: {
      type: String,
      value: ''
    },
    fontSize: {
      type: Number,
      value: 22
    },
    isRedirectToTab: {
      type: Boolean,
      value: true
    },
    // 是否跳转
    isNav: {
      type: Boolean,
      value: true
    },
    list: {
      type: Array,
      value: [{
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/imgs/icon/home-default@3x.png",
        selectedIconPath: "/imgs/icon/home@3x.png"
      },
        {
          pagePath: "/pages/release/release",
          text: "发布",
          iconPath: "/imgs/icon/release-default@3x.png",
          selectedIconPath: "/imgs/icon/release@3x.png",
          style: "circle"
        },
        {
          pagePath: "/pages/my/my",
          text: "我的",
          iconPath: "/imgs/icon/my-default@3x.png",
          selectedIconPath: "/imgs/icon/my@3x.png"
        }]
    }
  },
  data: {
    selectedColor: "#F9C748",
  },
  attached() {},

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      if (this.data.isNav) {
        if (this.data.isRedirectToTab) {
          wx.redirectTo({
            url
          })
        } else {
          wx.navigateTo({
            url
          })
        }
      }


      this.showItem(data.index)
    },
    show() {
      this.setData({
        show: true
      })
    },
    hide() {
      this.setData({
        show: false
      })
    },
    showItem(idx) {
      this.setData({
        selected: idx
      })
      let detail = idx;
      let option = {};
      this.triggerEvent('lintap', detail, option);
    },
    showRedDot(idx) {
      const redDot = `list[${idx}].redDot`
      this.setData({
        [redDot]: true
      })
    },
    hideRedDot(idx) {
      const redDot = `list[${idx}].redDot`
      this.setData({
        [redDot]: false
      })
    },
    setTabBarBadge(idx, text) {
      const badge = `list[${idx}].badge`
      this.setData({
        [badge]: text
      })
    },
    removeTabBarBadge(idx) {
      const badge = `list[${idx}].badge`
      this.setData({
        [badge]: ''
      })
    }
  }
})