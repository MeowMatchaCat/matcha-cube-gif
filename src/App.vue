<script>
import {startRecording, setCubeTexture} from './three-gif.js';
export default {
  name: 'App',
  methods: {
    render(){
      startRecording();
    },
    setTexture(){
      //get the file from the input
      var file = document.getElementById('fileInput').files[0];
      
      //using FileReader to read the file
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e){
        //set the texture
        setCubeTexture(e.target.result);
      }

    }
  }
}

</script>

<template>
  <div class="main">
    <div class="container">
      <div id="canvas"></div>
      <div class="button-container">
        <button @click="render">render</button>
        <button @click="setTexture">setTexture</button>
        <input type="file" id="fileInput"/>
      </div>
    </div>
    <div class="text">
      1. Choose a file to upload.
      2. Click "setTexture" to set the texture.
      3. Click "render" to start recording.
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  font-size: 1.1rem;

}

/* center the canvas */
canvas {
  display: block;
  margin: 0 auto;
}
button {
  margin: 0 auto;
  /* style the button */
  background-color: #3498db;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  height: 48px;

}

input {
  
  margin: 0 auto;
  /* style the button */
  background-color: #3498db;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;

}

.text {
  margin: 20px 0px;
}

</style>
