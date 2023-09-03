<template>
  <ion-button shape="round" fill="outline" @click="pickImages">Wybierz zdjęcie z urządzenia</ion-button>
  <img v-if="pageData.length > 0" :src="source" alt="selected photo">
</template>

<script setup lang="ts">
import {IonButton} from "@ionic/vue";
import {FilePicker} from "@capawesome/capacitor-file-picker";
import {ref} from "vue";

const emit = defineEmits(['update:pageData'])
const props = defineProps({
  pageData: {
    type: String,
    required: true,
  },
});

const source = ref(props.pageData);
const pickImages = async () => {
  try {
    const result = await FilePicker.pickImages({
      multiple: true,
      readData: true
    });
    if (result) {
      source.value = "data:image/jpeg;base64," + result.files[0].data;
      emit('update:pageData', source.value)
    }
  } catch (e) {
    console.log("cancelled");
  }
};
</script>
