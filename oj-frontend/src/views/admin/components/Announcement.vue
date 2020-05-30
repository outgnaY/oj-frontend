<template>
  <div>
    <Panel title="公告">
      <div>
        <el-table
          v-loading="loading"
          element-loading-text="loading"
          ref="table"
          :data="announcementList"
          style="width: 100%">
          <el-table-column
            width="100"
            prop="id"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.createTime | localtime }}
            </template>
          </el-table-column>
          <el-table-column
            prop="lastUpdateTime"
            label="最近更新时间">
            <template slot-scope="scope">
              {{scope.row.lastUpdateTime | localtime }}
            </template>
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="作者">
          </el-table-column>

          <el-table-column
            fixed="right"
            label="选项"
            width="200">
            <div slot-scope="scope">
              <icon-btn name="Edit" icon="edit" @click.native="openAnnouncementDialog(scope.row.id)"></icon-btn>
              <icon-btn name="Delete" icon="trash" @click.native="deleteAnnouncement(scope.row.id)"></icon-btn>
            </div>
          </el-table-column>
        </el-table>
        <div class="panel-options">
          <el-button type="primary" size="small" @click="openAnnouncementDialog(null)" icon="el-icon-plus">Create</el-button>
          <el-pagination
            class="page"
            layout="prev, pager, next"
            @current-change="currentChange"
            :page-size="pageSize"
            :current-page="currentPage"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </Panel>

    <!--对话框-->
    <el-dialog :title="announcementDialogTitle" :visible.sync="showEditAnnouncementDialog"
               @open="onOpenEditDialog" :close-on-click-modal="false">
      <el-form label-position="top">
        <el-form-item label="标题" required>
          <el-input
            v-model="announcement.title"
            placeholder="标题" class="title-input">
          </el-input>
        </el-form-item>
        <el-form-item label="内容" required>
          <Simditor v-model="announcement.content"></Simditor>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
          <cancel @click.native="showEditAnnouncementDialog = false"></cancel>
          <save type="primary" @click.native="submitAnnouncement"></save>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Simditor from "./Simditor"
  import api from "../api"
  import time from "../../../utils/time";
  import moment from 'moment'
  export default {
    name: 'Announcement',
    components: {
      Simditor
    },
    data() {
      return {
        // 显示编辑公告对话框
        showEditAnnouncementDialog: false,
        // 公告列表
        announcementList: [],
        // 一页显示的公告数
        pageSize: 15,
        // 总公告数
        total: 0,
        // 当前公告id
        currentAnnouncementId: null,
        mode: 'create',
        announcement: {
          title: '',
          content: ''
        },
        // 对话框标题
        announcementDialogTitle: '编辑公告',
        // 是否显示loading
        loading: true,
        // 当前页码
        currentPage: 1
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.getAnnouncementList(1)
        this.currentPage = 1
      },
      currentChange(page) {
        this.currentPage = page
        this.getAnnouncementList(page)
      },
      getAnnouncementList(page) {
        this.loading = true
        api.announcement.getAnnouncementList(page, this.pageSize).then(res => {
            // console.log(res)
            this.loading = false
            this.total = parseInt(res.data.total)
            this.announcementList = res.data.data
        }).catch(() => {
            this.loading = false
        })
      },
      onOpenEditDialog() {
        console.log("onOpenEditDialog")
      },
      openAnnouncementDialog (id) {
        this.showEditAnnouncementDialog = true
        if (id !== null) {
          this.currentAnnouncementId = id
          this.announcementDialogTitle = '编辑公告'
          this.announcementList.find(item => {
            if (item.id === this.currentAnnouncementId) {
              this.announcement.title = item.title
              this.announcement.content = item.content
              this.mode = 'edit'
            }
          })
        } else {
          this.announcementDialogTitle = '创建公告'
          this.announcement.title = ''
          this.announcement.content = ''
          this.mode = 'create'
        }
      },
      submitAnnouncement() {
        // console.log(this.mode)
        let now = time.formatTime("yyyy/MM/dd hh:mm:ss", new Date())

        if(this.mode === 'edit') {
          let data = {
            id: this.currentAnnouncementId,
            title: this.announcement.title,
            content: this.announcement.content,
            lastUpdateTime: now
          }
          api.announcement.updateAnnouncement(data).then(res => {
            this.showEditAnnouncementDialog = false
            this.init()
          }).catch(() => {

          })
        }
        else {
          // create
          let data = {
            title: this.announcement.title,
            content: this.announcement.content,
            createBy: "root",
            createTime: now,
            lastUpdateTime: now
          }
          api.announcement.createAnnouncement(data).then(res => {
            this.showEditAnnouncementDialog = false
            this.init()
          }).catch(() => {

          })
        }

      },
      deleteAnnouncement(announcementId) {
        // console.log(announcementId)
        this.$confirm('确定要删除这条公告吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // then 为确定
          this.loading = true
          api.announcement.deleteAnnouncement(announcementId).then(res => {
            this.loading = true
            this.init()
          }).catch(() => {
            this.loading = false
          })
        }).catch(() => {
          // catch 为取消
          this.loading = false
        })
      }

    }

  }
</script>

<style lang="less" scoped>
  .title-input {
    margin-bottom: 20px;
  }
</style>
