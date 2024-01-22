<template>
  <header class="auth-header">
    <p class="auth-header__logout-title" @click="logout">Log out</p>
  </header>
</template>

<script setup>
import router from "@/router";

const logout = () => {
  localStorage.removeItem("user");
  router.push("/");
};
</script>

<style scoped lang="scss">
.auth-header {
  height: 60px;
  width: 100%;
  background-color: #474747;
  display: flex;
  align-items: center;
  justify-content: end;

  &__logout-title {
    margin-right: 20px;
    cursor: pointer;
    color: #eb5757;
  }
}
</style>
