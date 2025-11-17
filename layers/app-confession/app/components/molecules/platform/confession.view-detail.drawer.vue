<script setup lang="ts">
import type { Confession } from "#app-confession/app/types";

const props = defineProps<{
  item: Confession;
  isPremium?: boolean;
}>();

const emits = defineEmits<{
  (e: "on:unlock", event: MouseEvent): void;
  (e: "on:reaction", type: string): void;
  (e: "on:tip", amount: number): void;
}>();

const isOpen = defineModel("open", {
  default: false,
  type: Boolean,
});

const tipAmount = ref<string>("");

const canView = computed(() => {
  return (
    props.item?.isPurchased || props?.isPremium || props.item.priceCoin === 0
  );
});

const totalReactions = computed(() => {
  const r = props.item.reactions;
  return r.heart + r.shock + r.sad + r.support;
});

const stats = computed(() => {
  const data: {
    label: string;
    icon: string;
    color?: string;
    value: string | number | null;
  }[] = [
    {
      label: "Lượt xem",
      icon: "solar:eye-outline",
      value: props.item.totalViews.toLocaleString(),
    },
    {
      label: "Phản ứng",
      icon: "solar:heart-linear",
      color: "text-pink-500",
      value: totalReactions.value,
    },
    {
      label: "Tips",
      icon: "lucide:coins",
      color: "text-amber-500",
      value: props.item.totalTips,
    },
  ];
  if (props.item.totalViews > 5000) {
    data.push({
      label: "Hot",
      icon: "material-symbols:trending-up-rounded",
      color: "text-primary",
      value: "Hot",
    });
  }

  return data;
});

const reactions = computed(() => [
  {
    label: `❤️ Yêu thích ${
      props.item.reactions.heart ? `(${props.item.reactions.heart})` : ""
    }`,
    type: "heart",
    isReacted: true,
  },
  {
    label: `⚡ Bất ngờ ${
      props.item.reactions.shock ? `(${props.item.reactions.shock})` : ""
    }`,
    type: "shock",
    isReacted: false,
  },
  {
    label: `😢 Buồn ${
      props.item.reactions.sad ? `(${props.item.reactions.sad})` : ""
    }`,
    type: "sad",
    isReacted: false,
  },
  {
    label: `🤝 Ủng hộ ${
      props.item.reactions.support ? `(${props.item.reactions.support})` : ""
    }`,
    type: "support",
    icon: "🤝",
    isReacted: false,
  },
]);

const handlePreTip = () => {
  const amount = Number(tipAmount.value);

  if (props.item && amount) {
    emits("on:tip", amount);
    tipAmount.value = "";
  }
};
</script>

<template>
  <UDrawer
    v-model:open="isOpen"
    :should-scale-background="$breakpoints.isMobile"
    :set-background-color-on-scale="$breakpoints.isMobile"
    :direction="$breakpoints.isMobile ? 'bottom' : 'right'"
    :handle="$breakpoints.isMobile"
    :overlay="$breakpoints.isMobile"
    :inset="false"
    :ui="{
      header: $breakpoints.isMobile ? '' : 'w-sm',
      body: $breakpoints.isMobile ? '' : 'w-sm',
    }"
  >
    <slot />

    <template #header>
      <div class="flex items-center justify-between gap-4">
        <DuckText as="h2" class="font-semibold">{{
          props.item.summary
        }}</DuckText>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-x"
          @click="isOpen = false"
        />
      </div>
    </template>

    <template #body>
      <div class="space-y-4">
        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(tag, index) in props.item.tags"
            :key="index"
            variant="soft"
          >
            {{ tag }}
          </UBadge>

          <UBadge v-if="props.item.isAnonymous" variant="outline"
            >👤 Ẩn danh</UBadge
          >
        </div>

        <!-- Stats -->
        <div class="flex items-center gap-4 text-xs w-full">
          <UTooltip
            v-for="stat in stats"
            :key="stat.label"
            :delay-duration="200"
            :text="stat.label"
          >
            <div class="flex items-center gap-1">
              <UIcon :name="stat.icon" class="w-5 h-5" :class="stat.color" />
              <DuckText as="span" :class="stat.color">{{
                stat.value
              }}</DuckText>
            </div>
          </UTooltip>
        </div>

        <USeparator />

        <!-- Content -->
        <template v-if="!canView">
          <div class="space-y-4">
            <UAlert
              title="Nội dung này đã được khóa"
              variant="soft"
              description="Mở khóa để đọc toàn bộ câu chuyện và khám phá những chi tiết thú
                vị"
              icon="i-heroicons-lock-closed"
              :ui="{
                icon: 'size-16',
                root: 'flex flex-col justify-center items-center text-center gap-4 ring-0 outline-dashed outline-2 outline-[var(--ui-primary)]/30',
                wrapper: 'gap-2 justify-center items-center',
                description: 'text-toned',
              }"
            >
              <template #actions>
                <UButton
                  size="lg"
                  class="gap-2"
                  @click="emits('on:unlock', $event)"
                >
                  <UIcon name="i-heroicons-lock-closed" class="w-5 h-5" />
                  Mở khóa với {{ props.item.priceCoin }} coins
                </UButton>
              </template>
            </UAlert>

            <!-- Preview -->
            <div>
              <div class="blur-sm">
                {{ props.item.plainText.substring(0, 200) }}...
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <!-- Full Content -->
          <div class="leading-relaxed">
            <DuckEditor :content="props.item?.content" :editable="false" />
          </div>

          <USeparator />

          <!-- Reactions -->
          <div class="space-y-3">
            <h4 class="text-sm">Cảm xúc của bạn:</h4>

            <div class="grid gap-2 grid-cols-2">
              <UButton
                v-for="reaction in reactions"
                :key="reaction.type"
                :variant="reaction.isReacted ? 'solid' : 'outline'"
                class="justify-center"
                @click="emits('on:reaction', reaction.type)"
              >
                {{ reaction.label }}
              </UButton>
            </div>
          </div>

          <USeparator />

          <!-- Tip -->
          <UAlert
            color="warning"
            variant="subtle"
            title="Ủng hộ tác giả"
            description="Nếu bạn thích confession này, hãy tip để động viên tác giả nhé!"
            icon="i-heroicons-gift"
            :ui="{
              title: 'text-amber-900',
              description: 'text-amber-700',
            }"
          >
            <template #actions>
              <div class="flex gap-2 items-center flex-wrap">
                <UInput
                  v-model="tipAmount"
                  type="number"
                  placeholder="Số coins"
                  class="max-w-20 max-[321px]:max-w-36"
                />

                <UButton class="gap-2" @click="handlePreTip">
                  <UIcon name="i-heroicons-banknotes" class="w-4 h-4" />
                  Tip
                </UButton>

                <!-- Quick tips -->
                <div class="flex gap-1">
                  <UButton
                    v-for="amount in [5, 10, 20]"
                    :key="amount"
                    variant="outline"
                    @click="tipAmount = amount.toString()"
                  >
                    {{ amount }}
                  </UButton>
                </div>
              </div>
            </template>
          </UAlert>
        </template>
      </div>
    </template>
  </UDrawer>
</template>
