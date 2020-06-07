<template>
  <Panel shadow>
    <div slot="title">题目列表</div>
    <div slot="extra">
      <ul class="filter">
        <li>
          <Input v-model="query.keyword"
                 @on-enter="filterByKeyword"
                 @on-click="filterByKeyword"
                 placeholder="keyword"
                 icon="ios-search-strong">
          </Input>
        </li>
        <li>
          <Button type="info" @click="onReset">
            <Icon type="refresh"></Icon>
            刷新
          </Button>
        </li>
      </ul>
    </div>
    <Table style="width: 100%; font-size: 16px;"
           :columns="problemTableColumns"
           :data="problemList"
           :loading="tableLoading"
           disabled-hover></Table>
    <Pagination :total="total" :page-size="limit" @on-change="pushRouter" :current.sync="query.page"></Pagination>
  </Panel>

</template>
<script>
  import Pagination from "../../components/Pagination"
  import {mapGetters} from 'vuex'
  import api from '../../api'
  import utils from "../../../../utils/utils";

  export default {
    name: 'ProblemList',
    components: {
      Pagination
    },
    data() {
      return {
        problemTableColumns: [
          {
            title: '#',
            key: 'problemId',
            width: '25%',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text',
                  size: 'large'
                },
                on: {
                  click: () => {
                    this.$router.push({name: 'problem-details', params: {problemId: params.row.problemId}})
                  }
                },
                style: {
                  padding: '2px 0'
                }
              }, params.row.problemId)
            }
          },
          {
            title: '标题',
            width: '25%',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'text',
                  size: 'large'
                },
                on: {
                  click: () => {
                    this.$router.push({name: 'problem-details', params: {problemId: params.row.problemId}})
                  }
                },
                style: {
                  padding: '2px 0',
                  overflowX: 'auto',
                  textAlign: 'left',
                  width: '100%'
                }
              }, params.row.problemTitle)
            }
          },
          {
            title:'提交数',
            width: '25%',
            key: 'problemTotal'
          },
          {
            title: '通过率',
            width: '25%',
            render: (h, params) => {
              return h('span', this.getACRate(params.row.problemAC, params.row.problemTotal))
            }
          }
        ],
        problemList: [],
        limit: 10,
        total: 0,
        tableLoading: false,
        // currentPage: 1,
        // routeName: '',
        query: {
          keyword: '',
          page: 1
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // this.routeName = this.$route.name
        let query = this.$route.query
        this.query.keyword = query.keyword || ''
        this.query.page = parseInt(query.page) || 1
        if(this.query.page < 1) {
          this.query.page = 1
        }
        this.getProblemList()
      },
      getACRate(ac, total) {
        let rate = total === 0 ? 0.00 : (ac / total * 100).toFixed(2)
        return String(rate) + '%'
      },
      pushRouter() {
        this.$router.push({
          name: 'problem-list',
          query: utils.filterEmptyValue(this.query)
        })
      },
      // TODO 用户登录后显示已通过的题目
      getProblemList() {
        // console.log("getProblemList")
        if(this.query.keyword) {
          api.problem.getProblemListByKeyword(this.query.page, this.limit, this.query.keyword).then(res => {
            // console.log(res)
            this.problemList = res.data.data.data
            this.total = res.data.data.total
            this.query.page = res.data.data.page
          }).catch(() => {

          })
        }
        else {
          api.problem.getProblemList(this.query.page, this.limit).then(res => {
            // console.log(res)
            this.problemList = res.data.data.data
            this.total = res.data.data.total
            this.currentPage = res.data.data.page
          }).catch(() => {

          })
        }
      },
      filterByKeyword() {
        this.query.page = 1
        this.pushRouter()
      },
      onReset() {
        this.$router.push({name: 'problem-list'})
      }
    },
    computed: {

    },
    watch: {
      '$route'(newVal, oldVal) {
        if(newVal !== oldVal) {
          this.init()
        }
      },
      'isAuthenticated'(newVal) {
        if(newVal === true) {
          this.init()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  ul.filter {
    > li {
      display: inline-block;
      padding: 0 10px;
    }
  }
</style>
