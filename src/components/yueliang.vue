<!--
 * @Author: your name
 * @Date: 2021-10-10 18:30:13
 * @LastEditTime: 2021-10-11 23:49:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Bian\src\components\yueliang.vue
-->
<!--  -->
<template>
  <div ref="planet">
    <span>如何用three.js实现一个3D月亮</span>
  </div>
</template>

<script lang="ts">
import * as THREE from "three";
import { ref, onMounted } from "vue";
export default {
  name: "",
  setup() {
    let scene: any = null;
    let camera: any = null;
    let renderer: any = null;
    const planet: any = ref(null);

    function initThree() {
      //场景
      scene = new THREE.Scene();
      //镜头
      camera = new THREE.PerspectiveCamera(
        90,
        document.body.clientWidth / document.body.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 0.01);
      //渲染器
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(document.body.clientWidth, document.body.clientHeight);
      planet.value.appendChild(renderer.domElement);
      //镜头控制器
      // let controls = new THREE.OrbitControls(camera, renderer.domElement);

      //一会儿在这里添加3D物体

      // loop();
    }

    //帧同步重绘
    function loop() {
      requestAnimationFrame(loop);
      renderer.render(scene, camera);
    }

    onMounted(() => {
      initThree();
      // loop();
    });

    return {
      planet,
    };
  },
};
</script>
<style scoped></style>
