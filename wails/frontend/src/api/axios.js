import axios from 'axios'

// 创建axios实例
const dify_api = axios.create({
  baseURL: 'dify', // 模拟的API基础URL
  timeout: 100000, // 请求超时时间
  headers: {
    'Authorization': 'Bearer ' + import.meta.env.VITE_DIFY_API_KEY,
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
// api.interceptors.request.use(
//   config => {
//     // 可以在这里添加token等认证信息
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// // 响应拦截器
// api.interceptors.response.use(
//   response => {
//     return response.data
//   },
//   error => {
//     // 模拟网络请求，直接返回成功数据
//     if (error.message.includes('Network Error')) {
//       // 根据请求路径返回模拟数据
//       const url = error.config.url
//       if (url.includes('/conversations')) {
//         return {
//           success: true,
//           data: [
//             {
//               id: '1',
//               title: '默认会话',
//               lastMessage: '你好！我是fuckAI，有什么可以帮助你的吗？',
//               lastMessageTime: new Date().toISOString()
//             },
//             {
//               id: '2',
//               title: '技术讨论',
//               lastMessage: 'Vue 3的组合式API真的很强大',
//               lastMessageTime: new Date(Date.now() - 3600000).toISOString()
//             },
//             {
//               id: '3',
//               title: '生活助手',
//               lastMessage: '今天天气不错，适合出门散步',
//               lastMessageTime: new Date(Date.now() - 7200000).toISOString()
//             }
//           ]
//         }
//       } else if (url.includes('/messages')) {
//         return {
//           success: true,
//           data: [
//             {
//               id: '1',
//               role: 'ai',
//               content: '你好！我是fuckAI，有什么可以帮助你的吗？',
//               timestamp: new Date().toISOString()
//             }
//           ]
//         }
//       } else if (url.includes('/send-message')) {
//         return {
//           success: true,
//           data: {
//             id: Date.now().toString(),
//             role: 'ai',
//             content: '感谢你的提问！我正在学习中，会努力为你提供更好的回答。',
//             timestamp: new Date().toISOString()
//           }
//         }
//       }
//     }
//     return Promise.reject(error)
//   }
// )

export default dify_api