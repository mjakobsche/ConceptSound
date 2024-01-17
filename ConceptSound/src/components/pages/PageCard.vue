<script setup lang="ts">
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon} from "@ionic/vue";
import {onMounted, PropType, ref} from "vue";
import {addOutline, eyeOffOutline, eyeOutline, reorderTwoOutline} from "ionicons/icons";
import {LongPressGesture} from "@/helpers/LongPressGesture";
import {Semaphore} from "@/helpers/Semaphore";
import InlineElements from "@/components/InlineElements.vue";
import {Page} from "@/model/Page";
import {useBookService} from "@/service/BookService";
import {usePageService} from "@/service/PageService";

const props = defineProps({
  page: {
    type: Object as PropType<Page>,
    required: true,
  },
  isEditable: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits(["editPage"]);
const store = usePageService();
const hidden = ref();
const semaphore = new Semaphore();

onMounted(() => {
  new LongPressGesture(hidden.value.$el,
      () => {
        toggleVisibility();
      },
      () => {
        removePage();
      })
});

function editPage() {
  if (props.isEditable && props.page?.isVisible) {
    beforeEdit();
    semaphore.execute(() => emit("editPage"))
  }
}

async function toggleVisibility() {
  beforeEdit();
  await store.togglePageVisibility()
}

function removePage() {
  useBookService().removePage(props.page as Page);
}

function beforeEdit() {
  store.editPage(props.page as Page)
}

const movePageIcon = () => props.page?.name.length > 0 ? 'start' : 'icon-only';
const toggleVisibilityIcon = () => props.page?.isVisible ? eyeOutline : eyeOffOutline;
</script>

<template>
  <div id="container" class="element">
    <ion-card>
      <ion-card-header @click="editPage()">
        <inline-elements>
          <ion-card-title>
            <ion-button fill="outline" size="small" shape="round" color="medium" class="handle"
                        @click="semaphore.closeSemaphore()">
              {{ page.name }}
              <ion-icon :slot="movePageIcon()" :icon="reorderTwoOutline"></ion-icon>
            </ion-button>
          </ion-card-title>
          <div>
            <ion-button fill="clear" size="small" shape="round" ref="hidden" :disabled="!isEditable"
                        @click="semaphore.closeSemaphore()">
              <ion-icon slot="icon-only" :icon="toggleVisibilityIcon()"></ion-icon>
            </ion-button>
            <ion-button fill="clear" size="small" shape="round" :disabled="!isEditable || !page.isVisible">
              <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
            </ion-button>
          </div>
        </inline-elements>
      </ion-card-header>
      <ion-card-content v-if="page.isVisible">
        <slot></slot>
      </ion-card-content>
    </ion-card>
  </div>
</template>