<template>
  <ion-grid style="height: 100%">
    <ion-row justify-content-center align-items-center style="height: 100%; flex-direction: column">
      <ion-button size="large" shape="round" fill="clear" @click="pickImages">
        <ion-icon slot="icon-only" :icon="folderOutline"></ion-icon>
      </ion-button>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import { IonButton, IonGrid, IonRow, IonIcon } from "@ionic/vue";
import { FilePicker } from "@capawesome/capacitor-file-picker";
import { folderOutline } from "ionicons/icons";
import { ref } from "vue";

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
      source.value = "initialization:image/jpeg;base64," + result.files[0].data;
      emit('update:pageData', source.value)
    }
  } catch (e) {
    console.log("cancelled");
  }
};
</script>
