<template>
  <aside>
    <div class="drag"></div>
    <div style="border: 3px solid #aa0000">
      <slot style="border: 3px solid #aa0000">我来了</slot>
    </div>
    <div class="drag1"></div>
  </aside>
</template>

<script setup lang="ts"></script>
<style>
.drag {
  position: absolute;
  width: 14px;
  height: 100%;
  right: -2px;
  cursor: w-resize;
  background-color: #ee22ee;
}
.drag1 {
  position: absolute;
  /* z-index: 2000; */
  width: 14px;
  height: 100%;
  left: -2px;
  top: 0px;
  cursor: w-resize;
  background-color: #9035ff;
}

.drag:hover {
  background-color: #0054c9;
  transition: all 0.5s;
}
</style>
