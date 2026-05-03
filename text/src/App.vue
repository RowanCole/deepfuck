<template>
  <div class="app">
    <!-- 加载动画 -->
    <Loading v-if="isLoading" />
    
    <div v-else class="chat-container">
      <!-- 聊天头部 -->
      <ChatHeader 
        :theme="theme" 
        :current-conversation="currentConversation"
        @toggle-theme="toggleTheme" 
        @select-conversation="handleSelectConversation"
      />
      
      <!-- 聊天消息 -->
      <ChatMessages :messages="messages" :isTyping="isTyping" ref="messagesComponent" />
      
      <!-- 聊天输入 -->
      <ChatInput @send-message="handleSendMessage" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Loading from './components/Loading.vue'
import ChatHeader from './components/ChatHeader.vue'
import ChatMessages from './components/ChatMessages.vue'
import ChatInput from './components/ChatInput.vue'
import { useTheme } from './composables/useTheme'
import { useChat } from './composables/useChat'

// 使用主题 composable
const { theme, toggleTheme } = useTheme()

// 使用聊天 composable
const { messages, isTyping, sendMessage, loadConversationMessages, currentConversationId } = useChat()

// 加载状态
const isLoading = ref(true)

// 消息组件引用
const messagesComponent = ref(null)

// 当前会话
const currentConversation = ref({
  id: '1',
  title: '默认会话'
})

// 处理发送消息
const handleSendMessage = (content) => {
  sendMessage(content, currentConversationId.value)
  // 滚动到底部
  if (messagesComponent.value) {
    messagesComponent.value.scrollToBottom()
  }
}

// 处理选择会话
const handleSelectConversation = async (conversation) => {
  currentConversation.value = conversation
  await loadConversationMessages(conversation.id)
  // 滚动到底部
  if (messagesComponent.value) {
    messagesComponent.value.scrollToBottom()
  }
}

// 初始化加载
const initApp = () => {
  // 移除模拟延迟，让加载动画在页面初始化时短暂显示
  // 确保动画能够正常播放
  setTimeout(() => {
    isLoading.value = false
  }, 500) // 只需要足够让动画开始播放的时间
}

// 调用初始化函数
initApp()
</script>

<style scoped>
/* 全局样式 */
.app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f8fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: background-color 0.3s ease;
}

/* 聊天容器 */
.chat-container {
  width: 100%;
  max-width: 800px;
  height: 90vh;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 暗色主题 */
.dark-theme .app {
  background-color: #1a1a1a;
}

.dark-theme .chat-container {
  background-color: #252525;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

/* 主题切换动画 */
.dark-theme .app {
  transition: background-color 0.3s ease;
}

.dark-theme .chat-container {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chat-container {
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
}
</style>