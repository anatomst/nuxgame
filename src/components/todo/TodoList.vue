<template>
  <div class="grid-container">
    <todo-item v-for="item in todoList" :key="item.id" :item="item" />
  </div>
</template>

<script setup>
import TodoItem from "@/components/todo/TodoItem.vue";

defineProps({
  todoList: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.grid-container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
}
</style>
