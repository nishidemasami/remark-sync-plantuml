import 'webrtc';
import { Plugin } from 'unified';

declare function plantuml(uml: string): string;

declare function remarkPlantumlPlugin(): Plugin;
