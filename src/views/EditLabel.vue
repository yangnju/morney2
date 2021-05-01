<template>
  <Layout>
    编辑标签
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel'

@Component
export default class EditLabel extends Vue {
  created() {
    // 安装了vue-rooter，所以可以直接$route
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    // 将tags中id为id的值拿到，因为filter返回数组，所以[0]
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      // 为了让用户可以返回，所以用replace，而不是push
      this.$router.replace('/404');
    }
  }
}
</script>

<style lang="scss" scoped>
</style>