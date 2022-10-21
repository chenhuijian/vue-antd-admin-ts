<template>
  <a-dropdown>
    <span class="dropDown">
      <icon-svg type="language-outline"></icon-svg>
    </span>
    <template #overlay>
      <a-menu class="menu" @click="changeLang" :selectedKeys="[locale]">
        <a-menu-item v-for="item in locales" :key="item">
                    <span role="img" :aria-label="languageLabels[item]">
                        {{languageIcons[item]}}
                    </span>
          {{languageLabels[item]}}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {setI18nLanguage} from "@/config/i18n";
import IconSvg from "@/components/IconSvg";

const {locale} = useI18n();
const locales: string[] = ['zh-CN', 'zh-TW', 'en-US'];
const languageLabels: { [key: string]: string } = {
  'zh-CN': '简体中文',
  'zh-TW': '繁体中文',
  'en-US': 'English',
};
const languageIcons: { [key: string]: string } = {
  'zh-CN': '🇨🇳',
  'zh-TW': '🇭🇰',
  'en-US': '🇺🇸',
};
// 切换语言
const changeLang = ({key}: any): void => setI18nLanguage(key);


</script>
<style lang="less" scoped>
.menu {
  .anticon {
    margin-right: 8px;
  }
  .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
.dropDown {
  cursor: pointer;
}
</style>
