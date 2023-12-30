<template>
  zmień tytuł
  <IonTextarea :value="bookCover.title" @input="$emit('update:bookCover.title', $event.target.value)"></IonTextarea>
  tagi
  <div class="inlineElements">
    <IonInput v-model="tag"> </IonInput>
    <div>
      <ion-button fill="clear" size="small" shape="round" @click="toggleTag(tag, true)">
        <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
      </ion-button>
    </div>
  </div>
  <div class="inlineElements">
    <div v-for="globalTag in tags" @click="toggleTag(globalTag, !bookCover.tags.includes(globalTag))">
      <ion-chip :outline="true" :disabled="!bookCover.tags.includes(globalTag)" >{{globalTag}}</ion-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonChip, IonInput, IonTextarea, IonButton, IonIcon} from "@ionic/vue";
import {addOutline, book} from "ionicons/icons";
import {computed, Ref, ref} from "vue";
import {addTag, bookCover} from "@/service/BookService";
const emits = defineEmits(['update:bookCover.title', 'addTag', 'remTag'])
const props = defineProps(['bookCover', 'tags']);
console.log(props.tags)
const tag = ref("");

function toggleTag(tag: string, on: boolean){
  if(on){
    emits('addTag', tag);
  }else{
    emits('remTag', tag);
  }
}
</script>

<style scoped>
.inlineElements{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>