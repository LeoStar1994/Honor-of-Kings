(function(e){function t(t){for(var r,a,c=t[0],u=t[1],l=t[2],s=0,p=[];s<c.length;s++)a=c[s],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);f&&f(t);while(p.length)p.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},o={app:0},i=[];function c(e){return u.p+"js/"+({about:"about"}[e]||e)+"."+{about:"8e2b16f2","chunk-127e1120":"1f4cc95c","chunk-2ae570e4":"fa9c91ed","chunk-406a5fcd":"21161371"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-127e1120":1,"chunk-2ae570e4":1,"chunk-406a5fcd":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({about:"about"}[e]||e)+"."+{about:"31d6cfe0","chunk-127e1120":"0a66a938","chunk-2ae570e4":"d84ae054","chunk-406a5fcd":"cb17e800"}[e]+".css",o=u.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var l=i[c],s=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(s===r||s===o))return t()}var p=document.getElementsByTagName("style");for(c=0;c<p.length;c++){l=p[c],s=l.getAttribute("data-href");if(s===r||s===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],f.parentNode.removeChild(f),n(i)},f.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(f)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=i);var l,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=c(e);var p=new Error;l=function(t){s.onerror=s.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",p.name="ChunkLoadError",p.type=r,p.request=a,n[1](p)}o[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:s})}),12e4);s.onerror=s.onload=l,document.head.appendChild(s)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var p=0;p<l.length;p++)t(l[p]);var f=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"06b3":function(e,t,n){"use strict";var r=n("a6b5"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("96dd"),n("a60a"),n("e783"),n("8b1f");var r=n("6e6d"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],i=n("4e82"),c={},u=Object(i["a"])(c,a,o,!1,null,null,null),l=u.exports,s=n("6fe8"),p=n.n(s),f=(n("78a7"),n("be35"),n("c478")),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"main-page"},[e._m(0),n("nav",{staticClass:"bg-primary pt-3 pb-2"},[n("ul",{staticClass:"d-flex text-white jc-around pb-1"},e._l(e.navLinks,(function(t,r){return n("router-link",{key:r,class:["nav-link",{active:e.navLinkIndex===r}],attrs:{tag:"li",to:t.url},nativeOn:{click:function(t){return function(){return e.navLinkIndex=r}()}}},[e._v("\n        "+e._s(t.linkName)+"\n      ")])})),1)]),n("keep-alive",[n("router-view")],1)],1)},h=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"topbar bg-black px-4 py-2 d-flex ai-center"},[r("img",{attrs:{src:n("cf05"),height:"30"}}),r("div",{staticClass:"flex-1 px-2"},[r("p",{staticClass:"text-white"},[e._v("王者荣耀")]),r("span",{staticClass:"fz-8 text-gray-1"},[e._v("团队成就更多")])]),r("button",{staticClass:"btn bg-primary fz-10",attrs:{type:"button"}},[e._v("立即下载")])])}],b={data:function(){return{navLinks:[{url:"/",linkName:"首页"},{url:"/",linkName:"攻略中心"},{url:"/",linkName:"赛事中心"}],navLinkIndex:0}}},v=b,m=(n("06b3"),Object(i["a"])(v,d,h,!1,null,"28804c52",null)),g=m.exports;r["a"].use(f["a"]);var y=new f["a"]({routes:[{path:"/",component:g,children:[{path:"/",name:"home",component:function(){return n.e("chunk-127e1120").then(n.bind(null,"bb51"))}},{path:"/articles/:id",name:"article",component:function(){return n.e("chunk-406a5fcd").then(n.bind(null,"3ad6"))},props:!0}]},{path:"/heroes/:id",name:"heroes",component:function(){return n.e("chunk-2ae570e4").then(n.bind(null,"5d88"))},props:!0},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}]}),k=y,_=(n("664d"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card bg-white p-3 mt-3"},[n("div",{staticClass:"card-header d-flex ai-center",class:{"border-bottom":!e.plain,"pb-3":!e.plain}},[n("i",{staticClass:"iconfont fz-12 fw-700 pr-2",class:"icon-"+e.icon}),n("h3",{staticClass:"flex-1",class:{"fw-700":e.plain,"fz-16":e.plain}},[e._v(e._s(e.title))]),e.plain?e._e():n("i",{staticClass:"iconfont icon-more fz-22 text-right"})]),n("div",{staticClass:"card-body pt-3"},[e._t("default")],2)])}),w=[],x={props:{title:{type:String,required:!0},icon:{type:String,required:!0},plain:{type:Boolean}}},C=x,O=Object(i["a"])(C,_,w,!1,null,null,null),E=O.exports,j=n("2427"),L=n.n(j),P=n("4fd2"),S=n.n(P);r["a"].config.productionTip=!1,r["a"].use(p.a),r["a"].component("m-card",E),r["a"].prototype.$http=L.a.create({baseURL:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API_URL||"/web/api"}),r["a"].filter("date",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"MM/DD";return S()(e).format(t)})),new r["a"]({router:k,render:function(e){return e(l)}}).$mount("#app")},"78a7":function(e,t,n){},a6b5:function(e,t,n){},be35:function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"img/logo.fc64bf07.png"}});
//# sourceMappingURL=app.7f38fb3d.js.map