<template>
  <button
    class="base-button"
    :style="{
      backgroundColor: color,
      color: textColor,
      width: width,
      height: height,
      justifyContent: centered ? 'center' : 'flex-start'
    }"
    @click="handleClick"
  >
    <span v-if="loading">Loading...</span>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  color: { type: String, default: '#519945' },
  textColor: { type: String, default: '#000' },
  text: { type: String, default: '' },
  width: { type: String, default: 'auto' },
  height: { type: String, default: 'auto' },
  centered: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-button {
  border: none;
  display: flex;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
}
</style>
