<script setup lang="ts">
import { withBase } from 'vitepress'

interface DescPart {
  text: string
  link?: string
}

interface PathStep {
  index: string
  title: string
  badge?: string
  link: string
  desc: DescPart[]
}

const steps: PathStep[] = [
  {
    index: '01',
    title: '第一次使用',
    badge: '必读',
    link: '/Started/Install',
    desc: [
      { text: '请务必完整阅读快速开始的 ' },
      { text: '下载与安装', link: '/Started/Install' },
      { text: '、' },
      { text: '首次启动', link: '/Started/FirstLaunch' },
      { text: '、' },
      { text: '连接与更新', link: '/Started/ConnectionAndUpdate' },
      {
        text: ' 三个章节，并按步骤配置。\n大部分安装、下载、连接、启动问题都能在文档里找到答案。（MaaYuan本体与运行库的下载链接也在这里）',
      },
    ],
  },
  {
    index: '02',
    title: '遇到问题',
    link: '/FAQ/01-general-issues',
    desc: [
      { text: '仔细阅读MaaYuan本体页面中的任务说明，并查看' },
      { text: '常见问题', link: '/FAQ/01-general-issues' },
      { text: '中是否有解决方案。\n可对照' },
      { text: '功能介绍', link: '/Features/HomeInterface' },
      { text: '确认使用方式，也可以直接用顶部搜索框搜索关键词查找答案。' },
    ],
  },
  {
    index: '03',
    title: '进阶操作',
    link: '/Features/HomeInterface',
    desc: [
      { text: '在功能介绍中，了解MaaYuan页面的功能按钮，并阅读' },
      { text: '自动战斗', link: '/Features/AutoBattle' },
      { text: '章节，了解自动抄作业的设置与操作（包含配套作业站教程）。\n更有' },
      { text: '定时执行', link: '/Features/Settings/#定时执行' },
      { text: '、' },
      { text: '外部通知', link: '/Features/Settings/#外部通知' },
      { text: '与' },
      { text: '多开操作', link: '/Features/MultiInstance' },
      { text: '等功能的使用教程。' },
    ],
  },
  {
    index: '04',
    title: '我要反馈',
    link: '/Manual/Overview',
    desc: [
      { text: '在关于MaaYuan中，按照' },
      { text: '反馈方式', link: '/Manual/Feedback' },
      { text: '中的相关反馈要求，提交 Bug、建议或功能许愿。\n反馈问题前，请确认MaaYuan为最新版本、bug并不为偶发bug，且文档站中并未收录相应问题。' },
    ],
  },
  {
    index: '05',
    title: '进一步了解',
    link: '/Activity/Current',
    desc: [
      { text: '想进一步了解MaaYuan，查看麻圆有什么功能、如何加入交流群？阅读文档站其他章节，如' },
      { text: '任务介绍', link: '/Activity/Current' },
      { text: '、' },
      { text: '加入我们', link: 'Manual/JoinUs' },
      { text: '等。' },
    ],
  },
]

defineOptions({ name: 'BeforeStartGuide' })
</script>

<template>
  <nav class="before-start-guide" aria-label="新手操作清单">
    <ol class="before-start-guide__list">
      <li v-for="step in steps" :key="step.index" class="before-start-guide__item">
        <div class="before-start-guide__head">
          <span class="before-start-guide__number" aria-hidden="true">{{ step.index }}</span>
          <div class="before-start-guide__body">
            <div class="before-start-guide__title-row">
              <a class="before-start-guide__title" :href="withBase(step.link)">{{ step.title }}</a>
              <span v-if="step.badge" class="before-start-guide__badge">{{ step.badge }}</span>
            </div>
            <p class="before-start-guide__desc">
              <template
                v-for="(part, partIndex) in step.desc"
                :key="`${step.index}-${partIndex}`"
              >
                <a v-if="part.link" :href="withBase(part.link)">{{ part.text }}</a>
                <template v-else>{{ part.text }}</template>
              </template>
            </p>
          </div>
        </div>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.before-start-guide {
  margin: 18px 0 4px;
}

.before-start-guide__list {
  display: block;
  margin: 0;
  padding: 4px;
  list-style: none;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 58%, transparent);
}

.before-start-guide__item {
  min-width: 0;
  padding: 14px 16px;
}

.before-start-guide__item + .before-start-guide__item {
  border-top: 1px solid var(--vp-c-divider);
}

.before-start-guide__head {
  display: grid;
  grid-template-areas: "number body";
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 4px 14px;
  min-width: 0;
}

.before-start-guide__number {
  display: flex;
  grid-area: number;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white, #fff);
  font-size: 0.76rem;
  font-weight: 700;
  line-height: 1;
}

.before-start-guide__body {
  grid-area: body;
  min-width: 0;
}

.before-start-guide__title-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px 8px;
}

.before-start-guide__title {
  display: inline-flex;
  font-size: 0.97rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.before-start-guide__title:hover {
  color: var(--vp-c-brand-1);
}

.before-start-guide__badge {
  margin-left: 2px;
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  color: var(--vp-c-brand-1);
}

.before-start-guide__desc {
  margin: 4px 0 0;
  font-size: 0.87rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  white-space: pre-line;
}

.before-start-guide__desc a {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  text-decoration: none;
}

.before-start-guide__desc a:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .before-start-guide__head {
    grid-template-areas:
      "number body";
    grid-template-columns: auto 1fr;
  }
}
</style>
