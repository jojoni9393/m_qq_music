<template>
  <div class="qq_music_home">
    <div class="header">
      <div class="top">
        <div class="logo">
          <img src="http://y.gtimg.cn/mediastyle/mod/mobile/img/logo.svg" alt />
          <div class="info">
            <div class="title">QQ音乐</div>
            <div class="sub_title">打开APP收藏下载</div>
          </div>
        </div>
        <div class="download">下载APP</div>
      </div>
      <div class="tab">
        <div
          :class="{ tab_btn: true, active: active_bar_id === 1 }"
          @click="switch_bar(1)"
        >
          推荐
        </div>
        <div
          :class="{ tab_btn: true, active: active_bar_id === 2 }"
          @click="switch_bar(2)"
        >
          排行
        </div>
      </div>
    </div>
    <div class="content_wrap">
      <div class="content_recommend" v-show="active_bar_id === 1">
        <div class="search_wrap">
          <div
            :class="{
              search: true,
              search_foucs: is_show_cancel === 1,
              focus: is_focus === 1 || search_key !== ''
            }"
          >
            <input
              type="text"
              placeholder="搜索"
              @blur="is_get_focus(0)"
              @focus="is_get_focus(1)"
              v-model="search_key"
              v-on:keyup.enter="submit_search"
            />
            <i class="del_btn" v-show="search_key" @click="clear_key"></i>
            <i class="search_icon"></i>
          </div>
          <div
            class="cancel"
            v-show="is_show_cancel === 1"
            @click="is_get_focus(0, true)"
          >
            取消
          </div>
        </div>
        <div class="search_key" v-show="is_show_cancel === 1">
          <div class="search_box" v-show="history_keys.length">
            <div class="top">
              <div class="title">历史搜索</div>
              <i class="clear_history_search" @click="remove_history_key"></i>
            </div>
            <ul class="search_key_list">
              <li class="search_key_list_item" v-for="item in history_keys">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="search_box">
            <div class="top">
              <div class="title">热门搜素</div>
            </div>
            <ul class="search_key_list">
              <li class="search_key_list_item" v-for="item in hot_keys">
                {{ item.title }}
              </li>
            </ul>
          </div>
        </div>
        <div class="main" v-show="is_show_cancel !== 1">
          <div class="mod" v-for="v_shelf_arr_item in v_shelf_arr">
            <div class="top">
              <div class="title">{{ v_shelf_arr_item.title }}</div>
              <a class="more" :href="v_shelf_arr_item.more">
                <span>更多</span>
                <i class="more_icon"></i>
              </a>
            </div>
            <div class="list_wrap">
              <ul class="list">
                <li class="item_wrap" v-for="item in v_shelf_arr_item.list">
                  <div class="item">
                    <div class="box">
                      <img :src="item.cover" alt />
                      <Clicks :clicks="item.cnt"></Clicks>
                    </div>
                    <div class="title txt-cut">{{ item.title }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="mod">
            <div class="top">
              <div class="title">{{ v_shelf_banner.title }}</div>
              <a class="more" :href="v_shelf_banner.more">更多</a>
            </div>
            <div class="list_wrap">
              <ul class="list banner">
                <li
                  class="item_wrap"
                  v-for="v_shelf_banner_item in v_shelf_banner.list"
                >
                  <div class="item">
                    <div class="box">
                      <img :src="v_shelf_banner_item.cover" alt />
                      <div class="zone">
                        <img :src="v_shelf_banner_item.miscellany.icon" alt />
                        <div class="info">{{ v_shelf_banner_item.title }}</div>
                      </div>
                    </div>
                    <div class="title txt-cut">
                      {{ v_shelf_banner_item.subtitle }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="content_ranking" v-show="active_bar_id === 2">
        <ul class="ranking_list">
          <li
            class="ranking_list_item"
            @click="push_ranking_detial(999)"
            v-for="ranking_list_item in ranking_list"
          >
            <div class="ranking_list_item_content_wrap">
              <div class="ranking_list_item_content">
                <div class="title">{{ ranking_list_item.title }}</div>
                <ul class="ranking_list_item_list">
                  <li
                    class="ranking_list_item_list_item one-txt-cut"
                    v-for="(ranking_list_item_item,
                    index) in ranking_list_item.song"
                  >
                    <span>{{ index + 1 }}.</span>
                    {{ ranking_list_item_item.title }}-{{
                      ranking_list_item_item.singerName
                    }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="ranking_list_item_box">
              <img :src="ranking_list_item.frontPicUrl" alt />
              <span class="update_time">{{
                ranking_list_item.updateTips
              }}</span>
              <Clicks :clicks="ranking_list_item.listenNum"></Clicks>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <div class="logo">
        <img
          src="http://y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg"
          alt
        />
      </div>
      <div class="copyright">
        <p>
          Copyright © 1998 -
          <span>2019</span> Tencent. All Rights Reserved.
        </p>
        <p>联系电话：0755-86013388 QQ群：55209235</p>
      </div>
    </div>
    <div class="install_app">
      <img src="http://y.gtimg.cn/mediastyle/mod/mobile/img/logo.svg" alt />
      <p>安装QQ音乐 发现更多精彩</p>
    </div>
  </div>
</template>

<script>
import Clicks from '@/components/Clicks.vue'

export default {
  name: 'Home',
  components: {
    Clicks
  },
  data() {
    return {
      v_shelf_arr: [],
      v_shelf_banner: [],
      active_bar_id: 1,
      ranking_list: [],
      is_focus: 0,
      is_show_cancel: 0,
      hot_keys: [],
      search_key: '',
      history_keys: []
    }
  },
  created() {
    this.get_data_index()
    this.get_data_ranking()
    this.history_keys = this.get_history_key()
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
      //hot_keys
      this.hot_keys = res.data.hotkey.data.vec_hotkey
      console.log(this.hot_keys, 887766)
    },
    async get_data_ranking() {
      let res = await this.axios({
        url:
          '/api/cgi-bin/musicu.fcg?_=1581164960855&data={%22comm%22:{%22g_tk%22:5381,%22uin%22:%22%22,%22format%22:%22json%22,%22inCharset%22:%22utf-8%22,%22outCharset%22:%22utf-8%22,%22notice%22:0,%22platform%22:%22h5%22,%22needNewCode%22:1,%22ct%22:23,%22cv%22:0},%22topList%22:{%22module%22:%22musicToplist.ToplistInfoServer%22,%22method%22:%22GetAll%22,%22param%22:{}}}'
      })
      let group = res.data.topList.data.group
      let ranking_list = [
        ...group[0].toplist,
        ...group[1].toplist,
        ...group[2].toplist
      ]

      this.ranking_list = ranking_list
    },
    switch_bar(id) {
      this.active_bar_id = id
      if (!this.search_key) return
      this.is_get_focus(0, true)
    },
    push_ranking_detial(id) {
      this.$router.push({ path: 'ranking-detial', query: { id: id } })
    },
    is_get_focus(value, cancel = false) {
      this.is_focus = value
      if (value === 0 && cancel === false) return
      this.is_show_cancel = value
      if (cancel === false) return
      this.search_key = ''
    },
    async submit_search() {
      if (!this.search_key) return
      let res = await this.axios({
        url:
          '/soso/fcgi-bin/search_for_qq_cp?_=1581217808456&g_tk=5381&uin=&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=%E4%BD%A0%E5%A5%BD&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all'
      })
      this.add_history_key()
    },
    clear_key() {
      this.search_key = ''
    },
    get_history_key() {
      return JSON.parse(localStorage.getItem('history_key')) || []
    },
    add_history_key() {
      let history_key = this.get_history_key()
      if (history_key.indexOf(this.search_key) !== -1) return
      history_key.push(this.search_key)
      localStorage.setItem('history_key', JSON.stringify(history_key))
      this.history_keys = this.get_history_key()
    },
    remove_history_key() {
      localStorage.removeItem('history_key')
      this.history_keys = this.get_history_key()
    }
  }
}
</script>

<style lang="less">
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 3/100rem 25/100rem rgba(0, 0, 0, 0.05);
  background-color: rgb(250, 250, 250);
  .top {
    padding: 0 28/100rem 0 48/100rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 108/100rem;
    .logo {
      display: flex;
      align-items: center;
      img {
        width: 50/100rem;
        height: 50/100rem;
        margin-right: 28/100rem;
      }
      .info {
        .title {
          font-size: 32/100rem;
          color: #000;
          font-weight: 400;
        }
        .sub_title {
          font-size: 24/100rem;
          color: grey;
        }
      }
    }
    .download {
      width: 170/100rem;
      height: 50/100rem;
      text-align: center;
      line-height: 50/100rem;
      font-size: 26/100rem;
      color: #575656;
      border: solid 1/100rem #d8d8d8;
      border-radius: 999/100rem;
    }
  }
  .tab {
    display: flex;
    .tab_btn {
      flex: 1;
      height: 84/100rem;
      line-height: 84/100rem;
      text-align: center;
      color: rgba(26, 26, 26, 0.5);
      font-size: 32/100rem;
      &.active {
        color: rgba(34, 213, 156, 1);
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 40/100rem;
          height: 6/100rem;
          border-radius: 6/100rem;
          background: currentColor;
        }
      }
    }
  }
}
.content_wrap {
  padding-top: 224/100rem;
  .content_recommend {
    .search_wrap {
      display: flex;
      justify-content: space-between;
      .search {
        height: 60/100rem;
        background-color: #fff;
        border-radius: 999/100rem;
        margin-left: 32/100rem;
        display: flex;
        align-items: center;
        padding-left: 48/100rem;
        box-sizing: border-box;
        width: 686/100rem;
        overflow: hidden;
        padding-left: 80/100rem;
        padding-top: 4/100rem;
        position: relative;
        &.search_foucs {
          width: 598/100rem;
        }
        &.focus {
          padding-left: 56/100rem;
          input {
            text-align: left;
            width: 462/100rem;
          }
          .search_icon {
            left: 12/100rem;
            margin-left: 0;
          }
        }
        input {
          height: 42/100rem;
          font-size: 28/100rem;
          font-weight: 300;
          text-align: center;
          width: 606/100rem;
        }
        .del_btn {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 40/100rem;
          height: 40/100rem;
          background-color: pink;
        }
        .search_icon {
          position: absolute;
          left: 50%;
          margin-left: -36/100rem;
          top: 50%;
          transform: translateY(-50%);
          width: 36/100rem;
          height: 36/100rem;
          background-color: pink;
        }
      }
      .cancel {
        color: rgba(26, 26, 26, 1);
        height: 60/100rem;
        line-height: 60/100rem;
        font-weight: 700;
        font-size: 28/100rem;
        padding: 0 32/100rem;
      }
    }
    .search_key {
      padding: 0 32/100rem;
      .search_box {
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 32/100rem 0;
          .title {
            font-size: 28/100rem;
            font-weight: 700;
            color: rgba(26, 26, 26, 1);
          }
          .clear_history_search {
            width: 32/100rem;
            height: 32/100rem;
            background-color: pink;
          }
        }
      }
      .search_key_list {
        .search_key_list_item {
          height: 48/100rem;
          line-height: 48/100rem;
          padding: 0 20/100rem;
          font-size: 24/100rem;
          color: rgba(26, 26, 26, 1);
          background-color: #fff;
          border-radius: 999/100rem;
          display: inline-block;
          margin: 0 20/100rem 20/100rem 0;
        }
      }
    }
    .main {
      .mod {
        .top {
          margin: 40/100rem 32/100rem 20/100rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            font-size: 36/100rem;
            font-weight: 700;
          }
          .more {
            color: rgba(26, 26, 26, 0.5);
            font-size: 13/100rem;
            display: flex;
            align-items: center;

            .more_icon {
              margin-left: 2/100rem;
              width: 10/100rem;
              height: 10/100rem;
              background-color: pink;
            }
          }
        }
        .list_wrap {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          &::-webkit-scrollbar {
            display: none;
          }
          .list {
            white-space: nowrap;
            &.banner {
              .item_wrap {
                width: 452/100rem;
                .item {
                  .box {
                    height: 254/100rem;
                    .zone {
                      position: absolute;
                      right: 12/100rem;
                      left: 12/100rem;
                      bottom: 12/100rem;
                      display: flex;
                      align-items: center;
                      img {
                        height: 68/100rem;
                        width: 68/100rem;
                        background-color: skyblue;
                        margin-right: 12/100rem;
                        border-radius: 999/100rem;
                      }
                      .info {
                        font-weight: 500;
                        font-size: 32/100rem;
                        color: #fff;
                      }
                    }
                  }
                }
              }
            }
            .item_wrap {
              vertical-align: top;
              display: inline-block;
              width: 218/100rem;
              margin: 0 8/100rem;
              &:last-child {
                margin-right: 32/100rem;
              }
              &:first-child {
                margin-left: 32/100rem;
              }
              .item {
                .box {
                  height: 218/100rem;
                  position: relative;
                  img {
                    border-radius: 16/100rem;
                    display: block;
                    width: 100%;
                  }
                }
                .title {
                  color: rgba(26, 26, 26, 1);
                  margin-top: 16/100rem;
                  font-size: 26/100rem;
                }
              }
            }
          }
        }
      }
    }
  }
  .content_ranking {
    .ranking_list {
      .ranking_list_item {
        margin: 0 32/100rem 20/100rem;
        width: 686/100rem;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        border-radius: 16/100rem;
        overflow: hidden;
        .ranking_list_item_content_wrap {
          padding: 0 24/100rem;
          display: flex;
          align-items: center;
          width: 472/100rem;
          box-sizing: border-box;
          .ranking_list_item_content {
            width: 100%;
            .title {
              line-height: 44/100rem;
              font-size: 32/100rem;
              font-weight: 700;
              margin-bottom: 8/100rem;
            }
            .ranking_list_item_list {
              .ranking_list_item_list_item {
                font-size: 24/100rem;
                color: rgba(26, 26, 26, 1);
                span {
                  font-weight: 700;
                }
              }
            }
          }
        }
        .ranking_list_item_box {
          height: 214/100rem;
          width: 214/100rem;
          background-color: skyblue;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
          .update_time {
            width: 100%;
            padding: 12/100rem;
            box-sizing: border-box;
            text-align: right;
            position: absolute;
            background-image: -webkit-linear-gradient(
              top,
              rgba(0, 0, 0, 0.4),
              transparent
            );
            height: 100/100rem;
            top: 0;
            left: 0;
            font-size: 20/100rem;
            color: #fff;
          }
        }
      }
    }
  }
}
.footer {
  margin-top: 60/100rem;
  margin-bottom: 154/100rem;
  padding: 32/100rem 0;
  .logo {
    width: 160/100rem;
    margin: 0 auto 20/100rem;
    img {
      display: block;
      width: 100%;
    }
  }
  .copyright {
    color: rgba(26, 26, 26, 1);
    font-size: 24/100rem;
    text-align: center;
  }
}
.install_app {
  height: 90/100rem;
  padding: 0 45/100rem;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 32/100rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 999/100rem;
  color: rgba(26, 26, 26, 1);
  font-size: 24/100rem;
  box-sizing: border-box;
  img {
    width: 44/100rem;
    height: 44/100rem;
    margin-right: 20/100rem;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
