import Vue from 'vue'
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import '@kangc/v-md-editor/lib/style/codemirror-editor.css'
// tip
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index'
import '@kangc/v-md-editor/lib/plugins/tip/tip.css'
// emoji
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'
// todo list
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'
// line number
import createLineNumberPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
// copy code
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'

import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
// import '@kangc/v-md-editor/lib/theme/style/github.css'

// codemirror
import Codemirror from 'codemirror'
// mode
import 'codemirror/mode/markdown/markdown'
// placeholder
import 'codemirror/addon/display/placeholder'
// active-line
import 'codemirror/addon/selection/active-line'
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
// style
import 'codemirror/lib/codemirror.css'

import 'prismjs/components/prism-json'
import 'prismjs/components/prism-java'

VMdEditor.Codemirror = Codemirror

VMdEditor.use(vuepressTheme)

VMdEditor.use(createTipPlugin())
VMdEditor.use(createEmojiPlugin())
VMdEditor.use(createTodoListPlugin())
VMdEditor.use(createLineNumberPlugin())
VMdEditor.use(createCopyCodePlugin())

Vue.use(VMdEditor)
