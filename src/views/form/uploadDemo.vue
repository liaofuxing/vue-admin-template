<template>
  <div class="upload">
    <upload />
  </div>
</template>

<script>
import upload from '@/components/Upload/upload'

export default {
  name: 'UploadDemo',
  components: {
    upload
  }
}
</script>

<style scoped>
.upload{
  width: 500px;
}
</style>

