import type { ChangeInterface, EngineInterface, NodeInterface, RangeInterface } from '@aomao/engine';

import type { GroupItemProps } from '@aomao/toolbar-vue';
import type { Ref } from 'vue';

export type { ChangeInterface, RangeInterface, NodeInterface, EngineInterface };

export type { GroupItemProps };

export interface StyleOption {
  height: number | string;
  width: number | string;
  margin: string;
  padding: string;
  background: string;
  border: string;
  minHeight: string;
  overflowY: string;
  boxShadow: string;
  fontFamily: string;
}

export type NODES = string | undefined | (string | {})[];

export interface Message {
  type: 'success' | 'warning' | 'error';
  msg: string;
}

export interface ChangePayload {
  html: string;
  json: NODES;
}

export interface EditorInstance {
  engine: EngineInterface;
  container: Ref<HTMLElement | null>;
}
