(function(e){function t(t){for(var a,r,l=t[0],d=t[1],s=t[2],u=0,m=[];u<l.length;u++)r=l[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&m.push(o[r][0]),o[r]=0;for(a in d)Object.prototype.hasOwnProperty.call(d,a)&&(e[a]=d[a]);i&&i(t);while(m.length)m.shift()();return n.push.apply(n,s||[]),c()}function c(){for(var e,t=0;t<n.length;t++){for(var c=n[t],a=!0,l=1;l<c.length;l++){var d=c[l];0!==o[d]&&(a=!1)}a&&(n.splice(t--,1),e=r(r.s=c[0]))}return e}var a={},o={app:0},n=[];function r(t){if(a[t])return a[t].exports;var c=a[t]={i:t,l:!1,exports:{}};return e[t].call(c.exports,c,c.exports,r),c.l=!0,c.exports}r.m=e,r.c=a,r.d=function(e,t,c){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(r.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(c,a,function(t){return e[t]}.bind(null,a));return c},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/Vue_hexSchool_class/Week05/dist/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var i=d;n.push([0,"chunk-vendors"]),c()})({0:function(e,t,c){e.exports=c("56d7")},"56d7":function(e,t,c){"use strict";c.r(t);c("e260"),c("e6cf"),c("cca6"),c("a79d");var a=c("7a23"),o={class:"container"},n={class:"row"};function r(e,t,c,r,l,d){var s=Object(a["resolveComponent"])("products-list"),i=Object(a["resolveComponent"])("cart-list"),u=Object(a["resolveComponent"])("user-form"),m=Object(a["resolveComponent"])("Loading");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createElementVNode"])("div",o,[Object(a["createElementVNode"])("div",n,[Object(a["createVNode"])(s,{products:l.products,onOnAddCart:d.onAddCart},null,8,["products","onOnAddCart"]),Object(a["createVNode"])(i,{cart:l.cart,onRemoveCartItem:d.removeCartItem,onUpdateCartItem:d.updateCart,onDeleteAll:d.deleteAllCarts},null,8,["cart","onRemoveCartItem","onUpdateCartItem","onDeleteAll"]),Object(a["createVNode"])(u,{ref:"form",onGetOrder:d.createOrder},null,8,["onGetOrder"])])]),Object(a["createVNode"])(m,{active:l.isLoading,"z-index":1060},null,8,["active"])],64)}c("99af");var l={class:"table align-middle"},d=Object(a["createElementVNode"])("thead",null,[Object(a["createElementVNode"])("tr",null,[Object(a["createElementVNode"])("th",null,"圖片"),Object(a["createElementVNode"])("th",null,"商品名稱"),Object(a["createElementVNode"])("th",null,"價格"),Object(a["createElementVNode"])("th")])],-1),s={key:0,class:"h5"},i={key:1,class:"h6"},u={key:2,class:"h5"},m={class:"btn-group btn-group-sm"},b=["onClick"],p=Object(a["createElementVNode"])("i",{class:"fas fa-spinner fa-pulse"},null,-1),O=Object(a["createTextVNode"])(" 查看更多 "),j=[p,O],f=["onClick"],h=Object(a["createElementVNode"])("i",{class:"fas fa-spinner fa-pulse"},null,-1),V=Object(a["createTextVNode"])(" 加到購物車 "),v=[h,V];function g(e,t,c,o,n,r){var p=Object(a["resolveComponent"])("product-modal");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createElementVNode"])("table",l,[d,Object(a["createElementVNode"])("tbody",null,[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(c.products,(function(e){return Object(a["openBlock"])(),Object(a["createElementBlock"])("tr",{key:e.id},[Object(a["createElementVNode"])("td",null,[Object(a["createElementVNode"])("div",{style:Object(a["normalizeStyle"])([{width:"200px",height:"100px","background-size":"cover","background-position":"center"},{backgroundImage:"url(".concat(e.imageUrl,")")}])},null,4)]),Object(a["createElementVNode"])("td",null,Object(a["toDisplayString"])(e.title),1),Object(a["createElementVNode"])("td",null,[e.price?Object(a["createCommentVNode"])("",!0):(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",s,Object(a["toDisplayString"])(e.origin_price)+" 元",1)),e.price?(Object(a["openBlock"])(),Object(a["createElementBlock"])("del",i,"原價 "+Object(a["toDisplayString"])(e.origin_price)+" 元",1)):Object(a["createCommentVNode"])("",!0),e.price?(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",u,"現在只要 "+Object(a["toDisplayString"])(e.price)+" 元",1)):Object(a["createCommentVNode"])("",!0)]),Object(a["createElementVNode"])("td",null,[Object(a["createElementVNode"])("div",m,[Object(a["createElementVNode"])("button",{type:"button",class:"btn btn-outline-secondary",onClick:function(t){return r.openProductModal(e.id)}},j,8,b),Object(a["createElementVNode"])("button",{type:"button",class:"btn btn-outline-danger",onClick:function(t){return r.AddToCart(e.id,1)}},v,8,f)])])])})),128))])]),Object(a["createVNode"])(p,{product:n.product,onAddToCart:r.AddToCart},null,8,["product","onAddToCart"])],64)}c("a4d3"),c("e01a");var N={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},E={class:"modal-dialog modal-xl",role:"document"},y={class:"modal-content border-0"},k={class:"modal-header bg-dark text-white"},C={class:"modal-title",id:"exampleModalLabel"},x=Object(a["createElementVNode"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),B={class:"modal-body"},w={class:"row"},S={class:"col-sm-6"},_=["src"],D={class:"col-sm-6"},M={class:"badge bg-primary rounded-pill"},T={key:0,class:"h5"},A={key:1,class:"h6"},$={key:2,class:"h5"},q={class:"input-group"};function L(e,t,c,o,n,r){return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",N,[Object(a["createElementVNode"])("div",E,[Object(a["createElementVNode"])("div",y,[Object(a["createElementVNode"])("div",k,[Object(a["createElementVNode"])("h5",C,[Object(a["createElementVNode"])("span",null,Object(a["toDisplayString"])(c.product.title),1)]),x]),Object(a["createElementVNode"])("div",B,[Object(a["createElementVNode"])("div",w,[Object(a["createElementVNode"])("div",S,[Object(a["createElementVNode"])("img",{class:"img-fluid",src:c.product.imageUrl,alt:""},null,8,_)]),Object(a["createElementVNode"])("div",D,[Object(a["createElementVNode"])("span",M,Object(a["toDisplayString"])(c.product.category),1),Object(a["createElementVNode"])("p",null,"商品描述："+Object(a["toDisplayString"])(c.product.description),1),Object(a["createElementVNode"])("p",null,"商品內容："+Object(a["toDisplayString"])(c.product.content),1),c.product.price?Object(a["createCommentVNode"])("",!0):(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",T,Object(a["toDisplayString"])(c.product.origin_price)+" 元 ",1)),c.product.price?(Object(a["openBlock"])(),Object(a["createElementBlock"])("del",A,"原價 "+Object(a["toDisplayString"])(c.product.origin_price)+" 元",1)):Object(a["createCommentVNode"])("",!0),c.product.price?(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",$," 現在只要 "+Object(a["toDisplayString"])(c.product.price)+" 元 ",1)):Object(a["createCommentVNode"])("",!0),Object(a["createElementVNode"])("div",null,[Object(a["createElementVNode"])("div",q,[Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{type:"number",class:"form-control","onUpdate:modelValue":t[0]||(t[0]=function(e){return n.qty=e}),min:"1"},null,512),[[a["vModelText"],n.qty,void 0,{number:!0}]]),Object(a["createElementVNode"])("button",{type:"button",class:"btn btn-primary",onClick:t[1]||(t[1]=function(t){return e.$emit("add-to-cart",c.product.id,n.qty)})}," 加入購物車 ")])])])])])])])],512)}var P={data:function(){return{qty:1}},emits:["add-to-cart"],props:["product"]},U=c("6b0d"),F=c.n(U);const I=F()(P,[["render",L]]);var z=I,W=c("7c2b"),G=c.n(W),J={data:function(){return{productModal:null,product:{}}},components:{ProductModal:z},emits:["on-add-cart","send-loading-Item"],props:["products"],methods:{openProductModal:function(e){var t=this;this.productModal.show();var c="".concat("https://vue3-course-api.hexschool.io/v2/","api/").concat("jin576tw-data","/product/").concat(e);this.$http.get(c).then((function(e){t.product=e.data.product}))},AddToCart:function(e,t){this.productModal.hide();var c={product_id:e,qty:t};this.$emit("on-add-cart",c)}},mounted:function(){this.productModal=new G.a(document.getElementById("productModal"))}};const R=F()(J,[["render",g]]);var H=R,K={class:"text-end"},Q={class:"table align-middle"},X=Object(a["createElementVNode"])("thead",null,[Object(a["createElementVNode"])("tr",null,[Object(a["createElementVNode"])("th"),Object(a["createElementVNode"])("th",null,"品名"),Object(a["createElementVNode"])("th",{style:{width:"150px"}},"數量/單位"),Object(a["createElementVNode"])("th",null,"單價")])],-1),Y=["onClick"],Z=Object(a["createElementVNode"])("i",{class:"fas fa-spinner fa-pulse"},null,-1),ee=Object(a["createTextVNode"])(" x "),te=[Z,ee],ce={key:0,class:"text-success"},ae={class:"input-group input-group-sm"},oe={class:"input-group mb-3"},ne=["onUpdate:modelValue","onBlur"],re={class:"input-group-text",id:"basic-addon2"},le={class:"text-end"},de={key:0,class:"text-success"},se=Object(a["createElementVNode"])("td",{colspan:"3",class:"text-end"},"總計",-1),ie={class:"text-end"},ue={key:0},me=Object(a["createElementVNode"])("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),be={class:"text-end text-success"};function pe(e,t,c,o,n,r){return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createElementVNode"])("div",K,[Object(a["createElementVNode"])("button",{class:"btn btn-outline-danger",type:"button",onClick:t[0]||(t[0]=function(t){return e.$emit("delete-all")})}," 清空購物車 ")]),Object(a["createElementVNode"])("table",Q,[X,Object(a["createElementVNode"])("tbody",null,[c.cart.carts?(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],{key:0},Object(a["renderList"])(c.cart.carts,(function(t){return Object(a["openBlock"])(),Object(a["createElementBlock"])("tr",{key:t.id},[Object(a["createElementVNode"])("td",null,[Object(a["createElementVNode"])("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:function(c){return e.$emit("remove-cart-item",t.id)}},te,8,Y)]),Object(a["createElementVNode"])("td",null,[Object(a["createTextVNode"])(Object(a["toDisplayString"])(t.product.title)+" ",1),t.coupon?(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",ce,"已套用優惠券")):Object(a["createCommentVNode"])("",!0)]),Object(a["createElementVNode"])("td",null,[Object(a["createElementVNode"])("div",ae,[Object(a["createElementVNode"])("div",oe,[Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{"onUpdate:modelValue":function(e){return t.qty=e},onBlur:function(c){return e.$emit("update-cart-item",t)},min:"1",type:"number",class:"form-control"},null,40,ne),[[a["vModelText"],t.qty,void 0,{number:!0}]]),Object(a["createElementVNode"])("span",re,Object(a["toDisplayString"])(t.product.unit),1)])])]),Object(a["createElementVNode"])("td",le,[c.cart.final_total!==c.cart.total?(Object(a["openBlock"])(),Object(a["createElementBlock"])("small",de,"折扣價：")):Object(a["createCommentVNode"])("",!0),Object(a["createTextVNode"])(" "+Object(a["toDisplayString"])(t.final_total),1)])])})),128)):Object(a["createCommentVNode"])("",!0)]),Object(a["createElementVNode"])("tfoot",null,[Object(a["createElementVNode"])("tr",null,[se,Object(a["createElementVNode"])("td",ie,Object(a["toDisplayString"])(c.cart.total),1)]),c.cart.final_total!==c.cart.total?(Object(a["openBlock"])(),Object(a["createElementBlock"])("tr",ue,[me,Object(a["createElementVNode"])("td",be,Object(a["toDisplayString"])(c.cart.final_total),1)])):Object(a["createCommentVNode"])("",!0)])])],64)}var Oe={emits:["remove-cart-item","update-cart-item","delete-all"],props:["cart"]};const je=F()(Oe,[["render",pe]]);var fe=je,he=(c("b0c0"),{class:"my-5 row justify-content-center"}),Ve={class:"mb-3"},ve=Object(a["createElementVNode"])("label",{for:"email",class:"form-label"},"Email",-1),ge={class:"mb-3"},Ne=Object(a["createElementVNode"])("label",{for:"name",class:"form-label"},"收件人姓名",-1),Ee={class:"mb-3"},ye=Object(a["createElementVNode"])("label",{for:"tel",class:"form-label"},"收件人電話",-1),ke={class:"mb-3"},Ce=Object(a["createElementVNode"])("label",{for:"address",class:"form-label"},"收件人地址",-1),xe={class:"mb-3"},Be=Object(a["createElementVNode"])("label",{for:"message",class:"form-label"},"留言",-1),we=Object(a["createElementVNode"])("div",{class:"text-end"},[Object(a["createElementVNode"])("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function Se(e,t,c,o,n,r){var l=Object(a["resolveComponent"])("Field"),d=Object(a["resolveComponent"])("error-message"),s=Object(a["resolveComponent"])("Form");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",he,[Object(a["createVNode"])(s,{class:"col-md-6",onSubmit:r.getOrder,ref:"form"},{default:Object(a["withCtx"])((function(e){var c=e.errors;return[Object(a["createElementVNode"])("div",Ve,[ve,Object(a["createVNode"])(l,{id:"email",name:"email",type:"email",class:Object(a["normalizeClass"])(["form-control",{"is-invalid":c["email"]}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:n.form.user.email,"onUpdate:modelValue":t[0]||(t[0]=function(e){return n.form.user.email=e})},null,8,["class","modelValue"]),Object(a["createVNode"])(d,{name:"email",class:"invalid-feedback"})]),Object(a["createElementVNode"])("div",ge,[Ne,Object(a["createVNode"])(l,{id:"name",name:"姓名",type:"text",class:Object(a["normalizeClass"])(["form-control",{"is-invalid":c["姓名"]}]),placeholder:"請輸入姓名",rules:"required",modelValue:n.form.user.name,"onUpdate:modelValue":t[1]||(t[1]=function(e){return n.form.user.name=e})},null,8,["class","modelValue"]),Object(a["createVNode"])(d,{name:"姓名",class:"invalid-feedback"})]),Object(a["createElementVNode"])("div",Ee,[ye,Object(a["createVNode"])(l,{id:"tel",name:"電話",type:"tel",class:Object(a["normalizeClass"])(["form-control",{"is-invalid":c["電話"]}]),placeholder:"請輸入電話",rules:"required",modelValue:n.form.user.tel,"onUpdate:modelValue":t[2]||(t[2]=function(e){return n.form.user.tel=e})},null,8,["class","modelValue"]),Object(a["createVNode"])(d,{name:"電話",class:"invalid-feedback"})]),Object(a["createElementVNode"])("div",ke,[Ce,Object(a["createVNode"])(l,{id:"address",name:"地址",type:"text",class:Object(a["normalizeClass"])(["form-control",{"is-invalid":c["地址"]}]),placeholder:"請輸入地址",rules:"required",modelValue:n.form.user.address,"onUpdate:modelValue":t[3]||(t[3]=function(e){return n.form.user.address=e})},null,8,["class","modelValue"]),Object(a["createVNode"])(d,{name:"地址",class:"invalid-feedback"})]),Object(a["createElementVNode"])("div",xe,[Be,Object(a["withDirectives"])(Object(a["createElementVNode"])("textarea",{name:"message",id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":t[4]||(t[4]=function(e){return n.form.message=e})},null,512),[[a["vModelText"],n.form.message]])]),we]})),_:1},8,["onSubmit"])])}var _e={data:function(){return{form:{user:{name:"",email:"",tel:"",address:""},message:""}}},emits:["get-order"],methods:{getOrder:function(){this.form&&(this.$emit("get-order",this.form),this.$refs.form.resetForm())}}};const De=F()(_e,[["render",Se]]);var Me=De,Te={name:"App",components:{ProductsList:H,CartList:fe,UserForm:Me},data:function(){return{products:[],cart:{},isLoading:!1}},methods:{getProducts:function(){var e=this,t="".concat("https://vue3-course-api.hexschool.io/v2/","api/").concat("jin576tw-data","/products/all");this.$http.get(t).then((function(t){e.products=t.data.products}))},getCart:function(){var e=this,t="".concat("https://vue3-course-api.hexschool.io/v2/","api/").concat("jin576tw-data","/cart");this.$http.get(t).then((function(t){e.cart=t.data.data}))},onAddCart:function(e){var t=this,c="".concat("https://vue3-course-api.hexschool.io/v2/","api/").concat("jin576tw-data","/cart");this.$http.post(c,{data:e}).then((function(e){alert(e.data.message),t.getCart()})).catch((function(e){alert(e.data.message)}))},removeCartItem:function(e){var t=this,c="".concat("https://vue3-course-api.hexschool.io/v2/","api/").concat("jin576tw-data","/cart/").concat(e);this.$http.delete(c).then((function(e){alert(e.data.message),t.getCart()})).catch((function(e){alert(e.data.message)}))},updateCart:function(e){var t=this,c="".concat("https://vue3-course-api.hexschool.io/v2/","api/").concat("jin576tw-data","/cart/").concat(e.id),a={product_id:e.product_id,qty:e.qty};this.$http.put(c,{data:a}).then((function(e){alert(e.data.message),t.getCart()})).catch((function(e){alert(e.data.message)}))},deleteAllCarts:function(){var e=this,t="".concat("https://vue3-course-api.hexschool.io/v2/","api/").concat("jin576tw-data","/carts");this.$http.delete(t).then((function(t){alert(t.data.message),e.getCart()})).catch((function(e){alert(e.data.message)}))},createOrder:function(e){var t=this,c="".concat("https://vue3-course-api.hexschool.io/v2/","api/").concat("jin576tw-data","/order");this.isLoading=!0,this.$http.post(c,{data:e}).then((function(e){t.isLoading=!1,alert(e.data.message),t.getCart()})).catch((function(e){t.isLoading=!1,alert(e.data.message)}))}},mounted:function(){this.getProducts(),this.getCart()}};c("66b6");const Ae=F()(Te,[["render",r]]);var $e=Ae,qe=c("bc3a"),Le=c.n(qe),Pe=c("130e"),Ue=(c("cd74"),c("7bb1")),Fe=c("3aa8"),Ie=c("cbdf"),ze=c("9457"),We=c("9062"),Ge=c.n(We);c("e40d");Object(Ue["e"])("required",Fe["c"]),Object(Ue["e"])("email",Fe["a"]),Object(Ue["e"])("min",Fe["b"]),Object(Ue["d"])({generateMessage:Object(Ie["a"])({zh_TW:ze}),validateOnInput:!0}),Object(Ie["b"])("zh_TW");var Je=Object(a["createApp"])($e);Je.component("Form",Ue["c"]),Je.component("Field",Ue["b"]),Je.component("ErrorMessage",Ue["a"]),Je.component("Loading",Ge.a),Je.use(Pe["a"],Le.a),Je.mount("#app")},"66b6":function(e,t,c){"use strict";c("b1a2")},b1a2:function(e,t,c){}});
//# sourceMappingURL=app.94a68662.js.map