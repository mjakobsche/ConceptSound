<template>
  <div id="container" class="element">
    <ion-card>
      <ion-card-header>
        <div class="input-container handle">
          <ion-card-title>
            {{ page.name }}
          </ion-card-title>
          <ion-button fill="clear" size="small" shape="round" ref="hidden">
            <ion-icon slot="icon-only" :icon="eyeOutline"></ion-icon>
          </ion-button>
        </div>
      </ion-card-header>
      <ion-card-content v-if="!page.hidden">
        <ion-item button @click="emit('modPage')" :disabled="editable">
          <slot></slot>
        </ion-item>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import {
  createGesture,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
} from "@ionic/vue";
import {onMounted, PropType, ref} from "vue";
import {eyeOutline} from "ionicons/icons";
import {Page} from "@/model/Page";

defineProps({
  page: {
    type: Object as PropType<Page>,
    required: true,
  },
  editable: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["setHidden", "modPage", "remPage"]);

const DOUBLE_CLICK_THRESHOLD = 500;
const hidden = ref();

let lastOnStart = 0;

onMounted(() => {
  const gesture = createGesture({
    el: hidden.value.$el,
    threshold: 0,
    onStart,
    gestureName: "double-click",
  });

  gesture.enable();
});

const onStart = () => {
  const now = Date.now();
  if (Math.abs(now - lastOnStart) <= DOUBLE_CLICK_THRESHOLD) {
    emit("remPage");
    lastOnStart = 0;
  } else {
    emit("setHidden");
    lastOnStart = now;
  }
};
</script>

<style scoped>
.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
@/stores/Book @/model/Page @/model/Page
