<template>
  <div class="view">
    <Panel title="问题列表">
      <div slot="header">
        <el-input v-model="keyword" prefix-icon="el-icon-search" placeholder="keywords"></el-input>
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
                      @click.native="downloadTestCase(scope.row.id)"></icon-btn>
            <icon-btn icon="trash" name="Delete Problem"
                      @click.native="deleteProblem(scope.row.id)"></icon-btn>
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
          :total="total">
        </el-pagination>
      </div>
    </Panel>
  </div>
</template>

<script>

  export default {
    name: 'ProblemList',
    data() {
      return {
          pageSize: 10,
          total: 0,
          problemList: [],
          keyword: '',
          loading: false,
          currentPage: 1
      }
    },
    mounted(){
      this.getProblemList(1)
      this.currentPage = 1
    },
    methods: {
      goEdit(problemId) {
        console.log("goEdit")
      },
      goCreateProblem() {
        console.log("goCreateProblem")
        // this.$router.push({name: 'create-problem'})
      },
      currentChange(page) {
        this.currentPage = page
        this.getProblemList(page)
      },
      getProblemList(page = 1) {
        // console.log("getProblemList")
        this.loading = true
        this.loading = false
      },
      getProblemListByKeyword(page = 1) {

      },
      deleteProblem(problemId) {
        console.log("deleteProblem")
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
