// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './styles/style.css'
import './styles/custom-block.css'
import './styles/font.css'
import AnnouncementNavAction from './components/AnnouncementNavAction.vue'
import AnnouncementNavModal from './components/AnnouncementNavModal.vue'
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
  extends: DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('AnnouncementNavAction', AnnouncementNavAction)
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
