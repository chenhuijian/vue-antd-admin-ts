<template>
  <div class="index">
    登录
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineComponent, reactive, Ref, ref, watch } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useI18n } from "vue-i18n";
import { Props, validateInfos } from 'ant-design-vue/lib/form/useForm';
import { message, Form } from 'ant-design-vue';
const useForm = Form.useForm;
import { UserOutlined, UnlockOutlined } from '@ant-design/icons-vue';



</script>

<style lang="scss" scoped>

</style>
