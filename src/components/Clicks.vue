<template>
  <div class="clicks">{{ clicks | filter_clicks }}</div>
</template>

<script>
export default {
  name: 'Clicks',
  props: {
    clicks: Number
  },
  filters: {
    filter_clicks(value) {
      return (value / 10000).toFixed(1) + '万'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.clicks {
  padding: 0 7/100rem;
  color: #fff;
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 9/100rem;
}
</style>
