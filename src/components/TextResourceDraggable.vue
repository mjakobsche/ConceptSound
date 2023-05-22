<template>
  <main>
    <div class="wrapper">
      <Sortable
        :list="splitText"
        item-key="id"
        :options="{handle: '.handle'}"
      >
        <template #item="{ element }">
          <span>
            <p class="handle">comment</p>
          </span>
          <div class="draggable" :key="element.id">
            {{ element.text }}
            
          </div>
        </template>
      </Sortable>
    </div>
  </main>
</template>


<script setup lang="ts">
import {IonButton, IonInput, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonTextarea} from '@ionic/vue';
import { ref, computed } from 'vue';
import { Sortable } from "sortablejs-vue3"
import {trashBinOutline, eyeOutline, createOutline} from 'ionicons/icons';

const props = defineProps({
    text: String,
})

const splitText = computed(() => {
        let text = props.text ? props.text : "hah";
        return text.split(/\r\n|\r|\n/).map((text, index) => ({ id: index, text }));;
})


</script>

<style scoped>

.handle {
  font-size: smaller;
  text-align: end;
}
</style>