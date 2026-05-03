import { ref } from 'vue'
import { sendMessage as sendMessageApi, getConversationMessages } from '../api/conversation'

export function useChat() {
  const messages = ref([
    {
      id: 1,
      role: 'ai',
      content: '你好！我是豆包AI，有什么可以帮助你的吗？'
    }
  ])
  const isTyping = ref(false)
  const currentConversationId = ref('1') // 默认会话ID

  const sendMessage = async (content, conversationId = currentConversationId.value) => {
    if (!content.trim()) return

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content.trim()
    }
    messages.value.push(userMessage)

    // 模拟AI回复
    isTyping.value = true
    try {
      const response = await sendMessageApi(conversationId, content.trim())
      if (response.success) {
        const aiMessage = {
          id: response.data.id,
          role: response.data.role,
          content: response.data.content
        }
        messages.value.push(aiMessage)
      }
    } catch (error) {
      console.error('发送消息失败:', error)
      // 失败时添加默认回复
      const aiMessage = {
        id: Date.now() + 1,
        role: 'ai',
        content: '抱歉，发送消息失败，请稍后重试。'
      }
      messages.value.push(aiMessage)
    } finally {
      isTyping.value = false
    }
  }

  const loadConversationMessages = async (conversationId) => {
    currentConversationId.value = conversationId
    try {
      const response = await getConversationMessages(conversationId)
      if (response.success) {
        messages.value = response.data
      }
    } catch (error) {
      console.error('加载会话消息失败:', error)
      // 失败时使用默认消息
      messages.value = [
        {
          id: 1,
          role: 'ai',
          content: '你好！我是豆包AI，有什么可以帮助你的吗？'
        }
      ]
    }
  }

  return {
    messages,
    isTyping,
    sendMessage,
    loadConversationMessages,
    currentConversationId
  }
}