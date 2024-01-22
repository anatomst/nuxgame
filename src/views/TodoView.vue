<template>
  <div class="todo-list">
    <user-info :user="user" />

    <create-todo :users="usersSet" @add-todo="addNewTodo" />

    <h3 class="text-white">Filters:</h3>

    <div class="todo-list__filters">
      <select @change="onChangeStatusSelect" class="base-selector">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
        <option value="favorites">Favorites</option>
      </select>

      <select @change="onChangeUserIdSelect" class="base-selector">
        <option value="all">All users</option>
        <option v-for="user in usersSet" :value="user">
          {{ user }}
        </option>
      </select>

      <input
        @input="onChangeSearchInput"
        class="base-search"
        type="text"
        placeholder="Search by title..."
      />
    </div>

    <todo-list :todoList="filteredList" />
  </div>
</template>

<script setup>
import UserInfo from "@/components/UserInfo.vue";
import TodoList from "@/components/todo/TodoList.vue";
import CreateTodo from "@/components/todo/CreateTodo.vue";
import { computed, onMounted, ref, provide } from "vue";
import todoApi from "@/api/todo.api";
import debounce from "debounce";

const user = ref(null);
const todoList = ref([]);
const filters = ref({
  sortByStatus: "all",
  sortByUserId: "all",
  searchQuery: "",
});

const addNewTodo = async (newTodo) => {
  const response = await todoApi.addTodo({
    userId: +newTodo.userId,
    title: newTodo.title,
  });

  if (!response) return;

  todoList.value.push({
    id: response.id,
    userId: +newTodo.userId,
    title: response.title,
    completed: false,
    isFavorite: false,
  });
};

const addToFavorite = (item) => {
  const favorites = JSON.parse(localStorage.getItem("favoritesTodos")) || [];

  const existingFavorite = favorites.find(
    (favorite) => favorite.todo_id === item.id,
  );

  if (existingFavorite) {
    localStorage.setItem(
      "favoritesTodos",
      JSON.stringify(
        favorites.filter((favorite) => favorite.todo_id !== item.id),
      ),
    );
  } else {
    localStorage.setItem(
      "favoritesTodos",
      JSON.stringify([...favorites, { todo_id: item.id }]),
    );
  }

  item.isFavorite = !existingFavorite;
};

provide("todo", {
  addToFavorite,
});

const onChangeStatusSelect = (event) => {
  filters.value.sortByStatus = event.target.value;
};

const onChangeUserIdSelect = (event) => {
  filters.value.sortByUserId = event.target.value;
};

const onChangeSearchInput = debounce((event) => {
  filters.value.searchQuery = event.target.value;
}, 300);

const filteredList = computed(() => {
  let list = todoList.value;

  if (filters.value.sortByStatus !== "all") {
    switch (filters.value.sortByStatus) {
      case "completed":
        list = list.filter((item) => item.completed);
        break;
      case "uncompleted":
        list = list.filter((item) => !item.completed);
        break;
      case "favorites":
        list = list.filter((item) => item.isFavorite);
        break;
    }
  }

  if (filters.value.sortByUserId !== "all") {
    list = list.filter((item) => item.userId === +filters.value.sortByUserId);
  }

  if (filters.value.searchQuery) {
    list = list.filter((item) =>
      item.title.includes(filters.value.searchQuery),
    );
  }

  return list;
});

const usersSet = computed(() => {
  const users = new Set();

  todoList.value.forEach((item) => {
    users.add(item.userId);
  });

  return users;
});

onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user")) || null;

  const items = await todoApi.getTodoList();

  const favoritesTodos =
    JSON.parse(localStorage.getItem("favoritesTodos")) || [];

  todoList.value = items.map((item) => {
    const favorite =
      favoritesTodos.find((favorite) => favorite.todo_id === item.id) || false;

    if (!favorite) {
      return {
        ...item,
        isFavorite: false,
      };
    }

    return {
      ...item,
      isFavorite: true,
    };
  });
});
</script>

<style scoped lang="scss">
.todo-list {
  padding: 20px;

  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 20px 0;
  }
}
</style>
