<template>
  <div id="external">
    <h1>External Calculator</h1>
    <p>This calculator is backed by a RESTful service.</p>
    <calculator type="external" />
  </div>
</template>

<script>
import Calculator from "@/components/Calculator.vue";

export default {
  name: "External",
  components: {
    calculator: Calculator
  }
};
</script>

<style lang="scss" scoped>
div #external {
  text-align: center;
}
</style>
