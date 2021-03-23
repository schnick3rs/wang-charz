<template>
  <div>
    <v-btn @click="animate()">
      Roll
    </v-btn>
    <div id="container" style="height: 400px; width: 600px; background-color: #3b8070;"></div>
  </div>
</template>

<script>
//import THREE, { OrbitControls } from 'three/build/three';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry';
import Stats from 'three/examples/jsm/libs/stats.module';


export default {
  name: 'dice',
  mounted() {
    this.init();

  },
  data() {
    return {
      camera: undefined,
      scene: undefined,
      mesh: undefined,
      renderer: undefined,
    };
  },
  methods: {
    init() {
      let container = document.getElementById('container');
      this.camera = new Three.PerspectiveCamera(70, container.clientWidth/container.clientHeight);
      this.camera.position.z = 1;

      this.scene = new Three.Scene();
      let geometry = new Three.BoxGeometry(0.5,0.5,1);
      let material = new Three.MeshBasicMaterial({color: 0xff0000});

      this.mesh = new Three.Mesh(geometry, material);
      this.mesh.position.z = -5;
      this.mesh.rotation.x = 10;
      this.mesh.rotation.y = 5;
      this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({antialias: true});
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
  },
}
</script>

<style scoped>

</style>
