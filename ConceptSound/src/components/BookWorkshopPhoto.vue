<script setup lang="ts">
import {IonButton, IonIcon} from "@ionic/vue";
import {folderOutline} from "ionicons/icons";
import {ref} from "vue";
import CenteringGrid from "@/components/CenteringGrid.vue";
import {getImageFromFilePicker} from "@/composables/ImagePicker";

const emit = defineEmits(['update:pageData', 'saveChanges'])
const props = defineProps({
  pageData: {
    type: String,
    required: true,
  },
});

const source = ref(props.pageData);

async function pickImages() {
  source.value = await getImageFromFilePicker();
  emit('update:pageData', source.value)
  emit('saveChanges')
}
</script>

<template>
  <centering-grid>
    <ion-button size="large" shape="round" fill="clear" @click="pickImages">
      <ion-icon slot="icon-only" :icon="folderOutline"></ion-icon>
    </ion-button>
  </centering-grid>
</template>

