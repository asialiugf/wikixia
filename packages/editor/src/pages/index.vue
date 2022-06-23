<script setup lang="ts" name="IndexPage">
import { ref } from 'vue';
// import Editor from '~/components/Editor';
import Editor from '~/components/Editor';
import { ChangePayload, EditorInstance } from '~/components/Editor/src/types';
import { ChangeInterface } from '@aomao/engine';
import '../../dist/style.css';
const editor = ref<EditorInstance | null>(null);
const content = ref('<h1>Hello Editor</h1>');

const style = ref({
  padding: '0',
  background: '#fff'
});

const onChange = ({ html, json }: ChangePayload) => {
  console.log('html content: ', html);
  console.log('json content: ', json);
};
</script>

<template>
  <div>
    <!-- <Editor /> -->
    <Editor ref="editor" v-model="content" @change="onChange" :styleOption="style"> </Editor>
  </div>
</template>
