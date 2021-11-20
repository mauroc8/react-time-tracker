(this["webpackJsonptime-tracker"]=this["webpackJsonptime-tracker"]||[]).push([[0],{48:function(e,t,a){},49:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(19),o=a.n(c),s=a(1),i=a(2),l=a(3),u=a.n(l),m=a(20),d=a.n(m),f=a(21),p=function(e){return function(t){return e.name===t.name&&e.project===t.project}};function E(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){return function(){return r(!0)}}),[]),a}function k(){var e=Object(n.useState)(""),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(!0),i=Object(s.a)(o,2),l=i[0],u=i[1],m=r.a.createElement("div",{className:"error-message ".concat(l?"hidden":"")},a);return Object(n.useEffect)((function(){if(a){u(!1);var e=setTimeout((function(){u(!0),c(""),e=null}),3200);return function(){e&&clearTimeout(e)}}}),[a]),[m,c]}var b="https://mock.adapter.com",v=new d.a(u.a,{delayResponse:180});function h(e){localStorage.setItem("tasks",JSON.stringify(e)),function(e){var t=new Date;t.setFullYear(t.getFullYear()+6),document.cookie="tasks=".concat(escape(JSON.stringify(e)),";expires=").concat(t.toGMTString())}(e)}var O=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):function(){var e=document.cookie.match(/tasks=([^;]+)/),t=e&&unescape(e[1]);return t&&JSON.parse(t)}()||[];v.onGet("".concat(b,"/tasks/")).reply((function(e){return[200,O.slice()]})),v.onPost("".concat(b,"/tasks/")).reply((function(e){var t=JSON.parse(e.data);return O.some(p(t))?[403,{}]:(O.push(t),h(O),[200,{}])})),v.onPatch("".concat(b,"/tasks/")).reply((function(e){var t=JSON.parse(e.data),a=t.old_task,n=t.new_task,r=O.find(p(a));return!p(a)(n)&&O.some(p(n))?[405,{}]:void 0===r?[403,{}]:(Object.assign(r,n),h(O),[200,{}])})),v.onPost("".concat(b,"/delete-task/")).reply((function(e){var t=JSON.parse(e.data);return O.some(p(t))?(h(O=O.filter((function(e){return!p(t)(e)}))),[200,{}]):[403,{}]})),v.onPost("".concat(b,"/import-tasks/")).reply((function(e){var t=JSON.parse(e.data);return h(O=O.filter((function(e){return!t.some(p(e))})).concat(t)),[200,{}]}));var j=Boolean(Object({NODE_ENV:"production",PUBLIC_URL:"/react-time-tracker",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_API)?Object({NODE_ENV:"production",PUBLIC_URL:"/react-time-tracker",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_API.replace(/\/^/,""):b;function g(e){var t=e.getBoundingClientRect(),a=e.width=t.width,n=e.height=t.height,r=e.getContext("2d");return r.fillStyle="white",[r,a,n]}function S(e,t,a,n){var r=-Math.PI/2,c=2*Math.PI*n+r,o=[t/2,a/2];e.globalAlpha=.4,e.clearRect(0,0,t,a),e.beginPath(),e.moveTo.apply(e,o),e.arc.apply(e,o.concat([t/2,r,c])),e.fill(),e.globalAlpha=1,e.globalCompositeOperation="destination-out",e.beginPath(),e.moveTo.apply(e,o),e.arc.apply(e,o.concat([t/2-4,0,2*Math.PI])),e.fill(),e.globalCompositeOperation="source-over"}var T=function(e){var t=e.startingSeconds,a=e.isTimerRunning,c=void 0!==a&&a,o=e.children,i=Object(n.useRef)(null);return Object(n.useEffect)((function(){if(i.current&&void 0===Object({NODE_ENV:"production",PUBLIC_URL:"/react-time-tracker",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).JEST_WORKER_ID){if(c)return function(e,t){var a=!0,n=g(e),r=Object(s.a)(n,3),c=r[0],o=r[1],i=r[2];requestAnimationFrame((function e(t){a&&requestAnimationFrame(e);var n=(t-l)/1e3;l=t,S(c,o,i,u+=n/60)}));var l=performance.now(),u=t%60/60;return function(){a=!1}}(i.current,t);!function(e,t){var a=g(e),n=Object(s.a)(a,3);S(n[0],n[1],n[2],t%60/60)}(i.current,t)}}),[c,t]),r.a.createElement("div",{className:"task-timer-container"},r.a.createElement("canvas",{ref:i,className:"task-timer"}),o)},y=function(e){return String(100+e%100).substr(1)},_=function(e,t){switch(t.type){case"START":return Object(i.a)(Object(i.a)({},e),{},{isRunning:!0,millisecondsOnStart:e.milliseconds,timestampOnStart:Date.now(),millisecondsUntillNextMinute:6e4-e.milliseconds%6e4});case"STOP":return Object(i.a)(Object(i.a)({},e),{},{isRunning:!1});case"TICK":var a=e.millisecondsOnStart+Date.now()-e.timestampOnStart;return Object(i.a)(Object(i.a)({},e),{},{milliseconds:a,millisecondsUntillNextMinute:6e4-a%6e4});case"UPDATE":return Object(i.a)(Object(i.a)({},e),{},{milliseconds:1e3*t.seconds});default:return e}};var C=function(e){var t=e.task,a=e.editTask,c=e.updateTasks,o=e.selectProject,l=e.tasks,m=e.onPlayStart,d=Object(n.useReducer)(_,{isRunning:!1,milliseconds:1e3*t.seconds,millisecondsOnStart:null,timestampOnStart:null,millisecondsUntillNextMinute:null}),f=Object(s.a)(d,2),b=f[0],v=f[1],h=Math.floor(b.milliseconds/60/1e3)%60,O=Math.floor(b.milliseconds/60/1e3/60),g=k(),S=Object(s.a)(g,2),C=S[0],w=S[1],N=E();Object(n.useEffect)((function(){var e=Math.floor(b.milliseconds/1e3);b.isRunning||t.seconds===e||v({type:"UPDATE",seconds:t.seconds})}),[b.isRunning,t.seconds,b.milliseconds]);var R=Object(n.useCallback)((function(e){var a=b.millisecondsOnStart+Date.now()-b.timestampOnStart,n=Math.floor(a/1e3);u.a.patch("".concat(j,"/tasks/"),{old_task:{name:t.name,project:t.project},new_task:Object(i.a)(Object(i.a)({},t),{},{seconds:n})}).then((function(t){e&&e(n)})).catch((function(e){e.response&&405===e.response.status?w("Somehow, we tried to change this task name to an invalid one."):e.response&&403===e.response.status?w("Invalid request: this task doesn't exist anymore."):(w("Error connecting with the server."),console.error(e))}))}),[t,b.millisecondsOnStart,b.timestampOnStart,w]);function P(e){R((function(a){c((function(e){return e.map((function(e){return e.name===t.name&&e.project===t.project?Object(i.a)(Object(i.a)({},t),{},{seconds:a}):e}))})),N||(v({type:"STOP"}),e&&e())}))}return Object(n.useEffect)((function(){if(b.isRunning){var e=setTimeout((function(){return v({type:"TICK"})}),b.millisecondsUntillNextMinute);return function(){return clearTimeout(e)}}}),[b.isRunning,b.millisecondsUntillNextMinute]),Object(n.useEffect)((function(){var e=Math.floor(b.milliseconds/1e3);b.isRunning&&e!==t.seconds&&e%60===0&&R()}),[b.isRunning,R,b.milliseconds,t.seconds]),Object(n.useEffect)((function(){if(b.isRunning)return window.onbeforeunload=function(e){return"There's a task running. You'll loose the timer progress."},function(){return window.onbeforeunload=void 0}}),[b.isRunning]),r.a.createElement("div",{draggable:!0,onDragStart:function(e){e.dataTransfer.setData("text/plain","".concat(t.name,"/").concat(t.project))},onDragOver:function(e){return e.preventDefault()},onDrop:function(e){e.preventDefault();var a=e.dataTransfer.getData("text").split("/"),n=Object(s.a)(a,2),r=n[0],o=n[1];r&&o&&function(e){var a=l.findIndex(p(e)),n=l.findIndex(p(t));if(-1!==a&&-1!==n){var r;r=a<n?n>=l.length-1?t.timestamp-9e3:l[n+1].timestamp:n>0?l[n-1].timestamp:Date.now();var o=Math.floor((t.timestamp+r)/2),s=l.find(p(e));u.a.patch("".concat(j,"/tasks/"),{old_task:e,new_task:Object(i.a)(Object(i.a)({},s),{},{timestamp:o})}).then((function(e){c()})).catch((function(e){e.response&&405===e.response.status?w("Somehow, we tried to change this task name to an invalid one."):e.response&&403===e.response.status?w("Invalid request: This task doesn't exist anymore."):(w("Error connecting with the server."),console.error(e))}))}}({name:r,project:o})},className:"task",style:{"--task-color":t.color}},r.a.createElement("div",{className:"task-head"},r.a.createElement(T,{key:h,startingSeconds:Math.floor(b.milliseconds/1e3),isTimerRunning:b.isRunning},b.isRunning?r.a.createElement("button",{className:"stop",onClick:function(){return P()}},r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_pause_white_24dp.png"),alt:"Stop timer",title:"Stop timer"})):r.a.createElement("button",{className:"start",onClick:function(){v({type:"START"}),m()}},r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_play_arrow_white_24dp.png"),alt:"Start timer",title:"Start timer"})))),r.a.createElement("div",{className:"task-body"},r.a.createElement("div",{className:"float-left"},r.a.createElement("h3",null,t.name),y(O),":",y(h)," - ",r.a.createElement("span",{className:"clickable",onClick:function(){return o(t.project)}},t.project),C),r.a.createElement("div",{className:"task-foot"},r.a.createElement("button",{className:"edit",onClick:function(){b.isRunning?P(a):a()}},"Edit"))))},w=function(e){return function(t){return e(t.target.value)}};var N=function(e){var t=e.task,a=e.cancelEdition,c=e.updateTasks,o=Object(n.useState)(t.name),l=Object(s.a)(o,2),m=l[0],d=l[1],f=Object(n.useState)(Math.floor(t.seconds/60)%60),p=Object(s.a)(f,2),b=p[0],v=p[1],h=Object(n.useState)(Math.floor(t.seconds/60/60)),O=Object(s.a)(h,2),g=O[0],S=O[1],y=E(),_=Object(n.useState)(!1),C=Object(s.a)(_,2),N=C[0],R=C[1],P=k(),D=Object(s.a)(P,2),A=D[0],I=D[1];function x(){u.a.patch("".concat(j,"/tasks/"),{old_task:{name:t.name,project:t.project},new_task:Object(i.a)(Object(i.a)({},t),{},{name:m,seconds:60*g*60+60*b})}).then((function(e){y||a(),c()})).catch((function(e){e.response&&405===e.response.status?I("A task with that name already exists."):e.response&&403===e.response.status?I("Invalid request: this task doesn't exist anymore!"):(I("Error connecting with the server."),console.error(e))}))}var M=function(e){return r.a.createElement("button",{className:"confirm",onClick:x,disabled:!m},e)};return r.a.createElement("div",{className:"task",style:{"--task-color":t.color}},r.a.createElement("div",{className:"task-head"},r.a.createElement(T,{seconds:t.seconds},M(r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_edit_white_24dp.png"),alt:"Edit task",title:"Edit task"})))),r.a.createElement("div",{className:"task-body"},r.a.createElement("h3",null,r.a.createElement("input",{type:"text",placeholder:"Task name",value:m,onChange:w(d)})),r.a.createElement("input",{type:"number",min:0,value:g,onChange:w(S)}),":",r.a.createElement("input",{type:"number",min:0,max:60,value:b,onChange:w(v)}),A),r.a.createElement("div",{className:"task-foot"},M("Edit task"),r.a.createElement("button",{className:"cancel",onClick:a},"Cancel"),r.a.createElement("button",{className:"delete",onClick:function(){N?u.a.post("".concat(j,"/delete-task/"),{name:t.name,project:t.project}).then((function(e){y||a(),c((function(e){return e.filter((function(e){return t.name!==e.name||t.project!==e.project}))}))})).catch((function(e){e.response&&403===e.response.status?I("Invalid request: the task was already deleted!"):(I("Error connecting with the server."),console.error(e))})):R(!0)}},N?"Delete?":"Delete")))};var R=function(e){var t=e.task,a=e.updateTasks,c=e.selectProject,o=e.tasks,i=Object(n.useState)(!1),l=Object(s.a)(i,2),u=l[0],m=l[1],d=Object(n.useState)(!Boolean(localStorage.getItem("hasShownATask"))),f=Object(s.a)(d,2),p=f[0],E=f[1];Object(n.useEffect)((function(){p||localStorage.setItem("hasShownATask","1")}),[p]);var k=o?o.length:null;return Object(n.useEffect)((function(){null!==k&&k>1&&E(!1)}),[k]),u?r.a.createElement(N,{task:t,cancelEdition:function(){return m(!1)},updateTasks:a}):r.a.createElement(r.a.Fragment,null,p?r.a.createElement("div",{className:"first-time-notice",style:{"--task-color":t.color}},"Now you can hit play to begin tracking the time you spend on"," ",r.a.createElement("b",null,t.name),"."):"",r.a.createElement(C,{task:t,editTask:function(){E(!1),m(!0)},onPlayStart:function(){E(!1)},updateTasks:a,selectProject:c,tasks:o}))},P=function(e){return function(t){return e(t.target.value)}},D=["#6d7502","#1fad13","#c60d8f","#5577ff","#ff3344"];var A=function(e){var t=e.projects,a=e.projectColors,c=e.onCreate,o=e.onCancel,i=e.isFirstTime,l=Object(n.useState)(""),m=Object(s.a)(l,2),d=m[0],f=m[1],p=Object(n.useState)(t[0]||""),E=Object(s.a)(p,2),b=E[0],v=E[1],h=Object(n.useState)(""),O=Object(s.a)(h,2),g=O[0],S=O[1],y=Object(n.useState)(D[Math.floor(Math.random()*D.length)]),_=Object(s.a)(y,2),C=_[0],w=_[1],N=b?a[b]:C,R=k(),A=Object(s.a)(R,2),I=A[0],x=A[1];Object(n.useEffect)((function(){0===t.length&&v("")}),[t.length]);var M=function(e){return r.a.createElement("button",{className:"confirm",disabled:!d||!(b||g)},e)};return r.a.createElement("form",{className:"task",onSubmit:function(e){e.preventDefault(),u.a.post("".concat(j,"/tasks/"),{name:d,project:b||g,color:N,seconds:0,timestamp:Date.now()}).then(c).catch((function(e){e.response&&403===e.response.status?x("The task already exists!"):(x("Error connecting with the server."),console.error(e))}))},style:{"--task-color":N}},i?r.a.createElement("div",{className:"first-time-notice"},"Start by creating a task. Just anything you're working on."):"",r.a.createElement("div",{className:"task-head"},r.a.createElement(T,{seconds:0},M(r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_add_white_24dp.png"),alt:"Create task",title:"Create task"})))),r.a.createElement("div",{className:"task-body"},r.a.createElement("h3",null,r.a.createElement("input",{type:"text",id:"task-name",placeholder:"Task name",value:d,onChange:P(f)})),t.length?r.a.createElement(r.a.Fragment,null,r.a.createElement("select",{id:"project-name",value:b,onChange:P(v)},t.map((function(e){return r.a.createElement("option",{key:e,value:e,style:{"--task-color":a[e]}},e)})),r.a.createElement("option",{value:"",style:{"--task-color":C,fontStyle:"italic"}},"New project")),r.a.createElement("br",null)):"",""!==b&&t.length?"":r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{type:"text",id:"new-project-name",placeholder:"Project name",value:g,onChange:P(S)}),r.a.createElement("input",{type:"color",id:"new-project-color",value:C,onChange:P(w)})),I),r.a.createElement("div",{className:"task-foot"},M("Create task"),r.a.createElement("button",{className:"cancel",onClick:o},"Cancel")))};function I(e){var t=e.projects,a=e.projectColors,c=e.updateTasks,o=Object(n.useState)(!Boolean(localStorage.getItem("hasCreatedATask"))),i=Object(s.a)(o,2),l=i[0],u=i[1],m=Object(n.useState)(l),d=Object(s.a)(m,2),f=d[0],p=d[1];Object(n.useEffect)((function(){!1===l&&localStorage.setItem("hasCreatedATask","1")}),[l]);var E=t?t.length:null;return Object(n.useEffect)((function(){0===E?p(!0):null!==E&&E>0&&u(!1)}),[E]),f&&t?r.a.createElement(A,{projects:t,projectColors:a,onCreate:function(){u(!1),p(!1),c()},onCancel:function(){return p(!1)},isFirstTime:l}):r.a.createElement("button",{className:"task task-head new-task",onClick:function(){return p(!0)}},"New task")}var x=function(e){var t,a=e.searchQuery,c=e.setSearchQuery,o=Object(n.useRef)(null);return Object(n.useEffect)((function(){function e(e){"Escape"===e.key&&(c(""),o&&o.current.focus())}return window.addEventListener("keydown",e),function(){return window.removeEventListener("keydown",e)}}),[c]),Object(n.useEffect)((function(){o&&o.current.focus()}),[a]),r.a.createElement("div",{className:"search-bar"},r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_search_black_18dp.png"),alt:"",onClick:function(){o.current&&o.current.focus()}}),r.a.createElement("input",{type:"text",value:a,onChange:(t=c,function(e){return t(e.target.value)}),ref:o}),r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_close_black_18dp.png"),alt:"",style:{right:"2px"},onClick:function(){c("")}}))};var M=function(){var e=Object(n.useState)(Boolean(localStorage.getItem("understood-local-storage-notice"))),t=Object(s.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){a&&localStorage.setItem("understood-local-storage-notice","1")}),[a]),void 0!==Object({NODE_ENV:"production",PUBLIC_URL:"/react-time-tracker",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_API||a?r.a.createElement(r.a.Fragment,null):r.a.createElement("div",{className:"local-storage-notice"},r.a.createElement("div",null,"This site uses both ",r.a.createElement("b",null,"cookies")," and ",r.a.createElement("b",null,"localStorage")," to store your user data (it should be safe unless you decide to clear your cache). Any data you provide is saved on your current browser and device ",r.a.createElement("i",null,"only"),". The server doesn't store any data whatsoever, so you're adviced to keep regular backups using the Export function."),r.a.createElement("button",{onClick:function(){return c(!0)}},"I understand"))};var F=function(e){var t=e.updateTasks,a=e.setErrorMessage;return r.a.createElement("button",{className:"import-tasks",onClick:function(){var e=document.createElement("input");function n(e){var n=e.target.result;if(n&&n.length){var r;try{r=JSON.parse(n)}catch(c){return void a("The file is invalid or corrupted.")}u.a.post("".concat(j,"/import-tasks/"),r).then((function(e){t()})).catch((function(e){e.response?a("There was an error importing tasks."):a("There was an error connecting to the server.")}))}}e.type="file",e.accept=".json",e.click(),e.addEventListener("change",(function(){if(e.files.length){var t=new FileReader,a=e.files[0];t.readAsText(a),t.addEventListener("load",n)}}))}},"Import")};var U=function(e){var t=e.tasks;return r.a.createElement("button",{className:"export-tasks",onClick:function(){var e=document.createElement("a");e.setAttribute("href","data:text/plain;charset=utf-u,"+encodeURIComponent(JSON.stringify(t))),e.setAttribute("download","Tasks backup.json"),e.click()}},"Export")};var K=function(e){var t=e.tasks,a=e.updateTasks,n=e.setErrorMessage;return r.a.createElement("div",{className:"button-bar task"},r.a.createElement(F,{updateTasks:a,setErrorMessage:n}),r.a.createElement(U,{tasks:t}))};var L=function(){var e=Object(n.useState)(""),t=Object(s.a)(e,2),a=t[0],c=t[1],o=k(),i=Object(s.a)(o,2),l=i[0],m=i[1],d=function(e,t){var a=E(),r=Object(n.useState)(null),c=Object(s.a)(r,2),o=c[0],i=c[1],l=Object(n.useState)(0),m=Object(s.a)(l,2),d=m[0],f=m[1];if(Object(n.useEffect)((function(){u.a.get("".concat(j,"/tasks/")).then((function(e){a||i(e.data)})).catch((function(e){a||(e.response?t("The server responded with an error."):(t("Error connecting with the server. Please reload the tab."),console.error(e)))}))}),[a,d,t]),null!==o&&(o=o.sort((function(e,t){return t.timestamp-e.timestamp})),e.length)){var p=e.trim().toLowerCase().replace(/\s+/g," ").split(" ");p.length&&(o=o.filter((function(e){return p.every((function(t){return e.name.toLowerCase().includes(t)||e.project.toLowerCase().includes(t)}))})))}return[o,function(e){e&&i(e(o)),f(d+1)}]}(a,m),p=Object(s.a)(d,2),b=p[0],v=p[1],h=function(e){if(null===e)return[];var t=Object.create(null);return[e.reduce((function(e,a){return e.includes(a.project)?e:(t[a.project]=a.color,[].concat(Object(f.a)(e),[a.project]))}),[]),t]}(b),O=Object(s.a)(h,2),g=O[0],S=O[1];return r.a.createElement("div",{className:"task-container"},r.a.createElement(x,{searchQuery:a,setSearchQuery:c}),r.a.createElement(K,{tasks:b,updateTasks:v,setErrorMessage:m}),r.a.createElement(I,{projects:g,projectColors:S,updateTasks:v}),r.a.createElement("div",{style:{clear:"both"}}),l,null!==b?b.map((function(e){return r.a.createElement(R,{key:"".concat(e.project,"/").concat(e.name),task:e,selectProject:c,updateTasks:v,tasks:b})})):"",r.a.createElement("div",{style:{clear:"both"}}),r.a.createElement("div",{className:"footer task"},r.a.createElement(M,null),r.a.createElement("br",null),"Mauro Cano Brusa (c) 2019."," ",r.a.createElement("a",{href:"https://github.com/mauroc8/react-time-tracker"},"View source"),"."))};a(48);o.a.render(r.a.createElement(L,null),document.getElementById("root"))}},[[49,1,2]]]);
//# sourceMappingURL=main.c365334d.chunk.js.map