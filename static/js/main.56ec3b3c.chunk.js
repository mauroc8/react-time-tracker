(this["webpackJsonptime-tracker"]=this["webpackJsonptime-tracker"]||[]).push([[0],{23:function(e,t,a){e.exports=a(58)},57:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(20),o=a.n(c),s=a(1),i=a(4),l=a(2),u=a.n(l),m=a(21),f=a.n(m),p=a(22),d=function(e){return function(t){return e.name===t.name&&e.project===t.project}};function b(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){return function(){return r(!0)}}),[]),a}function k(){var e=Object(n.useState)(""),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(!0),i=Object(s.a)(o,2),l=i[0],u=i[1],m=r.a.createElement("div",{className:"error-message ".concat(l?"hidden":"")},a);return Object(n.useEffect)((function(){if(a){u(!1);var e=setTimeout((function(){u(!0),c(""),e=null}),3200);return function(){e&&clearTimeout(e)}}}),[a]),[m,c]}var h="https://mock.adapter.com",j=new f.a(u.a,{delayResponse:180});function v(e){localStorage.setItem("tasks",JSON.stringify(e)),function(e){var t=new Date;t.setFullYear(t.getFullYear()+6),document.cookie="tasks=".concat(escape(JSON.stringify(e)),";expires=").concat(t.toGMTString())}(e)}var E=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):function(){var e=document.cookie.match(/tasks=([^;]+)/),t=e&&unescape(e[1]);return t&&JSON.parse(t)}()||[];j.onGet("".concat(h,"/tasks/")).reply((function(e){return[200,E.slice()]})),j.onPost("".concat(h,"/tasks/")).reply((function(e){var t=JSON.parse(e.data);return E.some(d(t))?[403,{}]:(E.push(t),v(E),[200,{}])})),j.onPatch("".concat(h,"/tasks/")).reply((function(e){var t=JSON.parse(e.data),a=t.old_task,n=t.new_task,r=E.find(d(a));return!d(a)(n)&&E.some(d(n))?[405,{}]:void 0===r?[403,{}]:(Object.assign(r,n),v(E),[200,{}])})),j.onPost("".concat(h,"/delete-task/")).reply((function(e){var t=JSON.parse(e.data);return E.some(d(t))?(v(E=E.filter((function(e){return!d(t)(e)}))),[200,{}]):[403,{}]})),j.onPost("".concat(h,"/import-tasks/")).reply((function(e){var t=JSON.parse(e.data);return v(E=E.filter((function(e){return!t.some(d(e))})).concat(t)),[200,{}]}));var O=Boolean(Object({NODE_ENV:"production",PUBLIC_URL:"/react-time-tracker"}).REACT_APP_API)?Object({NODE_ENV:"production",PUBLIC_URL:"/react-time-tracker"}).REACT_APP_API.replace(/\/^/,""):h;function g(e){var t=e.getBoundingClientRect(),a=e.width=t.width,n=e.height=t.height,r=e.getContext("2d");return r.fillStyle="white",[r,a,n]}function y(e,t,a,n){var r=-Math.PI/2,c=2*Math.PI*n+r,o=[t/2,a/2];e.globalAlpha=.4,e.clearRect(0,0,t,a),e.beginPath(),e.moveTo.apply(e,o),e.arc.apply(e,o.concat([t/2,r,c])),e.fill(),e.globalAlpha=1,e.globalCompositeOperation="destination-out",e.beginPath(),e.moveTo.apply(e,o),e.arc.apply(e,o.concat([t/2-4,0,2*Math.PI])),e.fill(),e.globalCompositeOperation="source-over"}var w=function(e){var t=e.seconds,a=e.isTimerRunning,c=void 0!==a&&a,o=e.children,i=Object(n.useState)(t),l=Object(s.a)(i,2),u=l[0],m=l[1],f=Object(n.useRef)(null);return Object(n.useEffect)((function(){t%60===0&&m(t)}),[t]),Object(n.useEffect)((function(){c||m(t)}),[c,t]),Object(n.useEffect)((function(){if(f.current&&void 0===Object({NODE_ENV:"production",PUBLIC_URL:"/react-time-tracker"}).JEST_WORKER_ID){if(c)return function(e,t){var a=!0,n=g(e),r=Object(s.a)(n,3),c=r[0],o=r[1],i=r[2];requestAnimationFrame((function e(t){a&&requestAnimationFrame(e);var n=(t-l)/1e3;l=t,y(c,o,i,u+=n/60)}));var l=performance.now(),u=t%60/60;return function(){a=!1}}(f.current,u);!function(e,t){var a=g(e),n=Object(s.a)(a,3);y(n[0],n[1],n[2],t%60/60)}(f.current,u)}}),[c,u]),r.a.createElement("div",{className:"task-timer-container"},r.a.createElement("canvas",{ref:f,className:"task-timer"}),o)};function S(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function N(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?S(Object(a),!0).forEach((function(t){Object(i.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):S(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var C=function(e){return String(100+e%100).substr(1)};var P=function(e){var t=e.task,a=e.editTask,c=e.updateTasks,o=e.selectProject,i=e.tasks,l=e.onPlayStart,m=Object(n.useState)(t.seconds),f=Object(s.a)(m,2),p=f[0],h=f[1],j=Math.floor(p/60)%60,v=Math.floor(p/60/60),E=Object(n.useState)(!1),g=Object(s.a)(E,2),y=g[0],S=g[1],P=Object(n.useState)(null),T=Object(s.a)(P,2),_=T[0],I=T[1],D=Object(n.useState)(t.seconds),x=Object(s.a)(D,2),A=x[0],R=x[1],M=k(),L=Object(s.a)(M,2),J=L[0],F=L[1],B=b();Object(n.useEffect)((function(){if(y){var e=setInterval((function(){h(Math.floor(A+Date.now()/1e3-_))}),1e3);return function(){return clearInterval(e)}}h(A)}),[y,A,_]),Object(n.useEffect)((function(){y&&I(Date.now()/1e3)}),[y]),Object(n.useEffect)((function(){y||R(t.seconds)}),[y,t.seconds]);var U=Object(n.useCallback)((function(e){u.a.patch("".concat(O,"/tasks/"),{old_task:{name:t.name,project:t.project},new_task:N({},t,{seconds:p})}).then((function(t){e&&e()})).catch((function(e){e.response&&405===e.response.status?F("Somehow, we tried to change this task name to an invalid one."):e.response&&403===e.response.status?F("Invalid request: this task doesn't exist anymore."):(F("Error connecting with the server."),console.error(e))}))}),[t,p,F]);function q(){U((function(){c((function(e){return e.map((function(e){return e.name===t.name&&e.project===t.project?N({},t,{seconds:p}):e}))})),B||S(!1)}))}return Object(n.useEffect)((function(){y&&p!==t.seconds&&p%60===0&&U()}),[y,U,p,t.seconds]),Object(n.useEffect)((function(){if(y)return window.onbeforeunload=function(e){return"There's a task running. You'll loose the timer progress."},function(){return window.onbeforeunload=void 0}}),[y]),r.a.createElement("div",{draggable:!0,onDragStart:function(e){e.dataTransfer.setData("text/plain","".concat(t.name,"/").concat(t.project))},onDragOver:function(e){return e.preventDefault()},onDrop:function(e){e.preventDefault();var a=e.dataTransfer.getData("text").split("/"),n=Object(s.a)(a,2);!function(e){var a=i.findIndex(d(e)),n=i.findIndex(d(t));if(-1!==a&&-1!==n){var r;r=a<n?n>=i.length-1?t.timestamp-9e3:i[n+1].timestamp:n>0?i[n-1].timestamp:Date.now();var o=Math.floor((t.timestamp+r)/2),s=i.find(d(e));u.a.patch("".concat(O,"/tasks/"),{old_task:e,new_task:N({},s,{timestamp:o})}).then((function(e){c()})).catch((function(e){e.response&&405===e.response.status?F("Somehow, we tried to change this task name to an invalid one."):e.response&&403===e.response.status?F("Invalid request: This task doesn't exist anymore."):(F("Error connecting with the server."),console.error(e))}))}}({name:n[0],project:n[1]})},className:"task",style:{"--task-color":t.color}},r.a.createElement("div",{className:"task-head"},r.a.createElement(w,{seconds:p,isTimerRunning:y},y?r.a.createElement("button",{className:"stop",onClick:function(){q()}},r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_pause_white_24dp.png"),alt:"Stop timer",title:"Stop timer"})):r.a.createElement("button",{className:"start",onClick:function(){S(!0),l()}},r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_play_arrow_white_24dp.png"),alt:"Start timer",title:"Start timer"})))),r.a.createElement("div",{className:"task-body"},r.a.createElement("div",{className:"float-left"},r.a.createElement("h3",null,t.name),C(v),":",C(j)," - ",r.a.createElement("span",{className:"clickable",onClick:function(){return o(t.project)}},t.project),J),r.a.createElement("div",{className:"task-foot"},r.a.createElement("button",{className:"edit",onClick:function(){y&&q(),a()}},"Edit"))))};function T(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function _(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?T(Object(a),!0).forEach((function(t){Object(i.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):T(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var I=function(e){return function(t){return e(t.target.value)}};var D=function(e){var t=e.task,a=e.cancelEdition,c=e.updateTasks,o=Object(n.useState)(t.name),i=Object(s.a)(o,2),l=i[0],m=i[1],f=Object(n.useState)(Math.floor(t.seconds/60)%60),p=Object(s.a)(f,2),d=p[0],h=p[1],j=Object(n.useState)(Math.floor(t.seconds/60/60)),v=Object(s.a)(j,2),E=v[0],g=v[1],y=b(),S=Object(n.useState)(!1),N=Object(s.a)(S,2),C=N[0],P=N[1],T=k(),D=Object(s.a)(T,2),x=D[0],A=D[1];function R(){u.a.patch("".concat(O,"/tasks/"),{old_task:{name:t.name,project:t.project},new_task:_({},t,{name:l,seconds:60*E*60+60*d})}).then((function(e){y||a(),c()})).catch((function(e){e.response&&405===e.response.status?A("A task with that name already exists."):e.response&&403===e.response.status?A("Invalid request: this task doesn't exist anymore!"):(A("Error connecting with the server."),console.error(e))}))}var M=function(e){return r.a.createElement("button",{className:"confirm",onClick:R,disabled:!l},e)};return r.a.createElement("div",{className:"task",style:{"--task-color":t.color}},r.a.createElement("div",{className:"task-head"},r.a.createElement(w,{seconds:t.seconds},M(r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_edit_white_24dp.png"),alt:"Edit task",title:"Edit task"})))),r.a.createElement("div",{className:"task-body"},r.a.createElement("h3",null,r.a.createElement("input",{type:"text",placeholder:"Task name",value:l,onChange:I(m)})),r.a.createElement("input",{type:"number",min:0,value:E,onChange:I(g)}),":",r.a.createElement("input",{type:"number",min:0,max:60,value:d,onChange:I(h)}),x),r.a.createElement("div",{className:"task-foot"},M("Edit task"),r.a.createElement("button",{className:"cancel",onClick:a},"Cancel"),r.a.createElement("button",{className:"delete",onClick:function(){C?u.a.post("".concat(O,"/delete-task/"),{name:t.name,project:t.project}).then((function(e){y||a(),c((function(e){return e.filter((function(e){return t.name!==e.name||t.project!==e.project}))}))})).catch((function(e){e.response&&403===e.response.status?A("Invalid request: the task was already deleted!"):(A("Error connecting with the server."),console.error(e))})):P(!0)}},C?"Delete?":"Delete")))};var x=function(e){var t=e.task,a=e.updateTasks,c=e.selectProject,o=e.tasks,i=Object(n.useState)(!1),l=Object(s.a)(i,2),u=l[0],m=l[1],f=Object(n.useState)(!Boolean(localStorage.getItem("hasShownATask"))),p=Object(s.a)(f,2),d=p[0],b=p[1];Object(n.useEffect)((function(){d||localStorage.setItem("hasShownATask","1")}),[d]);var k=o?o.length:null;return Object(n.useEffect)((function(){null!==k&&k>1&&b(!1)}),[k]),u?r.a.createElement(D,{task:t,cancelEdition:function(){return m(!1)},updateTasks:a}):r.a.createElement(r.a.Fragment,null,d?r.a.createElement("div",{className:"first-time-notice",style:{"--task-color":t.color}},"Now you can hit play to begin tracking the time you spend on"," ",r.a.createElement("b",null,t.name),"."):"",r.a.createElement(P,{task:t,editTask:function(){b(!1),m(!0)},onPlayStart:function(){b(!1)},updateTasks:a,selectProject:c,tasks:o}))},A=function(e){return function(t){return e(t.target.value)}},R=["#6d7502","#1fad13","#c60d8f","#5577ff","#ff3344"];var M=function(e){var t=e.projects,a=e.projectColors,c=e.onCreate,o=e.onCancel,i=e.isFirstTime,l=Object(n.useState)(""),m=Object(s.a)(l,2),f=m[0],p=m[1],d=Object(n.useState)(t[0]||""),b=Object(s.a)(d,2),h=b[0],j=b[1],v=Object(n.useState)(""),E=Object(s.a)(v,2),g=E[0],y=E[1],S=Object(n.useState)(R[Math.floor(Math.random()*R.length)]),N=Object(s.a)(S,2),C=N[0],P=N[1],T=h?a[h]:C,_=k(),I=Object(s.a)(_,2),D=I[0],x=I[1];Object(n.useEffect)((function(){0===t.length&&j("")}),[t.length]);var M=function(e){return r.a.createElement("button",{className:"confirm",disabled:!f||!(h||g)},e)};return r.a.createElement("form",{className:"task",onSubmit:function(e){e.preventDefault(),u.a.post("".concat(O,"/tasks/"),{name:f,project:h||g,color:T,seconds:0,timestamp:Date.now()}).then(c).catch((function(e){e.response&&403===e.response.status?x("The task already exists!"):(x("Error connecting with the server."),console.error(e))}))},style:{"--task-color":T}},i?r.a.createElement("div",{className:"first-time-notice"},"Start by creating a task. Just anything you're working on."):"",r.a.createElement("div",{className:"task-head"},r.a.createElement(w,{seconds:0},M(r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_add_white_24dp.png"),alt:"Create task",title:"Create task"})))),r.a.createElement("div",{className:"task-body"},r.a.createElement("h3",null,r.a.createElement("input",{type:"text",id:"task-name",placeholder:"Task name",value:f,onChange:A(p)})),t.length?r.a.createElement(r.a.Fragment,null,r.a.createElement("select",{id:"project-name",value:h,onChange:A(j)},t.map((function(e){return r.a.createElement("option",{key:e,value:e,style:{"--task-color":a[e]}},e)})),r.a.createElement("option",{value:"",style:{"--task-color":C,fontStyle:"italic"}},"New project")),r.a.createElement("br",null)):"",""!==h&&t.length?"":r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{type:"text",id:"new-project-name",placeholder:"Project name",value:g,onChange:A(y)}),r.a.createElement("input",{type:"color",id:"new-project-color",value:C,onChange:A(P)})),D),r.a.createElement("div",{className:"task-foot"},M("Create task"),r.a.createElement("button",{className:"cancel",onClick:o},"Cancel")))};function L(e){var t=e.projects,a=e.projectColors,c=e.updateTasks,o=Object(n.useState)(!Boolean(localStorage.getItem("hasCreatedATask"))),i=Object(s.a)(o,2),l=i[0],u=i[1],m=Object(n.useState)(l),f=Object(s.a)(m,2),p=f[0],d=f[1];Object(n.useEffect)((function(){!1===l&&localStorage.setItem("hasCreatedATask","1")}),[l]);var b=t?t.length:null;return Object(n.useEffect)((function(){0===b?d(!0):null!==b&&b>0&&u(!1)}),[b]),p&&t?r.a.createElement(M,{projects:t,projectColors:a,onCreate:function(){u(!1),d(!1),c()},onCancel:function(){return d(!1)},isFirstTime:l}):r.a.createElement("button",{className:"task task-head new-task",onClick:function(){return d(!0)}},"New task")}var J=function(e){return function(t){return e(t.target.value)}};var F=function(e){var t=e.searchQuery,a=e.setSearchQuery,c=Object(n.useRef)(null);return Object(n.useEffect)((function(){function e(e){"Escape"===e.key&&(a(""),c&&c.current.focus())}return window.addEventListener("keydown",e),function(){return window.removeEventListener("keydown",e)}}),[a]),Object(n.useEffect)((function(){c&&c.current.focus()}),[t]),r.a.createElement("div",{className:"search-bar"},r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_search_black_18dp.png"),alt:"",onClick:function(){c.current&&c.current.focus()}}),r.a.createElement("input",{type:"text",value:t,onChange:J(a),ref:c}),r.a.createElement("img",{src:"".concat("/react-time-tracker","/baseline_close_black_18dp.png"),alt:"",style:{right:"2px"},onClick:function(){a("")}}))};var B=function(){var e=Object(n.useState)(Boolean(localStorage.getItem("understood-local-storage-notice"))),t=Object(s.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){a&&localStorage.setItem("understood-local-storage-notice","1")}),[a]),void 0!==Object({NODE_ENV:"production",PUBLIC_URL:"/react-time-tracker"}).REACT_APP_API?r.a.createElement(r.a.Fragment,null):a?r.a.createElement(r.a.Fragment,null):r.a.createElement("div",{className:"local-storage-notice"},r.a.createElement("div",null,"This site uses both ",r.a.createElement("b",null,"cookies")," and ",r.a.createElement("b",null,"localStorage")," to store your user data (it should be safe unless you decide to clear your cache). Any data you provide is saved on your current browser and device ",r.a.createElement("i",null,"only"),". The server doesn't store any data whatsoever, so you're adviced to keep regular backups using the Export function."),r.a.createElement("button",{onClick:function(){return c(!0)}},"I understand"))};var U=function(e){var t=e.updateTasks,a=e.setErrorMessage;return r.a.createElement("button",{className:"import-tasks",onClick:function(){var e=document.createElement("input");function n(e){var n=e.target.result;if(n&&n.length){var r;try{r=JSON.parse(n)}catch(c){return void a("The file is invalid or corrupted.")}u.a.post("".concat(O,"/import-tasks/"),r).then((function(e){t()})).catch((function(e){e.response?a("There was an error importing tasks."):a("There was an error connecting to the server.")}))}}e.type="file",e.accept=".json",e.click(),e.addEventListener("change",(function(){if(e.files.length){var t=new FileReader,a=e.files[0];t.readAsText(a),t.addEventListener("load",n)}}))}},"Import")};var q=function(e){var t=e.tasks;return r.a.createElement("button",{className:"export-tasks",onClick:function(){var e=document.createElement("a");e.setAttribute("href","data:text/plain;charset=utf-u,"+encodeURIComponent(JSON.stringify(t))),e.setAttribute("download","Tasks backup.json"),e.click()}},"Export")};var V=function(e){var t=e.tasks,a=e.updateTasks,n=e.setErrorMessage;return r.a.createElement("div",{className:"button-bar task"},r.a.createElement(U,{updateTasks:a,setErrorMessage:n}),r.a.createElement(q,{tasks:t}))};var Q=function(){var e=Object(n.useState)(""),t=Object(s.a)(e,2),a=t[0],c=t[1],o=k(),i=Object(s.a)(o,2),l=i[0],m=i[1],f=function(e,t){var a=b(),r=Object(n.useState)(null),c=Object(s.a)(r,2),o=c[0],i=c[1],l=Object(n.useState)(0),m=Object(s.a)(l,2),f=m[0],p=m[1];if(Object(n.useEffect)((function(){u.a.get("".concat(O,"/tasks/")).then((function(e){a||i(e.data)})).catch((function(e){a||(e.response?t("The server responded with an error."):(t("Error connecting with the server. Please reload the tab."),console.error(e)))}))}),[a,f,t]),null!==o&&(o=o.sort((function(e,t){return t.timestamp-e.timestamp})),e.length)){var d=e.trim().toLowerCase().replace(/\s+/g," ").split(" ");d.length&&(o=o.filter((function(e){return d.every((function(t){return e.name.toLowerCase().includes(t)||e.project.toLowerCase().includes(t)}))})))}return[o,function(e){e&&i(e(o)),p(f+1)}]}(a,m),d=Object(s.a)(f,2),h=d[0],j=d[1],v=function(e){if(null===e)return[];var t=Object.create(null);return[e.reduce((function(e,a){return e.includes(a.project)?e:(t[a.project]=a.color,[].concat(Object(p.a)(e),[a.project]))}),[]),t]}(h),E=Object(s.a)(v,2),g=E[0],y=E[1];return r.a.createElement("div",{className:"task-container"},r.a.createElement(F,{searchQuery:a,setSearchQuery:c}),r.a.createElement(V,{tasks:h,updateTasks:j,setErrorMessage:m}),r.a.createElement(L,{projects:g,projectColors:y,updateTasks:j}),r.a.createElement("div",{style:{clear:"both"}}),l,null!==h?h.map((function(e){return r.a.createElement(x,{key:"".concat(e.project,"/").concat(e.name),task:e,selectProject:c,updateTasks:j,tasks:h})})):"",r.a.createElement("div",{style:{clear:"both"}}),r.a.createElement("div",{className:"footer task"},r.a.createElement(B,null),r.a.createElement("br",null),"Mauro Cano Brusa (c) 2019."," ",r.a.createElement("a",{href:"https://github.com/mauroc8/react-time-tracker"},"View source"),"."))};a(57);o.a.render(r.a.createElement(Q,null),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.56ec3b3c.chunk.js.map