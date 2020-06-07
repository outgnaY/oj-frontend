<template>
  <div class="flex-container">
    <div id="problem-main">
      <Panel :padding="40" shadow>
        <div slot="title">{{problem.problemTitle}}</div>
        <div id="problem-content" class="markdown-body">
          <p class="title">问题描述</p>
          <p class="content" v-html="problem.problemDescription"></p>
          <p class="title">输入</p>
          <p class="content" v-html="problem.problemInputDescription"></p>
          <p class="title">输出</p>
          <p class="content" v-html="problem.problemOutputDescription"></p>
          <div v-for="(sample, index) of problem.problemSamples" :key="index">
            <div class="flex-container sample">
              <div class="sample-input">
                <p class="title">输入样例{{index + 1}}
                  <a class="copy"
                     v-clipboard:copy="sample.input"
                     v-clipboard:success="onCopy"
                     v-clipboard:error="onCopyError">
                    <Icon type="clipboard"></Icon>
                  </a>
                </p>
                <pre>{{sample.input}}</pre>
              </div>
              <div class="sample-output">
                <p class="title">输出样例{{index + 1}}</p>
                <pre>{{sample.output}}</pre>
              </div>
            </div>
          </div>
          <div v-if="problem.hint">
            <p class="title">提示</p>
            <Card dis-hover>
              <div class="content" v-html="problem.problemHint"></div>
            </Card>
          </div>
        </div>
      </Panel>
      <!--代码编辑器-->
    </div>
  </div>
</template>
