<template>
	<div id="container">
		<ion-card>
			<ion-card-header>
				<div class="input-container handle">
					<ion-card-title>
						<slot></slot>
					</ion-card-title>
				</div>
			</ion-card-header>
		</ion-card>
	</div>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/vue";
</script>

<style scoped>
.input-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
