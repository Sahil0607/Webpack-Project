(()=>{"use strict";var e={293:(e,n,r)=>{function t(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}const o=function(){function e(){var n,r;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),r="hello-world-button",(n="buttonCssClass")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r}var n,r;return n=e,(r=[{key:"render",value:function(){var e=document.createElement("button");e.innerHTML="Hello World",e.classList.add(this.buttonCssClass);var n=document.querySelector("body");e.onclick=function(){var e=document.createElement("p");e.innerHTML="Hello World",e.classList.add("hello-world-text"),n.appendChild(e)},n.appendChild(e)}}])&&t(n.prototype,r),e}();function a(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}const l=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,r;return n=e,(r=[{key:"render",value:function(e){var n=document.createElement("h1"),r=document.querySelector("body");n.innerHTML=e,r.appendChild(n)}}])&&a(n.prototype,r),e}();var i=r(486),c=r.n(i);(new l).render(c().upperFirst("hello world")),(new o).render(),console.log("This is production mode")}},n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={id:t,loaded:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}r.m=e,r.x=e=>{},r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},r.d=(e,n)=>{for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={689:0},n=[[293,486]],t=e=>{},o=(o,a)=>{for(var l,i,[c,u,s,d]=a,f=0,p=[];f<c.length;f++)i=c[f],r.o(e,i)&&e[i]&&p.push(e[i][0]),e[i]=0;for(l in u)r.o(u,l)&&(r.m[l]=u[l]);for(s&&s(r),o&&o(a);p.length;)p.shift()();return d&&n.push.apply(n,d),t()},a=self.webpackChunkwebpack_project=self.webpackChunkwebpack_project||[];function l(){for(var t,o=0;o<n.length;o++){for(var a=n[o],l=!0,i=1;i<a.length;i++){var c=a[i];0!==e[c]&&(l=!1)}l&&(n.splice(o--,1),t=r(r.s=a[0]))}return 0===n.length&&(r.x(),r.x=e=>{}),t}a.forEach(o.bind(null,0)),a.push=o.bind(null,a.push.bind(a));var i=r.x;r.x=()=>(r.x=i||(e=>{}),(t=l)())})(),r.x()})();