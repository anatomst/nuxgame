<template>
  <div class="todo-item">
    <h4 class="todo-item__id">TODO #{{ item.id }}</h4>
    <p class="todo-item__user-id">
      <span class="bold_desc">User_id:</span> {{ item.userId }}
    </p>
    <p class="todo-item__title">
      <span class="bold_desc">Title:</span> {{ item.title }}
    </p>
    <p class="todo-item__status">
      <span class="bold_desc">Status:</span>
      {{ item.completed ? "Done" : "In progress" }}
    </p>
    <img
      :src="!item.isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like 1"
      class="todo-item__like"
      @click="addToFavorite(item)"
    />
  </div>
</template>

<script setup>
import { inject } from "vue";

defineProps({
  item: {
    type: Object,
    default: {},
    required: true,
  },
});

const { addToFavorite } = inject("todo");
</script>

<style scoped lang="scss">
.todo-item {
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &__id {
    font-weight: 600;
  }

  &__like {
    margin-top: 10px;
    cursor: pointer;
  }
}
</style>
