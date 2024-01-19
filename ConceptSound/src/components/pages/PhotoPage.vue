<script setup lang="ts">
defineProps({
  pageId: {},
  pageData: {
    required: true,
    type: String,
  }
});
</script>

<template>
  <img v-if="pageData.length > 0" :src="pageData" alt="selected photo">
</template>

