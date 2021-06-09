const canvasBasePath = './pages/canvasPage'
const domeBasePath = './pages/dome'

const canvasPages = [
  { url: `${canvasBasePath}/bg01.html`, title: '滚屏特效' },
  { url: `${canvasBasePath}/fireworks.html`, title: '烟花特效' },
  { url: `${canvasBasePath}/rose.html`, title: '玫瑰花' },
  { url: `${canvasBasePath}/particle.html`, title: '粒子' }
]
const domePages = [
  { url: `${domeBasePath}/mouseMove.html`, title: '鼠标圈圈' },
  { url: `${domeBasePath}/cssgrid.html`, title: '弹性布局' },
  { url: `${domeBasePath}/next.html`, title: 'CSS文字效果' },
  { url: `${domeBasePath}/sliderOrigin.html`, title: '卡牌选牌' },
  { url: `${domeBasePath}/svgCircle.html`, title: '圆形滑块' },
  { url: `${domeBasePath}/zhuiguangban.html`, title: '追光版' },
  { url: `${domeBasePath}/dropDownMenus.html`, title: '下拉菜单' },
  { url: `${domeBasePath}/hoverJump.html`, title: 'css加载动画' },
  { url: `${domeBasePath}/eagle.html`, title: '鹰' },
  { url: `${domeBasePath}/macOsDock.html`, title: '苹果程序邬效果' },
  { url: `${domeBasePath}/a.html`, title: '超级玛丽' },
  { url: `${domeBasePath}/jiqimao.html`, title: '机器猫' },
  { url: `${domeBasePath}/card.html`, title: '拖动' },
]


const nodeId = '#greeting'

const node = document.querySelector(nodeId)
let HTMLString = ''
HTMLString += createCanvasList()
HTMLString += createDomeList()
node.innerHTML = HTMLString

function createCanvasList () {
  let listHTML = ''
  canvasPages.forEach(item => {
    const { url, title } = item
    listHTML += `<a href="${url}" target="_black">${title}</a>`
  })
  return listHTML
}

function createDomeList () {
  let listHTML = ''
  domePages.forEach(item => {
    const { url, title } = item
    listHTML += `<a href="${url}" target="_black">${title}</a>`
  })
  return listHTML
}