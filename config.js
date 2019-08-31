const canvasBasePath = './pages/canvasPage'
const domeBasePath = './pages/dome'

const canvasPages = [
  { url: `${canvasBasePath}/bg01.html`, title: '滚屏特效' },
  { url: `${canvasBasePath}/fireworks.html`, title: '烟花特效' }
]
const domePages = [
  { url: `${domeBasePath}/mouseMove.html`, title: '鼠标圈圈' },
  { url: `${domeBasePath}/next.html`, title: 'CSS文字效果' },
  { url: `${domeBasePath}/sliderOrigin.html`, title: '卡牌选牌' },
  { url: `${domeBasePath}/svgCircle.html`, title: '圆形滑块' },
  { url: `${domeBasePath}/zhuiguangban.html`, title: '追光版' },
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