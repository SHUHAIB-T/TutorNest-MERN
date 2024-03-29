import{r,o as j,B as x,j as e,a as v,x as E,L as o,F as C}from"./index-jVhWPiF6.js";import{N as F}from"./NavBar-VvQwKKmC.js";import"./Cancel-3UUaCYp5.js";import"./Paper-nn5JuHjW.js";function T({budget:u,description:m,language:l,profile:a,subject:i,title:t,reqStatus:c,studentId:g,setIsRequestSent:n,isRequestSent:d}){const[h,b]=r.useState(""),[f,N]=r.useState("");r.useEffect(()=>{(async function(){if(h&&!d)try{const s=await j.post("/tutor/createRequest",{studentId:h},{withCredentials:!0});s&&(x.success(s.data.message),n(!0),b(""))}catch(s){const p=s;x.error(p.message)}})()},[h,n,d]),r.useEffect(()=>{(async function(){if(f&&!d)try{await j.post("/tutor/cancelConnection",{studentId:f},{withCredentials:!0})&&(n(!0),N(""))}catch(s){const p=s;x.error(p.message)}})()},[f,n,d]);const w=s=>{b(s)},y=s=>{N(s)};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"div",children:[e.jsxs("div",{className:"ring-1 h-fit flex w-full items-center justify-between p-3 ring-[#4d2389] bg-[#311d4e] text-white max-w-96 pr-10 pl-5 rounded-t-2xl",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("img",{src:a.profile?a.profile:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",className:"w-10 rounded-full border-2 border-violet-700",alt:""}),e.jsx("h1",{className:"font-bold text-white text-xl md:text-2xl",children:a.name})]}),c==="NONE"&&e.jsx("button",{onClick:()=>w(g),className:"bg-primary px-3 text-sm  py-1 rounded-md text-white",children:"CONNECT"}),c==="PENDING"&&e.jsx("button",{onClick:()=>y(g),className:"bg-primary px-3 text-sm  py-1 rounded-md text-white",children:"REQUESTED"})]}),e.jsxs("div",{className:"ring-1 flex flex-col items-center pb-5 h-fit shadow-2xl ring-[#4d2389] bg-[#1f172b] text-white max-w-96 px-5 rounded-b-2xl",children:[e.jsx("div",{className:"w-full items-start",children:e.jsx("h1",{className:" font-bold mt-5 text-2xl",children:t})}),e.jsxs("div",{className:"flex w-full mt-2 justify-between",children:[e.jsxs("small",{children:["sub: ",i]}),e.jsxs("small",{children:[" ",u,"/hr"]})]}),e.jsx("div",{className:"w-full",children:e.jsxs("small",{children:["Language: ",l]})}),e.jsx("div",{className:"bg-[#26223F] w-full mt-2 rounded-md p-3",children:m})]})]})})}function M(){const[u,m]=r.useState([]),[l,a]=r.useState(!1),i=v();return r.useEffect(()=>{i(E())},[i]),r.useEffect(()=>{(async function(){try{const t=await j.get("/tutor/posts",{withCredentials:!0});t.data&&(m(t.data.posts),a(!1))}catch{x.error("Error")}})()},[l]),e.jsxs(e.Fragment,{children:[e.jsx(F,{role:"TUTOR"}),e.jsx("div",{className:"flex justify-center relative w-full bg-secondary py-5"}),e.jsxs("div",{className:"w-full pb-12 gap-3 flex justify-center flex-wrap bg-secondary",children:[e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{className:"card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]",children:[e.jsx("h1",{className:"font-bold text-4xl text-white",children:"My Profile"}),e.jsx(o,{to:"/tutor/profile",children:e.jsx("h1",{className:"absolute top-3 right-5  text-[#9747FF]",children:"View"})})]}),e.jsxs("div",{className:"card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]",children:[e.jsx("h1",{className:"font-bold text-4xl text-white",children:"My Students"}),e.jsx(o,{to:"/tutor/my-students",children:e.jsx("h1",{className:"absolute top-3 right-5  text-[#9747FF]",children:"View"})})]})]}),e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("div",{className:"card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]",children:[e.jsx("h1",{className:"font-bold text-4xl text-white",children:"My documents"}),e.jsx(o,{to:"/tutor/documents",children:e.jsx("h1",{className:"absolute top-3 right-5  text-[#9747FF]",children:"View"})})]}),e.jsxs("div",{className:"card w-72 py-10 grid items-center justify-center relative rounded-md h-fit bg-[#372450]",children:[e.jsx("h1",{className:"font-bold text-4xl text-white",children:"My Courses"}),e.jsx(o,{to:"/tutor/courses",children:e.jsx("h1",{className:"absolute top-3 right-5  text-[#9747FF]",children:"View"})})]})]})]}),e.jsxs("div",{className:"bg-[#302c35] flex flex-wrap justify-center md:justify-start gap-5 px-2 md:px-10  py-10",children:[e.jsx("div",{className:"w-full flex justify-center",children:e.jsx("h1",{className:"font-bold md:text-5xl text-center text-3xl text-white mb-5",children:"STUDENT POSTS"})}),u.map((t,c)=>e.jsx(T,{setIsRequestSent:a,budget:t.budget,description:t.description,language:t.language,profile:t.profile,subject:t.subject,title:t.title,reqStatus:t.reqStatus,studentId:t.studentId,isRequestSent:l},c))]}),e.jsx(C,{})]})}export{M as default};
