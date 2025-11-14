<script setup lang="ts">
useHead({
  title: "DuckBeauty - Móng Xinh, Tự Tin Lên Ngôi!",
});
const { message } = storeToRefs(useExampleStore());
console.log(message.value);
</script>
<template>
  <div class="">
    <UButton class="mb-4"> Button </UButton>
    <DuckLogoText class="" />
    <DuckText class="">
      Hello ae, mình là DuckBeauty, mình chuyên về làm móng, nếu bạn cần làm
      móng hãy liên hệ với mình nhé!
    </DuckText>
  </div>
</template>
