<template>
  <div class="create-todo">
    <h3>Create todo</h3>
    <form @submit.prevent="addList">
      <select required @change="onChangeUserSelect">
        <option value="" disabled selected>Select user id</option>
        <option v-for="user in users" :value="user">
          {{ user }}
        </option>
      </select>
      <input
        type="text"
        placeholder="Enter todo title"
        v-model="newToDo.title"
        required
      />
      <base-button
        text="Add"
        height="35px"
        text-color="#fff"
        width="20%"
        centered
        type="submit"
        class="add__button"
      />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/buttons/BaseButton.vue";

defineProps({
  users: { type: Set, default: () => [] },
});

const emit = defineEmits(["add-todo"]);

const newToDo = ref({
  title: "",
});

const onChangeUserSelect = (event) => {
  newToDo.value.userId = event.target.value;
};

const addList = () => {
  emit("add-todo", newToDo.value);
  newToDo.value = {
    userId: null,
    title: "",
  };
};
</script>

<style scoped>
.create-todo {
  margin: 40px 0;
  color: #fff;

  form {
    margin-top: 25px;
    display: flex;

    @media (max-width: 550px) {
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }

    select,
    input {
      border-radius: 10px;
      border: none;
      height: 35px;
      width: 25%;
      margin-right: 10px;

      @media (max-width: 550px) {
        width: 100%;
        margin-right: 0;
        margin-bottom: 15px;
      }
    }

    .add__button {
      border-radius: 10px;
    }
  }
}
</style>
