(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0782c735"],{"1b01":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("h1",[e._v(e._s(e.id?"编辑":"新建")+"铭文")]),n("el-form",{attrs:{"label-width":"120px"},nativeOn:{submit:function(t){return t.preventDefault(),e.save(t)}}},[n("el-form-item",{attrs:{label:"名称"}},[n("el-input",{model:{value:e.model.name,callback:function(t){e.$set(e.model,"name",t)},expression:"model.name"}})],1),n("el-form-item",{attrs:{label:"图标"}},[n("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.uploadUrl,headers:e.getAuthHeaders(),"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.model.icon?n("img",{staticClass:"avatar",attrs:{src:e.model.icon}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),n("el-form-item",{attrs:{label:"功效1"}},[n("el-input",{model:{value:e.model.effect1,callback:function(t){e.$set(e.model,"effect1",t)},expression:"model.effect1"}})],1),n("el-form-item",{attrs:{label:"功效2"}},[n("el-input",{model:{value:e.model.effect2,callback:function(t){e.$set(e.model,"effect2",t)},expression:"model.effect2"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("保存\n      ")])],1)],1)],1)},s=[],a=(n("7f7f"),n("96cf"),n("3b8d")),i={props:{id:{type:String}},data:function(){return{model:{}}},methods:{save:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.model.name){e.next=5;break}return this.$message.warning("请先输入铭文名称再保存"),e.abrupt("return");case 5:if(this.model.icon){e.next=8;break}return this.$message.warning("请先上传铭文图标再保存"),e.abrupt("return");case 8:if(!this.id){e.next=14;break}return e.next=11,this.$http.put("rest/inscriptions/".concat(this.id),this.model);case 11:t=e.sent,e.next=17;break;case 14:return e.next=16,this.$http.post("rest/inscriptions",this.model);case 16:t=e.sent;case 17:this.$router.push("/inscriptions/list"),200===t.status&&this.$message({type:"success",message:"保存成功"});case 19:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),fetch:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$http.get("rest/inscriptions/".concat(this.id));case 2:t=e.sent,this.model=t.data;case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),handleAvatarSuccess:function(e){this.$set(this.model,"icon",e.url)},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type||"image/png"===e.type,n=e.size/1024/1024<2;return t||this.$message.error("上传铭文图片只能是JPG|PNG格式!"),n||this.$message.error("上传铭文图片大小不能超过 2MB!"),t&&n}},created:function(){this.id&&this.fetch()}},o=i,c=n("2877"),l=Object(c["a"])(o,r,s,!1,null,null,null);t["default"]=l.exports},"7f7f":function(e,t,n){var r=n("86cc").f,s=Function.prototype,a=/^\s*function ([^ (]*)/,i="name";i in s||n("9e1e")&&r(s,i,{configurable:!0,get:function(){try{return(""+this).match(a)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-0782c735.5d7a5c80.js.map