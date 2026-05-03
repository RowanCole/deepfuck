import { ref, onMounted } from 'vue'

export function useTheme() {
  const theme = ref('light') // 主题状态：light或dark

  // 更新主题类
  const updateThemeClass = () => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark-theme')
    } else {
      document.documentElement.classList.remove('dark-theme')
    }
  }

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    updateThemeClass()
  }

  // 初始化主题
  onMounted(() => {
    updateThemeClass()
  })

  return {
    theme,
    toggleTheme
  }
}