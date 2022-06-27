<script setup lang="ts" name="IndexPage">
import { ref } from 'vue';
// import Editor from '~/components/Editor';
import Editor from '../components/Editor';
import { ChangePayload, EditorInstance } from '../components/Editor';
import { ChangeInterface } from '@aomao/engine';
// import '../../dist/style.css';
const editor = ref<EditorInstance | null>(null);
const content = ref('<h1>Hello Editor</h1>');

const style = ref({
  padding: '0',
  background: '#dff',
  width: '90%',
  height: 'auto'
});

const onChange = ({ html, json }: ChangePayload) => {
  console.log('html content: ', html);
  console.log('json content: ', json);
};
</script>

<template>
  <div style="width: 900px">
    <!-- <Editor /> -->
    <Editor ref="editor" v-model="content" @change="onChange" :styleOption="style"> </Editor>
  </div>
</template>
