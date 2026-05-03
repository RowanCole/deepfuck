import api from './axios'

// 获取会话列表
export const getConversations = () => {
  return api.get('/conversations')
}

// 获取会话消息
export const getConversationMessages = (conversationId) => {
  return api.get(`/messages?conversationId=${conversationId}`)
}

// 发送消息
export const sendMessage = (conversationId, content) => {
  return api.post('/send-message', {
    conversationId,
    content
  })
}

// 创建新会话
export const createConversation = () => {
  return api.post('/conversations', {
    title: '新会话'
  })
}

// 删除会话
export const deleteConversation = (conversationId) => {
  return api.delete(`/conversations/${conversationId}`)
}

// 更新会话标题
export const updateConversationTitle = (conversationId, title) => {
  return api.put(`/conversations/${conversationId}`, {
    title
  })
}