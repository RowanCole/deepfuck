<template>
  <div class="chat-header">
    <div class="header-content">
      <div class="logo">
        <div class="logo-icon">豆</div>
      </div>
      <h1>{{ currentConversation?.title || '豆包' }}</h1>
      <div class="header-actions">
        <button class="action-btn" @click="toggleTheme">
          <svg v-if="theme === 'light'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </button>
        <div class="action-btn-container">
          <button class="action-btn" @click="toggleConversations">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </button>
          <!-- 会话列表 -->
          <div v-if="showConversations" class="conversations-panel">
            <div class="conversations-header">
              <h3>会话</h3>
              <button class="new-conversation-btn" @click="createNewConversation">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                新会话
              </button>
            </div>
            <div class="conversations-list">
              <div
                v-for="conversation in conversations"
                :key="conversation.id"
                :class="['conversation-item', conversation.id === currentConversation?.id ? 'active' : '']"
                @click="selectConversation(conversation)"
              >
                <div class="conversation-title">{{ conversation.title }}</div>
                <div class="conversation-preview">{{ conversation.lastMessage }}</div>
                <div class="conversation-time">{{ formatTime(conversation.lastMessageTime) }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="action-btn-container">
          <button class="action-btn" @click="toggleConversationMenu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
          <!-- 会话菜单 -->
          <div v-if="showConversationMenu" class="conversation-menu">
            <button class="menu-item" @click="renameConversation">重命名会话</button>
            <button class="menu-item" @click="deleteConversation">删除会话</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getConversations, createConversation, deleteConversation as deleteConversationApi, updateConversationTitle } from '../api/conversation'

// 接收主题状态和切换方法作为props
const props = defineProps({
  theme: {
    type: String,
    default: 'light'
  },
  currentConversation: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['toggle-theme', 'select-conversation', 'update-messages'])

// 会话相关状态
const showConversations = ref(false)
const showConversationMenu = ref(false)
const conversations = ref([])

// 切换主题
const toggleTheme = () => {
  emit('toggle-theme')
}

// 切换会话列表显示
const toggleConversations = () => {
  // 关闭会话菜单
  showConversationMenu.value = false
  // 切换会话列表
  showConversations.value = !showConversations.value
  if (showConversations.value) {
    loadConversations()
  }
}

// 切换会话菜单显示
const toggleConversationMenu = () => {
  // 关闭会话列表
  showConversations.value = false
  // 切换会话菜单
  showConversationMenu.value = !showConversationMenu.value
}

// 加载会话列表
const loadConversations = async () => {
  try {
    const response = await getConversations()
    if (response.success) {
      conversations.value = response.data
    }
  } catch (error) {
    console.error('加载会话列表失败:', error)
  }
}

// 选择会话
const selectConversation = (conversation) => {
  emit('select-conversation', conversation)
  showConversations.value = false
}

// 创建新会话
const createNewConversation = async () => {
  try {
    const response = await createConversation()
    if (response.success) {
      conversations.value.unshift(response.data)
      selectConversation(response.data)
    }
  } catch (error) {
    console.error('创建会话失败:', error)
  }
}

// 删除会话
const deleteConversation = async () => {
  if (!props.currentConversation) return
  
  try {
    const response = await deleteConversationApi(props.currentConversation.id)
    if (response.success) {
      conversations.value = conversations.value.filter(c => c.id !== props.currentConversation.id)
      // 选择第一个会话
      if (conversations.value.length > 0) {
        selectConversation(conversations.value[0])
      }
      showConversationMenu.value = false
    }
  } catch (error) {
    console.error('删除会话失败:', error)
  }
}

// 重命名会话
const renameConversation = () => {
  if (!props.currentConversation) return
  
  const newTitle = prompt('请输入新的会话标题:', props.currentConversation.title)
  if (newTitle && newTitle.trim() !== props.currentConversation.title) {
    updateConversationTitleApi(props.currentConversation.id, newTitle.trim())
  }
  showConversationMenu.value = false
}

// 更新会话标题
const updateConversationTitleApi = async (conversationId, title) => {
  try {
    const response = await updateConversationTitle(conversationId, title)
    if (response.success) {
      const conversation = conversations.value.find(c => c.id === conversationId)
      if (conversation) {
        conversation.title = title
      }
      emit('select-conversation', { ...props.currentConversation, title })
    }
  } catch (error) {
    console.error('更新会话标题失败:', error)
  }
}

// 格式化时间
const formatTime = (timeString) => {
  const date = new Date(timeString)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60000) {
    return '刚刚'
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}小时前`
  } else {
    return date.toLocaleDateString()
  }
}

// 点击外部关闭弹出框
const handleClickOutside = (event) => {
  const conversationsPanel = event.target.closest('.conversations-panel')
  const conversationsButton = event.target.closest('.action-btn-container:nth-child(2)')
  const conversationMenu = event.target.closest('.conversation-menu')
  const conversationMenuButton = event.target.closest('.action-btn-container:nth-child(3)')
  
  // 如果点击的不是会话列表或其按钮，关闭会话列表
  if (!conversationsPanel && !conversationsButton) {
    showConversations.value = false
  }
  
  // 如果点击的不是会话菜单或其按钮，关闭会话菜单
  if (!conversationMenu && !conversationMenuButton) {
    showConversationMenu.value = false
  }
}

// 初始化加载会话列表
onMounted(() => {
  loadConversations()
  // 添加点击外部关闭事件监听器
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时移除事件监听器
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.chat-header {
  padding: 16px 24px;
  background-color: white;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  align-items: center;
  position: relative;
}

.header-content h1 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.dark-theme .header-content h1 {
  color: #e0e0e0;
}

.header-actions {
  margin-left: auto;
  display: flex;
  gap: 12px;
}

.action-btn-container {
  position: relative;
  display: inline-block;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background-color: #ff6b6b;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: #e8e8e8;
  color: #333;
}

.dark-theme .chat-header {
  background-color: #2d2d2d;
  border-bottom-color: #3d3d3d;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.dark-theme .action-btn {
  background-color: #3d3d3d;
  color: #b0b0b0;
}

.dark-theme .action-btn:hover {
  background-color: #4d4d4d;
  color: #e0e0e0;
}

/* 主题切换动画 */
.dark-theme .chat-header {
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.dark-theme .action-btn {
  transition: all 0.3s ease;
}

/* 会话面板 */
.conversations-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 18px;
  width: 320px;
  max-height: 400px;
  background-color: white;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.3s ease-out;
}

.dark-theme .conversations-panel {
  background-color: #2d2d2d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.conversations-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark-theme .conversations-header {
  border-bottom-color: #3d3d3d;
}

.conversations-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.dark-theme .conversations-header h3 {
  color: #e0e0e0;
}

.new-conversation-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid #e8e8e8;
  background-color: #f5f5f5;
  border-radius: 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark-theme .new-conversation-btn {
  border-color: #3d3d3d;
  background-color: #3d3d3d;
  color: #b0b0b0;
}

.new-conversation-btn:hover {
  background-color: #e8e8e8;
  color: #333;
}

.dark-theme .new-conversation-btn:hover {
  background-color: #4d4d4d;
  color: #e0e0e0;
}

.conversations-list {
  max-height: 320px;
  overflow-y: auto;
}

.conversation-item {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.dark-theme .conversation-item {
  border-bottom-color: #3d3d3d;
}

.conversation-item:hover {
  background-color: #f5f5f5;
}

.dark-theme .conversation-item:hover {
  background-color: #3d3d3d;
}

.conversation-item.active {
  background-color: #f0f7ff;
  border-left: 3px solid #007aff;
}

.dark-theme .conversation-item.active {
  background-color: #1a2b4a;
  border-left-color: #0066cc;
}

.conversation-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dark-theme .conversation-title {
  color: #e0e0e0;
}

.conversation-preview {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dark-theme .conversation-preview {
  color: #b0b0b0;
}

.conversation-time {
  font-size: 12px;
  color: #999;
  position: absolute;
  top: 16px;
  right: 20px;
}

.dark-theme .conversation-time {
  color: #707070;
}

/* 会话菜单 */
.conversation-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 18px;
  width: 180px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.3s ease-out;
}

.dark-theme .conversation-menu {
  background-color: #2d2d2d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.menu-item {
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  text-align: left;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dark-theme .menu-item {
  color: #e0e0e0;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.dark-theme .menu-item:hover {
  background-color: #3d3d3d;
}

.menu-item:first-child {
  border-bottom: 1px solid #f0f0f0;
}

.dark-theme .menu-item:first-child {
  border-bottom-color: #3d3d3d;
}

/* 动画 */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 滚动条样式 */
.conversations-list::-webkit-scrollbar {
  width: 6px;
}

.conversations-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.conversations-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.conversations-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.dark-theme .conversations-list::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.dark-theme .conversations-list::-webkit-scrollbar-thumb {
  background: #4d4d4d;
}

.dark-theme .conversations-list::-webkit-scrollbar-thumb:hover {
  background: #5d5d5d;
}
</style>