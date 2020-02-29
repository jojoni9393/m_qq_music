<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html {
  font-size: calc(100vw / 7.5);
}
body {
  font: 300 12px/1.5 -apple-system, sans-serif;
  background-color: rgb(250, 250, 250);
}
body,
ul,
li,
p {
  padding: 0;
  margin: 0;
}
ul {
  list-style: none;
}
img,
input {
  border: none;
  /*去除的蓝色小边框*/
  outline-style: none;
}
a {
  text-decoration: none;
  /* 移动端a标签点击会高亮，设置颜色为透明的 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.one-txt-cut {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.txt-cut {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  white-space: normal;
  word-wrap: break-word;
  word-break: normal;
  overflow: hidden;
}
</style>
