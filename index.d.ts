import 'webrtc';
import { Plugin } from 'unified';

declare var remarkPlantumlPlugin: Plugin;

declare module 'remark-sync-plantuml' {
  export = remarkPlantumlPlugin
}
