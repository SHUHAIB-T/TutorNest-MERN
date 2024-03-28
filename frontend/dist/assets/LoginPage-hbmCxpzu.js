import{j as e,M as x,L as w,a as T,u as C,b as D,r as l,l as F,e as u,B as I,f as M,h as A,v as b}from"./index-2-yNbS5w.js";import{G as U}from"./GoogleAuth-VnXN7B8a.js";function k({openModal:n,setOpenModal:t}){return e.jsx(e.Fragment,{children:e.jsxs(x,{show:n,size:"md",onClose:()=>t(!1),popup:!0,children:[e.jsx(x.Header,{}),e.jsx(x.Body,{children:e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"mb-5 text-5xl font-black text-primary",children:"I am a"}),e.jsxs("div",{className:"flex w-full justify-center gap-4",children:[e.jsx(w,{to:"/student/signup",className:"bg-primary font-semibold w-full text-white rounded-md py-2",children:"STUDENT"}),e.jsx(w,{to:"/tutor/signup",className:"bg-primary font-semibold w-full text-white rounded-md py-2",children:"TEACHER"})]})]})})]})})}const B="/assets/LoginSVG-ZZciZCgT.svg";function G({role:n}){const t=T(),o=C(),{isLoading:f,isError:c,user:s,errorMessage:i,isSuccess:h}=D(m=>m.auth),[r,N]=l.useState({email:"",password:""}),[a,y]=l.useState({email:"",password:""}),[p,d]=l.useState(!1),[v,g]=l.useState(!1),j=m=>{const{name:E,value:L}=m.target;N({...r,[E]:L})},S=m=>{m.preventDefault(),y({...a,email:b("email",r.email),password:b("passwordLogin",r.password)}),d(!0)};return l.useEffect(()=>{p&&!a.email&&!a.password&&(t(F(r)),d(!1),t(u()))},[a,t,r,p]),l.useEffect(()=>{h&&((s==null?void 0:s.role)==="TUTOR"?o("/tutor"):(s==null?void 0:s.role)==="STUDENT"?o("/student"):(s==null?void 0:s.role)==="ADMIN"&&o("/admin"),d(!1),t(u())),(c&&i.status>500||i.status===404)&&(d(!1),I.error(i.message),t(u()))},[h,s,o,t,c,i]),f?e.jsx(M,{}):e.jsxs(e.Fragment,{children:[e.jsx(k,{setOpenModal:g,openModal:v}),e.jsx("div",{className:"flex justify-center items-center bg-gradient-to-r from-custom-gradient-start to-custom-gradient-end h-[100vh] md:px-72 px-4 w-full",children:e.jsxs("div",{className:"relative w-full flex justify-between bg-white  rounded-3xl",children:[e.jsx("img",{className:"absolute hidden top-0 right-0 w-64 md:inline-flex",src:B,alt:""}),e.jsxs("div",{className:"flex flex-col items-center w-[100%]",children:[e.jsx("h1",{className:"text-primary font-black text-5xl mt-9 mb-2",children:"LOGIN"}),n==="PUBLIC"&&e.jsx(U,{method:"Login",role:"PUBLIC"}),e.jsxs("form",{onSubmit:S,className:"flex flex-col items-start mt-1 w-[70%]",children:[c&&e.jsx("small",{className:"text-red-600 rounded-sm mt-2 bg-red-100 w-[100%] text-center",children:i.message}),e.jsx("label",{htmlFor:"name",className:"text-primary font-medium mt-2",children:"Email"}),e.jsx("input",{type:"email",id:"name",name:"email",value:r.email,onChange:j,placeholder:"Enter your Name",className:"w-[100%] text-xs h-8 rounded-md"}),a.email&&e.jsx("small",{className:"text-red-700",children:a.email}),e.jsx("label",{htmlFor:"name",className:"text-primary font-medium mt-2",children:"Password"}),e.jsx("input",{name:"password",type:"password",id:"name",value:r.password,placeholder:"Enter your Password",onChange:j,className:"w-[100%] text-xs h-8 rounded-md"}),a.password&&e.jsx("small",{className:"text-red-700",children:a.password}),f?e.jsx(e.Fragment,{children:e.jsx("div",{className:"bg-primary flex items-center justify-center h-8 w-[100%] md:w-[50%] mt-4 rounded-md text-white text-base font-medium",children:e.jsx(A,{})})}):e.jsx("button",{className:"bg-primary h-8 w-[100%] md:w-[50%] mt-4 rounded-md text-white text-base font-medium",children:"SUBMIT"}),e.jsxs("small",{className:"font-semibold mt-3 mb-8 text-blue-500",children:["Dont't have account?",e.jsxs("span",{onClick:()=>g(!0),className:"font-bold underline cursor-pointer",children:[" ","signup"]})]})]})]}),e.jsx("div",{className:"bg-primary w-60 left-20 hidden md:inline-flex rounded-3xl"})]})})]})}function R({role:n}){return e.jsx(e.Fragment,{children:e.jsx(G,{role:n})})}export{R as default};
