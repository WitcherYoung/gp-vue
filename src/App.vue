<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import httpRequest from "@/api";
export default {
  name: "App",
  mounted() {
    window.onbeforeunload = function(e) {
      if(sessionStorage.getItem("userInfo")) {
        let param = { username: null }, userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        param.username = userInfo.username;
        httpRequest.postLogout(param).then(res => {}).catch(err => {
          console.error(err);
        });
        sessionStorage.removeItem('userInfo');
      }
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
</style>
