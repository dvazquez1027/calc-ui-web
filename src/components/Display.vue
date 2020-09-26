<template>
  <div style="width: 100%">
    <div class="calc-display">
      {{ result }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Display",
  props: {
    result: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.calc-display {
  border: 2px solid black;
  background: tan;
  text-align: right;
  margin: 2px;
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  font-size: 14pt;
}
</style>
