<template>
	<div>
		<ion-button fill="clear" size="small" shape="round" @click="emit('remove')">
			<ion-icon slot="icon-only" :icon="closeCircleOutline"></ion-icon>
		</ion-button>
		<ion-button fill="clear" size="small" shape="round" @click="emit('open')">
			<ion-icon slot="icon-only" :icon="chevronForwardOutline"></ion-icon>
		</ion-button>
	</div>
</template>
<script setup lang="ts">
import { chevronForwardOutline, closeCircleOutline } from "ionicons/icons";
import { IonIcon, IonButton } from "@ionic/vue";
const emit = defineEmits(["remove", "open"]);
</script>
