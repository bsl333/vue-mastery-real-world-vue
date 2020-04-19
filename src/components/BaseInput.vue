<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input v-bind="$attrs" @input="handleInput" :value="value" step=".01" />
  </div>
</template>

<script>
  export default {
    name: 'BaseInput',
    inheritAttrs: false,
    props: {
      label: {
        type: String,
        default: ''
      },
      value: {
        type: [String, Number],
        default: ''
      }
    },
    methods: {
      handleInput(e) {
        this.$emit('input', e.target.value);
      }
    }
  };
</script>

<style></style>
