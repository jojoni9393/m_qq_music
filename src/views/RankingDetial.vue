<template>
  <div class="ranking_detial">
    <div>1234</div>
  </div>
</template>

<script>
import Clicks from '@/components/Clicks.vue'

export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  created() {
    let articleId = this.$route.query.id
    console.log(articleId, 8877)
  },
  methods: {
    async get_data_index() {
      let res = await this.axios({
        url:
          '/api/cgi-bin/musicu.fcg?cgiKey=GetHomePage&_=1581129150183&data={%22comm%22:{%22g_tk%22:5381,%22uin%22:%22%22,%22format%22:%22json%22,%22inCharset%22:%22utf-8%22,%22outCharset%22:%22utf-8%22,%22notice%22:0,%22platform%22:%22h5%22,%22needNewCode%22:1},%22MusicHallHomePage%22:{%22module%22:%22music.musicHall.MusicHallPlatform%22,%22method%22:%22MobileWebHome%22,%22param%22:{%22ShelfId%22:[101,102,161]}},%22hotkey%22:{%22module%22:%22tencent_musicsoso_hotkey.HotkeyService%22,%22method%22:%22GetHotkeyForQQMusicMobile%22,%22param%22:{%22remoteplace%22:%22txt.miniapp.wxada7aab80ba27074%22,%22searchid%22:%221559616839293%22}}}'
      })
      let v_shelf = res.data.MusicHallHomePage.data.v_shelf
      let v_shelf_temp = v_shelf.map((item, index) => {
        return {
          title: v_shelf[index].title_template,
          more: v_shelf[index].more.id,
          list: v_shelf[index].v_niche[0].v_card
        }
      })
      this.v_shelf_arr = v_shelf_temp.filter((item, index) => {
        return index < 2
      })
      this.v_shelf_banner = v_shelf_temp[2]
      console.log(this.v_shelf_banner, 88)
    }
  }
}
</script>

<style lang="less">
.ranking_detial {
  background-color: pink;
}
</style>
