<template>
  <div style="padding:30px;">
    <el-container style="height: auto;">
      <el-aside width="400px">
        <div>
          <el-button type="primary" @click="append()">新增一级菜单</el-button>
        </div>
        <el-tree
          :key="Math.random()"
          :data="tableData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ data.label }}</span>
            <span v-if="data.parent == 0">
              <el-button
                type="text"
                size="mini"
                @click="() => append(data)"
              >
                新增菜单
              </el-button>
            </span>
          </span>
        </el-tree>
      </el-aside>
      <el-container>
        <div class="rule-form-div">
          <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="菜单名" prop="title">
                  <el-input v-model="form.title" class="searchParam-input" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="菜单路径" prop="path">
                  <el-input v-model="form.path" class="searchParam-input" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="组件名" prop="name">
                  <el-input v-model="form.name" class="searchParam-input" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="组件地址" prop="component">
                  <el-input v-model="form.component" class="searchParam-input" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="图标名" prop="icon">
                  <el-input v-model="form.icon" class="searchParam-input" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="redirect" prop="redirect">
                  <el-input v-model="form.redirect" class="searchParam-input" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getMenuTree, addMenuTree2Router, validateRouterTitleRepeat } from '@/api/menu'

export default {
  name: 'Menu',
  data() {
    const validateRouterTitle = (rule, value, callback) => {
      const validateValue = { 'routerTitle': value }
      if (value === null) {
        callback(new Error('请输入菜单名'))
      } else {
        validateRouterTitleRepeat(validateValue).then(res => {
          if (res.data) {
            callback(new Error('菜单已存在'))
          } else {
            callback()
          }
        })
      }
    }
    return {
      tableData: [],
      form: {
        id: null,
        name: null,
        path: null,
        component: null,
        title: null,
        level: null,
        icon: null,
        redirect: null
      },
      formLabelWidth: '120px',
      id: 1000,
      resId: null,
      rules: {
        name: [
          { required: true, message: '请输入组件名', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入菜单路径', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '请输入组件地址', trigger: 'blur' }
        ],
        title: [
          { required: true, validator: validateRouterTitle, trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入图标名', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    resId: function(newVal, oldVal) {
      getMenuTree().then(res => {
        this.tableData = res.data
      })
    }
  },
  mounted() {
    // 获取菜单数据
    getMenuTree().then(res => {
      this.tableData = res.data
    })
  },
  methods: {
    append(data) {
      const newChild = {
        id: ++this.id,
        label: this.form.name,
        children: []
      }
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$confirm('确定新增菜单？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            if (data === undefined) {
              this.tableData.push(newChild)
              this.form.parent = 0
              this.form.level = 1
            } else {
              if (!data.children) {
                this.$set(data, 'children', [])
              }
              data.children.push(newChild)
              this.form.parent = data.id
              this.form.level = 2
            }
            addMenuTree2Router(this.form).then(res => {
              this.resId = res.data
            })
          }).catch(() => {
            console.log('取消新增')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scope>
  .label-input {
    padding-right: 50px;
    color: #909399;
  }
  .rule-form-div {
    padding: 30px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
