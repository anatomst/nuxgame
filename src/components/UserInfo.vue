<template>
  <div class="user-card" v-if="user">
    <h2 class="user-card__name">{{ user.name }}</h2>
    <p class="user-card__username">
      <span class="bold_desc">Username:</span> {{ user.username }}
    </p>
    <p class="user-card__email">
      <span class="bold_desc">Email:</span> {{ user.email }}
    </p>
    <p class="user-card__phone">
      <span class="bold_desc">Phone:</span> {{ user.phone.split(" x")[0] }}
    </p>
    <p class="user-card__website">
      <span class="bold_desc">Website:</span> {{ user.website }}
    </p>
    <div class="user-card__address">
      <h4 class="bold_desc">Address:</h4>
      <p><span class="bold_desc">City:</span> {{ user.address.city }}</p>
      <p><span class="bold_desc">Street:</span> {{ user.address.street }}</p>
      <p><span class="bold_desc">Suite:</span> {{ user.address.suite }}</p>
      <p><span class="bold_desc">Zipcode:</span> {{ user.address.zipcode }}</p>
    </div>
    <p class="user-card__company">
      <span class="bold_desc">Company:</span> {{ user.company.name }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.user-card {
  background-color: #fff;
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;

  &__name {
    font-weight: 600;
    grid-column: span 2;
  }
}

@media (max-width: 430px) {
  .user-card {
    grid-template-columns: repeat(1, minmax(200px, 1fr));

    &__name {
      grid-column: span 1;
    }
  }
}
</style>
