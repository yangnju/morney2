import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

// 通过 window 属性共享数据
window.tagList = tagListModel.fetch();

// 为了简化逻辑，使用方便，直接将Tag相关的增删改查都添加到window上
window.createTag = (name: string) => {
  const message = tagListModel.create(name);
  if (message === 'duplicated') {
    window.alert('标签名重复了');
  } else if (message === 'success') {
    window.alert('添加成功');
  }
};

// 根据filter的结果直接返回 Tag 或 undefined
window.findTag = (id: string) => {
  return window.tagList.filter(t => t.id === id)[0];
};

window.removeTag = (id: string) => {
  return tagListModel.remove(id);
};

window.updateTag = (id: string, name: string) => {
  return tagListModel.update(id, name);
};


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
