<script setup lang="ts">
import {IonChip} from "@ionic/vue";
import {computed} from "vue";

const props = defineProps(["allTags", "selectedTags"]);
defineEmits(["enableTag", "disableTag"])

const tags = computed(() => {
  return props.allTags.map((tag) => {
    const tagDisabled = props.selectedTags.length === 0 || !props.selectedTags.includes(tag);
    return {
      name: tag,
      disabled: tagDisabled
    }
  })
})
</script>

<template>
  <div class="hashtagChips ion-margin-top">
    <div v-for="tag in tags" @click="tag.disabled ? $emit('enableTag', tag.name) : $emit('disableTag', tag.name)">
      <ion-chip :outline="true" :disabled="tag.disabled">#{{ tag.name }}</ion-chip>
    </div>
  </div>
</template>

<style scoped>
.hashtagChips {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
</style>