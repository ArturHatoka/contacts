<template>
  <nuxt class="v-application"/>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  min-height: 100vh;
}
body {
  min-height: 100vh;
  background: #eee;
}
#__nuxt, #__layout,.v-application, #__layout>.container{
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
header{
  width: 100vw;
}
main, .v-main__wrap{
  height: 100vh;
  display: flex;
  justify-content: center;
}
.v-main__wrap{
  padding-top: 64px;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>

