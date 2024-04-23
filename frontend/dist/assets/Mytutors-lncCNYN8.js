import{r as a,u as y,a as x,B as w,j as e,M as p,T as b,X as N,i as S,v as j,e as C,E,F as k}from"./index-4mQrzorV.js";function T({name:h,bio:d,profile:t,userID:l,tutorRatings:u,setCurrentRating:g,setRateTutuorId:r}){const[o,s]=a.useState(""),f=y(),c=i=>{s(i)};return a.useEffect(()=>{(async function(){if(o)try{await x.post("/chat",{userId:o},{withCredentials:!0}),s(""),f("/student/chat")}catch{w.error("Error")}})()},[o,f]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"w-64 flex flex-col relative text-center items-center justify-center h-fit ring-my-ring ring-1 rounded-lg p-3 bg-my-bg-dark text-white",children:[e.jsx("img",{src:t||"https://www.seekpng.com/png/detail/115-1150456_avatar-generic-avatar.png",alt:"",className:"w-28 rounded-full mt-3 border-2 border-violet-700"}),e.jsx("h1",{className:"font-bold text-3xl",children:h}),e.jsx("small",{children:d}),e.jsx("button",{onClick:()=>{c(l)},className:"bg-primary font-bold text-white w-full rounded-md my-2",children:"CHAT"}),e.jsx("span",{onClick:()=>{g(u.find(i=>i.tutorId===l)),r(l)},className:"text-blue-600 cursor-pointer hover:underline absolute top-2 right-4",children:"Rate?"})]})})}const _=S({palette:{mode:"dark"}});function F({openModal:h,setOpenModal:d,currentRating:t,rateTutorId:l,setRateTutuorId:u,setUpdated:g}){const[r,o]=a.useState({rating:t?t.rating:0,review:t?t.review:""}),[s,f]=a.useState({review:"",rating:""}),[c,i]=a.useState(!1);a.useEffect(()=>{o({...r,rating:t?t.rating:0,review:t?t.review:""})},[t]);const n=m=>{m.preventDefault(),f({review:j("review",r.review),rating:j("required",r.rating)}),i(!0)};return a.useEffect(()=>{(async function(){if(c&&!s.rating&&!s.review&&l&&r.rating&&r.review)try{const{data:m}=await x.post("/rating",{rating:r.rating,review:r.review,_id:l},{withCredentials:!0});m.success&&(w.success("rated tutor successfuly!"),g(v=>!v),u(""),d(!1),i(!1))}catch{i(!1)}})()},[s,r,c,l,d,i,u,g]),e.jsxs(p,{show:h,onClose:()=>{u(""),o({...r,rating:t?t.rating:0,review:t?t.review:""}),d(!1)},children:[e.jsx(p.Header,{className:"ring-1 ring-[#4d2389] bg-[#110d17]  rounded-t-md",children:e.jsx("h1",{className:"text-white",children:"Rate this tutor"})}),e.jsxs(p.Body,{className:"ring-1 ring-[#4d2389] flex space-y-6 flex-col bg-[#110d17] rounded-b-md",children:[s.rating&&e.jsx("small",{className:"text-red-600",children:s.rating}),e.jsx(b,{theme:_,children:e.jsx(N,{name:"size-large",value:r.rating,size:"large",onChange:(m,v)=>{o({...r,rating:v})}})}),s.review&&e.jsx("small",{className:"text-red-600",children:s.review}),e.jsx("input",{type:"text",value:r.review,onChange:m=>{o({...r,review:m.target.value})},className:"bg-my-input rounded-md ring-1 outline-none border-0 text-gray-300"}),e.jsx("button",{onClick:n,className:"bg-primary  text-white py-2 rounded-lg hover:bg-my-ring",children:"submit"})]})]})}function B(){const[h,d]=a.useState([]),[t,l]=a.useState([]),[u,g]=a.useState(!1),[r,o]=a.useState(!1),[s,f]=a.useState({rating:null,review:"",userId:""}),[c,i]=a.useState("");return a.useEffect(()=>{c&&g(!0)},[c]),a.useEffect(()=>{(async function(){try{const{data:n}=await x.get("/student/mytutors",{withCredentials:!0});d(n.teachers)}catch{w.error("Error")}})()},[]),a.useEffect(()=>{(async function(){try{const{data:n}=await x.get("/rating",{withCredentials:!0});l(n.ratings)}catch{w.error("Error")}})()},[r]),e.jsxs(e.Fragment,{children:[e.jsx(F,{currentRating:s,openModal:u,setOpenModal:g,rateTutorId:c,setRateTutuorId:i,setUpdated:o}),e.jsx(C,{}),e.jsxs("div",{className:"flex flex-wrap md:px-10 md:pt-10 md:pb-44  p-4 gap-10 bg-secondary",children:[e.jsx(E,{}),e.jsx("div",{className:"flex flex-wrap gap-4",children:h.length>0&&h.map(n=>e.jsx(T,{setRateTutuorId:i,tutorRatings:t,setCurrentRating:f,bio:n.bio,name:n.name,userID:n.userID,profile:n.profile}))})]}),e.jsx(k,{})]})}export{B as default};