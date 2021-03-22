<template>
  <div>
    <v-btn @click="roll()">
      Roll
    </v-btn>
    <div id="ThreeJS" style="position: absolute; left:0px; top:0px"></div>
  </div>
</template>

<script>
//import THREE, { OrbitControls } from 'three/build/three';
import { DiceManager, DiceD6 } from 'threejs-dice/lib/dice';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry';
import Stats from 'three/examples/jsm/libs/stats.module';


export default {
  name: 'dice',
  methods: {
    roll() {
      let scene = new THREE.Scene();

      // CAMERA
      let SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
      let VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
      let camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
      scene.add(camera);

      // RENDERER
      let renderer = new THREE.WebGLRenderer( {antialias:true} );
      renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
      let container = document.getElementById( 'ThreeJS' );
      container.appendChild( renderer.domElement );
      // EVENTS
      // CONTROLS
      let controls = new OrbitControls( camera, renderer.domElement );
      camera.position.set(100, 500, 300);
      camera.rotation.x = -0.95;
      // STATS
      let stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.bottom = '0px';
      stats.domElement.style.zIndex = 100;
      container.appendChild( stats.domElement );
      // LIGHT
      var light = new THREE.PointLight(0xffffff, 0.8);
      light.position.set(0,150,100);
      scene.add(light);
      // LIGHT
      var light = new THREE.PointLight(0xffffff, 0.8);
      light.position.set(-400,150,100);
      scene.add(light);
      // LIGHT
      var light = new THREE.PointLight(0xffffff, 0.8);
      light.position.set(400,150,100);
      scene.add(light);
      // FLOOR
      var floorMaterial = new THREE.MeshPhongMaterial( { color: '#00aa00', side: THREE.DoubleSide } );
      var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
      var floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.position.y = -0.5;
      floor.rotation.x = Math.PI / 2;
      scene.add(floor);
      // SKYBOX/FOG
      var skyBoxGeometry = new BoxLineGeometry( 10000, 10000, 10000 );
      var skyBoxMaterial = new THREE.MeshPhongMaterial( { color: 0x9999ff, side: THREE.BackSide } );
      var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
      // scene.add(skyBox);
      scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
    }
  },
}
</script>

<style scoped>

</style>
