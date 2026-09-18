// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Teek from 'vitepress-theme-teek'
// 不加载未使用的社交 iconfont；Teek 发布包未包含其字体文件。
import 'vitepress-theme-teek/theme-chalk/index.css'
import 'vitepress-theme-teek/theme-chalk/tk-sidebar.css'
import 'vitepress-theme-teek/theme-chalk/tk-nav.css'
import 'vitepress-theme-teek/theme-chalk/tk-aside.css'
import 'vitepress-theme-teek/theme-chalk/tk-code-block-mobile.css'
import './styles/style.css'
import './styles/custom-block.css'
import './styles/font.css'
import AnnouncementNavAction from './components/AnnouncementNavAction.vue'
import AnnouncementNavModal from './components/AnnouncementNavModal.vue'
import BeforeStartGuide from './components/BeforeStartGuide.vue'
import QuickStartModal from './components/QuickStartModal.vue'
import Layout from './components/Layout.vue'
import ArticleShare from './components/ArticleShare.vue'
import HomeCommunityLinks from './components/HomeCommunityLinks.vue'
import HomeContributors from './components/HomeContributors.vue'
import HomeHeroRandomImage from './components/HomeHeroRandomImage.vue'
import NavPopoverBadge from './components/NavPopoverBadge.vue'
import NotFound from './components/NotFound.vue'
import SmartDownloadChannels from './components/SmartDownloadChannels.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: Teek,
  enhanceApp(ctx) {
    ctx.app.component('AnnouncementNavAction', AnnouncementNavAction)
    ctx.app.component('BeforeStartGuide', BeforeStartGuide)
    ctx.app.component('HomeCommunityLinks', HomeCommunityLinks)
    ctx.app.component('HomeContributors', HomeContributors)
    ctx.app.component('NavPopoverBadge', NavPopoverBadge)
    ctx.app.component('SmartDownloadChannels', SmartDownloadChannels)
  },
  Layout() {
    return h(Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-hero-image': () => h(HomeHeroRandomImage),
      'aside-outline-after': () => h(ArticleShare),
      'layout-bottom': () => [h(AnnouncementNavModal), h(QuickStartModal)],
      'not-found': () => h(NotFound)
    })
  }
}
