<template>
    <div>
        <keypad />
    </div>
</template>

<script>
    import Keypad from "@/components/Keypad.vue";

    export default {
        name: "Calculator",
        components: {
            'keypad': Keypad
        }
    }
</script>

<style lang="scss" scoped>

</style>