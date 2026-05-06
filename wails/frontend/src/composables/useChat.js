import { ref } from 'vue'
import { sendMessage as sendMessageApi, getConversationMessages } from '../api/conversation'
import { chatMessages } from '../api/sendMessage'

export function useChat() {
  const messages = ref([
    {
      id: 1,
      role: 'ai',
      content: '你好！我是deepfuck AI，有什么可以帮助你的吗？'
    }
  ])
  const isTyping = ref(false)
  const currentConversationId = ref('1') // 默认会话ID

  const addMessage = (content,role,conversationId = currentConversationId.value) =>{
        if (!content.trim() && role == 'user') return

        const message = {
          id: Date.now(),
          role,
          content: content.trim()
        }
        messages.value.push(message)
        return message
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
          content: '你好！我是deepfuck AI，有什么可以帮助你的吗？'
        }
      ]
    }
  }

  return {
    messages,
    isTyping,
    addMessage,
    loadConversationMessages,
    currentConversationId
  }
}