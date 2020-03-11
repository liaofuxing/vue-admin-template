<template>
  <div class="app-container">
    <div class="upload">
      <el-upload
        class="upload-demo"
        name="file"
        action="http://localhost:8090/mall/commodity/upload"
        :headers="headers"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<style scoped>
  .upload {
    width: 50%;
  }
</style>

<script>
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      fileList: [],
      headers: {
        token: getToken()
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了${files.length}个文件，共选择了${files.length + fileList.length}个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除${file.name}？`)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

