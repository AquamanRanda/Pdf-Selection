(function(){var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(b){var d=0;return function(){return d<b.length?{done:!1,value:b[d++]}:{done:!0}}};$jscomp.arrayIterator=function(b){return{next:$jscomp.arrayIteratorImpl(b)}};$jscomp.makeIterator=function(b){var d="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];return d?d.call(b):$jscomp.arrayIterator(b)};
$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,d,e){b!=Array.prototype&&b!=Object.prototype&&(b[d]=e.value)};
$jscomp.polyfill=function(b,d,e,a){if(d){e=$jscomp.global;b=b.split(".");for(a=0;a<b.length-1;a++){var c=b[a];c in e||(e[c]={});e=e[c]}b=b[b.length-1];a=e[b];d=d(a);d!=a&&null!=d&&$jscomp.defineProperty(e,b,{configurable:!0,writable:!0,value:d})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(b){function d(){this.batch_=null}function e(a){return a instanceof c?a:new c(function(b,g){b(a)})}if(b&&!$jscomp.FORCE_POLYFILL_PROMISE)return b;d.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};d.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var a=$jscomp.global.setTimeout;d.prototype.asyncExecuteFunction=function(b){a(b,
0)};d.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var g=a[b];a[b]=null;try{g()}catch(m){this.asyncThrow_(m)}}}this.batch_=null};d.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var c=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(g){b.reject(g)}};c.prototype.createResolveAndReject_=
function(){function a(a){return function(m){g||(g=!0,a.call(b,m))}}var b=this,g=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};c.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof c)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};c.prototype.resolveToNonPromiseObj_=function(a){var b=
void 0;try{b=a.then}catch(g){this.reject_(g);return}"function"==typeof b?this.settleSameAsThenable_(b,a):this.fulfill_(a)};c.prototype.reject_=function(a){this.settle_(2,a)};c.prototype.fulfill_=function(a){this.settle_(1,a)};c.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};c.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
0;a<this.onSettledCallbacks_.length;++a)k.asyncExecute(this.onSettledCallbacks_[a]);this.onSettledCallbacks_=null}};var k=new d;c.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};c.prototype.settleSameAsThenable_=function(a,b){var g=this.createResolveAndReject_();try{a.call(b,g.resolve,g.reject)}catch(m){g.reject(m)}};c.prototype.then=function(a,b){function g(a,g){return"function"==typeof a?function(g){try{m(a(g))}catch(w){d(w)}}:
g}var m,d,e=new c(function(a,g){m=a;d=g});this.callWhenSettled_(g(a,m),g(b,d));return e};c.prototype.catch=function(a){return this.then(void 0,a)};c.prototype.callWhenSettled_=function(a,b){function g(){switch(m.state_){case 1:a(m.result_);break;case 2:b(m.result_);break;default:throw Error("Unexpected state: "+m.state_);}}var m=this;null==this.onSettledCallbacks_?k.asyncExecute(g):this.onSettledCallbacks_.push(g)};c.resolve=e;c.reject=function(a){return new c(function(b,g){g(a)})};c.race=function(a){return new c(function(b,
g){for(var m=$jscomp.makeIterator(a),d=m.next();!d.done;d=m.next())e(d.value).callWhenSettled_(b,g)})};c.all=function(a){var b=$jscomp.makeIterator(a),g=b.next();return g.done?e([]):new c(function(a,d){function m(g){return function(b){c[g]=b;z--;0==z&&a(c)}}var c=[],z=0;do c.push(void 0),z++,e(g.value).callWhenSettled_(m(c.length-1),d),g=b.next();while(!g.done)})};return c},"es6","es3");
$jscomp.checkStringArgs=function(b,d,e){if(null==b)throw new TypeError("The 'this' value for String.prototype."+e+" must not be null or undefined");if(d instanceof RegExp)throw new TypeError("First argument to String.prototype."+e+" must not be a regular expression");return b+""};
$jscomp.polyfill("String.prototype.endsWith",function(b){return b?b:function(b,e){var a=$jscomp.checkStringArgs(this,b,"endsWith");b+="";void 0===e&&(e=a.length);e=Math.max(0,Math.min(e|0,a.length));for(var c=b.length;0<c&&0<e;)if(a[--e]!=b[--c])return!1;return 0>=c}},"es6","es3");$jscomp.checkEs6ConformanceViaProxy=function(){try{var b={},d=Object.create(new $jscomp.global.Proxy(b,{get:function(e,a,c){return e==b&&"q"==a&&c==d}}));return!0===d.q}catch(e){return!1}};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS=!1;$jscomp.ES6_CONFORMANCE=$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS&&$jscomp.checkEs6ConformanceViaProxy();$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var b=0;return function(d){return $jscomp.SYMBOL_PREFIX+(d||"")+b++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.asyncIterator;b||(b=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};$jscomp.owns=function(b,d){return Object.prototype.hasOwnProperty.call(b,d)};
$jscomp.polyfill("WeakMap",function(b){function d(){if(!b||!Object.seal)return!1;try{var a=Object.seal({}),m=Object.seal({}),c=new b([[a,2],[m,3]]);if(2!=c.get(a)||3!=c.get(m))return!1;c.delete(a);c.set(m,4);return!c.has(a)&&4==c.get(m)}catch(v){return!1}}function e(){}function a(a){if(!$jscomp.owns(a,k)){var g=new e;$jscomp.defineProperty(a,k,{value:g})}}function c(g){var b=Object[g];b&&(Object[g]=function(g){if(g instanceof e)return g;a(g);return b(g)})}if($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS){if(b&&
$jscomp.ES6_CONFORMANCE)return b}else if(d())return b;var k="$jscomp_hidden_"+Math.random();c("freeze");c("preventExtensions");c("seal");var n=0,t=function(a){this.id_=(n+=Math.random()+1).toString();if(a){a=$jscomp.makeIterator(a);for(var g;!(g=a.next()).done;)g=g.value,this.set(g[0],g[1])}};t.prototype.set=function(g,b){a(g);if(!$jscomp.owns(g,k))throw Error("WeakMap key fail: "+g);g[k][this.id_]=b;return this};t.prototype.get=function(a){return $jscomp.owns(a,k)?a[k][this.id_]:void 0};t.prototype.has=
function(a){return $jscomp.owns(a,k)&&$jscomp.owns(a[k],this.id_)};t.prototype.delete=function(a){return $jscomp.owns(a,k)&&$jscomp.owns(a[k],this.id_)?delete a[k][this.id_]:!1};return t},"es6","es3");$jscomp.MapEntry=function(){};
$jscomp.polyfill("Map",function(b){function d(){if($jscomp.ASSUME_NO_NATIVE_MAP||!b||"function"!=typeof b||!b.prototype.entries||"function"!=typeof Object.seal)return!1;try{var a=Object.seal({x:4}),c=new b($jscomp.makeIterator([[a,"s"]]));if("s"!=c.get(a)||1!=c.size||c.get({x:4})||c.set({x:4},"t")!=c||2!=c.size)return!1;var d=c.entries(),e=d.next();if(e.done||e.value[0]!=a||"s"!=e.value[1])return!1;e=d.next();return e.done||4!=e.value[0].x||"t"!=e.value[1]||!d.next().done?!1:!0}catch(q){return!1}}
if($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS){if(b&&$jscomp.ES6_CONFORMANCE)return b}else if(d())return b;$jscomp.initSymbolIterator();var e=new WeakMap,a=function(a){this.data_={};this.head_=n();this.size=0;if(a){a=$jscomp.makeIterator(a);for(var b;!(b=a.next()).done;)b=b.value,this.set(b[0],b[1])}};a.prototype.set=function(a,b){a=0===a?0:a;var g=c(this,a);g.list||(g.list=this.data_[g.id]=[]);g.entry?g.entry.value=b:(g.entry={next:this.head_,previous:this.head_.previous,head:this.head_,key:a,
value:b},g.list.push(g.entry),this.head_.previous.next=g.entry,this.head_.previous=g.entry,this.size++);return this};a.prototype.delete=function(a){a=c(this,a);return a.entry&&a.list?(a.list.splice(a.index,1),a.list.length||delete this.data_[a.id],a.entry.previous.next=a.entry.next,a.entry.next.previous=a.entry.previous,a.entry.head=null,this.size--,!0):!1};a.prototype.clear=function(){this.data_={};this.head_=this.head_.previous=n();this.size=0};a.prototype.has=function(a){return!!c(this,a).entry};
a.prototype.get=function(a){return(a=c(this,a).entry)&&a.value};a.prototype.entries=function(){return k(this,function(a){return[a.key,a.value]})};a.prototype.keys=function(){return k(this,function(a){return a.key})};a.prototype.values=function(){return k(this,function(a){return a.value})};a.prototype.forEach=function(a,b){for(var g=this.entries(),c;!(c=g.next()).done;)c=c.value,a.call(b,c[1],c[0],this)};a.prototype[Symbol.iterator]=a.prototype.entries;var c=function(a,b){var c=b&&typeof b;"object"==
c||"function"==c?e.has(b)?c=e.get(b):(c=""+ ++t,e.set(b,c)):c="p_"+b;var g=a.data_[c];if(g&&$jscomp.owns(a.data_,c))for(a=0;a<g.length;a++){var d=g[a];if(b!==b&&d.key!==d.key||b===d.key)return{id:c,list:g,index:a,entry:d}}return{id:c,list:g,index:-1,entry:void 0}},k=function(a,b){var c=a.head_;return $jscomp.iteratorPrototype(function(){if(c){for(;c.head!=a.head_;)c=c.previous;for(;c.next!=c.head;)return c=c.next,{done:!1,value:b(c)};c=null}return{done:!0,value:void 0}})},n=function(){var a={};return a.previous=
a.next=a.head=a},t=0;return a},"es6","es3");
(function(b){function d(a){if(e[a])return e[a].exports;var c=e[a]={i:a,l:!1,exports:{}};b[a].call(c.exports,c,c.exports,d);c.l=!0;return c.exports}var e={};d.m=b;d.c=e;d.d=function(a,b,e){d.o(a,b)||Object.defineProperty(a,b,{enumerable:!0,get:e})};d.r=function(a){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"});Object.defineProperty(a,"__esModule",{value:!0})};d.t=function(a,b){b&1&&(a=d(a));if(b&8||b&4&&"object"===typeof a&&a&&a.__esModule)return a;
var c=Object.create(null);d.r(c);Object.defineProperty(c,"default",{enumerable:!0,value:a});if(b&2&&"string"!=typeof a)for(var e in a)d.d(c,e,function(b){return a[b]}.bind(null,e));return c};d.n=function(a){var b=a&&a.__esModule?function(){return a["default"]}:function(){return a};d.d(b,"a",b);return b};d.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};d.p="/core/office/";return d(d.s=12)})([function(b,d,e){e.d(d,"b",function(){return k});e.d(d,"c",function(){return c});e.d(d,"a",
function(){return n});var a=e(2),c=function(b,c){Object(a.a)("disableLogs")||(c?console.warn(b+": "+c):console.warn(b))},k=function(b,c){Object(a.a)("disableLogs")||(c?console.log(b+": "+c):console.log(b))},n=function(a,b){}},function(b,d,e){e.d(d,"a",function(){return w});e.d(d,"b",function(){return p});e.d(d,"c",function(){return h});var a=e(0),c=e(10),k="undefined"===typeof window?self:window,n=k.importScripts,t=function(a){if("string"===typeof a){for(var b=new Uint8Array(a.length),c=a.length,
f=0;f<c;f++)b[f]=a.charCodeAt(f);return b}return a},g=function(a){if("string"!==typeof a){for(var b="",c=0,f=a.length,F;c<f;)F=a.subarray(c,c+1024),c+=1024,b+=String.fromCharCode.apply(null,F);return b}return a},m=!1,z=function(a,b){m||(n(k.basePath+"decode.min.js"),m=!0);a=self.BrotliDecode(t(a));return b?a:g(a)};(function(){function a(){this.remainingDataArrays=[]}a.prototype.processRaw=function(a){return a};a.prototype.processBrotli=function(a){this.remainingDataArrays.push(a);return null};a.prototype.GetNextChunk=
function(a){this.decodeFunction||(this.decodeFunction=0===a[0]&&97===a[1]&&115===a[2]&&109===a[3]?this.processRaw:this.processBrotli);return this.decodeFunction(a)};a.prototype.End=function(){if(this.remainingDataArrays.length){for(var a=this.arrays,b=0,c=0;c<a.length;++c)b+=a[c].length;b=new Uint8Array(b);var f=0;for(c=0;c<a.length;++c){var d=a[c];b.set(d,f);f+=d.length}return z(b,!0)}return null};return a})();var v=!1,q=function(a,b){v||(n(k.basePath+"rawinflate.js",k.basePath+"pako_inflate.min.js"),
v=!0);var f=10;if("string"===typeof a){if(a.charCodeAt(3)&8){for(;0!==a.charCodeAt(f);++f);++f}}else if(a[3]&8){for(;0!==a[f];++f);++f}if(b)return a=t(a),a=a.subarray(f,a.length-8),k.pako.inflate(a,{windowBits:-15});a=g(a);a=a.substring(f,a.length-8);return c.a.inflate(a)},x=function(a,b){return b?a:g(a)},l=function(b){var c=!b.shouldOutputArray,f=new XMLHttpRequest;f.open("GET",b.url,b.isAsync);var d=c&&f.overrideMimeType;f.responseType=d?"text":"arraybuffer";d&&f.overrideMimeType("text/plain; charset=x-user-defined");
f.send();var e=function(){var e=Date.now();var h=d?f.responseText:new Uint8Array(f.response);Object(a.a)("worker","Result length is "+h.length);h.length<b.compressedMaximum?(h=b.decompressFunction(h,b.shouldOutputArray),Object(a.a)("worker","Decompressed length is "+h.length),Object(a.c)("There may be some degradation of performance. Your server has not been configured to serve .gz. and .br. files with the expected Content-Encoding. See http://www.pdftron.com/kb_content_encoding for instructions on how to resolve this.")):
c&&(h=g(h));Object(a.a)("worker",b.url+" Decompression took "+(Date.now()-e));return h};if(b.isAsync)var h=new Promise(function(a,c){f.onload=function(){200===this.status||0===this.status?a(e()):c("Download Failed "+b.url)};f.onerror=function(){c("Network error occurred "+b.url)}});else{if(200===f.status||0===f.status)return e();throw Error("Failed to load "+b.url);}return h},w=function(a){var b=a.lastIndexOf("/");-1===b&&(b=0);var c=a.slice(b).replace(".",".br.");return a.slice(0,b)+c},f=function(a,
b){var c=a.lastIndexOf("/");-1===c&&(c=0);var f=a.slice(c).replace(".",".gz.");b.url=a.slice(0,c)+f;b.decompressFunction=q;return l(b)},u=function(a,b){b.url=w(a);b.decompressFunction=z;return l(b)},r=function(a,b){a.endsWith(".js.mem")?a=a.slice(0,-4):a.endsWith(".mem")&&(a=a.slice(0,-4)+".js.mem");b.url=a;b.decompressFunction=x;return l(b)},y=function(b,c,f,d){return b.catch(function(b){Object(a.c)(b);return d(c,f)})},C=function(b,c,f){var d;if(f.isAsync){var g=c[0](b,f);for(d=1;d<c.length;++d)g=
y(g,b,f,c[d]);return g}for(d=0;d<c.length;++d)try{return c[d](b,f)}catch(I){Object(a.c)(I.message)}throw Error("");},h=function(a,b,c,d){return C(a,[f,u,r],{compressedMaximum:b,isAsync:c,shouldOutputArray:d})},p=function(a,b,c,d){return C(a,[u,f,r],{compressedMaximum:b,isAsync:c,shouldOutputArray:d})}},function(b,d,e){e.d(d,"a",function(){return k});e.d(d,"b",function(){return n});var a={},c={flattenedResources:!1,CANVAS_CACHE_SIZE:void 0,maxPagesBefore:void 0,maxPagesAhead:void 0,disableLogs:!1,
_trnDebugMode:!1,_logFiltersEnabled:null},k=function(a){return c[a]},n=function(b,d){var g;c[b]=d;null===(g=a[b])||void 0===g?void 0:g.forEach(function(a){a(d)})}},function(b,d,e){e.d(d,"c",function(){return n});e.d(d,"b",function(){return t});e.d(d,"a",function(){return g});var a="undefined"===typeof window?self:window;b=function(){var a=navigator.userAgent.toLowerCase();return(a=/(msie) ([\w.]+)/.exec(a)||/(trident)(?:.*? rv:([\w.]+)|)/.exec(a))?parseInt(a[2],10):a}();(function(){var b=a.navigator.userAgent.match(/Chrome\/(.*?) /);
return b?parseInt(b[1],10):b})();(function(){var b=a.navigator.userAgent.match(/OPR/),c=a.navigator.userAgent.match(/Maxthon/),d=a.navigator.userAgent.match(/Edge/);return a.navigator.userAgent.match(/Chrome\/(.*?) /)&&!b&&!c&&!d})();navigator.userAgent.match(/Edge/i);d=/iPad|iPhone|iPod/.test(a.navigator.platform)||"MacIntel"===navigator.platform&&1<navigator.maxTouchPoints;var c=/^((?!chrome|android).)*safari/i.test(a.navigator.userAgent)||/^((?!chrome|android).)*$/.test(a.navigator.userAgent)&&
d;a.navigator.userAgent.match(/Firefox/);b||/Android|webOS|Touch|IEMobile|Silk/i.test(navigator.userAgent);navigator.userAgent.match(/(iPad|iPhone|iPod)/i);a.navigator.userAgent.indexOf("Android");var k=/Mac OS X 10_13_6.*\(KHTML, like Gecko\)$/.test(a.navigator.userAgent),n=function(){return c||k},t=!(!self.WebAssembly||!self.WebAssembly.validate),g=-1<a.navigator.userAgent.indexOf("Edge/16")||-1<a.navigator.userAgent.indexOf("MSAppHost")},function(b,d){d=function(){return this}();try{d=d||(new Function("return this"))()}catch(e){"object"===
typeof window&&(d=window)}b.exports=d},function(b,d,e){d.a=function(){ArrayBuffer.prototype.slice||(ArrayBuffer.prototype.slice=function(a,b){void 0===a&&(a=0);void 0===b&&(b=this.byteLength);a=Math.floor(a);b=Math.floor(b);0>a&&(a+=this.byteLength);0>b&&(b+=this.byteLength);a=Math.min(Math.max(0,a),this.byteLength);b=Math.min(Math.max(0,b),this.byteLength);if(0>=b-a)return new ArrayBuffer(0);var c=new ArrayBuffer(b-a),d=new Uint8Array(c);a=new Uint8Array(this,a,b-a);d.set(a);return c})}},function(b,
d,e){e.d(d,"a",function(){return a});e(7);var a=function(a,b){return function(){}}},function(b,d,e){d.a=function(a){var b={};decodeURIComponent(a.slice(1)).split("&").forEach(function(a){a=a.split("=",2);b[a[0]]=a[1]});return b}},function(b,d,e){e.d(d,"a",function(){return g});var a=e(9),c=e(1),k=e(11),n=e(3),t=function(){function a(a){var b=this;this.promise=a.then(function(a){b.response=a;b.status=200})}a.prototype.addEventListener=function(a,b){this.promise.then(b)};return a}(),g=function(b,d,
g){if(!n.b||n.a||Object(n.c)()||g){g=Object(c.b)((self.Module.asmjsPrefix?self.Module.asmjsPrefix:"")+b+".js.mem",d[".js.mem"],!1);var e=Object(c.c)((self.Module.memoryInitializerPrefixURL?self.Module.memoryInitializerPrefixURL:"")+b+".mem",d[".mem"],!0,!0);self.Module.memoryInitializerRequest=new t(e)}else self.Module.instantiateWasm=function(c,g){return Object(k.a)(Object(a.a)(),b+"Wasm.wasm",c,d["Wasm.wasm"]).then(function(a){g(a)})},g=Object(c.b)(b+"Wasm.js.mem",d["Wasm.js.mem"],!1,!1);g=new Blob([g],
{type:"application/javascript"});importScripts(URL.createObjectURL(g))}},function(b,d,e){function a(){return c}e.d(d,"a",function(){return a});var c=37},function(b,d,e){var a=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],c=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],k=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],n=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,
12289,16385,24577],t=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],g=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],m=function(){this.list=this.next=null},z=function(){this.n=this.b=this.e=0;this.t=null},v=function(a,b,c,f,d,g){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var e=Array(this.BMAX+1),u,h,p,k=Array(this.BMAX+1),t,r=new z,x=Array(this.BMAX);var l=Array(this.N_MAX);var w=Array(this.BMAX+1),G,D;var n=this.root=null;for(h=0;h<e.length;h++)e[h]=
0;for(h=0;h<k.length;h++)k[h]=0;for(h=0;h<x.length;h++)x[h]=null;for(h=0;h<l.length;h++)l[h]=0;for(h=0;h<w.length;h++)w[h]=0;var v=256<b?a[256]:this.BMAX;var A=a;var q=0;h=b;do e[A[q]]++,q++;while(0<--h);if(e[0]==b)this.root=null,this.status=this.m=0;else{for(p=1;p<=this.BMAX&&0==e[p];p++);var E=p;g<p&&(g=p);for(h=this.BMAX;0!=h&&0==e[h];h--);var J=h;g>h&&(g=h);for(G=1<<p;p<h;p++,G<<=1)if(0>(G-=e[p])){this.status=2;this.m=g;return}if(0>(G-=e[h]))this.status=2,this.m=g;else{e[h]+=G;w[1]=p=0;A=e;q=
1;for(t=2;0<--h;)w[t++]=p+=A[q++];A=a;h=q=0;do 0!=(p=A[q++])&&(l[w[p]++]=h);while(++h<b);b=w[J];w[0]=h=0;A=l;q=0;l=-1;var B=k[0]=0;t=null;for(D=0;E<=J;E++)for(a=e[E];0<a--;){for(;E>B+k[1+l];){B+=k[1+l];l++;D=(D=J-B)>g?g:D;if((u=1<<(p=E-B))>a+1)for(u-=a+1,t=E;++p<D&&!((u<<=1)<=e[++t]);)u-=e[t];B+p>v&&B<v&&(p=v-B);D=1<<p;k[1+l]=p;t=Array(D);for(u=0;u<D;u++)t[u]=new z;n=null==n?this.root=new m:n.next=new m;n.next=null;n.list=t;x[l]=t;0<l&&(w[l]=h,r.b=k[l],r.e=16+p,r.t=t,p=(h&(1<<B)-1)>>B-k[l],x[l-1][p].e=
r.e,x[l-1][p].b=r.b,x[l-1][p].n=r.n,x[l-1][p].t=r.t)}r.b=E-B;q>=b?r.e=99:A[q]<c?(r.e=256>A[q]?16:15,r.n=A[q++]):(r.e=d[A[q]-c],r.n=f[A[q++]-c]);u=1<<E-B;for(p=h>>B;p<D;p+=u)t[p].e=r.e,t[p].b=r.b,t[p].n=r.n,t[p].t=r.t;for(p=1<<E-1;0!=(h&p);p>>=1)h^=p;for(h^=p;(h&(1<<B)-1)!=w[l];)B-=k[l],l--}this.m=k[1];this.status=0!=G&&1!=J?1:0}}},q={Stream:function(a){this.zip_inflate_start();this.zip_inflate_data=a;this.zip_inflate_pos=0}};q.Stream.prototype={getBytes:function(a){for(var b,c=Array(1024),f=[],d=
0;d<a&&0<(b=this.zip_inflate_internal(c,0,c.length));)f[f.length]=String.fromCharCode.apply(null,c.slice(0,b)),d+=b;return d?(this.zip_inflate_data=this.zip_inflate_data.slice(this.zip_inflate_pos),this.zip_inflate_pos=0,f.join("")):""},zip_GET_BYTE:function(){return this.zip_inflate_data.length==this.zip_inflate_pos?-1:this.zip_inflate_data.charCodeAt(this.zip_inflate_pos++)&255},zip_NEEDBITS:function(a){for(;this.zip_bit_len<a;)this.zip_bit_buf|=this.zip_GET_BYTE()<<this.zip_bit_len,this.zip_bit_len+=
8},zip_GETBITS:function(b){return this.zip_bit_buf&a[b]},zip_DUMPBITS:function(a){this.zip_bit_buf>>=a;this.zip_bit_len-=a},zip_inflate_codes:function(a,b,c){var f,d;if(0==c)return 0;for(d=0;;){this.zip_NEEDBITS(this.zip_bl);var g=this.zip_tl.list[this.zip_GETBITS(this.zip_bl)];for(f=g.e;16<f;){if(99==f)return-1;this.zip_DUMPBITS(g.b);f-=16;this.zip_NEEDBITS(f);g=g.t[this.zip_GETBITS(f)];f=g.e}this.zip_DUMPBITS(g.b);if(16==f)this.zip_wp&=32767,a[b+d++]=this.zip_slide[this.zip_wp++]=g.n;else{if(15==
f)break;this.zip_NEEDBITS(f);this.zip_copy_leng=g.n+this.zip_GETBITS(f);this.zip_DUMPBITS(f);this.zip_NEEDBITS(this.zip_bd);g=this.zip_td.list[this.zip_GETBITS(this.zip_bd)];for(f=g.e;16<f;){if(99==f)return-1;this.zip_DUMPBITS(g.b);f-=16;this.zip_NEEDBITS(f);g=g.t[this.zip_GETBITS(f)];f=g.e}this.zip_DUMPBITS(g.b);this.zip_NEEDBITS(f);this.zip_copy_dist=this.zip_wp-g.n-this.zip_GETBITS(f);for(this.zip_DUMPBITS(f);0<this.zip_copy_leng&&d<c;)this.zip_copy_leng--,this.zip_copy_dist&=32767,this.zip_wp&=
32767,a[b+d++]=this.zip_slide[this.zip_wp++]=this.zip_slide[this.zip_copy_dist++]}if(d==c)return c}this.zip_method=-1;return d},zip_inflate_stored:function(a,b,c){var f=this.zip_bit_len&7;this.zip_DUMPBITS(f);this.zip_NEEDBITS(16);f=this.zip_GETBITS(16);this.zip_DUMPBITS(16);this.zip_NEEDBITS(16);if(f!=(~this.zip_bit_buf&65535))return-1;this.zip_DUMPBITS(16);this.zip_copy_leng=f;for(f=0;0<this.zip_copy_leng&&f<c;)this.zip_copy_leng--,this.zip_wp&=32767,this.zip_NEEDBITS(8),a[b+f++]=this.zip_slide[this.zip_wp++]=
this.zip_GETBITS(8),this.zip_DUMPBITS(8);0==this.zip_copy_leng&&(this.zip_method=-1);return f},zip_inflate_fixed:function(a,b,d){if(null==this.zip_fixed_tl){var f,g=Array(288);for(f=0;144>f;f++)g[f]=8;for(;256>f;f++)g[f]=9;for(;280>f;f++)g[f]=7;for(;288>f;f++)g[f]=8;this.zip_fixed_bl=7;f=new v(g,288,257,c,k,this.zip_fixed_bl);if(0!=f.status)return alert("HufBuild error: ".concat(f.status)),-1;this.zip_fixed_tl=f.root;this.zip_fixed_bl=f.m;for(f=0;30>f;f++)g[f]=5;this.zip_fixed_bd=5;f=new v(g,30,0,
n,t,this.zip_fixed_bd);if(1<f.status)return this.zip_fixed_tl=null,alert("HufBuild error: ".concat(f.status)),-1;this.zip_fixed_td=f.root;this.zip_fixed_bd=f.m}this.zip_tl=this.zip_fixed_tl;this.zip_td=this.zip_fixed_td;this.zip_bl=this.zip_fixed_bl;this.zip_bd=this.zip_fixed_bd;return this.zip_inflate_codes(a,b,d)},zip_inflate_dynamic:function(a,b,d){var f,e,r,l=Array(316);for(f=0;f<l.length;f++)l[f]=0;this.zip_NEEDBITS(5);var m=257+this.zip_GETBITS(5);this.zip_DUMPBITS(5);this.zip_NEEDBITS(5);var h=
1+this.zip_GETBITS(5);this.zip_DUMPBITS(5);this.zip_NEEDBITS(4);f=4+this.zip_GETBITS(4);this.zip_DUMPBITS(4);if(286<m||30<h)return-1;for(e=0;e<f;e++)this.zip_NEEDBITS(3),l[g[e]]=this.zip_GETBITS(3),this.zip_DUMPBITS(3);for(;19>e;e++)l[g[e]]=0;this.zip_bl=7;e=new v(l,19,19,null,null,this.zip_bl);if(0!=e.status)return-1;this.zip_tl=e.root;this.zip_bl=e.m;var p=m+h;for(f=r=0;f<p;){this.zip_NEEDBITS(this.zip_bl);var q=this.zip_tl.list[this.zip_GETBITS(this.zip_bl)];e=q.b;this.zip_DUMPBITS(e);e=q.n;if(16>
e)l[f++]=r=e;else if(16==e){this.zip_NEEDBITS(2);e=3+this.zip_GETBITS(2);this.zip_DUMPBITS(2);if(f+e>p)return-1;for(;0<e--;)l[f++]=r}else{17==e?(this.zip_NEEDBITS(3),e=3+this.zip_GETBITS(3),this.zip_DUMPBITS(3)):(this.zip_NEEDBITS(7),e=11+this.zip_GETBITS(7),this.zip_DUMPBITS(7));if(f+e>p)return-1;for(;0<e--;)l[f++]=0;r=0}}this.zip_bl=9;e=new v(l,m,257,c,k,this.zip_bl);0==this.zip_bl&&(e.status=1);if(0!=e.status)return-1;this.zip_tl=e.root;this.zip_bl=e.m;for(f=0;f<h;f++)l[f]=l[f+m];this.zip_bd=6;
e=new v(l,h,0,n,t,this.zip_bd);this.zip_td=e.root;this.zip_bd=e.m;return 0==this.zip_bd&&257<m||0!=e.status?-1:this.zip_inflate_codes(a,b,d)},zip_inflate_start:function(){null==this.zip_slide&&(this.zip_slide=Array(65536));this.zip_bit_len=this.zip_bit_buf=this.zip_wp=0;this.zip_method=-1;this.zip_eof=!1;this.zip_copy_leng=this.zip_copy_dist=0;this.zip_fixed_tl=this.zip_tl=null},zip_inflate_internal:function(a,b,c){var f;for(f=0;f<c&&(!this.zip_eof||-1!=this.zip_method);){if(0<this.zip_copy_leng){if(0!=
this.zip_method)for(;0<this.zip_copy_leng&&f<c;)this.zip_copy_leng--,this.zip_copy_dist&=32767,this.zip_wp&=32767,a[b+f++]=this.zip_slide[this.zip_wp++]=this.zip_slide[this.zip_copy_dist++];else{for(;0<this.zip_copy_leng&&f<c;)this.zip_copy_leng--,this.zip_wp&=32767,this.zip_NEEDBITS(8),a[b+f++]=this.zip_slide[this.zip_wp++]=this.zip_GETBITS(8),this.zip_DUMPBITS(8);0==this.zip_copy_leng&&(this.zip_method=-1)}if(f==c)break}if(-1==this.zip_method){if(this.zip_eof)break;this.zip_NEEDBITS(1);0!=this.zip_GETBITS(1)&&
(this.zip_eof=!0);this.zip_DUMPBITS(1);this.zip_NEEDBITS(2);this.zip_method=this.zip_GETBITS(2);this.zip_DUMPBITS(2);this.zip_tl=null;this.zip_copy_leng=0}switch(this.zip_method){case 0:var d=this.zip_inflate_stored(a,b+f,c-f);break;case 1:d=null!=this.zip_tl?this.zip_inflate_codes(a,b+f,c-f):this.zip_inflate_fixed(a,b+f,c-f);break;case 2:d=null!=this.zip_tl?this.zip_inflate_codes(a,b+f,c-f):this.zip_inflate_dynamic(a,b+f,c-f);break;default:d=-1}if(-1==d)return this.zip_eof?0:-1;f+=d}return f}};q.inflate=
function(a){return(new q.Stream(a)).getBytes(4E9)};d.a=q},function(b,d,e){function a(a){return new Promise(function(b,c){var d=indexedDB.open(g,a);d.onerror=c.bind(null,"Error opening wasm cache database");d.onsuccess=function(){b(d.result)};d.onupgradeneeded=function(a){var b=d.result;b.objectStoreNames.contains(m)&&(Object(n.b)("Clearing out version "+a.oldVersion+" wasm cache"),b.deleteObjectStore(m));Object(n.b)("Creating version "+a.newVersion+" wasm cache");b.createObjectStore(m)}})}function c(a,
b){return new Promise(function(c,d){var e=a.transaction([m]).objectStore(m).get(b);e.onsuccess=function(){e.result?c(e.result):d("Module "+b+" was not found in wasm cache")};e.onerror=d.bind(null,"Error getting wasm module "+b)})}function k(b,d,e,g){function k(a,b){a=a.transaction([m],"readwrite").objectStore(m).put(b,d);a.onerror=function(a){Object(n.b)("Failed to store in wasm cache: "+a)};a.onsuccess=function(a){Object(n.b)("Successfully stored "+d+" in wasm cache")}}function q(a){u=u||Date.now();
return a?(Object(n.a)("load","Try instantiateStreaming"),fetch(Object(t.a)(d)).then(function(a){return WebAssembly.instantiateStreaming(a,e)}).catch(function(a){Object(n.a)("load","instantiateStreaming Failed "+d+" message "+a.message);return q(!1)})):Object(t.b)(d,g,!0,!0).then(function(a){f=Date.now();Object(n.a)("load","Request took "+(f-u)+" ms");return WebAssembly.instantiate(a,e)})}var f,u;return a(b).then(function(a){return c(a,d).then(function(a){Object(n.b)("Found "+d+" in wasm cache");return WebAssembly.instantiate(a,
e)},function(b){Object(n.a)(b);return q(!!WebAssembly.instantiateStreaming).then(function(b){try{Object(n.a)("load","WASM compilation took "+(Date.now()-(f||u))+" ms"),k(a,b.module)}catch(h){}return b.instance})})},function(a){Object(n.b)(a);return q().then(function(a){return a.instance})})}e.d(d,"a",function(){return k});var n=e(0),t=e(1),g="wasm-cache",m="wasm-cache"},function(b,d,e){b.exports=e(13)},function(b,d,e){e.r(d);e(14);b=e(5);e(19);Object(b.a)()},function(b,d,e){(function(a,b){function c(a){"@babel/helpers - typeof";
c="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"===typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};return c(a)}(function(a){function d(){for(var a=0;a<H.length;a++)H[a][0](H[a][1]);H=[];I=!1}function g(a,b){H.push([a,b]);I||(I=!0,M(d,0))}function k(a,b){function c(a){q(b,a)}function d(a){l(b,a)}try{a(c,d)}catch(A){d(A)}}function n(a){var b=a.owner,c=b.state_;b=b.data_;var d=a[c];a=a.then;if("function"===
typeof d){c=F;try{b=d(b)}catch(A){l(a,A)}}v(a,b)||(c===F&&q(a,b),c===K&&l(a,b))}function v(a,b){var d;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(b&&("function"===typeof b||"object"===c(b))){var f=b.then;if("function"===typeof f)return f.call(b,function(c){d||(d=!0,b!==c?q(a,c):x(a,c))},function(b){d||(d=!0,l(a,b))}),!0}}catch(A){return d||l(a,A),!0}return!1}function q(a,b){a!==b&&v(a,b)||x(a,b)}function x(a,b){a.state_===h&&(a.state_=p,a.data_=b,g(f,
a))}function l(a,b){a.state_===h&&(a.state_=p,a.data_=b,g(u,a))}function w(a){var b=a.then_;a.then_=void 0;for(a=0;a<b.length;a++)n(b[a])}function f(a){a.state_=F;w(a)}function u(a){a.state_=K;w(a)}function r(a){if("function"!==typeof a)throw new TypeError("Promise constructor takes a function argument");if(!1===this instanceof r)throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this.then_=[];k(a,this)}a.createPromiseCapability=
function(){var a={},b=new r(function(b,c){a.resolve=b;a.reject=c});a.promise=b;return a};var y=a.Promise,C=y&&"resolve"in y&&"reject"in y&&"all"in y&&"race"in y&&function(){var a;new y(function(b){a=b});return"function"===typeof a}();"undefined"!==typeof exports&&exports?(exports.Promise=C?y:r,exports.Polyfill=r):"function"===typeof define&&e(18)?define(function(){return C?y:r}):C||(a.Promise=r);var h="pending",p="sealed",F="fulfilled",K="rejected",L=function(){},M="undefined"!==typeof b?b:setTimeout,
H=[],I;r.prototype={constructor:r,state_:h,then_:null,data_:void 0,then:function(a,b){a={owner:this,then:new this.constructor(L),fulfilled:a,rejected:b};this.state_===F||this.state_===K?g(n,a):this.then_.push(a);return a.then},"catch":function(a){return this.then(null,a)}};r.all=function(a){if("[object Array]"!==Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.all().");return new this(function(b,c){function d(a){e++;return function(c){f[a]=c;--e||b(f)}}for(var f=
[],e=0,g=0,h;g<a.length;g++)(h=a[g])&&"function"===typeof h.then?h.then(d(g),c):f[g]=h;e||b(f)})};r.race=function(a){if("[object Array]"!==Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.race().");return new this(function(b,c){for(var d=0,f;d<a.length;d++)(f=a[d])&&"function"===typeof f.then?f.then(b,c):b(f)})};r.resolve=function(a){return a&&"object"===c(a)&&a.constructor===this?a:new this(function(b){b(a)})};r.reject=function(a){return new this(function(b,
c){c(a)})}})("undefined"!==typeof window?window:"undefined"!==typeof a?a:"undefined"!==typeof self?self:void 0)}).call(this,e(4),e(15).setImmediate)},function(b,d,e){(function(a){function b(a,b){this._id=a;this._clearFn=b}var k="undefined"!==typeof a&&a||"undefined"!==typeof self&&self||window,n=Function.prototype.apply;d.setTimeout=function(){return new b(n.call(setTimeout,k,arguments),clearTimeout)};d.setInterval=function(){return new b(n.call(setInterval,k,arguments),clearInterval)};d.clearTimeout=
d.clearInterval=function(a){a&&a.close()};b.prototype.unref=b.prototype.ref=function(){};b.prototype.close=function(){this._clearFn.call(k,this._id)};d.enroll=function(a,b){clearTimeout(a._idleTimeoutId);a._idleTimeout=b};d.unenroll=function(a){clearTimeout(a._idleTimeoutId);a._idleTimeout=-1};d._unrefActive=d.active=function(a){clearTimeout(a._idleTimeoutId);var b=a._idleTimeout;0<=b&&(a._idleTimeoutId=setTimeout(function(){a._onTimeout&&a._onTimeout()},b))};e(16);d.setImmediate="undefined"!==typeof self&&
self.setImmediate||"undefined"!==typeof a&&a.setImmediate||this&&this.setImmediate;d.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof a&&a.clearImmediate||this&&this.clearImmediate}).call(this,e(4))},function(b,d,e){(function(a,b){(function(a,c){function d(a){delete f[a]}function e(a){if(u)setTimeout(e,0,a);else{var b=f[a];if(b){u=!0;try{var g=b.callback,h=b.args;switch(h.length){case 0:g();break;case 1:g(h[0]);break;case 2:g(h[0],h[1]);break;case 3:g(h[0],h[1],
h[2]);break;default:g.apply(c,h)}}finally{d(a),u=!1}}}}function k(){y=function(a){b.nextTick(function(){e(a)})}}function n(){if(a.postMessage&&!a.importScripts){var b=!0,c=a.onmessage;a.onmessage=function(){b=!1};a.postMessage("","*");a.onmessage=c;return b}}function v(){var b="setImmediate$"+Math.random()+"$",c=function(c){c.source===a&&"string"===typeof c.data&&0===c.data.indexOf(b)&&e(+c.data.slice(b.length))};a.addEventListener?a.addEventListener("message",c,!1):a.attachEvent("onmessage",c);y=
function(c){a.postMessage(b+c,"*")}}function q(){var a=new MessageChannel;a.port1.onmessage=function(a){e(a.data)};y=function(b){a.port2.postMessage(b)}}function x(){var a=r.documentElement;y=function(b){var c=r.createElement("script");c.onreadystatechange=function(){e(b);c.onreadystatechange=null;a.removeChild(c);c=null};a.appendChild(c)}}function l(){y=function(a){setTimeout(e,0,a)}}if(!a.setImmediate){var w=1,f={},u=!1,r=a.document,y,C=Object.getPrototypeOf&&Object.getPrototypeOf(a);C=C&&C.setTimeout?
C:a;"[object process]"==={}.toString.call(a.process)?k():n()?v():a.MessageChannel?q():r&&"onreadystatechange"in r.createElement("script")?x():l();C.setImmediate=function(a){"function"!==typeof a&&(a=new Function(""+a));for(var b=Array(arguments.length-1),c=0;c<b.length;c++)b[c]=arguments[c+1];f[w]={callback:a,args:b};y(w);return w++};C.clearImmediate=d}})("undefined"===typeof self?"undefined"===typeof a?this:a:self)}).call(this,e(4),e(17))},function(b,d){function e(){throw Error("setTimeout has not been defined");
}function a(){throw Error("clearTimeout has not been defined");}function c(a){if(z===setTimeout)return setTimeout(a,0);if((z===e||!z)&&setTimeout)return z=setTimeout,setTimeout(a,0);try{return z(a,0)}catch(u){try{return z.call(null,a,0)}catch(r){return z.call(this,a,0)}}}function k(b){if(v===clearTimeout)return clearTimeout(b);if((v===a||!v)&&clearTimeout)return v=clearTimeout,clearTimeout(b);try{return v(b)}catch(u){try{return v.call(null,b)}catch(r){return v.call(this,b)}}}function n(){x&&l&&(x=
!1,l.length?q=l.concat(q):w=-1,q.length&&t())}function t(){if(!x){var a=c(n);x=!0;for(var b=q.length;b;){l=q;for(q=[];++w<b;)l&&l[w].run();w=-1;b=q.length}l=null;x=!1;k(a)}}function g(a,b){this.fun=a;this.array=b}function m(){}b=b.exports={};try{var z="function"===typeof setTimeout?setTimeout:e}catch(f){z=e}try{var v="function"===typeof clearTimeout?clearTimeout:a}catch(f){v=a}var q=[],x=!1,l,w=-1;b.nextTick=function(a){var b=Array(arguments.length-1);if(1<arguments.length)for(var d=1;d<arguments.length;d++)b[d-
1]=arguments[d];q.push(new g(a,b));1!==q.length||x||c(t)};g.prototype.run=function(){this.fun.apply(null,this.array)};b.title="browser";b.browser=!0;b.env={};b.argv=[];b.version="";b.versions={};b.on=m;b.addListener=m;b.once=m;b.off=m;b.removeListener=m;b.removeAllListeners=m;b.emit=m;b.prependListener=m;b.prependOnceListener=m;b.listeners=function(a){return[]};b.binding=function(a){throw Error("process.binding is not supported");};b.cwd=function(){return"/"};b.chdir=function(a){throw Error("process.chdir is not supported");
};b.umask=function(){return 0}},function(b,d){b.exports={}},function(b,d,e){function a(b){"@babel/helpers - typeof";a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"===typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};return a(b)}var c=e(6),k=e(8),n=null;(function(b){function d(){v=function(){}}function e(b){var c=[];return{resource_array:c,msg:JSON.stringify(b.data,function(b,d){if("object"===
a(d)&&(b=null,d instanceof Uint8Array?b=d:d instanceof ArrayBuffer&&(b=new Uint8Array(d)),b)){d=x(b.length);var e=l(d);e&&(new Uint8Array(Module.HEAPU8.buffer,e,b.length)).set(b);c.push(d);return{__trn_res_id:d}}return d})}}function t(a){a=e(a);q(a.msg)}var v,q,x,l;b.basePath="../";var w=b.officeWorkerPath||"";b.workerBasePath&&(b.basePath=b.workerBasePath);var f=function(a){var b={};decodeURIComponent(a.slice(1)).split("&").forEach(function(a){a=a.split("=",2);b[a[0]]=a[1]});return b}(b.location.search);
b.basePath=f.externalPath?f.externalPath:b.basePath+"external/";importScripts("".concat(b.basePath,"Promise.js"));var u=[];onmessage=function(a){u||(u=[]);u.push(a)};b.ContinueFunc=function(a){v("ContinueFunc called");setTimeout(function(){onmessage({data:{action:"continue"}})},a)};if(f.pdfWorkerPath)var r=f.pdfWorkerPath;if(f.officeAsmPath)var y=f.officeAsmPath;b.Module={memoryInitializerPrefixURL:r,asmjsPrefix:y,onRuntimeInitialized:function(){v||d();var a=Date.now()-n;Object(c.a)("load","time duration from start to ready: ".concat(JSON.stringify(a)));
q=function(a){if(null!==a&&void 0!==a&&0!==a){var b=(a.length<<2)+1,c=Module._malloc(b);0<Module.stringToUTF8(a,c,b)&&Module._TRN_OnMessage(c)}};x=function(a){return Module._TRN_CreateBufferResource(a)};l=function(a){return Module._TRN_GetResourcePointer(a)};v("OnReady called");onmessage=t;Module._TRN_InitWorker();for(a=0;a<u.length;++a)onmessage(u[a]);u=null},fetchSelf:function(){n=Date.now();Object(k.a)("".concat(w,"WebOfficeWorker"),{"Wasm.wasm":5E6,"Wasm.js.mem":1E5,".js.mem":5E6,".mem":3E6},
!!navigator.userAgent.match(/Edge/i))},noExitRuntime:!0};b.Module.fetchSelf()})("undefined"===typeof window?self:window)}]);}).call(this || window)