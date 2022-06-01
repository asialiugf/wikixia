<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- <x-icon color="red" :size="30">你好</x-icon> -->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">！About！</RouterLink>
        <RouterLink to="/media">！Media！</RouterLink>
        <RouterLink to="/slot">！Slot！</RouterLink>
        <RouterLink to="/layout">！LayoutDemo！</RouterLink>
        <RouterLink to="/timepass">！TimePass！</RouterLink>
        <RouterLink to="/grid"> ！ Grid ！ </RouterLink>
      </nav>
    </div>
  </header>
</template>
