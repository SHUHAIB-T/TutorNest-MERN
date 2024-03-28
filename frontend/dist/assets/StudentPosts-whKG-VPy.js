import{r as d,a as f,J as S,j as e,K as y,N as E,M as j,v as u,O as C,b as F,P as N,Q as P,S as D,y as q,f as B,F as k}from"./index-2-yNbS5w.js";function I({title:b,subject:r,budget:m,description:g,language:l,_id:c,setEditId:t}){const[i,s]=d.useState(!1),o=f(),[n,x]=d.useState("");d.useEffect(()=>{n&&o(S(n))},[n,o]);const a=h=>{y.fire({title:"Are you sure?",text:"Are you sure wan't to delete this post?",icon:"question",confirmButtonText:"Yes delete!",showCancelButton:!0}).then(p=>{p.isConfirmed&&x(h)})};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"ring-1 h-fit shadow-2xl ring-[#4d2389] bg-[#1f172b] text-white w-80 md:w-96 relative py-5 pr-10 pl-5 rounded-2xl",children:[e.jsx("h1",{onClick:()=>s(h=>!h),className:"font-bold absolute cursor-pointer top-0 right-4 text-3xl",children:"..."}),e.jsx("h1",{className:" font-bold mt-5 text-2xl",children:b}),e.jsxs("div",{className:"flex mt-2 justify-between",children:[e.jsxs("small",{children:["sub: ",r]}),e.jsxs("small",{children:[m," /hr"]})]}),e.jsxs("small",{children:["Language: ",l]}),e.jsx("div",{className:"ring-1 mt-2 rounded-md p-4",children:g}),i&&e.jsxs("div",{className:"flex flex-col ring-1 ring-[#4d2389] absolute top-9 right-5 shadow-lg bg-[#1b0f1b] rounded-md p-2",children:[e.jsx("h1",{onClick:()=>t(c),className:"text-blue-600 hover:bg-[#322231] rounded-sm cursor-pointer px-2 font-bold",children:"Edit"}),e.jsx("div",{className:"ring-1 my-1"}),e.jsx("h1",{onClick:()=>a(c),className:"text-red-600  hover:bg-[#322231] rounded-sm cursor-pointer px-2 font-bold",children:"Delete"})]})]})})}function L({openModal:b,setOpenModal:r}){const m=f(),g={title:"",description:"",budget:"",language:"",subject:""},[l,c]=d.useState(g),[t,i]=d.useState({title:"",budget:"",description:"",language:"",subject:""}),[s,o]=d.useState(!1),n=a=>{const{name:h,value:p}=a.target;c({...l,[h]:p})},x=a=>{a.preventDefault(),i({...t,title:u("required",l.title),budget:u("required",l.budget),description:u("required",l.description),language:u("required",l.language),subject:u("required",l.subject)}),o(!0)};return d.useEffect(()=>{s&&!t.budget&&!t.title&&!t.description&&!t.language&&!t.subject&&(m(E(l)),r(!1))},[m,t,s,l,r]),e.jsx(e.Fragment,{children:e.jsxs(j,{show:b,onClose:()=>r(!1),children:[e.jsx(j.Header,{className:"ring-1 ring-[#4d2389] bg-[#110d17] rounded-t-md",children:e.jsx("h1",{className:"text-white font-bold",children:"Create New Post"})}),e.jsx(j.Body,{className:"bg-[#110d17] ring-1 ring-[#4d2389] rounded-b-md",children:e.jsxs("div",{className:"grid grid-cols-2 gap-2 w-full",children:[e.jsxs("div",{className:"flex flex-col  md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Title"}),t.title&&e.jsx("small",{className:"text-red-600",children:t.title}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md",type:"text",name:"title",placeholder:"Enter the title of the post",value:l.title,onChange:n})]}),e.jsxs("div",{className:"flex flex-col   md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Subject"}),t.subject&&e.jsx("small",{className:"text-red-600",children:t.subject}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md ",type:"text",name:"subject",placeholder:"Enter the Subject Name",value:l.subject,onChange:n})]}),e.jsxs("div",{className:"flex flex-col md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"language",className:"py-2 text-white",children:"Language"}),t.language&&e.jsx("small",{className:"text-red-600",children:t.language}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md ",type:"text",name:"language",placeholder:"Enter the Subject Name",value:l.language,onChange:n})]}),e.jsxs("div",{className:"flex flex-col md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"budget",className:"py-2 text-white",children:"Budget"}),t.budget&&e.jsx("small",{className:"text-red-600",children:t.budget}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md",type:"number",name:"budget",placeholder:"Enter the Subject Name",value:l.budget,onChange:n})]}),e.jsxs("div",{className:"col-span-2 w-full text-white",children:[e.jsx("label",{htmlFor:"description",children:"Description"}),t.description&&e.jsx("small",{className:"text-red-600",children:t.description}),e.jsx("textarea",{className:"w-full mt-4 rounded-md bg-[#251c32] border-0 py-2",onChange:n,rows:4,value:l.description,name:"description",id:""})]}),e.jsx("button",{onClick:x,className:"font-bold text-white px-4 py-2 bg-primary rounded-lg",children:"SUBMIT"}),e.jsx("button",{onClick:()=>c(g),className:"font-bold text-white px-4 py-2 bg-[#3f3b3b] rounded-lg",children:"CLEAR"})]})})]})})}function M({editOpenModal:b,setEditOpenModal:r,editId:m,setEditId:g,initialState:l}){const c=f(),[t,i]=d.useState(l);d.useEffect(()=>{i(l)},[l]);const[s,o]=d.useState({title:"",budget:"",description:"",language:"",subject:""}),[n,x]=d.useState(!1),a=p=>{const{name:w,value:v}=p.target;i({...t,[w]:v,_id:m})},h=p=>{p.preventDefault(),o({...s,title:u("required",t.title),budget:u("required",t.budget),description:u("required",t.description),language:u("required",t.language),subject:u("required",t.subject)}),x(!0)};return d.useEffect(()=>{n&&!s.budget&&!s.title&&!s.description&&!s.language&&!s.subject&&(c(C(t)),x(!1),r(!1))},[c,s,n,t,r]),e.jsx(e.Fragment,{children:t&&e.jsxs(j,{show:b,onClose:()=>{r(!1),g("")},children:[e.jsx(j.Header,{className:"ring-1 ring-[#4d2389] bg-[#110d17] rounded-t-md",children:e.jsx("h1",{className:"text-white font-bold",children:"Edit Post"})}),e.jsx(j.Body,{className:"bg-[#110d17] ring-1 ring-[#4d2389] rounded-b-md",children:e.jsxs("div",{className:"grid grid-cols-2 gap-2 w-full",children:[e.jsxs("div",{className:"flex flex-col  md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Title"}),s.title&&e.jsx("small",{className:"text-red-600",children:s.title}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md",type:"text",name:"title",placeholder:"Enter the title of the post",value:t.title,onChange:a})]}),e.jsxs("div",{className:"flex flex-col   md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"title",className:"py-2 text-white",children:"Subject"}),s.subject&&e.jsx("small",{className:"text-red-600",children:s.subject}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md ",type:"text",name:"subject",placeholder:"Enter the Subject Name",value:t.subject,onChange:a})]}),e.jsxs("div",{className:"flex flex-col md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"language",className:"py-2 text-white",children:"Language"}),s.language&&e.jsx("small",{className:"text-red-600",children:s.language}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md ",type:"text",name:"language",placeholder:"Enter the Subject Name",value:t.language,onChange:a})]}),e.jsxs("div",{className:"flex flex-col md:col-span-1 col-span-2",children:[e.jsx("label",{htmlFor:"budget",className:"py-2 text-white",children:"Budget"}),s.budget&&e.jsx("small",{className:"text-red-600",children:s.budget}),e.jsx("input",{className:"bg-[#251c32] text-white border-0 rounded-md",type:"number",name:"budget",placeholder:"Enter the Subject Name",value:t.budget,onChange:a})]}),e.jsxs("div",{className:"col-span-2 w-full text-white",children:[e.jsx("label",{htmlFor:"description",children:"Description"}),s.description&&e.jsx("small",{className:"text-red-600",children:s.description}),e.jsx("textarea",{className:"w-full mt-4 rounded-md bg-[#251c32] border-0 py-2",onChange:a,rows:4,value:t.description,name:"description",id:""})]}),e.jsx("button",{onClick:h,className:"font-bold text-white px-4 py-2 bg-primary rounded-lg",children:"SUBMIT"}),e.jsx("button",{onClick:()=>i(l),className:"font-bold text-white px-4 py-2 bg-[#3f3b3b] rounded-lg",children:"RESET"})]})})]})})}function A(){const{isLoading:b,posts:r,isUpdated:m}=F(a=>a.studentPosts),[g,l]=d.useState(!1),[c,t]=d.useState(!1),i=f(),[s,o]=d.useState(""),[n,x]=d.useState({title:"",budget:"",description:"",language:"",subject:""});return d.useEffect(()=>{s&&x(r.find(a=>a._id===s))},[s]),d.useEffect(()=>{n.budget&&s&&t(!0)},[n,s]),d.useEffect(()=>{m&&(i(N()),x({title:"",budget:"",description:"",language:"",subject:""}),i(P()),o(""))},[i,m]),d.useEffect(()=>{i(N())},[i]),e.jsxs(e.Fragment,{children:[e.jsx(L,{openModal:g,setOpenModal:l}),e.jsx(M,{editOpenModal:c,setEditOpenModal:t,editId:s,setEditId:o,initialState:n}),e.jsx(D,{}),e.jsxs("div",{className:"flex flex-wrap md:px-10 md:pt-10 md:pb-44  p-4 gap-10 bg-secondary",children:[e.jsx(q,{}),e.jsxs("div",{className:"flex-flex-col w-full max-w-[50rem] space-y-5",children:[e.jsx("button",{onClick:()=>l(!0),className:" bg-primary px-5 py-1 rounded-md font-bold text-white",children:"New Post"}),e.jsx("div",{className:"flex flex-wrap gap-5",children:b?e.jsx(B,{}):r.length>0&&r.map((a,h)=>e.jsx(e.Fragment,{children:e.jsx(I,{subject:a.subject,title:a.title,budget:a.budget,language:a.language,description:a.description,_id:a._id,setEditId:o},h)}))})]})]}),e.jsx(k,{})]})}export{A as default};