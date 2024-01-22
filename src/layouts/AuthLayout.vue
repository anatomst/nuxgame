<template>
  <div class="auth-layout">
    <auth-header></auth-header>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AuthHeader from "@/components/headers/AuthHeader.vue";
</script>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;

  .content {
    flex: 1;
    background-color: #545454;
    display: flex;
    flex-direction: column;
  }
}
</style>
