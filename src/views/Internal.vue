<template>
  <div id="internal">
    <h1>Internal Calculator</h1>
    <p>This is a calculator implemented in JavaScript.</p>
    <calculator />
  </div>
</template>

<script>
import Calculator from "@/components/Calculator.vue";

export default {
  name: "Internal",
  components: {
    calculator: Calculator
  }
};
</script>

<style lang="scss" scoped>
div #internal {
  text-align: center;
}
</style>
