<template>
  <div class="problem">
    <Panel :title="title">
      <el-form ref="form" :model="problem" :rules="rules" label-position="top" label-width="70px">
        <el-row v-if="mode === 'edit'">
          <el-col :span="6">
            <el-form-item label="题目ID">
              <el-input v-model="problem.problemId" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="6">
            <el-form-item prop="problemId" label="题目ID">
              <el-input v-model="problem.problemId" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item prop="problemTitle" label="标题" >
              <el-input placeholder="标题" v-model="problem.problemTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="problemDescription" label="描述" >
              <Simditor v-model="problem.problemDescription"></Simditor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item prop="problemInputDescription" label="输入描述" >
              <Simditor v-model="problem.problemInputDescription"></Simditor>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="problemOutputDescription" label="输出描述" >
              <Simditor v-model="problem.problemOutputDescription"></Simditor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="problemTimeLimit" label="时间限制(ms)" >
              <el-input type="Number" placeholder="时间限制" v-model="problem.problemTimeLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="problemMemoryLimit" label="内存限制(MB)" >
              <el-input type="Number" placeholder="内存限制" v-model="problem.problemMemoryLimit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <el-form-item v-for="(sample, index) in problem.problemSamples" :key="'sample' + index">
            <Accordion :title="'Sample' + (index + 1)">
              <el-button type="warning" size="small" icon="el-icon-delete" slot="header" @click="deleteSample(index)">
                删除
              </el-button>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="输入样例" >
                    <el-input
                      :rows="5"
                      type="textarea"
                      placeholder="输入样例"
                      v-model="sample.input">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="输出样例" >
                    <el-input
                      :rows="5"
                      type="textarea"
                      placeholder="输出样例"
                      v-model="sample.output">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </Accordion>
          </el-form-item>
        </div>
        <div class="add-sample-btn">
          <button type="button" class="add-samples" @click="addSample()"><i class="el-icon-plus"></i>添加样例</button>
        </div>
        <el-form-item style="margin-top: 20px" label="提示">
          <Simditor v-model="problem.problemHint" placeholder="问题提示"></Simditor>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="测试数据">
              <el-upload
                action="/api/admin/problem/testcase"
                name="file"
                :show-file-list="true"
                :on-success="uploadSucceeded"
                :on-error="uploadFailed">
                <el-button size="small" type="primary" icon="el-icon-fa-upload">选择文件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-table
              :data="problem.problemTestcaseScore"
              style="width: 100%">
              <el-table-column
                prop="inputName"
                label="输入">
              </el-table-column>
              <el-table-column
                prop="outputName"
                label="输出">
              </el-table-column>
              <el-table-column
                prop="score"
                label="分数">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    placeholder="分数"
                    v-model="scope.row.score">
                  </el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <save @click.native="submit('form')">保存</save>
      </el-form>
    </Panel>
  </div>
</template>

<script>
  import time from "../../../../utils/time";
  import api from "../../api"
  import Simditor from "../../components/Simditor";
  import Accordion from "../../components/Accordion";
  export default {
    name: 'Problem',
    components: {
      Accordion,
      Simditor
    },
    data() {
      return {
        rules: {
          problemId: {required: true, message: 'ID是必填项', trigger: 'blur'},
          problemTitle: {required: true, message: '标题是必填项', trigger: 'blur'},
          problemDescription: {required: true, message: '题目描述是必填项', trigger: 'blur'},
          problemInputDescription: {required: true, message: '输入描述是必填项', trigger: 'blur'},
          problemOutputDescription: {required: true, message: '输出描述是必填项', trigger: 'blur'},
          problemTimeLimit: {required: true, message: '时间限制是必填项', trigger: 'blur'},
          problemMemoryLimit: {required: true, message: '内存限制是必填项', trigger: 'blur'}
        },
        problem: {
          problemId: '',
          problemTitle: '',
          problemDescription: '',
          problemInputDescription: '',
          problemOutputDescription: '',
          problemTimeLimit: 1000,
          problemMemoryLimit: 32,
          problemTestcaseScore: [],
          problemHint: '',
          problemSamples: [],
          problemTestcaseId: ''
        },
        mode: '',
        testcaseUploaded: false,
        title: '',
        routeName: '',
        // problemId: ''
      }
    },
    mounted() {
      this.routeName = this.$route.name
      if(this.routeName === 'edit-problem') {
        this.mode = 'edit'
      }
      else {
        this.mode = 'add'
      }
      /*
      this.problem = {
        problemId: '',
        problemTitle: '',
        problemDescription: '',
        problemInputDescription: '',
        problemOutputDescription: '',
        problemTimeLimit: 1000,
        problemMemoryLimit: 32,
        problemTestcaseScore: [],
        problemHint: '',
        problemSamples: []
      }
      */
      if(this.mode === 'edit') {
        this.title = "编辑题目"
        this.problem.problemId = this.$route.params.problemId
        api.problem.getProblemById(this.$route.params.problemId).then(res => {
          console.log(res)
          if(res.data.code !== 0) {
            this.$error("获取题目信息失败")
            this.$router.go(-1)
          }
          else {
            this.problem = res.data.data
            this.problem.problemSamples = JSON.parse(this.problem.problemSamples)
            this.problem.problemTestcaseScore = JSON.parse(this.problem.problemTestcaseScore)
            if(this.problem.problemTestcaseScore.length > 0) {
                this.testcaseUploaded = true
            }
          }
        })
      }
      else {
        this.title = "新建题目"
      }
    },
    watch: {

    },
    methods: {
      addSample() {
        this.problem.problemSamples.push({input: '', output: ''})
      },
      deleteSample(index) {
        this.problem.problemSamples.splice(index, 1)
      },
      uploadSucceeded(res) {
        if(!res.data.success) {
          this.$error(res.data.msg)
          return
        }
        this.problem.problemTestcaseScore = res.info
        this.testcaseUploaded = true
        this.problem.problemTestcaseId = res.testcaseId
      },
      uploadFailed() {
        this.$error('上传出错')
      },
      submit(form) {
        if(!this.problem.problemId || !parseInt(this.problem.problemId)) {
          this.$error('题目ID不能为空，且必须为整数')
          return
        }
        if(!this.problem.problemTitle) {
          this.$error('标题不能为空')
          return
        }
        if(!this.problem.problemDescription) {
          this.$error('题目描述不能为空')
        }
        if(!this.problem.problemInputDescription) {
          this.$error('输入描述不能为空')
        }
        if(!this.problem.problemOutputDescription) {
          this.$error('输出描述不能为空')
        }

        if(!this.problem.problemSamples.length) {
          this.$error('输入输出样例不能为空')
          return
        }
        if(!this.problem.problemTimeLimit || !parseInt(this.problem.problemTimeLimit)) {
          this.$error('题目时间限制不能为空，且必须为整数')
          return
        }
        if(!this.problem.problemMemoryLimit || !parseInt(this.problem.problemMemoryLimit)) {
          this.$error('题目内存限制不能为空，且必须为整数')
          return
        }
        for(let sample of this.problem.problemSamples) {
          if(!sample.input || !sample.output) {
            this.$error('必须有输入样例和输出样例')
            return
          }
        }
        if(!this.testcaseUploaded) {
          this.$error('必须上传测试数据')
            return
        }
        if(this.mode === 'edit') {
          let params = Object.assign({}, this.problem)
          params.problemTestcaseScore = JSON.stringify(params.problemTestcaseScore)
          params.problemSamples = JSON.stringify(params.problemSamples)
          // fastjson 默认日期格式
          params.problemLastUpdate = time.formatTime("yyyy-MM-dd hh:mm:ss", new Date())
          api.problem.updateProblem(params).then(res => {
            if(res.data.code !== 0) {
              this.$error("编辑题目失败")
            }
            this.$router.push({name: 'problem-list'})

          }).catch(() => {

          })
        }
        else {
          // create
            let params = Object.assign({}, this.problem)
            // params.problemId = this.problem.problemId
            params.problemTestcaseScore = JSON.stringify(params.problemTestcaseScore)
            params.problemSamples = JSON.stringify(params.problemSamples)
            // fastjson 默认日期格式
            let now = new Date()
            params.problemLastUpdate = time.formatTime("yyyy-MM-dd hh:mm:ss", now)
            params.problemCreateBy = 'root'
            params.problemCreateTime = time.formatTime("yyyy-MM-dd hh:mm:ss", now)
            api.problem.createProblem(params).then(res => {
              if(res.data.code !== 0) {
                this.$error("创建新题目失败！")
              }
              this.$router.push({name: 'problem-list'})
            }).catch(() => {
              this.$error('创建新题目失败！')
              this.$router.push({name: 'problem-list'})
            })
        }

      }
    }
  }
</script>
