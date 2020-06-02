<template>
  <Panel shadow :padding="10">
    <div slot="title">
      {{title}}
    </div>
    <div slot="extra">
      <Button v-if="listVisible" type="info" @click="init" :loading="btnLoading">刷新</Button>
      <Button v-else type="ghost" icon="ios-undo" @click="goBack">返回</Button>
    </div>
    <div>
      <div class="no-announcement" v-if="!announcements.length" key="no-announcement">
        <p>暂无公告</p>
      </div>
      <template v-if="listVisible">

        <div class="table-header-container">
          <div class="title">标题</div>
          <div class="date">创建时间</div>
          <div class="date">最近修改时间</div>
          <div class="creator">创建者</div>
        </div>

        <ul class="announcements-container" key="list">
          <li v-for="announcement in announcements" :key="announcement.title">
            <div class="flex-container">
              <div class="title"><a class="entry" @click="goAnnouncement(announcement)">
                {{announcement.title}}</a></div>
              <div class="date">{{announcement.createTime | localtime }}</div>
              <div class="date">{{announcement.lastUpdateTime | localtime }}</div>
              <div class="creator">{{announcement.createBy}}</div>
            </div>
          </li>
        </ul>
        <Pagination key="page"
                    :total="total"
                    :page-size="limit"
                    @on-change="getAnnouncementList"
                    :current.sync="curPage">
        </Pagination>
      </template>
      <template v-else>
        <div v-html="announcement.content" key="content" class="content-container markdown-body"></div>
      </template>
    </div>
  </Panel>
</template>

<script>
  import api from '../../oj/api'
  import Pagination from "./Pagination";
  export default {
    name: 'Announcement',
    components: {
      Pagination
    },
    data() {
      return {
        listVisible:true,
        btnLoading: false,
        announcements: [],
        announcement: '',
        limit: 10,
        total: 0,
        curPage: 1
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.getAnnouncementList()
      },
      getAnnouncementList(page = 1) {
        this.btnLoading = true
        api.announcements.getAnnouncementList(page, this.limit).then(res => {
            console.log(res)
            this.btnLoading = false
            this.announcements = res.data.data
            this.total = res.data.total
            this.curPage = res.data.page
        }).catch(() => {
            this.btnLoading = false
            this.curPage = 1
        })
      },
      goBack() {
        this.listVisible = true
        this.announcement = ''
      },
      goAnnouncement(announcement) {
        this.announcement = announcement
        this.listVisible = false
      }
    },
    computed: {
      title() {
        if(this.listVisible) {
          return "公告"
        }
        else {
          return this.announcement.title
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .table-header-container {
    display: flex;
    margin-bottom: 20px;
    margin-left: 20px;
    font-size: 17px;
    font-weight: bold;
    .title {
      flex: 1 1;
      text-align: left;
      padding-left: 10px;
    }
    .creator {
      flex: none;
      width: 200px;
      text-align: center;
    }
    .date {
      flex: none;
      width: 200px;
      text-align: center;
    }
  }
  .announcements-container {
    margin-top: -10px;
    margin-bottom: 10px;
    li {
      padding-top: 15px;
      list-style: none;
      padding-bottom: 15px;
      margin-left: 20px;
      font-size: 16px;
      border-bottom: 1px solid rgba(187, 187, 187, 0.5);
      &:last-child {
        border-bottom: none;
      }
      .flex-container {
        .title {
          flex: 1 1;
          text-align: left;
          padding-left: 10px;
          a.entry {
            color: #495060;
            &:hover {
              color: #2d8cf0;
              border-bottom: 1px solid #2d8cf0;
            }
          }
        }
        .creator {
          flex: none;
          width: 200px;
          text-align: center;
        }
        .date {
          flex: none;
          width: 200px;
          text-align: center;
        }
      }
    }
  }

  .content-container {
    padding: 0 20px 20px 20px;
  }

  .no-announcement {
    text-align: center;
    font-size: 16px;
  }changeLocale

   .announcement-animate-enter-active {
     animation: fadeIn 1s;
   }
</style>
