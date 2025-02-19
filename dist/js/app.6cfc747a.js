(function(){"use strict";var t={5304:function(t,e,a){var s=a(5130),n=a(2261),i=a(6768);const l={id:"app"};function r(t,e,a,s,n,r){const o=(0,i.g2)("router-link"),u=(0,i.g2)("router-view");return(0,i.uX)(),(0,i.CE)("div",l,[(0,i.Lk)("nav",null,[(0,i.bF)(o,{to:"/"},{default:(0,i.k6)((()=>e[0]||(e[0]=[(0,i.eW)("Активные задачи")]))),_:1}),e[2]||(e[2]=(0,i.eW)(" | ")),(0,i.bF)(o,{to:"/deleted"},{default:(0,i.k6)((()=>e[1]||(e[1]=[(0,i.eW)("Удаленные задачи")]))),_:1})]),(0,i.bF)(u)])}a(4114),a(8111),a(2489);var o=a(3510);const u="user_id";async function c(){let t=localStorage.getItem(u);if(!t){const e=await o.Ay.load(),a=await e.get();t=`${a.visitorId}-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,localStorage.setItem(u,t)}return t}var d=a(4837);const k=10,v={ASC:"asc",DESC:"desc"},f="todo-app",p=1,T=(0,d.P2)(f,p,{upgrade(t){t.createObjectStore("tasks",{keyPath:"id"})}}),h=(0,n.nY)("tasks",{state:()=>({activeTasks:[],deletedTasks:[],userId:null}),actions:{async initialize(){this.userId=await c()},async loadActiveTasks(){const t=await T,e=await t.getAll("tasks");this.activeTasks=e.filter((t=>t.userId===this.userId&&"active"===t.status))},async loadDeletedTasks(){const t=await T,e=await t.getAll("tasks");this.deletedTasks=e.filter((t=>t.userId===this.userId&&"deleted"===t.status))},async addTask(t){const e=await T,a={id:Date.now().toString(),userId:this.userId,...t};await e.add("tasks",a),this.activeTasks.push(a)},async deleteTask(t){const e=await T,a=await e.get("tasks",t);a.status="deleted",a.deleteTime=new Date,await e.put("tasks",a),this.activeTasks=this.activeTasks.filter((e=>e.id!==t)),this.deletedTasks.push(a)}}});var g={name:"App",setup(){const t=h();t.initialize()}},w=a(1241);const m=(0,w.A)(g,[["render",r]]);var b=m,C=a(1387),L=a(4232);const y={class:"active-tasks"},S={class:"task-input"},I={class:"tasks-list"},D=["onClick"];function E(t,e,a,n,l,r){return(0,i.uX)(),(0,i.CE)("div",y,[(0,i.Lk)("div",S,[(0,i.bo)((0,i.Lk)("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>n.newTask=t),onKeyup:e[1]||(e[1]=(0,s.jR)(((...t)=>n.addTask&&n.addTask(...t)),["enter"])),placeholder:"Введите новую задачу"},null,544),[[s.Jo,n.newTask]]),(0,i.Lk)("button",{onClick:e[2]||(e[2]=(...t)=>n.addTask&&n.addTask(...t))},"Добавить")]),(0,i.Lk)("div",I,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(n.tasks,(t=>((0,i.uX)(),(0,i.CE)("div",{key:t.id,class:"task-item"},[(0,i.Lk)("span",null,(0,L.v_)(t.text),1),(0,i.Lk)("button",{onClick:e=>n.deleteTask(t.id),class:"delete-btn"},e[3]||(e[3]=[(0,i.Lk)("i",{class:"fas fa-trash"},null,-1)]),8,D)])))),128))])])}var A=a(144),_={name:"ActiveTasks",setup(){const t=h(),e=(0,A.KR)(""),a=(0,A.KR)([]);(0,i.sV)((async()=>{await t.loadActiveTasks(),a.value=t.activeTasks}));const s=async()=>{e.value.trim()&&(await t.addTask({text:e.value,status:"active",createTime:new Date,deleteTime:null}),e.value="",a.value=t.activeTasks)},n=async e=>{await t.deleteTask(e),a.value=t.activeTasks};return{newTask:e,tasks:a,addTask:s,deleteTask:n}}};const x=(0,w.A)(_,[["render",E]]);var P=x;const O={class:"deleted-tasks"},j={class:"pagination"},K=["disabled"],W=["disabled"];function F(t,e,a,s,n,l){return(0,i.uX)(),(0,i.CE)("div",O,[(0,i.Lk)("table",null,[(0,i.Lk)("thead",null,[(0,i.Lk)("tr",null,[(0,i.Lk)("th",{onClick:e[0]||(e[0]=t=>s.changeSort("text"))},[e[5]||(e[5]=(0,i.eW)(" Задача ")),(0,i.Lk)("i",{class:(0,L.C4)(s.getSortIcon("text"))},null,2)]),(0,i.Lk)("th",{onClick:e[1]||(e[1]=t=>s.changeSort("createTime"))},[e[6]||(e[6]=(0,i.eW)(" Дата создания ")),(0,i.Lk)("i",{class:(0,L.C4)(s.getSortIcon("createTime"))},null,2)]),(0,i.Lk)("th",{onClick:e[2]||(e[2]=t=>s.changeSort("deleteTime"))},[e[7]||(e[7]=(0,i.eW)(" Дата удаления ")),(0,i.Lk)("i",{class:(0,L.C4)(s.getSortIcon("deleteTime"))},null,2)])])]),(0,i.Lk)("tbody",null,[((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(s.paginatedTasks,(t=>((0,i.uX)(),(0,i.CE)("tr",{key:t.id},[(0,i.Lk)("td",null,(0,L.v_)(t.text),1),(0,i.Lk)("td",null,(0,L.v_)(s.formatDate(t.createTime)),1),(0,i.Lk)("td",null,(0,L.v_)(s.formatDate(t.deleteTime)),1)])))),128))])]),(0,i.Lk)("div",j,[(0,i.Lk)("button",{disabled:1===s.currentPage,onClick:e[3]||(e[3]=t=>s.currentPage--)}," Назад ",8,K),(0,i.Lk)("span",null,(0,L.v_)(s.currentPage)+" / "+(0,L.v_)(s.totalPages),1),(0,i.Lk)("button",{disabled:s.currentPage===s.totalPages,onClick:e[4]||(e[4]=t=>s.currentPage++)}," Вперед ",8,W)])])}var X={name:"DeletedTasks",setup(){const t=h(),e=(0,A.KR)("deleteTime"),a=(0,A.KR)(v.DESC),s=(0,A.KR)(1),n=t=>{e.value===t?a.value=a.value===v.ASC?v.DESC:v.ASC:(e.value=t,a.value=v.DESC)},l=t=>e.value!==t?"fas fa-sort":a.value===v.ASC?"fas fa-sort-up":"fas fa-sort-down",r=(0,i.EW)((()=>{const n=(s.value-1)*k,i=[...t.deletedTasks].sort(((t,s)=>{let n=0;return n="text"===e.value?t.text.localeCompare(s.text):new Date(t[e.value])-new Date(s[e.value]),a.value===v.ASC?n:-n}));return i.slice(n,n+k)})),o=(0,i.EW)((()=>Math.ceil(t.deletedTasks.length/k)));(0,i.sV)((async()=>{await t.loadDeletedTasks()}));const u=t=>new Date(t).toLocaleString();return{sortField:e,currentPage:s,paginatedTasks:r,totalPages:o,formatDate:u,changeSort:n,getSortIcon:l}}};const R=(0,w.A)(X,[["render",F],["__scopeId","data-v-f70bd55c"]]);var M=R;const V=(0,C.aE)({history:(0,C.LA)(),routes:[{path:"/",name:"active",component:P},{path:"/deleted",name:"deleted",component:M}]});var $=V;const z=(0,s.Ef)(b),J=(0,n.Ey)();z.use(J),z.use($),z.mount("#app")}},e={};function a(s){var n=e[s];if(void 0!==n)return n.exports;var i=e[s]={exports:{}};return t[s].call(i.exports,i,i.exports,a),i.exports}a.m=t,function(){var t=[];a.O=function(e,s,n,i){if(!s){var l=1/0;for(c=0;c<t.length;c++){s=t[c][0],n=t[c][1],i=t[c][2];for(var r=!0,o=0;o<s.length;o++)(!1&i||l>=i)&&Object.keys(a.O).every((function(t){return a.O[t](s[o])}))?s.splice(o--,1):(r=!1,i<l&&(l=i));if(r){t.splice(c--,1);var u=n();void 0!==u&&(e=u)}}return e}i=i||0;for(var c=t.length;c>0&&t[c-1][2]>i;c--)t[c]=t[c-1];t[c]=[s,n,i]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var s in e)a.o(e,s)&&!a.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={524:0};a.O.j=function(e){return 0===t[e]};var e=function(e,s){var n,i,l=s[0],r=s[1],o=s[2],u=0;if(l.some((function(e){return 0!==t[e]}))){for(n in r)a.o(r,n)&&(a.m[n]=r[n]);if(o)var c=o(a)}for(e&&e(s);u<l.length;u++)i=l[u],a.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return a.O(c)},s=self["webpackChunktodo_list"]=self["webpackChunktodo_list"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=a.O(void 0,[504],(function(){return a(5304)}));s=a.O(s)})();
//# sourceMappingURL=app.6cfc747a.js.map