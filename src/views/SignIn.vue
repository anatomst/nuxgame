<template>
  <div class="login-container">
    <div class="login">
      <div class="login__header">
        <h4>description</h4>
      </div>
      <div class="login__body">
        <p class="login__desc">description</p>
        <div class="login__form">
          <base-input
            v-model:model-value="userName"
            placeholder="Username"
            :error="userNameError"
          />
          <base-input
            v-model:model-value="phoneNumber"
            placeholder="Phone Number"
            :error="phoneNumberError"
          />

          <base-button
            class="login__button"
            text="Login"
            text-color="#fff"
            width="100%"
            centered
            :loading="isLoginLoading"
            @click="login"
          />
          <p class="login__error">{{ loginError }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";

import router from "@/router";
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import authApi from "@/api/auth.api";

const userName = ref('')
const userNameError = ref('')
const phoneNumber = ref('')
const phoneNumberError = ref('')
const loginError = ref('')
const isLoginLoading = ref(false)

const login = async () => {
  loginError.value = ''

  if (userName.value === '') {
    userNameError.value = 'Username is required'
    return
  }

  if (phoneNumber.value === '') {
    phoneNumberError.value = 'Phone number is required'
    return
  }

  isLoginLoading.value = true
  const usersList = await authApi.getUsers()

  const currentUser = usersList.find(item =>
      item.username === userName.value &&
      item.phone.split(' x')[0].replace(/-/g, '') === phoneNumber.value.replace(/-/g, '')
  );

  if (currentUser) {
    loginError.value = ''
    localStorage.setItem('user', JSON.stringify(currentUser))
    await router.push('/todo')
  } else {
    loginError.value = 'Login error!'
  }

  isLoginLoading.value = false
}

watch(userName, (newUserName) => {
  userNameError.value = ''

  if (/[^a-zA-Z]/.test(newUserName)) {
    userNameError.value = 'Username should contain only letters'
  }
})

watch(phoneNumber, (newPhoneNumber) => {
  phoneNumberError.value = ''

  if (/[^0-9-]/.test(newPhoneNumber)) {
    phoneNumberError.value = 'Phone number should contain only digits and \'-\' symbol'
  }
})
</script>

<style scoped lang="scss">
.login-container {
  flex-grow: 1;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login {
  margin: 0 auto;
  display: flex;
  max-width: 447px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #C3C3C3;

  &__header {
    padding: 15px 0;
    color: #5F5F5F;
    width: 100%;
    display: flex;
    justify-content: center;
    background: #A5A5A5;
    border-radius: 5px 5px 0 0;
  }

  &__body {
    padding: 0 25px 10px 25px;
    width: 100%;
  }

  &__desc {
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #5F5F5F;
  }

  &__button {
    margin-top: 5px;
  }

  &__error {
    height: 20px;
    padding: 2px 0;
    color: #EB5757;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
  }
}
</style>
