System.register(["./index-legacy-310ffdec.js"],(function(e,t){"use strict";var r,n;return{setters:[e=>{r=e.o,n=e.W}],execute:function(){var t,o,i,a,c,s={},u=function(e){return e&&e.__esModule?e:{default:e}},d={exports:{}};function l(){return t||(t=1,function(e){var t=function(e){var t,r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(e,t,r){e[t]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function u(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{u({},"")}catch(A){u=function(e,t,r){return e[t]=r}}function d(e,t,r,n){var i=t&&t.prototype instanceof g?t:g,a=Object.create(i.prototype),c=new I(n||[]);return o(a,"_invoke",{value:L(e,r,c)}),a}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(A){return{type:"throw",arg:A}}}e.wrap=d;var h="suspendedStart",f="suspendedYield",p="executing",v="completed",m={};function g(){}function y(){}function R(){}var w={};u(w,a,(function(){return this}));var E=Object.getPrototypeOf,b=E&&E(E(T([])));b&&b!==r&&n.call(b,a)&&(w=b);var O=R.prototype=g.prototype=Object.create(w);function x(e){["next","throw","return"].forEach((function(t){u(e,t,(function(e){return this._invoke(t,e)}))}))}function _(e,t){function r(o,i,a,c){var s=l(e[o],e,i);if("throw"!==s.type){var u=s.arg,d=u.value;return d&&"object"==typeof d&&n.call(d,"__await")?t.resolve(d.__await).then((function(e){r("next",e,a,c)}),(function(e){r("throw",e,a,c)})):t.resolve(d).then((function(e){u.value=e,a(u)}),(function(e){return r("throw",e,a,c)}))}c(s.arg)}var i;o(this,"_invoke",{value:function(e,n){function o(){return new t((function(t,o){r(e,n,t,o)}))}return i=i?i.then(o,o):o()}})}function L(e,t,r){var n=h;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===v){if("throw"===o)throw i;return D()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=S(a,r);if(c){if(c===m)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=v,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var s=l(e,t,r);if("normal"===s.type){if(n=r.done?v:f,s.arg===m)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=v,r.method="throw",r.arg=s.arg)}}}function S(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,S(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=l(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,m;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,m):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function P(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function N(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function I(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(P,this),this.reset(!0)}function T(e){if(e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}return{next:D}}function D(){return{value:t,done:!0}}return y.prototype=R,o(O,"constructor",{value:R,configurable:!0}),o(R,"constructor",{value:y,configurable:!0}),y.displayName=u(R,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,R):(e.__proto__=R,u(e,s,"GeneratorFunction")),e.prototype=Object.create(O),e},e.awrap=function(e){return{__await:e}},x(_.prototype),u(_.prototype,c,(function(){return this})),e.AsyncIterator=_,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new _(d(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},x(O),u(O,s,"Generator"),u(O,a,(function(){return this})),u(O,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=T,I.prototype={constructor:I,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(N),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var s=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),N(r),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;N(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:T(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),m}},e}(e.exports);try{regeneratorRuntime=t}catch(r){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}}(d)),d.exports}!function(e){var t=u;Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(e){return s.apply(this,arguments)};var r=t(i?o:(i=1,o=l())),n=t(function(){if(c)return a;function e(e,t,r,n,o,i,a){try{var c=e[i](a),s=c.value}catch(u){return void r(u)}c.done?t(s):Promise.resolve(s).then(n,o)}return c=1,a=function(t){return function(){var r=this,n=arguments;return new Promise((function(o,i){var a=t.apply(r,n);function c(t){e(a,o,i,c,s,"next",t)}function s(t){e(a,o,i,c,s,"throw",t)}c(void 0)}))}},a}());function s(){return(s=(0,n.default)(r.default.mark((function e(t){var n,o;return r.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=document.createElement("video"),o=new Promise((function(e,t){n.addEventListener("loadedmetadata",(function(){n.duration===1/0?(n.currentTime=Number.MAX_SAFE_INTEGER,n.ontimeupdate=function(){n.ontimeupdate=null,e(n.duration),n.currentTime=0}):e(n.duration)})),n.onerror=function(e){return t(e.target.error)}})),n.src="string"==typeof t||t instanceof String?t:window.URL.createObjectURL(t),e.abrupt("return",o);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}(s);const h=r(s),f=()=>new Error("FAILED_TO_RECORD"),p=()=>new Error("RECORDING_HAS_NOT_STARTED"),v=()=>new Error("FAILED_TO_FETCH_RECORDING"),m=["audio/aac","audio/webm;codecs=opus","audio/mp4","audio/webm","audio/ogg;codecs=opus"],g=()=>new Promise((()=>{}));class y{constructor(){this.mediaRecorder=null,this.chunks=[],this.pendingResult=g()}static async canDeviceVoiceRecord(){var e;return null==(null===(e=null===navigator||void 0===navigator?void 0:navigator.mediaDevices)||void 0===e?void 0:e.getUserMedia)||null==y.getSupportedMimeType()?{value:!1}:{value:!0}}async startRecording(){if(null!=this.mediaRecorder)throw new Error("ALREADY_RECORDING");if(!(await y.canDeviceVoiceRecord()).value)throw new Error("DEVICE_CANNOT_VOICE_RECORD");if(!(await y.hasAudioRecordingPermission().catch((()=>({value:!0})))).value)throw new Error("MISSING_PERMISSION");return navigator.mediaDevices.getUserMedia({audio:!0}).then(this.onSuccessfullyStartedRecording.bind(this)).catch(this.onFailedToStartRecording.bind(this))}async stopRecording(){if(null==this.mediaRecorder)throw p();try{return this.mediaRecorder.stop(),this.mediaRecorder.stream.getTracks().forEach((e=>e.stop())),this.pendingResult}catch(e){throw v()}finally{this.prepareInstanceForNextOperation()}}static async hasAudioRecordingPermission(){return navigator.permissions.query({name:"microphone"}).then((e=>({value:"granted"===e.state}))).catch((()=>{throw new Error("COULD_NOT_QUERY_PERMISSION_STATUS")}))}static async requestAudioRecordingPermission(){return(await y.hasAudioRecordingPermission().catch((()=>({value:!1})))).value?{value:!0}:navigator.mediaDevices.getUserMedia({audio:!0}).then((()=>({value:!0}))).catch((()=>({value:!1})))}pauseRecording(){if(null==this.mediaRecorder)throw p();return"recording"===this.mediaRecorder.state?(this.mediaRecorder.pause(),Promise.resolve({value:!0})):Promise.resolve({value:!1})}resumeRecording(){if(null==this.mediaRecorder)throw p();return"paused"===this.mediaRecorder.state?(this.mediaRecorder.resume(),Promise.resolve({value:!0})):Promise.resolve({value:!1})}getCurrentStatus(){return null==this.mediaRecorder?Promise.resolve({status:"NONE"}):"recording"===this.mediaRecorder.state?Promise.resolve({status:"RECORDING"}):"paused"===this.mediaRecorder.state?Promise.resolve({status:"PAUSED"}):Promise.resolve({status:"NONE"})}static getSupportedMimeType(){if(null==(null===MediaRecorder||void 0===MediaRecorder?void 0:MediaRecorder.isTypeSupported))return null;const e=m.find((e=>MediaRecorder.isTypeSupported(e)));return null!=e?e:null}onSuccessfullyStartedRecording(e){return this.pendingResult=new Promise(((t,r)=>{this.mediaRecorder=new MediaRecorder(e),this.mediaRecorder.onerror=()=>{this.prepareInstanceForNextOperation(),r(f())},this.mediaRecorder.onstop=async()=>{const e=y.getSupportedMimeType();if(null==e)return this.prepareInstanceForNextOperation(),void r(v());const n=new Blob(this.chunks,{type:e});if(n.size<=0)return this.prepareInstanceForNextOperation(),void r(new Error("EMPTY_RECORDING"));const o=await y.blobToBase64(n),i=await h(n);this.prepareInstanceForNextOperation(),t({value:{recordDataBase64:o,mimeType:e,msDuration:1e3*i}})},this.mediaRecorder.ondataavailable=e=>this.chunks.push(e.data),this.mediaRecorder.start()})),{value:!0}}onFailedToStartRecording(){throw this.prepareInstanceForNextOperation(),f()}static blobToBase64(e){return new Promise((t=>{const r=new FileReader;r.onloadend=()=>{const e=String(r.result),n=e.split("base64,"),o=n.length>1?n[1]:e;t(o.trim())},r.readAsDataURL(e)}))}prepareInstanceForNextOperation(){if(null!=this.mediaRecorder&&"recording"===this.mediaRecorder.state)try{this.mediaRecorder.stop()}catch(e){}this.pendingResult=g(),this.mediaRecorder=null,this.chunks=[]}}e("VoiceRecorderWeb",class extends n{constructor(){super(...arguments),this.voiceRecorderInstance=new y}canDeviceVoiceRecord(){return y.canDeviceVoiceRecord()}hasAudioRecordingPermission(){return y.hasAudioRecordingPermission()}requestAudioRecordingPermission(){return y.requestAudioRecordingPermission()}startRecording(){return this.voiceRecorderInstance.startRecording()}stopRecording(){return this.voiceRecorderInstance.stopRecording()}pauseRecording(){return this.voiceRecorderInstance.pauseRecording()}resumeRecording(){return this.voiceRecorderInstance.resumeRecording()}getCurrentStatus(){return this.voiceRecorderInstance.getCurrentStatus()}})}}}));
