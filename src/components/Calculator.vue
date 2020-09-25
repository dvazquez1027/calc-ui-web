<template>
  <div style="width: 250px">
    <display :result="result" />
    <keypad />
  </div>
</template>

<script>
import Keypad from "@/components/Keypad.vue";
import Display from "@/components/Display.vue";

export default {
  name: "Calculator",
  components: {
    keypad: Keypad,
    display: Display
  },
  computed: {
    result() {
      return this.$store.getters.result;
    }
  }
};
</script>

<style lang="scss" scoped></style>
