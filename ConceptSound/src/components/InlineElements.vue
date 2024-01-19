<template>
  <div class="inlineElements">
    <slot></slot>
  </div>
</template>

<style scoped>
.inlineElements {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>