(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51efaec7"],{5434:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v("召唤师技能列表")]),n("el-table",{attrs:{data:t.skills}},[n("el-table-column",{attrs:{prop:"_id",label:"ID",width:"240"}}),n("el-table-column",{attrs:{prop:"name",label:"名称"}}),n("el-table-column",{attrs:{prop:"icon",label:"图标"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("img",{staticStyle:{height:"3rem"},attrs:{src:t.row.icon}})]}}])}),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.$router.push("/skills/edit/"+e.row._id)}}},[t._v("编辑\n        ")]),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.remove(e.row)}}},[t._v("删除\n        ")])]}}])})],1)],1)},a=[],s=(n("7f7f"),n("96cf"),n("3b8d")),c={data:function(){return{skills:[]}},methods:{fetch:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$http.get("rest/skills");case 2:e=t.sent,this.skills=e.data;case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),remove:function(t){var e=this;this.$confirm('是否确定要删除分类 "'.concat(t.name,'"'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark(function n(){var r,a,s,c;return regeneratorRuntime.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.delete("rest/skills/".concat(t._id));case 2:r=n.sent,a=r.data,s=a.code,c=a.desc,200===s?(e.$message({type:"success",message:c}),e.fetch()):e.$message({type:"warning",message:"删除失败"});case 5:case"end":return n.stop()}},n)})))}},created:function(){this.fetch()}},i=c,o=n("2877"),l=Object(o["a"])(i,r,a,!1,null,null,null);e["default"]=l.exports},"7f7f":function(t,e,n){var r=n("86cc").f,a=Function.prototype,s=/^\s*function ([^ (]*)/,c="name";c in a||n("9e1e")&&r(a,c,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=chunk-51efaec7.17657e96.js.map