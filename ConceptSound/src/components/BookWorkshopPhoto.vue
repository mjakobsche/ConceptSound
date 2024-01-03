<script setup lang="ts">
import {IonButton, IonIcon} from "@ionic/vue";
import {FilePicker} from "@capawesome/capacitor-file-picker";
import {folderOutline} from "ionicons/icons";
import {ref} from "vue";
import CenteringGrid from "@/components/CenteringGrid.vue";

const emit = defineEmits(['update:pageData', 'saveChanges'])
const props = defineProps({
  pageData: {
    type: String,
    required: true,
  },
});

const source = ref(props.pageData);

function pickImages() {
  FilePicker.pickImages({
    multiple: false,
    readData: true
  }).then(result => {
    if (result) {
      source.value = "data:" + result.files[0].mimeType + ";base64," + result.files[0].data;
      emit('update:pageData', source.value)
      emit('saveChanges')
    }
  }).catch(() => console.log("image pick cancelled"));
}
</script>

<template>
  <centering-grid>
    <ion-button size="large" shape="round" fill="clear" @click="pickImages">
      <ion-icon slot="icon-only" :icon="folderOutline"></ion-icon>
    </ion-button>
  </centering-grid>
</template>

