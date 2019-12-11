!function(e){function t(t){for(var r,i,u=t[0],l=t[1],c=t[2],f=0,p=[];f<u.length;f++)i=u[f],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(s&&s(t);p.length;)p.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,u=1;u<n.length;u++){var l=n[u];0!==o[l]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={5:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var u=window.webpackJsonp=window.webpackJsonp||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var s=l;a.push([291,0,1]),n()}({2:function(e,t,n){e.exports=n(26)()},25:function(e,t,n){"use strict";
/** @license React v0.18.0
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r,o,a,i,u;if(Object.defineProperty(t,"__esModule",{value:!0}),"undefined"==typeof window||"function"!=typeof MessageChannel){var l=null,c=null,s=function(){if(null!==l)try{var e=t.unstable_now();l(!0,e),l=null}catch(e){throw setTimeout(s,0),e}},f=Date.now();t.unstable_now=function(){return Date.now()-f},r=function(e){null!==l?setTimeout(r,0,e):(l=e,setTimeout(s,0))},o=function(e,t){c=setTimeout(e,t)},a=function(){clearTimeout(c)},i=function(){return!1},u=t.unstable_forceFrameRate=function(){}}else{var p=window.performance,d=window.Date,b=window.setTimeout,y=window.clearTimeout;if("undefined"!=typeof console){var m=window.cancelAnimationFrame;"function"!=typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),"function"!=typeof m&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills")}if("object"==typeof p&&"function"==typeof p.now)t.unstable_now=function(){return p.now()};else{var v=d.now();t.unstable_now=function(){return d.now()-v}}var h=!1,w=null,O=-1,g=5,j=0;i=function(){return t.unstable_now()>=j},u=function(){},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"):g=0<e?Math.floor(1e3/e):5};var P=new MessageChannel,x=P.port2;P.port1.onmessage=function(){if(null!==w){var e=t.unstable_now();j=e+g;try{w(!0,e)?x.postMessage(null):(h=!1,w=null)}catch(e){throw x.postMessage(null),e}}else h=!1},r=function(e){w=e,h||(h=!0,x.postMessage(null))},o=function(e,n){O=b((function(){e(t.unstable_now())}),n)},a=function(){y(O),O=-1}}function T(e,t){var n=e.length;e.push(t);e:for(;;){var r=Math.floor((n-1)/2),o=e[r];if(!(void 0!==o&&0<C(o,t)))break e;e[r]=t,e[n]=o,n=r}}function _(e){return void 0===(e=e[0])?null:e}function k(e){var t=e[0];if(void 0!==t){var n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length;r<o;){var a=2*(r+1)-1,i=e[a],u=a+1,l=e[u];if(void 0!==i&&0>C(i,n))void 0!==l&&0>C(l,i)?(e[r]=l,e[u]=n,r=u):(e[r]=i,e[a]=n,r=a);else{if(!(void 0!==l&&0>C(l,n)))break e;e[r]=l,e[u]=n,r=u}}}return t}return null}function C(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}var E=[],S=[],M=1,N=null,D=3,R=!1,I=!1,H=!1;function L(e){for(var t=_(S);null!==t;){if(null===t.callback)k(S);else{if(!(t.startTime<=e))break;k(S),t.sortIndex=t.expirationTime,T(E,t)}t=_(S)}}function F(e){if(H=!1,L(e),!I)if(null!==_(E))I=!0,r(q);else{var t=_(S);null!==t&&o(F,t.startTime-e)}}function q(e,n){I=!1,H&&(H=!1,a()),R=!0;var r=D;try{for(L(n),N=_(E);null!==N&&(!(N.expirationTime>n)||e&&!i());){var u=N.callback;if(null!==u){N.callback=null,D=N.priorityLevel;var l=u(N.expirationTime<=n);n=t.unstable_now(),"function"==typeof l?N.callback=l:N===_(E)&&k(E),L(n)}else k(E);N=_(E)}if(null!==N)var c=!0;else{var s=_(S);null!==s&&o(F,s.startTime-n),c=!1}return c}finally{N=null,D=r,R=!1}}function A(e){switch(e){case 1:return-1;case 2:return 250;case 5:return 1073741823;case 4:return 1e4;default:return 5e3}}var J=u;t.unstable_ImmediatePriority=1,t.unstable_UserBlockingPriority=2,t.unstable_NormalPriority=3,t.unstable_IdlePriority=5,t.unstable_LowPriority=4,t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=D;D=e;try{return t()}finally{D=n}},t.unstable_next=function(e){switch(D){case 1:case 2:case 3:var t=3;break;default:t=D}var n=D;D=t;try{return e()}finally{D=n}},t.unstable_scheduleCallback=function(e,n,i){var u=t.unstable_now();if("object"==typeof i&&null!==i){var l=i.delay;l="number"==typeof l&&0<l?u+l:u,i="number"==typeof i.timeout?i.timeout:A(e)}else i=A(e),l=u;return e={id:M++,callback:n,priorityLevel:e,startTime:l,expirationTime:i=l+i,sortIndex:-1},l>u?(e.sortIndex=l,T(S,e),null===_(E)&&e===_(S)&&(H?a():H=!0,o(F,l-u))):(e.sortIndex=i,T(E,e),I||R||(I=!0,r(q))),e},t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_wrapCallback=function(e){var t=D;return function(){var n=D;D=t;try{return e.apply(this,arguments)}finally{D=n}}},t.unstable_getCurrentPriorityLevel=function(){return D},t.unstable_shouldYield=function(){var e=t.unstable_now();L(e);var n=_(E);return n!==N&&null!==N&&null!==n&&null!==n.callback&&n.startTime<=e&&n.expirationTime<N.expirationTime||i()},t.unstable_requestPaint=J,t.unstable_continueExecution=function(){I||R||(I=!0,r(q))},t.unstable_pauseExecution=function(){},t.unstable_getFirstCallbackNode=function(){return _(E)},t.unstable_Profiling=null},26:function(e,t,n){"use strict";var r=n(27);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,a,i){if(i!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return n.PropTypes=n,n}},27:function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},291:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(24),i=n.n(a),u=n(9);i.a.render(o.a.createElement((function(){return o.a.createElement(u.a.Provider,null,o.a.createElement("p",null,"Here is some inline math: ",o.a.createElement(u.a.Span,{texCode:"f(x)=x^2"})),o.a.createElement("p",null,"This one is a block element:"),o.a.createElement(u.a.Div,{texCode:"f(x)=x^2"}))}),null),document.getElementById("root"))},31:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},52:function(e,t,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,u,l=i(e),c=1;c<arguments.length;c++){for(var s in n=Object(arguments[c]))o.call(n,s)&&(l[s]=n[s]);if(r){u=r(n);for(var f=0;f<u.length;f++)a.call(n,u[f])&&(l[u[f]]=n[u[f]])}}return l}},53:function(e,t,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;function i(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,u,l=i(e),c=1;c<arguments.length;c++){for(var s in n=Object(arguments[c]))o.call(n,s)&&(l[s]=n[s]);if(r){u=r(n);for(var f=0;f<u.length;f++)a.call(n,u[f])&&(l[u[f]]=n[u[f]])}}return l}},54:function(e,t,n){"use strict";e.exports=n(25)},9:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=o.a.createContext({}),i=n(2),u=n.n(i),l=function(e){var t=e.children,n=e.options;return o.a.createElement(a.Provider,{value:n},t)};l.propTypes={children:u.a.node.isRequired,options:u.a.object},l.defaultProps={options:{}};var c=l,s=o.a.createContext();function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"inline",n=Object(r.useRef)(null),o=Object(r.useContext)(s),a=o.promiseMakers;return Object(r.useEffect)((function(){var r="display"===t,o=n.current;return"undefined"!=typeof window&&a.current.push((function(){return window.MathJax.tex2chtmlPromise(e,p({},window.MathJax.getMetricsFor(o,r),{display:r})).then((function(e){e&&(o.innerHTML=e.outerHTML)}))})),function(){o&&(o.innerHTML="")}}),[n,t,a,e]),n};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){v(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h={classNameHide:u.a.string,classNameShow:u.a.string,texCode:u.a.string},w={classNameHide:null,classNameShow:null,texCode:""},O=function(e){var t,n=e.classNameHide,a=e.classNameShow,i=e.displayType,u=e.texCode,l=b(u||"",i),c=Object(r.useContext)(s).typesetDone;n&&a&&(t=c?a:n);var f="display"===i?"div":"span";return o.a.createElement(f,{className:t,ref:l})};O.propTypes=m({displayType:u.a.oneOf(["inline","display"])},h),O.defaultProps=m({displayType:"display"},w);var g=function(e){var t=e.classNameHide,n=e.classNameShow,r=e.texCode;return o.a.createElement(O,{classNameHide:t,classNameShow:n,displayType:"display",texCode:r})};g.propTypes=h,g.defaultProps=w;var j=function(e){var t=e.classNameHide,n=e.classNameShow,r=e.texCode;return o.a.createElement(O,{classNameHide:t,classNameShow:n,displayType:"inline",texCode:r})};j.propTypes=h,j.defaultProps=w;var P=n(6),x=!1,T=!1,_=[],k={chtml:{fontURL:"https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2"},startup:{typeset:!1,pageReady:function(){for(T=!0;_.length>0;)_.pop()()}},tex:{packages:{"[+]":["ams"]}}},C=function(){var e=Object(r.useContext)(a);if("undefined"!=typeof window)return new Promise((function(t){if(x)T?t():_.push(t);else{var r;if(x=!0,e.startup&&e.startup.pageReady){var o=e.startup.pageReady;delete e.startup.pageReady,r=function(){t(),o()}}else r=t;window.MathJax=Object(P.insert)(k,e),_.push(r),n(37),n(13).Loader.preLoad("loader","startup","core","input/tex-full","output/chtml"),n(57),n(56),n(58),n(55)}}))};function E(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var S=function(e){var t=e.children,n=Object(r.useRef)([]),a=E(Object(r.useState)(!1),2),i=a[0],u=a[1],l=Object(r.useRef)([]),c=Object(r.useCallback)((function(e){return l.current.push(e)}),[]),f=Object(r.useCallback)((function(e){return l.current.splice(l.current.indexOf(e),1)}),[]),p=C();Object(r.useEffect)((function(){"undefined"!=typeof window&&n.current.reduce((function(e,t){return e.then(t)}),p).then((function(){return function(e,t){var n=window.MathJax.chtmlStylesheet(),r=document.getElementById(n.id);for(r?r.parentNode.replaceChild(n,r):document.getElementsByTagName("head")[0].appendChild(n),e(!0);t.current.length>0;)t.current.pop()()}(u,l)}))}),[p,u,l]);var d={addCallback:c,removeCallback:f,setTypesetDone:u,typesetCallbacks:l,typesetDone:i,promiseMakers:n};return o.a.createElement(s.Provider,{value:d},t)};S.propTypes={children:u.a.node.isRequired};var M=S;t.a={ConfigContext:a,ConfigProvider:c,Context:s,Div:g,Provider:M,Span:j,useMathJax:b}}});