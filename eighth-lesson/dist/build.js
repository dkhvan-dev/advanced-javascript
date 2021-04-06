(()=>{"use strict";var t={187:t=>{var e,n="object"==typeof Reflect?Reflect:null,r=n&&"function"==typeof n.apply?n.apply:function(t,e,n){return Function.prototype.apply.call(t,e,n)};e=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var o=Number.isNaN||function(t){return t!=t};function i(){i.init.call(this)}t.exports=i,t.exports.once=function(t,e){return new Promise((function(n,r){function o(n){t.removeListener(e,i),r(n)}function i(){"function"==typeof t.removeListener&&t.removeListener("error",o),n([].slice.call(arguments))}v(t,e,i,{once:!0}),"error"!==e&&function(t,e,n){"function"==typeof t.on&&v(t,"error",e,{once:!0})}(t,o)}))},i.EventEmitter=i,i.prototype._events=void 0,i.prototype._eventsCount=0,i.prototype._maxListeners=void 0;var s=10;function a(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function c(t){return void 0===t._maxListeners?i.defaultMaxListeners:t._maxListeners}function d(t,e,n,r){var o,i,s,d;if(a(n),void 0===(i=t._events)?(i=t._events=Object.create(null),t._eventsCount=0):(void 0!==i.newListener&&(t.emit("newListener",e,n.listener?n.listener:n),i=t._events),s=i[e]),void 0===s)s=i[e]=n,++t._eventsCount;else if("function"==typeof s?s=i[e]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(o=c(t))>0&&s.length>o&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=t,u.type=e,u.count=s.length,d=u,console&&console.warn&&console.warn(d)}return t}function u(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function l(t,e,n){var r={fired:!1,wrapFn:void 0,target:t,type:e,listener:n},o=u.bind(r);return o.listener=n,r.wrapFn=o,o}function p(t,e,n){var r=t._events;if(void 0===r)return[];var o=r[e];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}(o):f(o,o.length)}function h(t){var e=this._events;if(void 0!==e){var n=e[t];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t[r];return n}function v(t,e,n,r){if("function"==typeof t.on)r.once?t.once(e,n):t.on(e,n);else{if("function"!=typeof t.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof t);t.addEventListener(e,(function o(i){r.once&&t.removeEventListener(e,o),n(i)}))}}Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(t){if("number"!=typeof t||t<0||o(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");s=t}}),i.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},i.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||o(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},i.prototype.getMaxListeners=function(){return c(this)},i.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);var o="error"===t,i=this._events;if(void 0!==i)o=o&&void 0===i.error;else if(!o)return!1;if(o){var s;if(e.length>0&&(s=e[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var c=i[t];if(void 0===c)return!1;if("function"==typeof c)r(c,this,e);else{var d=c.length,u=f(c,d);for(n=0;n<d;++n)r(u[n],this,e)}return!0},i.prototype.addListener=function(t,e){return d(this,t,e,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(t,e){return d(this,t,e,!0)},i.prototype.once=function(t,e){return a(e),this.on(t,l(this,t,e)),this},i.prototype.prependOnceListener=function(t,e){return a(e),this.prependListener(t,l(this,t,e)),this},i.prototype.removeListener=function(t,e){var n,r,o,i,s;if(a(e),void 0===(r=this._events))return this;if(void 0===(n=r[t]))return this;if(n===e||n.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete r[t],r.removeListener&&this.emit("removeListener",t,n.listener||e));else if("function"!=typeof n){for(o=-1,i=n.length-1;i>=0;i--)if(n[i]===e||n[i].listener===e){s=n[i].listener,o=i;break}if(o<0)return this;0===o?n.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(n,o),1===n.length&&(r[t]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",t,s||e)}return this},i.prototype.off=i.prototype.removeListener,i.prototype.removeAllListeners=function(t){var e,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[t]),this;if(0===arguments.length){var o,i=Object.keys(n);for(r=0;r<i.length;++r)"removeListener"!==(o=i[r])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=n[t]))this.removeListener(t,e);else if(void 0!==e)for(r=e.length-1;r>=0;r--)this.removeListener(t,e[r]);return this},i.prototype.listeners=function(t){return p(this,t,!0)},i.prototype.rawListeners=function(t){return p(this,t,!1)},i.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):h.call(t,e)},i.prototype.listenerCount=h,i.prototype.eventNames=function(){return this._eventsCount>0?e(this._events):[]}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}(()=>{const t=new(n(187).EventEmitter);new Vue({el:"#app",data:{search:"",goods:[],filteredGoods:[],cart:[],cartCount:0,isCartOpen:!1,addGoodPrices:[],deletedGoodsFromCart:[],totalCost:0,errorRequest:!1,buttons:[]},methods:{makeGETRequest:t=>new Promise(((e,n)=>{let r=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject;r.open("GET",t,!0),r.onload=function(){e(JSON.parse(r.responseText))},r.onerror=()=>n(r.statusText),r.send()})),makePOSTRequest:(t,e)=>new Promise(((n,r)=>{let o=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject;o.open("POST",t,!0),o.setRequestHeader("Content-Type","application/json; charset=UTF-8"),o.onload=()=>n(JSON.parse(o.responseText)),o.onerror=()=>r(o.statusText),o.send(JSON.stringify(e))})),searchHandler(){""===this.search&&(this.filteredGoods=this.goods);const t=new RegExp(this.search,"gi");this.filteredGoods=this.goods.filter((e=>t.test(e.title)))},addToCart(t){const e=t.target.id;let n;this.filteredGoods.forEach((t=>{e==t.id&&(n={id:t.id,title:t.title,price:t.price,src:t.src,quantity:t.quantity})})),this.cart.push(n),t.target.classList.add("inCart"),this.totalCostCalc()},addItemToCart(t){const e=t.target.dataset.index;this.filteredGoods.forEach((t=>{this.cart[e].id==t.id&&this.cart[e].quantity++})),this.cartCount++,this.totalCostCalc(),this.makePOSTRequest("/updateCart",this.cart)},deleteFromCart(t){this.buttons=document.querySelectorAll(".add-good-to-cart");const e=t.target.dataset.index;this.buttons.forEach((t=>{this.cart[e].id==t.id&&1==this.cart[e].quantity&&t.classList.remove("inCart")})),this.cart[e].quantity>1?this.cart[e].quantity--:1==this.cart[e].quantity&&this.cart.splice(e,1),this.cartCount--,this.totalCostCalc(),this.makePOSTRequest("/updateCart",this.cart)},totalCostCalc(){console.log(this.cart);let t=0;this.cart.forEach((e=>{void 0!==e.price&&(t+=e.price*e.quantity)})),this.totalCost=t},openCartHandler(){this.isCartOpen=!this.isCartOpen}},async created(){try{t.on("addToBasket",this.addToCart.bind(this)),t.on("addItemToBasket",this.addItemToCart.bind(this)),t.on("deleteItemFromBasket",this.deleteFromCart.bind(this)),this.goods=await this.makeGETRequest("/catalog"),this.filteredGoods=this.goods,this.cart=await this.makeGETRequest("/cart"),this.totalCostCalc(),console.log(this.cart)}catch(t){console.error(t)}},mounted(){}}),Vue.component("goods-list",{template:'<section class="goods-list">\n\t<goods-item :good="good" :id="id" v-for="(good, id) in goods"></goods-item>\n\t<slot name="nothing"></slot>\n\t</section>',props:["goods"]}),Vue.component("goods-item",{template:'<div class="goods-item">\n\t<img v-bind:src="good.src">\n\t<h3>{{ good.title }}</h3>\n\t<p>{{ good.price }}</p>\n\t<button type="button" :id="good.id" v-on:click="addProductToCart" class="add-good-to-cart">Добавить в корзину</button></div>',props:["good","id"],methods:{addProductToCart(e){t.emit("addToBasket",e)}}}),Vue.component("cart-list",{template:'<div class="cart-list">\n\t<cart-item :good="good" :index="index" v-for="(good, index) in cart"></cart-item>\n\t</div>',props:["cart"]}),Vue.component("cart-item",{template:'<div class="cart-item">\n\t<img :src="good.src">\n\t<h3>{{ good.title }}</h3>\n\t<p class="cart-item-price">{{ good.price }}</p>\n\t<button type="button" class="delete-from-cart" :data-index="index" v-on:click="decrementItemCart">-</button>\n\t<span class="cart-quantity">[{{ good.quantity }}]</span>\n\t<button type="button" class="add-to-cart" :data-index="index" v-on:click="incrementItemCart">+</button>\n\t</div>',props:["good","index"],methods:{incrementItemCart(e){t.emit("addItemToBasket",e)},decrementItemCart(e){t.emit("deleteItemFromBasket",e)}}}),Vue.component("error",{template:'<div class="error">\n\t<h2 class="error-text">ОШИБКА</h2>\n\t</div>',props:["errorRequest"]}),Vue.component("search",{template:'<div class="search-block">\n\t<input type="search" id="search-input" v-model="app.search">\n\t<button type="button" class="search" v-on:click="app.searchHandler">Искать</button>\n\t</div>',props:[]})})()})();