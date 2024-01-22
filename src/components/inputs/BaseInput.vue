<template>
  <div class="base-input">
    <label v-if="outsideLabel" class="base-input__label">
      {{ outsideLabel }}
    </label>

    <input
      class="base-input__input"
      :class="{ 'base-input__input--error': error }"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      @input="updateValue($event.target.value)"
    />

    <div class="base-input__error" v-if="!hideDetails">
      {{ error }}
    </div>
  </div>
</template>
<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  placeholder: { type: String, default: '' },
  outsideLabel: { type: String, default: '' },
  hideDetails: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
  rules: { type: String, default: '' },
  error: { type: String, default: '' }
})

const emit = defineEmits(['update:model-value'])

const updateValue = (value) => {
  emit('update:model-value', value)
}
</script>

<style lang="scss" scoped>
.base-input {
  &__input {
    width: 100%;
    height: 40px;
    outline: none;
    border: none;
    padding: 0 10px;
    color: #353535;
    border-radius: 5px;
    font-size: 17px;

    &--error {
      border: 1px solid #EB5757;
    }
  }

  &__error {
    height: 20px;
    padding: 2px 0;
    color: #EB5757;
    font-size: 14px;
  }
}
</style>