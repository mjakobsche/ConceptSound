<template>{{ data }}</template>

<script setup lang="ts">
defineProps({
  data: {
    required: true,
    type: String,
  },
});
</script>
