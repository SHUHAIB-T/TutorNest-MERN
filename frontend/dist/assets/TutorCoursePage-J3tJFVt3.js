import{r as l,a as M,B as v,j as e,k as G,Q as $,d as E,J as _,K as q,N as D,O as T,M as I,Y as k,I as B,o as L,v as g,F as A}from"./index-4mQrzorV.js";import{d as P,a as U}from"./uploadFirebase-0eqYi-Pg.js";import{d as H}from"./ModeEdit-9wk9h-Ch.js";import{N as J}from"./NavBar-Dk95Zm8i.js";import{d as K}from"./ChevronLeft-2_ZgKlWi.js";import"./Cancel-bRrxsMnd.js";import"./Paper-rGG8zCiV.js";function O({coverIMG:j,description:u,price:o,title:m,_id:x,setUpdated:s,setEditCourseId:i}){const[t,d]=l.useState("");l.useEffect(()=>{(async function(){t&&(await M.patch(`/course/${t}`,{},{withCredentials:!0}),s(!0),d(""),v.success("Course deleted successfully"))})()},[t,s]);const r=p=>{$.fire({title:"Are you sure?",text:"are you sure want to delete this",icon:"warning",showCancelButton:!0,confirmButtonText:"yes delete"}).then(h=>{h.isConfirmed&&d(p)})};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative course-card w-72",children:[e.jsxs("div",{className:"flex flex-col bg-mycard-body hover:scale-105 duration-300 hover:shadow-lg w-60 h-fit rounded-2xl",children:[e.jsx("img",{src:j,alt:"",className:"rounded-2xl h-32 object-cover overflow-hidden hover:border-b-4 border-my-ring"}),e.jsxs("div",{className:"leading-none m-3",children:[e.jsx("h1",{className:"font-bold text-white text-2xl",children:m}),e.jsx("div",{children:e.jsxs("small",{className:"text-gray-300",children:[" ₹",o]})}),e.jsx("small",{className:"text-white leading-none",children:u})]}),e.jsx(G,{to:`/tutor/lessons/${x}`,children:e.jsx("button",{className:"font-bold text-white w-full bg-primary hover:bg-my-ring py-2 rounded-b-2xl",children:"view"})})]}),e.jsxs("div",{className:"absolute options right-4 top-0 flex flex-col items-center justify-center",children:[e.jsx("div",{onClick:()=>r(x),children:e.jsx(P,{className:"cursor-pointer text-primary hover:text-white"})}),e.jsx("div",{onClick:()=>i(x),children:e.jsx(H,{className:"cursor-pointer text-primary hover:text-white"})})]})]})})}function Q({openModal:j,setOpenModal:u,setUpdated:o}){const{user:m}=E(c=>c.auth),x={title:"",coverIMG:"",description:"",price:"",category:"",language:""},[s,i]=l.useState(x),[t,d]=l.useState(x),[r,p]=l.useState(null),[h,n]=l.useState(!1),[y,f]=l.useState(!1),b=c=>{const{name:w,value:a}=c.currentTarget;i({...s,[w]:a}),n(!1)},N=c=>{c.preventDefault(),d({...t,description:g("required",s.description),price:g("required",s.price),title:g("required",s.title),coverIMG:g("required",r),category:g("required",s.category),language:g("required",s.language)}),n(!0)};return l.useEffect(()=>{(async function(){if(!t.coverIMG&&!t.description&&!t.price&&!t.title&&!t.category&&!t.language&&r&&s.description&&s.price&&s.title&&s.category&&s.language&&h)try{f(!0);const c=new Date().getTime()+r.name,w=_(q,"converIMG/"+c);if(await D(w,r)){const C=await T(w),{data:F}=await M.post("/course",{coverIMG:C,title:s.title,description:s.description,price:s.price,language:s.language,category:s.category,teacherId:m==null?void 0:m._id},{withCredentials:!0});F.success&&(u(!1),v.success("Course Created!"),i(x),o(S=>!S),f(!1))}}catch{f(!1),v.error("Error")}})()},[t,r,s,h,m,u]),e.jsx("div",{children:e.jsxs(I,{show:j,onClose:()=>u(!1),children:[e.jsx(I.Header,{className:"ring-1 ring-[#4d2389] bg-[#110d17] rounded-t-md",children:e.jsx("h1",{className:"text-white font-bold",children:"Create Course"})}),e.jsx(I.Body,{className:"bg-[#110d17] ring-1 ring-[#4d2389] rounded-b-md",children:e.jsxs("div",{className:"grid grid-cols-2 gap-2 w-full",children:[e.jsxs("div",{className:"flex flex-col  md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Title"}),t.title&&e.jsx("small",{className:"text-red-600",children:t.title}),e.jsx("input",{onChange:b,className:"bg-[#251c32] text-white border-0 rounded-md",type:"text",name:"title",value:s.title,placeholder:"Enter the title of the course"})]}),e.jsxs("div",{className:"flex flex-col   md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Price"}),t.price&&e.jsx("small",{className:"text-red-600",children:t.price}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md ",type:"number",name:"price",value:s.price,placeholder:"Enter the price of the course",onChange:b})]}),e.jsxs("div",{className:"flex flex-col   md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Category"}),t.category&&e.jsx("small",{className:"text-red-600",children:t.category}),e.jsxs("select",{className:"bg-[#251c32] text-white border-0 rounded-md",name:"category",value:s.category,onChange:b,id:"",children:[e.jsx("option",{value:"",children:"-select category-"}),k.map(c=>e.jsx("option",{value:c,children:c}))]})]}),e.jsxs("div",{className:"flex flex-col   md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Language"}),t.language&&e.jsx("small",{className:"text-red-600",children:t.language}),e.jsxs("select",{className:"bg-[#251c32] text-white border-0 rounded-md",name:"language",value:s.language,onChange:b,id:"",children:[e.jsx("option",{value:"",children:"-select language-"}),B.map(c=>e.jsx("option",{value:c,children:c}))]})]}),e.jsxs("div",{className:"flex flex-col col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"cover image"}),t.coverIMG&&e.jsx("small",{className:"text-red-600",children:t.coverIMG}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md ",type:"file",accept:"image/*",onChange:c=>{c.target.files&&p(c.target.files[0])}})]}),e.jsxs("div",{className:"col-span-2 w-full text-white",children:[e.jsx("label",{htmlFor:"description",children:"Description"}),t.description&&e.jsx("small",{className:"text-red-600",children:t.description}),e.jsx("textarea",{className:"w-full mt-4 rounded-md bg-[#251c32] border-0 py-2",rows:4,name:"description",value:s.description,onChange:b,id:""})]}),y?e.jsx(e.Fragment,{children:e.jsx("div",{className:"font-bold text-white bg-primary flex items-center justify-center rounded-lg",children:e.jsx(L,{})})}):e.jsx("button",{onClick:N,className:"font-bold text-white bg-primary rounded-lg",children:"SUBMIT"}),e.jsx("button",{onClick:()=>i(x),className:"font-bold text-white px-4 py-2 bg-[#3f3b3b] rounded-lg",children:"CLEAR"})]})})]})})}function Y({openModal:j,setOpenModal:u,initialstate:o,setEditCourseId:m,setUpdated:x,setInitialState:s}){const{user:i}=E(a=>a.auth),[t,d]=l.useState(o),[r,p]=l.useState(o),[h,n]=l.useState(null),[y,f]=l.useState(!1),[b,N]=l.useState(!1);l.useEffect(()=>{d(o)},[o]);const c=a=>{const{name:C,value:F}=a.target;d({...t,[C]:F}),f(!1)},w=a=>{a.preventDefault(),p({...r,description:g("required",t.description),price:g("required",t.price),title:g("required",t.title),coverIMG:g("required",t.coverIMG),category:g("required",t.category),language:g("required",t.language)}),f(!0)};return l.useEffect(()=>{(async function(){if(!r.coverIMG&&!r.description&&!r.price&&!r.title&&t.description&&t.price&&t.title&&y)try{if(N(!0),h){await U(o.coverIMG);const a=new Date().getTime()+h.name,C=_(q,"converIMG/"+a);if(await D(C,h)){const S=await T(C);await M.put(`/course/${o._id}`,{coverIMG:S,title:t.title,description:t.description,price:t.price,teacherId:i==null?void 0:i._id,category:t.category,language:t.language},{withCredentials:!0}),u(!1),v.success("Course updated!"),x(R=>!R),f(!1),m(""),s({title:"",coverIMG:"",description:"",price:""}),N(!1)}}else await M.put(`/course/${o._id}`,{title:t.title,description:t.description,price:t.price,teacherId:i==null?void 0:i._id,category:t.category,language:t.language,coverIMG:o.coverIMG},{withCredentials:!0}),u(!1),v.success("Course updated!"),m(""),s({title:"",coverIMG:"",description:"",price:""}),x(a=>!a),f(!1),N(!1)}catch{v.error("Error"),N(!1)}})()},[r,h,t,y,i,u]),e.jsx("div",{children:e.jsxs(I,{show:j,onClose:()=>{u(!1),m(""),s({title:"",coverIMG:"",description:"",price:""})},children:[e.jsx(I.Header,{className:"ring-1 ring-[#4d2389] bg-[#110d17] rounded-t-md",children:e.jsx("h1",{className:"text-white font-bold",children:"Create Course"})}),e.jsx(I.Body,{className:"bg-[#110d17] ring-1 ring-[#4d2389] rounded-b-md",children:e.jsxs("div",{className:"grid grid-cols-2 gap-2 w-full",children:[e.jsxs("div",{className:"flex flex-col  md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Title"}),r.title&&e.jsx("small",{className:"text-red-600",children:r.title}),e.jsx("input",{onChange:c,className:"bg-[#251c32] text-white border-0 rounded-md",type:"text",name:"title",value:t.title,placeholder:"Enter the title of the course"})]}),e.jsxs("div",{className:"flex flex-col   md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Price"}),r.price&&e.jsx("small",{className:"text-red-600",children:r.price}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md ",type:"number",name:"price",value:t.price,placeholder:"Enter the price of the course",onChange:c})]}),e.jsxs("div",{className:"flex flex-col   md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Category"}),r.category&&e.jsx("small",{className:"text-red-600",children:r.category}),e.jsxs("select",{className:"bg-[#251c32] text-white border-0 rounded-md",name:"category",value:t.category,onChange:c,id:"",children:[t.category&&e.jsx("option",{value:t.category,children:t.category}),k.map(a=>e.jsx(e.Fragment,{children:t.category!==a&&e.jsx("option",{value:a,children:a})}))]})]}),e.jsxs("div",{className:"flex flex-col   md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Language"}),r.language&&e.jsx("small",{className:"text-red-600",children:r.language}),e.jsxs("select",{className:"bg-[#251c32] text-white border-0 rounded-md",name:"language",value:t.language,onChange:c,id:"",children:[t.language&&e.jsx("option",{value:t.language,children:t.language}),B.map(a=>e.jsx(e.Fragment,{children:t.language!==a&&e.jsx("option",{value:a,children:a})}))]})]}),e.jsxs("div",{className:"flex flex-col col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"cover image"}),r.coverIMG&&e.jsx("small",{className:"text-red-600",children:r.coverIMG}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md ",type:"file",accept:"image/*",onChange:a=>{a.target.files&&n(a.target.files[0])}})]}),e.jsxs("div",{className:"col-span-2 w-full text-white",children:[e.jsx("label",{htmlFor:"description",children:"Description"}),r.description&&e.jsx("small",{className:"text-red-600",children:r.description}),e.jsx("textarea",{className:"w-full mt-4 rounded-md bg-[#251c32] border-0 py-2",rows:4,name:"description",value:t.description,onChange:c,id:""})]}),b?e.jsx(e.Fragment,{children:e.jsx("div",{className:"font-bold flex items-center justify-center text-white bg-primary rounded-lg",children:e.jsx(L,{})})}):e.jsx("button",{onClick:w,className:"font-bold text-white bg-primary rounded-lg",children:"SUBMIT"}),e.jsx("button",{onClick:()=>d(o),className:"font-bold text-white px-4 py-2 bg-[#3f3b3b] rounded-lg",children:"Reset"})]})})]})})}function se(){const[j,u]=l.useState(!1),[o,m]=l.useState(!1),[x,s]=l.useState(!1),[i,t]=l.useState([]),[d,r]=l.useState(""),[p,h]=l.useState({coverIMG:"",description:"",price:"",title:""});return l.useEffect(()=>{(async function(){try{const{data:n}=await M.get("/tutor/my_courses",{withCredentials:!0});t(n.courses)}catch{v.error("Error")}})()},[x]),l.useEffect(()=>{d&&h(i.find(n=>n._id===d))},[d]),l.useEffect(()=>{p.title&&d&&m(!0)},[d,p.title]),e.jsxs(e.Fragment,{children:[e.jsx(Y,{initialstate:p,openModal:o,setOpenModal:m,setEditCourseId:r,setUpdated:s,setInitialState:h}),e.jsx(Q,{openModal:j,setUpdated:s,setOpenModal:u}),e.jsx(J,{role:"TUTOR"}),e.jsxs("div",{className:"flex w-full flex-col pb-28 items-center bg-secondary",children:[e.jsx("h1",{className:"font-bold text-5xl text-white mt-10",children:"My Courses"}),e.jsxs("div",{className:"w-[80%] mt-3 flex justify-between",children:[e.jsx("div",{className:"flex items-center",children:e.jsxs(G,{to:"/",className:"font-bold text-white",children:[e.jsx(K,{className:"mb-1"})," Back"]})}),e.jsx("button",{onClick:()=>u(!0),className:"bg-primary px-5 py-2 rounded-md text-white font-bold",children:"Create Course"})]}),e.jsx("div",{className:"flex flex-wrap mt-10",children:i.map((n,y)=>e.jsx(O,{coverIMG:n.coverIMG,description:n.description,price:n.price,title:n.title,setUpdated:s,_id:n._id,setEditCourseId:r},y))})]}),e.jsx(A,{})]})}export{se as default};