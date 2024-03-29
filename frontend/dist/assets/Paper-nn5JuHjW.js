import{a4 as U,aP as $,aQ as j,a7 as d,a8 as b,Z as y,aR as N,a6 as M,af as H,a9 as L,ad as w,aS as k,r as G,aj as q,j as F,ae as W}from"./index-jVhWPiF6.js";function tt(){const e=U(j);return e[$]||e}const R=e=>{let i;return e<1?i=5.11916*e**2:i=4.5*Math.log(e+1)+2,(i/100).toFixed(2)};function A(e){return typeof e=="string"}function et(e,i,a){return e===void 0||A(e)?i:d({},i,{ownerState:d({},i.ownerState,a)})}function X(e,i=[]){if(e===void 0)return{};const a={};return Object.keys(e).filter(o=>o.match(/^on[A-Z]/)&&typeof e[o]=="function"&&!i.includes(o)).forEach(o=>{a[o]=e[o]}),a}function nt(e,i,a){return typeof e=="function"?e(i,a):e}function _(e){if(e===void 0)return{};const i={};return Object.keys(e).filter(a=>!(a.match(/^on[A-Z]/)&&typeof e[a]=="function")).forEach(a=>{i[a]=e[a]}),i}function at(e){const{getSlotProps:i,additionalProps:a,externalSlotProps:o,externalForwardedProps:n,className:t}=e;if(!i){const C=b(a==null?void 0:a.className,t,n==null?void 0:n.className,o==null?void 0:o.className),P=d({},a==null?void 0:a.style,n==null?void 0:n.style,o==null?void 0:o.style),T=d({},a,n,o);return C.length>0&&(T.className=C),Object.keys(P).length>0&&(T.style=P),{props:T,internalRef:void 0}}const s=X(d({},n,o)),r=_(o),l=_(n),u=i(s),c=b(u==null?void 0:u.className,a==null?void 0:a.className,t,n==null?void 0:n.className,o==null?void 0:o.className),f=d({},u==null?void 0:u.style,a==null?void 0:a.style,n==null?void 0:n.style,o==null?void 0:o.style),x=d({},u,a,l,r);return c.length>0&&(x.className=c),Object.keys(f).length>0&&(x.style=f),{props:x,internalRef:u.ref}}function S(e,i){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,n){return o.__proto__=n,o},S(e,i)}function Z(e,i){e.prototype=Object.create(i.prototype),e.prototype.constructor=e,S(e,i)}const D={disabled:!1},I=y.createContext(null);var Q=function(i){return i.scrollTop},g="unmounted",v="exited",h="entering",m="entered",O="exiting",p=function(e){Z(i,e);function i(o,n){var t;t=e.call(this,o,n)||this;var s=n,r=s&&!s.isMounting?o.enter:o.appear,l;return t.appearStatus=null,o.in?r?(l=v,t.appearStatus=h):l=m:o.unmountOnExit||o.mountOnEnter?l=g:l=v,t.state={status:l},t.nextCallback=null,t}i.getDerivedStateFromProps=function(n,t){var s=n.in;return s&&t.status===g?{status:v}:null};var a=i.prototype;return a.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},a.componentDidUpdate=function(n){var t=null;if(n!==this.props){var s=this.state.status;this.props.in?s!==h&&s!==m&&(t=h):(s===h||s===m)&&(t=O)}this.updateStatus(!1,t)},a.componentWillUnmount=function(){this.cancelNextCallback()},a.getTimeouts=function(){var n=this.props.timeout,t,s,r;return t=s=r=n,n!=null&&typeof n!="number"&&(t=n.exit,s=n.enter,r=n.appear!==void 0?n.appear:s),{exit:t,enter:s,appear:r}},a.updateStatus=function(n,t){if(n===void 0&&(n=!1),t!==null)if(this.cancelNextCallback(),t===h){if(this.props.unmountOnExit||this.props.mountOnEnter){var s=this.props.nodeRef?this.props.nodeRef.current:N.findDOMNode(this);s&&Q(s)}this.performEnter(n)}else this.performExit();else this.props.unmountOnExit&&this.state.status===v&&this.setState({status:g})},a.performEnter=function(n){var t=this,s=this.props.enter,r=this.context?this.context.isMounting:n,l=this.props.nodeRef?[r]:[N.findDOMNode(this),r],u=l[0],c=l[1],f=this.getTimeouts(),x=r?f.appear:f.enter;if(!n&&!s||D.disabled){this.safeSetState({status:m},function(){t.props.onEntered(u)});return}this.props.onEnter(u,c),this.safeSetState({status:h},function(){t.props.onEntering(u,c),t.onTransitionEnd(x,function(){t.safeSetState({status:m},function(){t.props.onEntered(u,c)})})})},a.performExit=function(){var n=this,t=this.props.exit,s=this.getTimeouts(),r=this.props.nodeRef?void 0:N.findDOMNode(this);if(!t||D.disabled){this.safeSetState({status:v},function(){n.props.onExited(r)});return}this.props.onExit(r),this.safeSetState({status:O},function(){n.props.onExiting(r),n.onTransitionEnd(s.exit,function(){n.safeSetState({status:v},function(){n.props.onExited(r)})})})},a.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},a.safeSetState=function(n,t){t=this.setNextCallback(t),this.setState(n,t)},a.setNextCallback=function(n){var t=this,s=!0;return this.nextCallback=function(r){s&&(s=!1,t.nextCallback=null,n(r))},this.nextCallback.cancel=function(){s=!1},this.nextCallback},a.onTransitionEnd=function(n,t){this.setNextCallback(t);var s=this.props.nodeRef?this.props.nodeRef.current:N.findDOMNode(this),r=n==null&&!this.props.addEndListener;if(!s||r){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var l=this.props.nodeRef?[this.nextCallback]:[s,this.nextCallback],u=l[0],c=l[1];this.props.addEndListener(u,c)}n!=null&&setTimeout(this.nextCallback,n)},a.render=function(){var n=this.state.status;if(n===g)return null;var t=this.props,s=t.children;t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef;var r=M(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return y.createElement(I.Provider,{value:null},typeof s=="function"?s(n,r):y.cloneElement(y.Children.only(s),r))},i}(y.Component);p.contextType=I;p.propTypes={};function E(){}p.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:E,onEntering:E,onEntered:E,onExit:E,onExiting:E,onExited:E};p.UNMOUNTED=g;p.EXITED=v;p.ENTERING=h;p.ENTERED=m;p.EXITING=O;const ot=p,it=e=>e.scrollTop;function st(e,i){var a,o;const{timeout:n,easing:t,style:s={}}=e;return{duration:(a=s.transitionDuration)!=null?a:typeof n=="number"?n:n[i.mode]||0,easing:(o=s.transitionTimingFunction)!=null?o:typeof t=="object"?t[i.mode]:t,delay:s.transitionDelay}}function V(e){return H("MuiPaper",e)}L("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const z=["className","component","elevation","square","variant"],B=e=>{const{square:i,elevation:a,variant:o,classes:n}=e,t={root:["root",o,!i&&"rounded",o==="elevation"&&`elevation${a}`]};return W(t,V,n)},J=w("div",{name:"MuiPaper",slot:"Root",overridesResolver:(e,i)=>{const{ownerState:a}=e;return[i.root,i[a.variant],!a.square&&i.rounded,a.variant==="elevation"&&i[`elevation${a.elevation}`]]}})(({theme:e,ownerState:i})=>{var a;return d({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!i.square&&{borderRadius:e.shape.borderRadius},i.variant==="outlined"&&{border:`1px solid ${(e.vars||e).palette.divider}`},i.variant==="elevation"&&d({boxShadow:(e.vars||e).shadows[i.elevation]},!e.vars&&e.palette.mode==="dark"&&{backgroundImage:`linear-gradient(${k("#fff",R(i.elevation))}, ${k("#fff",R(i.elevation))})`},e.vars&&{backgroundImage:(a=e.vars.overlays)==null?void 0:a[i.elevation]}))}),K=G.forwardRef(function(i,a){const o=q({props:i,name:"MuiPaper"}),{className:n,component:t="div",elevation:s=1,square:r=!1,variant:l="elevation"}=o,u=M(o,z),c=d({},o,{component:t,elevation:s,square:r,variant:l}),f=B(c);return F.jsx(J,d({as:t,ownerState:c,className:b(f.root,n),ref:a},u))}),rt=K;export{rt as P,ot as T,Z as _,et as a,it as b,I as c,X as e,st as g,at as m,nt as r,tt as u};