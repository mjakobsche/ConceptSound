<template>
  <div id="container" class="element">
    <ion-card>
      <ion-card-header>
        <div class="input-container handle">
          <ion-card-title>
            {{ page.name }}
          </ion-card-title>
          <div>
            <ion-button fill="clear" size="small" shape="round" @click="emit('modPage')" :disabled="editable">
              <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
            </ion-button>
            <ion-button fill="clear" size="small" shape="round" ref="hidden">
              <ion-icon slot="icon-only" :icon="eyeOutline"></ion-icon>
            </ion-button>
          </div>
        </div>
      </ion-card-header>
      <ion-card-content v-if="!page.hidden">
        <slot></slot>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import {createGesture, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon,} from "@ionic/vue";
import {onMounted, PropType, ref} from "vue";
import {addOutline, eyeOutline} from "ionicons/icons";
import {BookPage} from "@/model/BookPage";

defineProps({
  page: {
    type: Object as PropType<BookPage>,
    required: true,
  },
  editable: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["setHidden", "modPage", "remPage"]);

const LONG_PRESS_THRESHOLD = 500;
const hidden = ref();

let pressStarted = 0;

onMounted(() => {
  const gesture = createGesture({
    el: hidden.value.$el,
    threshold: 0,
    onStart,
    onEnd,
    gestureName: "long-press",
  });
  gesture.enable();
});

const onEnd = () => {
  if (Date.now() - pressStarted > LONG_PRESS_THRESHOLD) {
    emit("remPage")
  } else {
    emit("setHidden")
  }
}

const onStart = () => {
  pressStarted = Date.now();
};

</script>

<style scoped>
.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
@/stores/Book @/model/BookPage @/model/BookPage
