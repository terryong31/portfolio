<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <UModal v-model:open="open" title="Contact Me">
    <template #body>
      <form id="contact-form" action="https://formspree.io/f/mwvownjz" method="POST" class="space-y-4">
        <UFormField label="Name" name="name" class="w-full">
          <UInput type="text" name="name" required placeholder="Your name" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email" class="w-full">
          <UInput type="email" name="email" required placeholder="you@example.com" class="w-full" />
        </UFormField>

        <UFormField label="Message" name="message" class="w-full">
          <UTextarea name="message" required placeholder="Have an idea in mind? Tell it here..." :rows="4" class="w-full" />
        </UFormField>
      </form>
    </template>

    <template #footer>
      <div class="flex w-full justify-end gap-3">
        <UButton variant="ghost" @click="open = false">
          Cancel
        </UButton>
        <UButton type="submit" form="contact-form" color="primary">
          Send Message
        </UButton>
      </div>
    </template>
  </UModal>
</template>
