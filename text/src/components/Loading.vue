<template>
  <div class="loading-container">
    <div class="loading-content">
      <div class="loading-logo">豆</div>
      <div class="loading-text">正在加载豆包AI...</div>
      <div class="loading-progress">
        <div class="loading-bar"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f7f8fa;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: background-color 0.3s ease;
}

.dark-theme .loading-container {
  background-color: #1a1a1a;
}

.loading-content {
  text-align: center;
  max-width: 300px;
  padding: 40px 20px;
  animation: fadeIn 0.8s ease-out;
}

.loading-logo {
  width: 80px;
  height: 80px;
  background-color: #ff6b6b;
  color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  margin: 0 auto 24px;
  animation: pulse 2s infinite ease-in-out;
}

.loading-text {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 32px;
  animation: fadeIn 0.8s ease-out 0.3s both;
}

.dark-theme .loading-text {
  color: #e0e0e0;
}

.loading-progress {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  animation: fadeIn 0.8s ease-out 0.6s both;
}

.dark-theme .loading-progress {
  background-color: #3d3d3d;
}

.loading-bar {
  width: 0%;
  height: 100%;
  background-color: #ff6b6b;
  border-radius: 4px;
  animation: loadingProgress 1.5s ease-out 0.9s forwards;
}

/* 加载动画关键帧 */
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

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes loadingProgress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

/* 主题切换动画 */
.dark-theme .loading-container {
  transition: background-color 0.3s ease;
}

.dark-theme .loading-text {
  transition: color 0.3s ease;
}

.dark-theme .loading-progress {
  transition: background-color 0.3s ease;
}
</style>