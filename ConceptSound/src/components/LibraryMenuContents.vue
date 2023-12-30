<template>
  <IonInput label="Tytuł:" fill="outline" :value="bookTitle"
            @input="$emit('update:bookTitle', $event.target.value)"></IonInput>
  <div class="hashtagChips ion-margin-top">
    <div v-for="globalTag in globalTags" @click="toggleTag(globalTag)">
      <ion-chip :outline="true" :disabled="!bookTags.includes(globalTag)">{{ globalTag }}</ion-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IonChip, IonInput} from "@ionic/vue";

defineEmits(['update:bookTitle', 'update:bookTags'])
const props = defineProps(['bookTitle', 'bookTags', 'globalTags']);

function toggleTag(tag: string) {
  if (props.bookTags.includes(tag)) {
    props.bookTags.splice(props.bookTags.indexOf(tag), 1);
  } else {
    props.bookTags.push(tag);
  }
}
</script>

<style scoped>
.hashtagChips {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
</style>