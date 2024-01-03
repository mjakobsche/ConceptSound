<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  pageId: {},
  pageData: {
    required: true,
    type: String,
  }
});

const textLines = computed(() => {
  return (props.pageData ? props.pageData.split(/[\n|\r]/) : []).map((line) => {
    const isComment = line[0] == ("@");
    return {
      type: isComment ? "comment" : "normal",
      text: isComment ? line.substring(1) : line
    }
  });
});
</script>

<template>
  <div v-if="pageData.length > 0" v-for="line in textLines">
    <ion-text :class="line.type">
      <p class="selectableText">
        {{ line.text }}
      </p>
    </ion-text>
  </div>
</template>

<style scoped>
.selectableText {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

.comment {
  color: #6272a4;
  font-size: math;
  text-align: end;
}

.normal {
  font-size: medium;
  color: white;
}
</style>
