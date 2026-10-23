<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, withBase } from 'vitepress'
import BaseModal from './BaseModal.vue'

const router = useRouter()

const isVisible = ref(false)
const showQuickStart = ref(false)
const dialogTitle = ref<HTMLElement | null>(null)

async function show() {
  showQuickStart.value = false
  isVisible.value = true
  await nextTick()
  dialogTitle.value?.focus()
}

async function continueQuickStart() {
  showQuickStart.value = true
  await nextTick()
  dialogTitle.value?.focus()
}

function dismiss() {
  isVisible.value = false
}

function goBeforeStart() {
  dismiss()
  router.go('/Started/BeforeStart')
}

function goInstallDirect() {
  dismiss()
  router.go('/Started/Install#download-channels')
}

onMounted(() => {
  const handler = (e: Event) => {
    const target = e.target as Element
    const el = target.closest('a[href="#quick-start-popup"]')
    if (!el) return
    e.preventDefault()
    e.stopImmediatePropagation()
    show()
  }
  document.addEventListener('click', handler, true)
  document.addEventListener('mousedown', handler, true)
})
</script>

<template>
  <BaseModal
    :is-visible="isVisible"
    content-class="quick-start-modal"
    @close="dismiss"
  >
    <section
      class="quick-start-modal__container"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-start-title"
    >
      <div class="qs-body">
        <h2
          id="quick-start-title"
          ref="dialogTitle"
          :class="showQuickStart ? 'qs-tag' : 'qs-title'"
          tabindex="-1"
        >
          {{ showQuickStart ? '快速开始' : '邺城之战 V3' }}
        </h2>
        <p class="qs-subtitle">
          {{ showQuickStart ? '欢迎使用MaaYuan，请选择您的需求' : '这次是来使用邺城之战 V3 吗？' }}
        </p>
        <div class="qs-actions">
          <template v-if="!showQuickStart">
            <a
              class="qs-btn qs-btn-primary"
              :href="withBase('/Activity/YechengzhizhanV3')"
              @click="dismiss"
            >
              <span class="qs-btn-title">是，查看 V3</span>
              <span class="qs-btn-desc">多开与常见问题</span>
            </a>
            <button class="qs-btn qs-btn-outline" @click="continueQuickStart">
              <span class="qs-btn-title">不是，继续</span>
              <span class="qs-btn-desc">下载与新手教程</span>
            </button>
          </template>
          <template v-else>
            <button class="qs-btn qs-btn-primary" @click="dismiss(); goInstallDirect()">
              <img class="qs-btn-emoji" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f5a5.svg" alt="电脑">
              <span class="qs-btn-text">
                <span class="qs-btn-title">我不是新用户</span>
                <span class="qs-btn-desc">跳转下载渠道</span>
              </span>
            </button>
            <button class="qs-btn qs-btn-outline" @click="dismiss(); goBeforeStart()">
              <img class="qs-btn-emoji" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f195.svg" alt="新">
              <span class="qs-btn-text">
                <span class="qs-btn-title">我是新用户</span>
                <span class="qs-btn-desc">跳转新手教程</span>
              </span>
            </button>
          </template>
        </div>
      </div>
    </section>
  </BaseModal>
</template>

<style>
.quick-start-modal {
  width: min(92vw, 480px);
  padding: 0;
  overflow: auto;
}

.quick-start-modal__container {
  min-height: 0;
}
</style>

<style scoped>
.qs-body {
  padding: 32px 28px 28px;
  text-align: center;
}

#quick-start-title {
  outline: none;
}

.qs-title {
  margin: 0 0 12px;
  color: var(--vp-c-brand-1);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
}

.qs-tag {
  display: inline-block;
  padding: 4px 16px;
  margin: 0 0 12px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.qs-subtitle {
  margin: 0 0 24px;
  font-size: 15px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.qs-actions {
  display: flex;
  gap: 12px;
}

.qs-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  border-radius: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  text-decoration: none;
}

.qs-btn-primary {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.qs-btn-primary:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(106, 90, 205, 0.35);
}

.qs-btn-outline {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

.qs-btn-outline:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
}

.qs-btn-emoji {
  width: 36px;
  height: 36px;
  display: block;
}

.qs-btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
}

.qs-btn-outline .qs-btn-icon {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.qs-btn-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.qs-btn-title {
  font-size: 15px;
  font-weight: 600;
}

.qs-btn-desc {
  font-size: 12px;
  opacity: 0.75;
}
</style>
