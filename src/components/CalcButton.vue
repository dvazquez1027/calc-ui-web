<template>
  <div>
    <b-button variant="secondary" block @click="onClick()">
      {{ keyCap }}
    </b-button>
  </div>
</template>

<script>
export default {
  name: "CalcButton",
  props: {
    keyCap: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick() {
      this.$emit("click", this.keyCap);
    }
  }
};
</script>

<style lang="scss" scoped></style>
