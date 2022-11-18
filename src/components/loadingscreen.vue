<template>
        <b-overlay
          id="overlay-background"
          show
          :variant="variant"
          :opacity="opacity"
          :blur="blur"
          rounded="lg"
          :isLoading="isLoading"
        >
        </b-overlay>

</template>

<script>
export default {
    name: "defaultLayout",
}
</script>
