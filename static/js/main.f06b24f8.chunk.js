(this["webpackJsonptime-tracker"]=this["webpackJsonptime-tracker"]||[]).push([[0],{23:function(e,t,n){e.exports=n(57)},57:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(20),o=n.n(c),s=n(1),i=n(4),u=n(3),l=n.n(u),m=n(21),f=n.n(m),p=n(22),d=function(e){return function(t){return e.name===t.name&&e.project===t.project}};function b(){var e=Object(a.useState)(!1),t=Object(s.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){return function(){return r(!0)}}),[]),n}function j(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(!0),i=Object(s.a)(o,2),u=i[0],l=i[1],m=r.a.createElement("div",{className:"error-message ".concat(u?"hidden":"")},n);return Object(a.useEffect)((function(){if(n){l(!1);var e=setTimeout((function(){l(!0),c(""),e=null}),3200);return function(){e&&clearTimeout(e)}}}),[n]),[m,c]}var O="https://mock.adapter.com",h=new f.a(l.a,{delayResponse:180});function k(e){localStorage.setItem("tasks",JSON.stringify(e))}var v=JSON.parse(localStorage.getItem("tasks")||"[]");h.onGet("".concat(O,"/tasks/")).reply((function(e){return[200,v.slice()]})),h.onPost("".concat(O,"/tasks/")).reply((function(e){var t=JSON.parse(e.data);return v.some(d(t))?[403,{}]:(v.push(t),k(v),[200,{}])})),h.onPatch("".concat(O,"/tasks/")).reply((function(e){var t=JSON.parse(e.data),n=t.old_task,a=t.new_task,r=v.find(d(n));return!d(n)(a)&&v.some(d(a))?[405,{}]:void 0===r?[403,{}]:(Object.assign(r,a),k(v),[200,{}])})),h.onPost("".concat(O,"/delete-task/")).reply((function(e){var t=JSON.parse(e.data);return v.some(d(t))?(k(v=v.filter((function(e){return!d(t)(e)}))),[200,{}]):[403,{}]}));var E=Boolean(Object({NODE_ENV:"production",PUBLIC_URL:"/react-time-tracker"}).REACT_APP_API)?Object({NODE_ENV:"production",PUBLIC_URL:"/react-time-tracker"}).REACT_APP_API.replace(/\/^/,""):O;function g(e){var t=e.getBoundingClientRect(),n=e.width=t.width,a=e.height=t.height,r=e.getContext("2d");return r.fillStyle="white",[r,n,a]}function y(e,t,n,a){var r=-Math.PI/2,c=2*Math.PI*a+r,o=[t/2,n/2];e.globalAlpha=.3,e.clearRect(0,0,t,n),e.beginPath(),e.moveTo.apply(e,o),e.arc.apply(e,o.concat([t/2,r,c])),e.fill(),e.globalAlpha=1,e.globalCompositeOperation="destination-out",e.beginPath(),e.moveTo.apply(e,o),e.arc.apply(e,o.concat([t/2-4,0,2*Math.PI])),e.fill(),e.globalCompositeOperation="source-over"}var w=function(e){var t=e.seconds,n=e.isTimerRunning,c=void 0!==n&&n,o=e.children,i=Object(a.useState)(t),u=Object(s.a)(i,2),l=u[0],m=u[1],f=Object(a.useRef)(null);return Object(a.useEffect)((function(){t%60===0&&m(t)}),[t]),Object(a.useEffect)((function(){c||m(t)}),[c,t]),Object(a.useEffect)((function(){if(f.current&&void 0===Object({NODE_ENV:"production",PUBLIC_URL:"/react-time-tracker"}).JEST_WORKER_ID){if(c)return function(e,t){var n=!0,a=g(e),r=Object(s.a)(a,3),c=r[0],o=r[1],i=r[2];requestAnimationFrame((function e(t){n&&requestAnimationFrame(e);var a=(t-u)/1e3;u=t,y(c,o,i,l+=a/60)}));var u=performance.now(),l=t%60/60;return function(){n=!1}}(f.current,l);!function(e,t){var n=g(e),a=Object(s.a)(n,3);y(a[0],a[1],a[2],t%60/60)}(f.current,l)}}),[c,l]),r.a.createElement("div",{className:"task-timer-container"},r.a.createElement("canvas",{ref:f,className:"task-timer"}),o)};function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(Object(n),!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var N=function(e){return String(100+e%100).substr(1)};var P=function(e){var t=e.task,n=e.editTask,c=e.updateTasks,o=e.selectProject,i=e.tasks,u=Object(a.useState)(t.seconds),m=Object(s.a)(u,2),f=m[0],p=m[1],O=Math.floor(f/60)%60,h=Math.floor(f/60/60),k=Object(a.useState)(!1),v=Object(s.a)(k,2),g=v[0],y=v[1],S=Object(a.useState)(null),P=Object(s.a)(S,2),_=P[0],T=P[1],D=Object(a.useState)(t.seconds),I=Object(s.a)(D,2),x=I[0],R=I[1],M=j(),A=Object(s.a)(M,2),L=A[0],J=A[1],B=b();Object(a.useEffect)((function(){if(g){var e=setInterval((function(){p(Math.floor(x+Date.now()/1e3-_))}),1e3);return function(){return clearInterval(e)}}p(x)}),[g,x,_]),Object(a.useEffect)((function(){g&&T(Date.now()/1e3)}),[g]),Object(a.useEffect)((function(){g||R(t.seconds)}),[g,t.seconds]);var q=Object(a.useCallback)((function(e){l.a.patch("".concat(E,"/tasks/"),{old_task:{name:t.name,project:t.project},new_task:C({},t,{seconds:f})}).then((function(t){e&&e()})).catch((function(e){e.response&&405===e.response.status?J("Somehow, we tried to change this task name to an invalid one."):e.response&&403===e.response.status?J("Invalid request: this task doesn't exist anymore."):(J("Error connecting with the server."),console.error(e))}))}),[t,f,J]);function U(){q((function(){c((function(e){return e.map((function(e){return e.name===t.name&&e.project===t.project?C({},t,{seconds:f}):e}))})),B||y(!1)}))}return Object(a.useEffect)((function(){f!==t.seconds&&f%60===0&&q()}),[q,f,t.seconds]),Object(a.useEffect)((function(){if(g)return window.onbeforeunload=function(e){return"There's a task running. You'll loose the timer progress."},function(){return window.onbeforeunload=void 0}}),[g]),r.a.createElement("div",{draggable:!0,onDragStart:function(e){e.dataTransfer.setData("text/plain","".concat(t.name,"/").concat(t.project))},onDragOver:function(e){return e.preventDefault()},onDrop:function(e){e.preventDefault();var n=e.dataTransfer.getData("text").split("/"),a=Object(s.a)(n,2);!function(e){var n=i.findIndex(d(e)),a=i.findIndex(d(t));if(-1!==n&&-1!==a){var r;r=n<a?a>=i.length-1?t.timestamp-9e3:i[a+1].timestamp:a>0?i[a-1].timestamp:Date.now();var o=Math.floor((t.timestamp+r)/2),s=i.find(d(e));l.a.patch("".concat(E,"/tasks/"),{old_task:e,new_task:C({},s,{timestamp:o})}).then((function(e){c()})).catch((function(e){e.response&&405===e.response.status?J("Somehow, we tried to change this task name to an invalid one."):e.response&&403===e.response.status?J("Invalid request: This task doesn't exist anymore."):(J("Error connecting with the server."),console.error(e))}))}}({name:a[0],project:a[1]})},className:"task",style:{"--task-color":t.color}},r.a.createElement("div",{className:"task-head"},r.a.createElement(w,{seconds:f,isTimerRunning:g},g?r.a.createElement("button",{className:"stop",onClick:function(){U()}},r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_pause_white_24dp.png"),alt:"Stop timer",title:"Stop timer"})):r.a.createElement("button",{className:"start",onClick:function(){return y(!0)}},r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_play_arrow_white_24dp.png"),alt:"Start timer",title:"Start timer"})))),r.a.createElement("div",{className:"task-body"},r.a.createElement("div",{className:"float-left"},r.a.createElement("h3",null,t.name),N(h),":",N(O)," - ",r.a.createElement("span",{className:"clickable",onClick:function(){return o(t.project)}},t.project),L),r.a.createElement("div",{className:"task-foot"},r.a.createElement("button",{className:"edit",onClick:function(){g&&U(),n()}},"Edit"))))};function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(Object(n),!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var D=function(e){return function(t){return e(t.target.value)}};var I=function(e){var t=e.task,n=e.cancelEdition,c=e.updateTasks,o=Object(a.useState)(t.name),i=Object(s.a)(o,2),u=i[0],m=i[1],f=Object(a.useState)(Math.floor(t.seconds/60)%60),p=Object(s.a)(f,2),d=p[0],O=p[1],h=Object(a.useState)(Math.floor(t.seconds/60/60)),k=Object(s.a)(h,2),v=k[0],g=k[1],y=b(),S=Object(a.useState)(!1),C=Object(s.a)(S,2),N=C[0],P=C[1],_=j(),I=Object(s.a)(_,2),x=I[0],R=I[1];function M(){l.a.patch("".concat(E,"/tasks/"),{old_task:{name:t.name,project:t.project},new_task:T({},t,{name:u,seconds:60*v*60+60*d})}).then((function(e){y||n(),c()})).catch((function(e){e.response&&405===e.response.status?R("A task with that name already exists."):e.response&&403===e.response.status?R("Invalid request: this task doesn't exist anymore!"):(R("Error connecting with the server."),console.error(e))}))}var A=function(e){return r.a.createElement("button",{className:"confirm",onClick:M,disabled:!u},e)};return r.a.createElement("div",{className:"task",style:{"--task-color":t.color}},r.a.createElement("div",{className:"task-head"},r.a.createElement(w,{seconds:t.seconds},A(r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_edit_white_24dp.png"),alt:"Edit task",title:"Edit task"})))),r.a.createElement("div",{className:"task-body"},r.a.createElement("h3",null,r.a.createElement("input",{type:"text",placeholder:"Task name",value:u,onChange:D(m)})),r.a.createElement("input",{type:"number",min:0,value:v,onChange:D(g)}),":",r.a.createElement("input",{type:"number",min:0,max:60,value:d,onChange:D(O)}),x),r.a.createElement("div",{className:"task-foot"},A("Edit task"),r.a.createElement("button",{className:"cancel",onClick:n},"Cancel"),r.a.createElement("button",{className:"delete",onClick:function(){N?l.a.post("".concat(E,"/delete-task/"),{name:t.name,project:t.project}).then((function(e){y||n(),c((function(e){return e.filter((function(e){return t.name!==e.name||t.project!==e.project}))}))})).catch((function(e){e.response&&403===e.response.status?R("Invalid request: the task was already deleted!"):(R("Error connecting with the server."),console.error(e))})):P(!0)}},N?"Delete?":"Delete")))};var x=function(e){var t=e.task,n=e.updateTasks,c=e.selectProject,o=e.tasks,i=Object(a.useState)(!1),u=Object(s.a)(i,2),l=u[0],m=u[1];return l?r.a.createElement(I,{task:t,cancelEdition:function(){return m(!1)},updateTasks:n}):r.a.createElement(P,{task:t,editTask:function(){return m(!0)},updateTasks:n,selectProject:c,tasks:o})},R=function(e){return function(t){return e(t.target.value)}},M=["#6d7502","#1fad13","#c60d8f","#5577ff","#ff3344"];var A=function(e){var t=e.projects,n=e.projectColors,c=e.onCreate,o=e.onCancel,i=Object(a.useState)(""),u=Object(s.a)(i,2),m=u[0],f=u[1],p=Object(a.useState)(t[0]||""),d=Object(s.a)(p,2),b=d[0],O=d[1],h=Object(a.useState)(""),k=Object(s.a)(h,2),v=k[0],g=k[1],y=Object(a.useState)(M[Math.floor(Math.random()*M.length)]),S=Object(s.a)(y,2),C=S[0],N=S[1],P=b?n[b]:C,_=j(),T=Object(s.a)(_,2),D=T[0],I=T[1],x=function(e){return r.a.createElement("button",{className:"confirm",disabled:!m||!(b||v)},e)};return r.a.createElement("form",{className:"task",onSubmit:function(e){e.preventDefault(),l.a.post("".concat(E,"/tasks/"),{name:m,project:b||v,color:P,seconds:0,timestamp:Date.now()}).then(c).catch((function(e){e.response&&403===e.response.status?I("The task already exists!"):(I("Error connecting with the server."),console.error(e))}))},style:{"--task-color":P}},r.a.createElement("div",{className:"task-head"},r.a.createElement(w,{seconds:0},x(r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_add_white_24dp.png"),alt:"Create task",title:"Create task"})))),r.a.createElement("div",{className:"task-body"},r.a.createElement("h3",null,r.a.createElement("input",{type:"text",id:"task-name",placeholder:"Task name",value:m,onChange:R(f)})),t.length?r.a.createElement(r.a.Fragment,null,r.a.createElement("select",{id:"project-name",value:b,onChange:R(O)},t.map((function(e){return r.a.createElement("option",{key:e,value:e,style:{"--task-color":n[e]}},e)})),r.a.createElement("option",{value:"",style:{"--task-color":C,fontStyle:"italic"}},"New project")),r.a.createElement("br",null)):"",""===b?r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{type:"text",id:"new-project-name",placeholder:"Project name",value:v,onChange:R(g)}),r.a.createElement("input",{type:"color",id:"new-project-color",value:C,onChange:R(N)})):"",D),r.a.createElement("div",{className:"task-foot"},x("Create task"),r.a.createElement("button",{className:"cancel",onClick:o},"Cancel")))};function L(e){var t=e.projects,n=e.projectColors,c=e.updateTasks,o=Object(a.useState)(!1),i=Object(s.a)(o,2),u=i[0],l=i[1];return u?r.a.createElement(A,{projects:t,projectColors:n,onCreate:function(){l(!1),c()},onCancel:function(){return l(!1)}}):r.a.createElement("button",{className:"task task-head new-task",onClick:function(){return l(!0)}},"New task")}var J=function(e){return function(t){return e(t.target.value)}};var B=function(e){var t=e.searchQuery,n=e.setSearchQuery,c=Object(a.useRef)(null);return Object(a.useEffect)((function(){function e(e){"Escape"===e.key&&(n(""),c&&c.current.focus())}return window.addEventListener("keydown",e),function(){return window.removeEventListener("keydown",e)}}),[n]),Object(a.useEffect)((function(){c&&c.current.focus()}),[t]),r.a.createElement("div",{className:"search-bar"},r.a.createElement("input",{type:"text",value:t,onChange:J(n),ref:c}))};var q=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],c=t[1],o=function(e){var t=b(),n=Object(a.useState)(null),r=Object(s.a)(n,2),c=r[0],o=r[1],i=Object(a.useState)(0),u=Object(s.a)(i,2),m=u[0],f=u[1],p=j(),d=Object(s.a)(p,2),O=d[0],h=d[1];if(Object(a.useEffect)((function(){l.a.get("".concat(E,"/tasks/")).then((function(e){t||o(e.data)})).catch((function(e){t||(e.response?h("The server responded with an error."):(h("Error connecting with the server. Please reload the tab."),console.error(e)))}))}),[t,m,h]),null!==c&&(c=c.sort((function(e,t){return t.timestamp-e.timestamp})),e.length)){var k=e.trim().toLowerCase().replace(/\s+/g," ").split(" ");k.length&&(c=c.filter((function(e){return k.every((function(t){return e.name.toLowerCase().includes(t)||e.project.toLowerCase().includes(t)}))})))}return[c,function(e){e&&o(e(c)),f(m+1)},O]}(n),i=Object(s.a)(o,3),u=i[0],m=i[1],f=i[2],d=function(e){if(null===e)return[];var t=Object.create(null);return[e.reduce((function(e,n){return e.includes(n.project)?e:(t[n.project]=n.color,[].concat(Object(p.a)(e),[n.project]))}),[]),t]}(u),O=Object(s.a)(d,2),h=O[0],k=O[1];return r.a.createElement("div",{className:"task-container"},r.a.createElement(B,{searchQuery:n,setSearchQuery:c}),r.a.createElement(L,{projects:h,projectColors:k,updateTasks:m}),f,null!==u?u.map((function(e){return r.a.createElement(x,{key:"".concat(e.project,"/").concat(e.name),task:e,selectProject:c,updateTasks:m,tasks:u})})):"",r.a.createElement("div",{style:{clear:"both"}}),r.a.createElement("div",{className:"footer task"},"Mauro Cano Brusa (c) 2019",r.a.createElement("br",null),r.a.createElement("a",{href:"https://github.com/mauroc8/react-time-tracker"},"View source")))};o.a.render(r.a.createElement(q,null),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.f06b24f8.chunk.js.map