<template>
  <div ref="paperBox" class="wall-paper">
    <canvas ref="paper" class="myCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Star } from "@/utils/class/Star";

const paperBox = ref<HTMLDivElement | null>(null);
const paper = ref<HTMLCanvasElement | null>(null);
let timer = 0; // 星星步进定时器
const distance = 60; // 星星连线最大距离

onMounted(() => {
  if (!paperBox.value || !paper.value) {
    return;
  }
  const width = paperBox.value.clientWidth;
  const height = paperBox.value.clientHeight;
  const myCanvas = paper.value;
  myCanvas.height = height;
  myCanvas.width = width;
  const ctx = myCanvas.getContext("2d") as CanvasRenderingContext2D;
  const arr = createStarts(ctx, 100, width, height);

  // 将鼠标初始化为一颗星星
  const mouseStar = new Star(ctx);
  myCanvas.onmousemove = (e: any) => {
    mouseStar.x = e.offsetX;
    mouseStar.y = e.offsetY;
  };

  /**
   * 用于绘制画布
   */
  const renderCanvas = () => {
    ctx.clearRect(0, 0, width, height);
    arr.forEach((v, i) => {
      v.render();
      v.move();
      for (let j = i + 1; j < arr.length; j++) {
        if (Math.abs(v.x - arr[j].x) < distance && Math.abs(v.y - arr[j].y) < distance) {
          ctx.beginPath();
          ctx.moveTo(v.x, v.y);
          ctx.lineTo(arr[j].x, arr[j].y);
          ctx.closePath();
          ctx.stroke();
        }
      }
    });
    mouseStar.render();
    arr.forEach(v => {
      if (Math.abs(v.x - mouseStar.x) < 100 && Math.abs(v.y - mouseStar.y) < 100) {
        ctx.beginPath();
        ctx.moveTo(v.x, v.y);
        ctx.lineTo(mouseStar.x, mouseStar.y);
        ctx.closePath();
        ctx.stroke();
      }
    });
  };
  timer = setInterval(renderCanvas, 20);
  // 点击鼠标创建十颗星星效果
  myCanvas.onmousedown = (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const newStar = Array(10).fill(undefined).map(() => {
      return new Star(ctx, x, y);
    });
    arr.push(...newStar);
  };
  // 五秒后将新创建的星星删掉,保持星星总数不变
  myCanvas.onmouseup = () => {
    setTimeout(() => {
      arr.splice(99, 10);
    }, 5000);
  };
});

onUnmounted(() => {
  timer && clearInterval(timer);
});

/**
 * 用于批量创建星星
 * @param {CanvasRenderingContext2D} ctx - 画笔对象
 * @param {number} counts - 星星数量
 * @param {number} w - 画布的宽
 * @param {number} h - 画布的高
 * @return {Star[]} 承装星星的数组容器
 */
const createStarts = (ctx: CanvasRenderingContext2D, counts: number, w: number, h: number): Star[] => {
  return Array(counts).fill(undefined).map(() => {
    const x = parseInt(String(Math.random() * w));
    const y = parseInt(String(Math.random() * h));
    return new Star(ctx, x, y);
  });
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wall-paper {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, #206885, #925454 20%, #141f48 40%, #090e21 60%);
  position: relative;

  //&:after {
  //  content: "";
  //  background: url("~@/assets/bk_2.jpg") center no-repeat;
  //  background-size: cover;
  //  top: 0;
  //  left: 0;
  //  bottom: 0;
  //  right: 0;
  //  position: absolute;
  //  z-index: 1;
  //  opacity: .1;
  //}

  .myCanvas {
    position: absolute;
    z-index: 2;
  }
}
</style>
