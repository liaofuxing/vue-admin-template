<template>
  <div style="padding:30px;">
    <div class="search-div-bar">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="数据库表">
                <el-select v-model="form.tableName" placeholder="请选择数据库表" @change="tableNameSelectChange">
                  <el-option
                    v-for="item in tableOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="仅生成Bean">
                <el-switch
                  v-model="form.onlyGenerateJavaBean"
                />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="包路径">
                <el-input v-model="form.packagePath" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="是否需要分页">
                <el-switch
                  v-model="form.needPagination"
                />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-if="fieldShow" class="field-div">
      <div class="action-div-bar">
        <el-button type="primary" icon="el-icon-finished" size="small" @click="generateCodeClick">生成代码</el-button>
      </div>
      <el-table
        :data="tableFieldData"
        style="width: 100%"
        max-height="100%"
      >
        <el-table-column type="index" width="100" />
        <el-table-column prop="dbColumnName" label="数据库字段名" width="260" />
        <el-table-column prop="dbColumnType" label="数据库字段类型" width="260" />
        <el-table-column prop="javaJavaHumpColumnName" label="Java驼峰字段名" width="260" />
        <el-table-column prop="javaColumnType" label="Java字段类型" width="260" />
        <el-table-column prop="paginationQueryCondition" label="是否作为分页查询条件" width="320">
          <template slot-scope="{row, $index}">
            <el-switch
              v-model="tableFieldData[$index].paginationQueryCondition"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getMysqlTableSelect, getTableField, generateCode } from '@/api/generateCode'

export default {
  name: 'GenerateCode',
  data() {
    return {
      tableFieldData: [],
      fieldShow: false,
      form: {
        tableName: '',
        onlyGenerateJavaBean: false,
        needPagination: false,
        packagePath: ''
      },
      dialogFormVisible: false,
      tableOption: []
    }
  },
  mounted() {
    // 获去数据库表列表
    getMysqlTableSelect().then(res => {
      this.tableOption = res.data
    })
  },
  methods: {
    tableNameSelectChange: function() {
      this.fieldShow = true
      const params = { tableName: this.form.tableName }
      getTableField(params).then(res => {
        this.tableFieldData = res.data
      })
    },
    generateCodeClick: function() {
      const params = {
        tableName: this.form.tableName,
        onlyGenerateJavaBean: this.form.onlyGenerateJavaBean,
        packagePath: this.form.packagePath,
        needPagination: this.form.needPagination,
        tableFieldList: this.tableFieldData
      }
      generateCode(params)
    }
  }
}
</script>

<style scope>
  .search-div-bar {
    margin-bottom: 20px;
  }
  .label-input {
    padding-right: 50px;
    color: #909399;
  }
  .searchParam-input {
    width: 200px;
  }
  .pagination-div {
    margin-top: 20px;
    text-align: center;
  }
</style>
