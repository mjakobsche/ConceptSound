<script setup lang="ts">
import {IonChip} from "@ionic/vue";

defineProps(["allTags", "selectedTags"])
defineEmits(["toggleTag"])
</script>

<template>
  <div class="hashtagChips ion-margin-top">
    <div v-for="tag in allTags" @click="$emit('toggleTag', tag)">
      <ion-chip :outline="true" :disabled="!selectedTags.includes(tag)">#{{ tag }}</ion-chip>
    </div>
  </div>
</template>

<style scoped>
.hashtagChips {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
</style>