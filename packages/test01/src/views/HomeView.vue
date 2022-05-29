<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <x-icon color="red" :size="30">你好</x-icon>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/media">Media</RouterLink>
        <RouterLink to="/slot">Slot</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <TheWelcome />
  </main>
</template>
