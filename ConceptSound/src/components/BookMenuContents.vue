<template>
  <IonInput label="Tytuł:" fill="outline" :value="bookCover.title"
            @focusout="$emit('update:bookCover.title', $event.target.value)"></IonInput>
  <div class="ion-margin-top textFieldWithButton">
    <IonInput label="Dodaj nowy hashtag:" fill="outline" @focusout="toggleTag(tag, !bookCover.tags.includes(tag))"
              v-model="tag"></IonInput>
  </div>
  <div class="ion-margin-top hashtagChips">
    <div v-for="globalTag in tags" @click="toggleTag(globalTag, !bookCover.tags.includes(globalTag))">
      <ion-chip :outline="true" :disabled="!bookCover.tags.includes(globalTag)">#{{ globalTag }}</ion-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IonChip, IonInput} from "@ionic/vue";
import {ref} from "vue";
import {addTag, bookCover} from "@/service/BookService";

const emits = defineEmits(['update:bookCover.title', 'addTag', 'remTag'])
defineProps(['bookCover', 'tags']);
const tag = ref("");

function toggleTag(selectedTag: string, on: boolean) {
  if (selectedTag.length > 0) {
    on ? emits('addTag', selectedTag) : emits('remTag', selectedTag)
    tag.value = ""
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