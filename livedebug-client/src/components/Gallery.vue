<template>
  <div class="max-w-md lg:flex shadow w-49 mb-4">
    <div
      class="lg:h-auto lg:w-48 flex-none bg-cover rounded-t shadow text-center overflow-hidden"
      style="coverUrl"
    ></div>
    <div class="bg-white rounded-b p-4 flex flex-col justify-between leading-normal flex-grow">
      <div class="mb-8">
        <div class="text-black font-bold text-xl mb-2">{{ name}}</div>
        <p class="text-grey-darker text-base">{{ description }}</p>
      </div>
      <div class="mt-2">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'description', 'covers'],
  computed: {
    coverUrl () {
      return {
        'background-image': `url('${this.covers['original']}')`
      }
    }
  }
}
</script>

<style>
</style>
