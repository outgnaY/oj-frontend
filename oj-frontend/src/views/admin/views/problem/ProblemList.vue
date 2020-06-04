<template>
  <div class="view">
    <Panel title="问题列表">
      <div slot="header">
        <el-input v-model="keyword" placeholder="keywords">
          <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
        </el-input>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="loading"
        ref="table"
        :data="problemList"
        style="width: 100%">
        <el-table-column
          width="100"
          prop="problemId"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="problemTitle"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="problemCreateBy"
          label="作者">
        </el-table-column>
        <el-table-column
          width="200"
          prop="problemCreateTime"
          label="创建时间">
          <template slot-scope="scope">
            {{scope.row.problemCreateTime | localtime}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="选项"
          width="250">
          <div slot-scope="scope">
            <icon-btn name="Edit" icon="edit"
                      @click.native="goEdit(scope.row.problemId)"></icon-btn>
            <icon-btn icon="download" name="Download TestCase"
                      @click.native="downloadTestCase(scope.row.problemId)"></icon-btn>
            <icon-btn icon="trash" name="Delete Problem"
                      @click.native="deleteProblem(scope.row.problemId)"></icon-btn>
          </div>
        </el-table-column>
      </el-table>
      <div class="panel-options">
        <el-button type="primary" size="small"
                   @click="goCreateProblem" icon="el-icon-plus">新建</el-button>
        <el-pagination
          class="page"
          layout="prev, pager, next"
          @current-change="currentChange"
          :page-size="pageSize"
          :total="total"
          :current-page="currentPage">
        </el-pagination>
      </div>
    </Panel>
  </div>
</template>

<script>
  import api from "../../api"
  export default {
    name: 'ProblemList',
    data() {
      return {
          pageSize: 2,
          total: 0,
          problemList: [],
          keyword: '',
          loading: false,
          currentPage: 1
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      init() {
        this.currentPage = 1
        this.getProblemList(1)
      },
      goEdit(problemId) {
        this.$router.push({name: 'edit-problem', params: {problemId: problemId}})
      },
      goCreateProblem() {
        this.$router.push({name: 'create-problem'})
      },
      currentChange(page) {
        this.currentPage = page
        this.getProblemList(page)
      },
      doSearch() {
        // 重置为首页
        this.currentPage = 1
        this.getProblemList(this.currentPage)
      },
      getProblemList(page = 1) {
        this.loading = true
        if(this.keyword) {
          api.problem.getProblemListByKeyword(page, this.pageSize, this.keyword).then(res => {
            this.problemList = res.data.data.data
            this.total = res.data.data.total
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
        else {
          api.problem.getProblemList(page, this.pageSize).then(res => {
              this.total = res.data.data.total
              this.problemList = res.data.data.data
              this.loading = false
          }).catch(() => {
              this.loading = false
          })
        }
      },
      /*
      getProblemListByKeyword(page = 1) {

      },
      */
      deleteProblem(problemId) {
        this.$confirm('确定删除该题目吗？相关的提交也会被删除', '删除题目', {
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.loading = true
          api.problem.deleteProblem(problemId).then(res => {
            if(res.data.code !== 0) {
              this.$error("删除失败")
            }
            this.init()
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        })
      },
      downloadTestCase(problemId) {
        console.log("downloadTestCase")
      }
    },
    watch: {
      '$route'(newVal, oldVal) {
        console.log("newVal = " + newVal)
        console.log("oldVal = " + oldVal)
      },
      'keyword'() {
        console.log("keyword change")
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
