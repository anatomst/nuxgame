<template>
  <div class="empty-layout">
    <empty-header></empty-header>
    <main class="content">
      <router-view />
    </main>
    <empty-footer></empty-footer>
  </div>
</template>

<script setup>
import EmptyHeader from "@/components/headers/EmptyHeader.vue";
import EmptyFooter from "@/components/footers/EmptyFooter.vue";
</script>

<style scoped lang="scss">
.empty-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;

  .content {
    flex: 1;
    background-color: #545454;
    display: flex;
  }
}
</style>
