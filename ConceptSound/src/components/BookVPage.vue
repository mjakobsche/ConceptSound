<template>
	<div id="container">
		<ion-card>
			<ion-card-header>
				<div class="input-container handle">
					<ion-card-title>
						<!-- <ion-input
							v-bind:placeholder="thisPage.type"
							v-model="thisPage.name"
							>{{ thisPage.name }}</ion-input
						> -->
						{{ page.name }}
					</ion-card-title>
					<ion-button
						fill="clear"
						size="small"
						shape="round"
						@click="emit('setHidden')"
						ref="hidden"
					>
						<ion-icon slot="icon-only" :icon="eyeOutline"></ion-icon>
					</ion-button>
				</div>
			</ion-card-header>
			<ion-card-content v-if="page.hidden == false">
				<slot></slot>
			</ion-card-content>
		</ion-card>
	</div>
</template>

<script setup lang="ts">
import {
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonInput,
	IonButton,
	IonIcon,
} from "@ionic/vue";
import { eyeOutline } from "ionicons/icons";
import { useCurrentBook } from "@/stores/currentBook";
import { storeToRefs } from "pinia";
import { PropType } from "vue";
import { Page } from "@/data/Page";
const props = defineProps({
	page: {
		type: Object as PropType<Page>,
		required: true,
	},
});

const emit = defineEmits(["setHidden"]);

const bookStore = useCurrentBook();
const { getPage } = storeToRefs(bookStore);
const page = getPage.value(props.page.id);
</script>

<style scoped>
.input-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
@/stores/Book
