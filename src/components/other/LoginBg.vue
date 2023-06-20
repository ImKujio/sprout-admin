<template>
  <canvas style="opacity: 0.8;position: absolute;z-index: -1" ref="canvasRef"></canvas>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue"

const canvasRef = ref(null)
const bubbles = []

const createBubble = () => {
  // 创建气泡对象的代码
  const canvas = canvasRef.value;
  return {
    x: Math.random() * canvas.width, // 随机X坐标
    y: Math.random() * canvas.height, // 随机Y坐标
    radius: Math.random() * 20 + 10, // 随机半径
    dx: (Math.random() - 0.5) * 0.5, // 随机水平速度（慢一点）
    dy: (Math.random() - 0.5) * 0.5, // 随机垂直速度（慢一点）
    color: getRandomColor(), // 随机颜色
    opacity: 0 // 初始透明度为0
  }

}

const updateBubble = (bubble) => {
  // 更新气泡位置和透明度的代码
  bubble.x += bubble.dx;
  bubble.y += bubble.dy;

  // 气泡超出画布则重新设置位置
  const canvas = canvasRef.value;
  if (bubble.y + bubble.radius < 0 || bubble.y - bubble.radius > canvas.height ||
      bubble.x + bubble.radius < 0 || bubble.x - bubble.radius > canvas.width) {
    bubble.x = Math.random() * canvas.width;
    bubble.y = Math.random() * canvas.height;
    bubble.opacity = 0; // 重置透明度
  }

  // 逐渐增加透明度
  if (bubble.opacity < 1) {
    bubble.opacity += 0.01;
  }
}

const drawBubble = (bubble) => {
  // 绘制气泡的代码
  const ctx = canvasRef.value.getContext('2d');
  ctx.beginPath();
  ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${hexToRgb(bubble.color)}, ${bubble.opacity})`;
  ctx.fill();
  ctx.closePath();
}

// 生成随机颜色
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 将颜色的十六进制表示转换为RGB表示
function hexToRgb(hex) {
  const bigint = parseInt(hex.substring(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

const animate = () => {
  const canvas = canvasRef.value;
  if (!canvas) return
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach((bubble) => {
    updateBubble(bubble);
    drawBubble(bubble);
  });

  requestAnimationFrame(animate);
}

const resizeHandler = () => {
  const canvas = canvasRef.value;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  bubbles.length = 0;

  const count = (canvas.width * canvas.height) / 25920

  for (let i = 0; i < count; i++) {
    bubbles.push(createBubble());
  }
};

onMounted(() => {
  const canvas = canvasRef.value;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const count = (canvas.width * canvas.height) / 25920

  for (let i = 0; i < count; i++) {
    bubbles.push(createBubble());
  }

  animate();

  window.addEventListener('resize', resizeHandler);
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler);
});

</script>
