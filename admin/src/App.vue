<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#nprogress .bar {
  background: blue !important;
}
#nprogress .spinner-icon {
  border-top-color: blue !important;
  border-left-color: blue !important;
}
</style>
