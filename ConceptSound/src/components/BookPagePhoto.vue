<template>
  <img v-if="data.length > 0" :src="data" alt="selected photo">
</template>

<script setup lang="ts">
defineProps({
  data: {
    required: true,
    type: String,
  },
});
</script>
