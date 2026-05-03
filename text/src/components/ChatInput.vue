<template>
  <div class="chat-input">
    <div class="input-container">
      <input
        v-model="inputMessage"
        type="text"
        placeholder="请输入您的问题..."
        @keyup.enter="sendMessage"
        class="message-input"
      />
      <button @click="sendMessage" class="send-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputMessage = ref('')

const emit = defineEmits(['send-message'])

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  // 发送消息给父组件
  emit('send-message', inputMessage.value.trim())
  
  // 清空输入框
  inputMessage.value = ''
}
</script>

<style scoped>
.chat-input {
  padding: 20px;
  background-color: white;
  border-top: 1px solid #e8e8e8;
}

.input-container {
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 24px;
  padding: 6px 12px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 12px 16px;
  font-size: 16px;
  outline: none;
  color: #333;
}

.message-input::placeholder {
  color: #999;
}

.send-btn {
  width: 40px;
  height: 40px;
  border: none;
  background-color: #007aff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 122, 255, 0.2);
}

.send-btn:hover {
  background-color: #0066cc;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 122, 255, 0.3);
}

.send-btn:active {
  background-color: #0052a3;
  transform: translateY(0);
}

/* 暗色主题 */
.dark-theme .chat-input {
  background-color: #2d2d2d;
  border-top-color: #3d3d3d;
}

.dark-theme .input-container {
  background-color: #3d3d3d;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
}

.dark-theme .message-input {
  color: #e0e0e0;
}

.dark-theme .message-input::placeholder {
  color: #707070;
}

.dark-theme .send-btn {
  background-color: #0066cc;
  box-shadow: 0 2px 4px rgba(0, 102, 204, 0.3);
}

.dark-theme .send-btn:hover {
  background-color: #0052a3;
  box-shadow: 0 4px 8px rgba(0, 102, 204, 0.4);
}

.dark-theme .send-btn:active {
  background-color: #004080;
}

/* 主题切换动画 */
.dark-theme .chat-input {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.dark-theme .input-container {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.dark-theme .message-input {
  transition: color 0.3s ease;
}

.dark-theme .send-btn {
  transition: all 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chat-input {
    padding: 16px;
  }
}
</style>