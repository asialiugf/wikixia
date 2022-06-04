<script setup lang="ts"></script>

<template>
  <RouterView />
</template>

<style>
body {
  margin: 0px;
}

#app::-webkit-scrollbar {
  width: 5px;
  height: 10px;
  /**/
}
#app::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
#app::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
#app::-webkit-scrollbar-thumb:hover {
  background: #333;
}
#app::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>
