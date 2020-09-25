<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="9" class="pad">
          <b-row>
            <b-col cols="6" style="padding-right: 1px">
              <calc-button text="C" />
            </b-col>
            <b-col cols="6" style="padding-left: 1px">
              <calc-button text="AC" />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="/" />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="pad">
          <calc-button text="1" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="2" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="3" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="*" />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="pad">
          <calc-button text="4" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="5" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="6" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="-" />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="pad">
          <calc-button text="7" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="8" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="9" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="+" />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" class="pad">
          <calc-button text="0" />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="." />
        </b-col>
        <b-col cols="3" class="pad">
          <calc-button text="=" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CalcButton from "@/components/CalcButton.vue";

export default {
  name: "Keypad",
  components: {
    "calc-button": CalcButton
  }
};
</script>

<style lang="scss" scoped>
.pad {
  padding: 2px;
}
</style>
