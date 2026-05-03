<template>
  <div class="chat-messages" ref="messagesContainer">
    <div class="welcome-message">
      <div class="welcome-content">
        <h2>你好！我是豆包</h2>
        <p>有什么可以帮助你的吗？</p>
      </div>
    </div>
    <div
      v-for="message in messages"
      :key="message.id"
      :class="['message', message.role === 'user' ? 'user-message' : 'ai-message']"
    >
      <div class="message-avatar">
        <div v-if="message.role === 'ai'" class="avatar ai-avatar">豆</div>
        <div v-else class="avatar user-avatar">你</div>
      </div>
      <div class="message-content">{{ message.content }}</div>
    </div>
    <div v-if="isTyping" class="message ai-message">
      <div class="message-avatar">
        <div class="avatar ai-avatar">豆</div>
      </div>
      <div class="message-content typing">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

// 接收消息列表、输入状态作为props
const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  isTyping: {
    type: Boolean,
    default: false
  }
})

const messagesContainer = ref(null)

// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }, 100)
}

// 监听消息变化，自动滚动到底部
watch(() => props.messages.length, () => {
  scrollToBottom()
})

// 监听输入状态变化，自动滚动到底部
watch(() => props.isTyping, () => {
  scrollToBottom()
})

// 组件挂载后滚动到底部
onMounted(() => {
  scrollToBottom()
})

// 暴露滚动方法给父组件
defineExpose({
  scrollToBottom
})
</script>

<style scoped>
.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fafafa;
}

/* 欢迎消息 */
.welcome-message {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  margin: 20px;
  border-radius: 12px;
  animation: fadeIn 0.8s ease-in-out;
}

.welcome-content {
  text-align: center;
  color: #333;
}

.welcome-content h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
}

.welcome-content p {
  margin: 0;
  font-size: 16px;
  color: #666;
}

/* 消息样式 */
.message {
  display: flex;
  gap: 12px;
  max-width: 75%;
  animation: slideIn 0.3s ease-out;
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.ai-message {
  align-self: flex-start;
}

/* 头像 */
.message-avatar {
  display: flex;
  align-items: flex-start;
  margin-top: 4px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.ai-avatar {
  background-color: #ff6b6b;
}

.user-avatar {
  background-color: #4ecdc4;
}

/* 消息内容 */
.message-content {
  padding: 14px 18px;
  border-radius: 18px;
  word-wrap: break-word;
  line-height: 1.5;
  font-size: 16px;
}

.user-message .message-content {
  background-color: #007aff;
  color: white;
  border-bottom-right-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 122, 255, 0.2);
}

.ai-message .message-content {
  background-color: white;
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* 输入中动画 */
.typing {
  display: flex;
  align-items: center;
  gap: 6px;
}

.typing-dot {
  width: 10px;
  height: 10px;
  background-color: #999;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 暗色主题 */
.dark-theme .chat-messages {
  background-color: #1e1e1e;
}

.dark-theme .welcome-message {
  background: linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%);
}

.dark-theme .welcome-content h2 {
  color: #e0e0e0;
}

.dark-theme .welcome-content p {
  color: #b0b0b0;
}

.dark-theme .ai-message .message-content {
  background-color: #2d2d2d;
  color: #e0e0e0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.dark-theme .user-message .message-content {
  background-color: #0066cc;
}

.dark-theme .typing-dot {
  background-color: #707070;
}

.dark-theme .chat-messages::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.dark-theme .chat-messages::-webkit-scrollbar-thumb {
  background: #4d4d4d;
}

.dark-theme .chat-messages::-webkit-scrollbar-thumb:hover {
  background: #5d5d5d;
}

/* 主题切换动画 */
.dark-theme .chat-messages {
  transition: background-color 0.3s ease;
}

.dark-theme .welcome-message {
  transition: background 0.3s ease;
}

.dark-theme .welcome-content h2,
.dark-theme .welcome-content p {
  transition: color 0.3s ease;
}

.dark-theme .message-content {
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chat-messages {
    padding: 16px;
    gap: 16px;
  }
  
  .message {
    max-width: 85%;
  }
}
</style>