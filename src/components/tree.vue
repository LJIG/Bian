<template>
  <div ref="container" class="container" />
</template>

<script>
import * as THREE from "three";
import * as ThreeStats from "three-stats";
import * as Dat from "dat-gui";
import TrackballControls from "three-trackballcontrols";
import clockTexture from "@/utils/clock";
const canvas = clockTexture();

//  因vue3中使用了Proxy对象代理，引入的外部依赖中使用了大量的===造成对比失败。
//  解决办法: 对Proxy对象进行拆箱
const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj);
import { onMounted, reactive, toRefs } from "vue";

export default {
  name: "Create",
  setup() {
    const obj = reactive({
      container: null,
      renderer: {}, // 渲染器对象
      camera: {}, // 相机对象
      scene: {}, // 场景对象
      axesHelper: {}, // 三维坐标系对象
      stats: {}, // 性能监控对象
      light: {
        spotLight: {}, // 光源对象
      }, // 光源集
      geometry: {
        ball: {}, // 球体对象
        cube: {}, // 长方体对象
        plane: {}, // 平面对象
      }, // 几何对象集
      controls: {}, // 辅助对象
      clock: {}, // 时钟工具对象
      trackballControls: {}, // 控制器对象
      step: 0, // 跳跃距离
      texture: {
        // 文理集
        clock: "", // 钟表
      },
    });

    const initRender = () => {
      obj.renderer = new THREE.WebGLRenderer({
        antialias: true,
      }); // antialias（是否启用抗锯齿）
      obj.renderer.setSize(
        obj.container.offsetWidth,
        obj.container.offsetHeight
      );

      // 告诉渲染器需要阴影效果
      obj.renderer.shadowMap.enabled = true;
      obj.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      obj.renderer.setClearColor(0xffffff, 1.0);
      obj.container.appendChild(obj.renderer.domElement);
    };

    const initScene = () => {
      obj.scene = new THREE.Scene();
    };

    const initCamera = () => {
      // PerspectiveCamera('视角', '指定投影窗口长宽比', '从距离摄像机多远开始渲染', '截止多远停止渲染1000')
      obj.camera = new THREE.PerspectiveCamera(
        45,
        obj.container.offsetWidth / obj.container.offsetHeight,
        0.1,
        1000
      );
      // 相机位置
      obj.camera.position.set(-30, 40, 30);

      // 设置相机指向的位置 默认0，0，0
      obj.camera.lookAt(obj.scene.position);
    };

    const initGui = () => {
      obj.controls = {
        rotationSpeed: 0.02,
        bouncingSpeed: 0.03,
      };
      let gui = new Dat.GUI();
      gui.add(obj.controls, "rotationSpeed", 0, 0.5);
      gui.add(obj.controls, "bouncingSpeed", 0, 0.5);
    };

    const initClock = () => {
      obj.clock = new THREE.Clock();
    };

    const initHelper = () => {
      obj.axesHelper = new THREE.AxesHelper(10);
      obj.scene.add(obj.axesHelper);
    };

    const initLight = () => {
      // 添加光源
      obj.light.spotLight = new THREE.SpotLight(0xffffff);
      obj.light.spotLight.position.set(-40, 60, 10);
      obj.light.spotLight.castShadow = true;
      obj.scene.add(obj.light.spotLight);
    };

    const initObject = () => {
      //1、 创建几何模型 球
      let geometry = new THREE.SphereGeometry(4, 20, 20);
      let material = new THREE.MeshLambertMaterial({ color: 0x7777ff });
      obj.geometry.ball = new THREE.Mesh(geometry, material);
      obj.geometry.ball.castShadow = true; // 开启阴影
      obj.geometry.ball.position.set(20, 4, 2); // 设置位置
      obj.scene.add(obj.geometry.ball); // 添加到场景中去

      //2、 创建一个立方体 长宽高为4
      geometry = new THREE.BoxGeometry(4, 4, 4);
      // material = new THREE.MeshLambertMaterial({ color: 0xFF0000 }); // 创建立方体材质
      // obj.geometry.cube = new THREE.Mesh(geometry, material);
      obj.texture.clock = new THREE.Texture(canvas);
      material = new THREE.MeshBasicMaterial({ map: obj.texture.clock });
      obj.texture.clock.needsUpdate = true; //开启纹理更新
      obj.geometry.cube = new THREE.Mesh(geometry, material);
      obj.geometry.cube.castShadow = true; // 开启阴影
      obj.geometry.cube.position.set(-4, 3, 0); // 设置位置
      obj.scene.add(obj.geometry.cube); // 添加到场景中去

      //3、 创建一个平面 宽60，高20
      geometry = new THREE.PlaneGeometry(60, 20);
      material = new THREE.MeshLambertMaterial({ color: 0xcccccc }); // 创建待颜色的材质
      obj.geometry.plane = new THREE.Mesh(geometry, material);
      obj.geometry.plane.receiveShadow = true; // 平面开启接收阴影效果
      obj.geometry.plane.rotation.x = -0.5 * Math.PI; // 设置平面角度
      obj.geometry.plane.position.set(15, 0, 0); // 设置位置
      obj.scene.add(obj.geometry.plane); // 添加到场景中去
    };

    const initStats = () => {
      obj.stats = new ThreeStats.Stats();
      obj.container.appendChild(obj.stats.domElement);
    };

    const initControls = () => {
      obj.trackballControls = new TrackballControls(
        obj.camera,
        obj.renderer.domElement
      );
      obj.trackballControls.rotationSpeed = 1.0;
      obj.trackballControls.zoomSpeed = 1.2;
      obj.trackballControls.panSpeed = 0.8;

      // 是否可以缩放
      obj.trackballControls.noZoom = false;
      obj.trackballControls.noPan = false;
      obj.trackballControls.staticMoving = true;
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
      obj.trackballControls.dynamicDampingFactor = 0.3;
      obj.trackballControls.key = [65, 83, 68];
    };

    const animate = () => {
      obj.trackballControls.update(obj.clock.getDelta());
      obj.stats.update(); //更新性能插件
      // obj.stats.setMode(0); //默认的监听fps
      // obj.stats.setMode(1); //默认的监听画面渲染时间
      // obj.stats.setMode(2); //默认的监听当前的不知道是啥

      // 旋转cube
      obj.geometry.cube.rotation.y += obj.controls["rotationSpeed"];
      obj.geometry.cube.rotation.x += obj.controls["rotationSpeed"];
      obj.geometry.cube.rotation.z += obj.controls["rotationSpeed"];

      obj.step += obj.controls["bouncingSpeed"];
      obj.geometry.ball.position.x = 20 + 10 * Math.cos(obj.step);
      obj.geometry.ball.position.y = 2 + 10 * Math.abs(Math.sin(obj.step)); // Math.sin(x) ,Math.cos(x) x 的余弦值。返回的是 -1.0 到 1.0 之间的数

      /* 
        如何得到圆上每个点的坐标？
        解决思路：根据三角形的正玄、余弦来得值；
        假设一个圆的圆心坐标是(a,b)，半径为r，
        则圆上每个点的X坐标=a + Math.sin(2*Math.PI / 360) * r; Y坐标=b + Math.cos(2*Math.PI / 360) * r
      */
      requestAnimationFrame(animate);
      // 渲染场景
      unwarp(obj.renderer).render(unwarp(obj.scene), obj.camera);
    };

    onMounted(() => {
      initScene(); // 初始化场景
      initCamera(); // 初始化相机
      initHelper(); // 初始化三维坐标系
      initGui(); // 初始化辅助UI
      initStats(); // 添加性能监控, 初始化帧数显示工具
      initClock(); // 初始化时钟工具
      initObject(); // 初始化几何模型
      initRender(); // 初始化渲染器
      initLight(); // 初始化光源
      initControls(); // 初始化控制器

      animate();
      window.addEventListener("resize", () => {
        //更新镜头长宽比
        obj.camera.aspect =
          obj.container.offsetWidth / obj.container.offsetHeight;

        //更新摄像机投影矩阵。在任何参数被改变以后必须被调用。
        obj.camera.updateProjectionMatrix();

        //设置渲染器宽长
        obj.renderer.setSize(
          obj.container.offsetWidth,
          obj.container.offsetHeight
        );
      });
    });

    return {
      ...toRefs(obj),
    };
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
