<template>
  <component :is="currentLayout"></component>
</template>

<style>
</style>
<script setup>
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute()

const layouts = {
  empty: EmptyLayout,
  auth: AuthLayout
}

const currentLayout = computed(() => {
  const layoutName = route.meta.layout
  if (!layoutName) {
    return EmptyLayout
  }
  return layouts[layoutName]
})
</script>