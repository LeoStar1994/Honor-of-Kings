(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-81f265aa"],{"62ee":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v("铭文列表")]),n("el-table",{attrs:{data:t.inscriptions}},[n("el-table-column",{attrs:{prop:"_id",label:"ID",width:"240"}}),n("el-table-column",{attrs:{prop:"name",label:"铭文名称"}}),n("el-table-column",{attrs:{prop:"icon",label:"图标"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("img",{staticStyle:{height:"3rem"},attrs:{src:t.row.icon}})]}}])}),n("el-table-column",{attrs:{prop:"effect1",label:"功效1"}}),n("el-table-column",{attrs:{prop:"effect2",label:"功效2"}}),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.$router.push("/inscriptions/edit/"+e.row._id)}}},[t._v("编辑\n        ")]),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return t.remove(e.row)}}},[t._v("删除\n        ")])]}}])})],1)],1)},a=[],c=(n("7f7f"),n("96cf"),n("3b8d")),i={data:function(){return{inscriptions:[]}},methods:{fetch:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$http.get("rest/inscriptions");case 2:e=t.sent,this.inscriptions=e.data;case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),remove:function(t){var e=this;this.$confirm('是否确定要删除分类 "'.concat(t.name,'"'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(c["a"])(regeneratorRuntime.mark(function n(){var r,a,c,i;return regeneratorRuntime.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.delete("rest/inscriptions/".concat(t._id));case 2:r=n.sent,a=r.data,c=a.code,i=a.desc,200===c?(e.$message({type:"success",message:i}),e.fetch()):e.$message({type:"warning",message:"删除失败"});case 5:case"end":return n.stop()}},n)})))}},created:function(){this.fetch()}},s=i,o=n("2877"),u=Object(o["a"])(s,r,a,!1,null,null,null);e["default"]=u.exports},"7f7f":function(t,e,n){var r=n("86cc").f,a=Function.prototype,c=/^\s*function ([^ (]*)/,i="name";i in a||n("9e1e")&&r(a,i,{configurable:!0,get:function(){try{return(""+this).match(c)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=chunk-81f265aa.94b78c9c.js.map