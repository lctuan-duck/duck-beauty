<script setup lang="ts">
import { mockCompanyReviews } from "../../../mocks/data";

const props = defineProps<{
  companyId: string;
}>();

const reviews = mockCompanyReviews.filter(
  (review) => review.companyId === props.companyId
);
</script>

<template>
  <div class="flex flex-col gap-3">
    <AppCompanyMoleculesPlatformCompanyReviewCard
      v-for="(review, index) in reviews"
      :key="index"
      :review="review"
    />
  </div>
</template>
