<template>
  <input class="shade" type="text" placeholder="Search term here" 
    v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  props: ['value']
}
</script>

<style scoped lang="scss">
input {
  background: url('~assets/icons/search.svg') top .8em left .7em no-repeat;
  background-color: #fafafa;
  width: 100%;
  box-sizing: border-box;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.75);
  padding: 0.5em .5em .5em 2em;
  border: none;
  &:focus { outline: none; }
}
</style>