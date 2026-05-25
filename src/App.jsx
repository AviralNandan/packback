import { useState, useRef, useEffect } from "react";

/* ─────────────── CONSTANTS ─────────────── */
const CATS = [
  { id:"books",label:"Books",icon:"📚",color:"#7c3aed" },
  { id:"notes",label:"Notes",icon:"📝",color:"#0ea5e9" },
  { id:"calculators",label:"Calculators",icon:"🔢",color:"#f59e0b" },
  { id:"lab-coats",label:"Lab Coats",icon:"🥼",color:"#10b981" },
  { id:"stationery",label:"Stationery",icon:"✏️",color:"#ec4899" },
  { id:"study-materials",label:"Study Materials",icon:"📖",color:"#8b5cf6" },
  { id:"drawing-tools",label:"Drawing Tools",icon:"📐",color:"#14b8a6" },
  { id:"papers",label:"PYQ Papers",icon:"📄",color:"#f97316" },
  { id:"accessories",label:"Accessories",icon:"🎒",color:"#6366f1" },
  { id:"electronics",label:"Electronics",icon:"💡",color:"#eab308" },
  { id:"instruments",label:"Instruments",icon:"🔬",color:"#06b6d4" },
  { id:"software",label:"Software Keys",icon:"💾",color:"#84cc16" },
];

const CONDITIONS = ["New","Excellent","Good","Fair","Poor"];
const COND_SCORE = {New:1,Excellent:0.9,Good:0.75,Fair:0.6,Poor:0.4};

const COLLEGES = [
  "RGPV Bhopal","MANIT Bhopal","LNCT Bhopal","TIT Bhopal","Sagar Institute Bhopal",
  "Oriental College Bhopal","Lakshmi Narain College Bhopal","RKDF University Bhopal",
  "Rabindranath Tagore University Bhopal","Scope College Bhopal"
];

const AREAS = [
  "MP Nagar, Bhopal","Kolar Road, Bhopal","Arera Colony, Bhopal","TT Nagar, Bhopal",
  "Habibganj, Bhopal","Misrod, Bhopal","Ayodhya Bypass, Bhopal","Hoshangabad Road, Bhopal",
  "Raisen Road, Bhopal","Govindpura, Bhopal"
];

const SUBJECTS = [
  "Mathematics","Physics","Chemistry","C Programming","Digital Electronics",
  "Thermodynamics","Data Structures","Machine Learning","Civil Engineering",
  "Mechanics","VLSI","Microprocessors","Fluid Mechanics","Control Systems",
  "Engineering Drawing","Electrical Machines","Computer Networks","DBMS"
];

const IMGS = {
  books:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
  books2:"https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
  notes:"https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&q=80",
  notes2:"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80",
  calc:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&q=80",
  labcoat:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80",
  stationery:"https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&q=80",
  study:"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&q=80",
  drawing:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
  papers:"https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=500&q=80",
  bag:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
  arduino:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
  scope:"https://images.unsplash.com/photo-1532094349884-543559ac29c6?w=500&q=80",
  soldering:"https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&q=80",
  laptop:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
  breadboard:"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&q=80",
  ruler:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80",
  pens:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80",
  flashdrive:"https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80",
  multimeter:"https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=500&q=80",
};

const CAT_IMGS = {
  books:IMGS.books, notes:IMGS.notes, calculators:IMGS.calc,
  "lab-coats":IMGS.labcoat, stationery:IMGS.stationery, "study-materials":IMGS.study,
  "drawing-tools":IMGS.drawing, papers:IMGS.papers, accessories:IMGS.bag,
  electronics:IMGS.arduino, instruments:IMGS.scope, software:IMGS.flashdrive,
};

function fairness(origP, cond, age, demand, sellP) {
  const cf = COND_SCORE[cond]||0.75;
  const af = Math.max(0.4, 1-age*0.075);
  const dm = {Low:0.85,Medium:1,High:1.1,"Very High":1.2}[demand]||1;
  const exp = origP*cf*af*dm;
  const r = sellP/exp;
  if(r<=0.85) return {exp:Math.round(exp),r:Math.round(r*100),label:"Excellent Bargain",color:"#f97316",emoji:"🔥"};
  if(r<=1.05) return {exp:Math.round(exp),r:Math.round(r*100),label:"Fair Deal",color:"#22c55e",emoji:"🟢"};
  if(r<=1.2)  return {exp:Math.round(exp),r:Math.round(r*100),label:"Slightly High",color:"#eab308",emoji:"🟡"};
  return {exp:Math.round(exp),r:Math.round(r*100),label:"Overpriced",color:"#ef4444",emoji:"🔴"};
}

const initProducts = [
  {id:1,title:"Engineering Mathematics by RD Sharma (Vol 1 & 2)",category:"books",condition:"Good",origP:520,sellP:180,college:"RGPV Bhopal",area:"MP Nagar, Bhopal",subject:"Mathematics",seller:"Rahul Tiwari",sInit:"RT",phone:"7898XXXXXX",views:142,age:2,demand:"High",desc:"Both volumes in great condition, minimal pencil marks. Perfect for B.Tech 1st year. Cleared exams with these!",img:IMGS.books,sold:false,reported:false,mine:false},
  {id:2,title:"Casio fx-991ES Plus Scientific Calculator",category:"calculators",condition:"Excellent",origP:900,sellP:450,college:"MANIT Bhopal",area:"Kolar Road, Bhopal",subject:"Mathematics",seller:"Priya Sen",sInit:"PS",phone:"9034XXXXXX",views:89,age:1,demand:"Very High",desc:"Barely used, all functions working. Original hard cover included. Only used for 2 exams.",img:IMGS.calc,sold:false,reported:false,mine:false},
  {id:3,title:"GATE CS/IT Handwritten Notes – Full Set",category:"notes",condition:"Good",origP:1200,sellP:350,college:"LNCT Bhopal",area:"Raisen Road, Bhopal",subject:"Data Structures",seller:"Amit Dubey",sInit:"AD",phone:"9055XXXXXX",views:215,age:1,demand:"Very High",desc:"Complete handwritten GATE notes: DS, Algorithms, OS, DBMS, CN, COA. Neat writing, 0 missing pages.",img:IMGS.notes,sold:false,reported:false,mine:false},
  {id:4,title:"White Lab Coat – Large Size (Almost New)",category:"lab-coats",condition:"Excellent",origP:350,sellP:120,college:"RGPV Bhopal",area:"Govindpura, Bhopal",subject:"Chemistry",seller:"Sneha Malviya",sInit:"SM",phone:"9022XXXXXX",views:34,age:1,demand:"Medium",desc:"White lab coat size L. Worn for 5-6 practicals. Washed, clean, no stains at all.",img:IMGS.labcoat,sold:false,reported:false,mine:false},
  {id:5,title:"Mini Drafter + Drawing Instruments Set",category:"drawing-tools",condition:"Good",origP:800,sellP:280,college:"TIT Bhopal",area:"Ayodhya Bypass, Bhopal",subject:"Engineering Drawing",seller:"Karan Patel",sInit:"KP",phone:"8077XXXXXX",views:67,age:2,demand:"Medium",desc:"Complete set: mini drafter, compass, protractor, set squares, scales. Minor box wear, all tools work fine.",img:IMGS.drawing,sold:false,reported:false,mine:false},
  {id:6,title:"RGPV Previous Year Papers 2015–2024 (CS/IT)",category:"papers",condition:"New",origP:300,sellP:100,college:"RGPV Bhopal",area:"TT Nagar, Bhopal",subject:"Data Structures",seller:"Divya Sharma",sInit:"DS",phone:"7777XXXXXX",views:178,age:0,demand:"High",desc:"Printed, spiral-bound collection of last 10 years RGPV CS papers with solutions. Never opened.",img:IMGS.papers,sold:false,reported:false,mine:false},
  {id:7,title:"Arduino Uno Starter Kit + Components",category:"electronics",condition:"Good",origP:1200,sellP:500,college:"MANIT Bhopal",area:"Habibganj, Bhopal",subject:"Digital Electronics",seller:"Rohit Verma",sInit:"RV",phone:"9811XXXXXX",views:312,age:1,demand:"Very High",desc:"Arduino Uno R3, breadboard, jumper wires, LEDs, resistors, sensors. All working. Great for mini projects.",img:IMGS.arduino,sold:false,reported:false,mine:false},
  {id:8,title:"Digital Oscilloscope (Handheld) – DSO138",category:"instruments",condition:"Good",origP:2200,sellP:800,college:"MANIT Bhopal",area:"Arera Colony, Bhopal",subject:"Digital Electronics",seller:"Neeraj Joshi",sInit:"NJ",phone:"9199XXXXXX",views:54,age:2,demand:"Medium",desc:"Assembled DSO138 mini oscilloscope. Works perfectly. Used for lab practicals. Selling after final year.",img:IMGS.scope,sold:false,reported:false,mine:false},
  {id:9,title:"Staedtler Geometry Box + Pencil Set",category:"stationery",condition:"New",origP:280,sellP:150,college:"Sagar Institute Bhopal",area:"Misrod, Bhopal",subject:"Mathematics",seller:"Pooja Rathore",sInit:"PR",phone:"7600XXXXXX",views:45,age:0,demand:"Low",desc:"Brand new Staedtler geometry box, sealed. Extra HB pencils included. Received as gift, don't need it.",img:IMGS.stationery,sold:false,reported:false,mine:false},
  {id:10,title:"Machine Learning Study Material Bundle",category:"study-materials",condition:"Fair",origP:2000,sellP:450,college:"LNCT Bhopal",area:"MP Nagar, Bhopal",subject:"Machine Learning",seller:"Tanvi Singh",sInit:"TS",phone:"9922XXXXXX",views:199,age:2,demand:"Very High",desc:"Printed notes + reference cards for Python, ML, Pandas, Scikit-learn. Some highlighting, all content intact.",img:IMGS.study,sold:false,reported:false,mine:false},
  {id:11,title:"Soldering Iron Kit (Complete with Flux & Tin)",category:"electronics",condition:"Good",origP:600,sellP:220,college:"TIT Bhopal",area:"Govindpura, Bhopal",subject:"Digital Electronics",seller:"Mohit Kumar",sInit:"MK",phone:"8818XXXXXX",views:77,age:2,demand:"Medium",desc:"25W soldering iron + flux, solder wire, stand, desoldering pump. All in working condition.",img:IMGS.soldering,sold:false,reported:false,mine:false},
  {id:12,title:"Engineering Physics by H.K. Dass",category:"books",condition:"Fair",origP:480,sellP:130,college:"Sagar Institute Bhopal",area:"Hoshangabad Road, Bhopal",subject:"Physics",seller:"Aman Gupta",sInit:"AG",phone:"7011XXXXXX",views:88,age:3,demand:"Medium",desc:"H.K. Dass Engineering Physics, some pages underlined/highlighted. Good for quick reference.",img:IMGS.books2,sold:false,reported:false,mine:false},
  {id:13,title:"Breadboard + Jumper Wire Kit (400pts)",category:"electronics",condition:"Good",origP:350,sellP:120,college:"RKDF University Bhopal",area:"MP Nagar, Bhopal",subject:"Digital Electronics",seller:"Shiva Rao",sInit:"SR",phone:"9955XXXXXX",views:66,age:1,demand:"High",desc:"Full-size 400-point breadboard + 65 jumper wires pack. Perfect for circuit experiments.",img:IMGS.breadboard,sold:false,reported:false,mine:false},
  {id:14,title:"Digital Multimeter (DT-830B)",category:"instruments",condition:"Excellent",origP:500,sellP:200,college:"RGPV Bhopal",area:"Kolar Road, Bhopal",subject:"Electrical Machines",seller:"Vijay Tomar",sInit:"VT",phone:"9877XXXXXX",views:41,age:1,demand:"Medium",desc:"DT-830B digital multimeter. Measures AC/DC voltage, current, resistance. Comes with probes and case.",img:IMGS.multimeter,sold:false,reported:false,mine:false},
  {id:15,title:"C Programming Notes (Handwritten) + Question Bank",category:"notes",condition:"Good",origP:400,sellP:120,college:"Oriental College Bhopal",area:"TT Nagar, Bhopal",subject:"C Programming",seller:"Riya Tiwari",sInit:"RiT",phone:"8999XXXXXX",views:133,age:1,demand:"High",desc:"Complete C programming notes from basics to file I/O. Question bank with 200+ solved questions.",img:IMGS.notes2,sold:false,reported:false,mine:false},
  {id:16,title:"Backpack (30L) – Wildcraft Style",category:"accessories",condition:"Good",origP:1800,sellP:600,college:"LNCT Bhopal",area:"Raisen Road, Bhopal",subject:"General",seller:"Ritesh Pandey",sInit:"RP",phone:"9344XXXXXX",views:55,age:2,demand:"Low",desc:"30L campus backpack, multiple compartments, laptop sleeve. Good condition, minor handle wear.",img:IMGS.bag,sold:false,reported:false,mine:false},
  {id:17,title:"Set of 10 Pens + Highlighters (Pilot & Stabilo)",category:"stationery",condition:"New",origP:350,sellP:180,college:"MANIT Bhopal",area:"Arera Colony, Bhopal",subject:"General",seller:"Ankita Bose",sInit:"AB",phone:"7788XXXXXX",views:29,age:0,demand:"Low",desc:"5 Pilot G2 pens + 5 Stabilo highlighters. Brand new, sealed packs. Bought extra.",img:IMGS.pens,sold:false,reported:false,mine:false},
  {id:18,title:"MATLAB + AutoCAD Student License Key (1 Year)",category:"software",condition:"New",origP:3500,sellP:800,college:"MANIT Bhopal",area:"MP Nagar, Bhopal",subject:"Engineering Drawing",seller:"Deepak Nair",sInit:"DN",phone:"9456XXXXXX",views:201,age:0,demand:"High",desc:"Valid 1-year student license for MATLAB + AutoCAD combo. Unused activation key. Will share via email.",img:IMGS.flashdrive,sold:false,reported:false,mine:false},
  {id:19,title:"Engineering Rulers Scale Set (30cm, 15cm, T-square)",category:"drawing-tools",condition:"Excellent",origP:250,sellP:90,college:"TIT Bhopal",area:"Ayodhya Bypass, Bhopal",subject:"Engineering Drawing",seller:"Suresh Kale",sInit:"SK",phone:"8122XXXXXX",views:38,age:1,demand:"Low",desc:"Set of transparent rulers: 30cm, 15cm + plastic T-square. All intact, no cracks.",img:IMGS.ruler,sold:false,reported:false,mine:false},
  {id:20,title:"Fluid Mechanics by R.K. Bansal",category:"books",condition:"Good",origP:600,sellP:200,college:"RGPV Bhopal",area:"Govindpura, Bhopal",subject:"Fluid Mechanics",seller:"Anil Saxena",sInit:"AS",phone:"9666XXXXXX",views:71,age:2,demand:"Medium",desc:"R.K. Bansal Fluid Mechanics, 9th edition. Some pencil marks, all chapters intact.",img:IMGS.books,sold:false,reported:false,mine:false},
];

/* My seller's own listings for the seller dashboard */
const MY_SELLER_LISTINGS_INIT = [
  {id:101,title:"Control Systems by Nagrath & Gopal",category:"books",condition:"Good",origP:550,sellP:190,college:"RGPV Bhopal",area:"MP Nagar, Bhopal",subject:"Control Systems",seller:"You",sInit:"ME",phone:"",views:23,age:2,demand:"Medium",desc:"Nagrath & Gopal Control Systems, good condition. Some chapters highlighted.",img:IMGS.books2,sold:false,reported:false,mine:true},
  {id:102,title:"Casio Classwiz fx-82MS Calculator",category:"calculators",condition:"Fair",origP:700,sellP:200,college:"RGPV Bhopal",area:"MP Nagar, Bhopal",subject:"Mathematics",seller:"You",sInit:"ME",phone:"",views:14,age:3,demand:"Medium",desc:"Working fine, some scratches on body. Battery included.",img:IMGS.calc,sold:true,reported:false,mine:true},
  {id:103,title:"Lab Coat Medium – White",category:"lab-coats",condition:"Good",origP:320,sellP:100,college:"RGPV Bhopal",area:"MP Nagar, Bhopal",subject:"Chemistry",seller:"You",sInit:"ME",phone:"",views:9,age:1,demand:"Low",desc:"Medium size white lab coat. No stains. Lightly used.",img:IMGS.labcoat,sold:false,reported:false,mine:true},
];

/* ─────────────── HELPERS / UI ATOMS ─────────────── */
const P = ({children,...s}) => <p style={{margin:0,...s}}>{children}</p>;
const V = ({style,children,...r}) => <div style={{...style}} {...r}>{children}</div>;

function Avt({initials,size=38,bg="#7c3aed"}) {
  return <V style={{width:size,height:size,borderRadius:"50%",background:bg+"22",color:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.35,fontWeight:800,flexShrink:0}}>{initials}</V>;
}
function Pill({children,color="#7c3aed",sm}) {
  return <span style={{background:color+"18",color,fontSize:sm?10:11,fontWeight:700,padding:sm?"1px 7px":"3px 10px",borderRadius:20,border:`1px solid ${color}30`}}>{children}</span>;
}
function FTag({p}) {
  const f=fairness(p.origP,p.condition,p.age,p.demand,p.sellP);
  return <Pill color={f.color}>{f.emoji} {f.label}</Pill>;
}
function Btn({children,onClick,variant="primary",sm,disabled,style={},danger}) {
  const base={cursor:disabled?"not-allowed":"pointer",border:"none",borderRadius:10,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .15s",opacity:disabled?.6:1,...style};
  const pad=sm?"6px 12px":"10px 18px";
  const fs=sm?12:13;
  const variants={
    primary:{background:danger?"#ef4444":"#7c3aed",color:"#fff",padding:pad,fontSize:fs},
    outline:{background:"#faf5ff",color:danger?"#ef4444":"#7c3aed",border:`1px solid ${danger?"#fecaca":"#e9d5ff"}`,padding:pad,fontSize:fs},
    ghost:{background:"transparent",color:"#6b7280",padding:pad,fontSize:fs},
  };
  return <button onClick={disabled?undefined:onClick} style={{...base,...variants[variant]}}>{children}</button>;
}
function Card({children,style={}}) {
  return <V style={{background:"#fff",border:"1px solid #ede9fe",borderRadius:16,padding:"16px 18px",...style}}>{children}</V>;
}
function MetricCard({icon,label,value,color="#7c3aed",sub}) {
  return <Card style={{padding:"14px 16px",display:"flex",flexDirection:"column",gap:4}}>
    <span style={{fontSize:22}}>{icon}</span>
    <P style={{fontSize:22,fontWeight:800,color}}>{value}</P>
    <P style={{fontSize:11,fontWeight:700,color:"#9ca3af"}}>{label}</P>
    {sub&&<P style={{fontSize:10,color:"#c4b5fd"}}>{sub}</P>}
  </Card>;
}
function SectionTitle({children,sub}) {
  return <V style={{marginBottom:16}}>
    <P style={{fontSize:18,fontWeight:800,color:"#1e1b4b"}}>{children}</P>
    {sub&&<P style={{fontSize:13,color:"#9ca3af"}}>{sub}</P>}
  </V>;
}
function ImgBox({src,h=140,radius="14px 14px 0 0"}) {
  const [err,setErr]=useState(false);
  return <V style={{height:h,overflow:"hidden",borderRadius:radius,background:"linear-gradient(135deg,#f3e8ff,#ede9fe)",display:"flex",alignItems:"center",justifyContent:"center"}}>
    {err?<span style={{fontSize:40}}>📦</span>:<img src={src} alt="" onError={()=>setErr(true)} style={{width:"100%",height:"100%",objectFit:"cover"}} />}
  </V>;
}
function Star({n=4}) { return <span style={{color:"#f59e0b",fontSize:12}}>{"★".repeat(n)}{"☆".repeat(5-n)}</span>; }

function BarChart({data,keyLabel="cat",keyVal="val",color="#7c3aed"}) {
  const max=Math.max(...data.map(d=>d[keyVal]));
  return <V style={{display:"flex",flexDirection:"column",gap:10}}>
    {data.map(d=>(
      <V key={d[keyLabel]}>
        <V style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
          <span style={{color:"#4b5563",fontWeight:600}}>{d[keyLabel]}</span>
          <span style={{color,fontWeight:700}}>{d[keyVal].toLocaleString()}</span>
        </V>
        <V style={{background:"#f0e8ff",borderRadius:6,height:8}}>
          <V style={{background:color,height:"100%",borderRadius:6,width:`${(d[keyVal]/max)*100}%`,transition:"width .8s"}} />
        </V>
      </V>
    ))}
  </V>;
}

/* ─────────────── PRODUCT CARD ─────────────── */
function ProductCard({p,onClick,onWishlist,wishlisted,onChat,showActions,onEdit,onDelete,onMarkSold}) {
  const disc=Math.round(((p.origP-p.sellP)/p.origP)*100);
  return (
    <V style={{background:"#fff",border:"1px solid #ede9fe",borderRadius:16,overflow:"hidden",cursor:showActions?"default":"pointer",transition:"transform .2s,box-shadow .2s",position:"relative",opacity:p.sold?.6:1}}
      onClick={showActions?undefined:onClick}
      onMouseEnter={e=>{if(!showActions){e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 28px #7c3aed18";}}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
    >
      {p.sold&&<V style={{position:"absolute",top:10,left:10,background:"#22c55e",color:"#fff",fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:8,zIndex:2}}>SOLD</V>}
      {disc>15&&!p.sold&&<V style={{position:"absolute",top:10,left:10,background:"#22c55e",color:"#fff",fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:8,zIndex:2}}>-{disc}% OFF</V>}
      {onWishlist&&<button onClick={e=>{e.stopPropagation();onWishlist(p.id);}} style={{position:"absolute",top:8,right:8,background:"#fffc",border:"none",borderRadius:"50%",width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:15,zIndex:2}}>{wishlisted?"❤️":"🤍"}</button>}
      <ImgBox src={p.img} h={130} />
      <V style={{padding:"10px 13px"}}>
        <P style={{fontSize:13,fontWeight:700,color:"#1e1b4b",lineHeight:1.35,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",marginBottom:6}}>{p.title}</P>
        <P style={{fontSize:11,color:"#7c3aed",marginBottom:6,fontWeight:600}}>📍 {p.area}</P>
        <V style={{display:"flex",alignItems:"center",gap:6,marginBottom:8,flexWrap:"wrap"}}>
          <span style={{fontSize:17,fontWeight:800,color:"#1e1b4b"}}>₹{p.sellP}</span>
          <span style={{fontSize:11,color:"#c4b5fd",textDecoration:"line-through"}}>₹{p.origP}</span>
        </V>
        <V style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
          <FTag p={p}/><Pill color="#6366f1">{p.condition}</Pill>
        </V>
        {showActions?(
          <V style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>
            {!p.sold&&<Btn sm variant="outline" onClick={()=>onEdit&&onEdit(p)}>✏️ Edit</Btn>}
            {!p.sold&&<Btn sm variant="primary" onClick={()=>onMarkSold&&onMarkSold(p.id)}>✅ Mark Sold</Btn>}
            <Btn sm variant="outline" danger onClick={()=>onDelete&&onDelete(p.id)}>🗑 Delete</Btn>
          </V>
        ):(
          <V style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#9ca3af"}}>
            <Avt initials={p.sInit} size={18} bg="#7c3aed"/>
            <span style={{fontWeight:600}}>{p.seller}</span>
            <span style={{marginLeft:"auto"}}>👁 {p.views}</span>
          </V>
        )}
      </V>
    </V>
  );
}

/* ─────────────── PRODUCT MODAL ─────────────── */
function ProductModal({p,onClose,onChat,onWishlist,wishlisted,onBuy}) {
  const f=fairness(p.origP,p.condition,p.age,p.demand,p.sellP);
  return (
    <V style={{position:"fixed",inset:0,background:"rgba(30,27,75,.65)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <V onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,maxWidth:640,width:"100%",maxHeight:"92vh",overflow:"auto",boxShadow:"0 24px 80px rgba(124,58,237,.28)"}}>
        <V style={{position:"relative"}}>
          <ImgBox src={p.img} h={240} radius="20px 20px 0 0"/>
          <button onClick={onClose} style={{position:"absolute",top:12,right:12,background:"#fffc",border:"none",borderRadius:"50%",width:34,height:34,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>✕</button>
          {onWishlist&&<button onClick={()=>onWishlist(p.id)} style={{position:"absolute",top:12,right:52,background:"#fffc",border:"none",borderRadius:"50%",width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{wishlisted?"❤️":"🤍"}</button>}
        </V>
        <V style={{padding:24}}>
          <V style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
            <Pill color="#7c3aed">{CATS.find(c=>c.id===p.category)?.label||p.category}</Pill>
            <Pill color="#6366f1">{p.condition}</Pill>
            <Pill color="#0ea5e9">{p.subject}</Pill>
          </V>
          <P style={{fontSize:20,fontWeight:800,color:"#1e1b4b",marginBottom:4}}>{p.title}</P>
          <P style={{fontSize:13,color:"#7c3aed",fontWeight:600,marginBottom:14}}>📍 {p.area} · 🏫 {p.college}</P>
          <V style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
            <span style={{fontSize:28,fontWeight:800,color:"#1e1b4b"}}>₹{p.sellP}</span>
            <span style={{fontSize:14,color:"#c4b5fd",textDecoration:"line-through"}}>₹{p.origP}</span>
            <FTag p={p}/>
          </V>
          {/* Fairness breakdown */}
          <Card style={{marginBottom:16,background:"#faf5ff",border:`1px solid ${f.color}30`}}>
            <P style={{fontSize:12,fontWeight:800,color:f.color,marginBottom:8}}>💡 FAIR PRICE ANALYSIS</P>
            <V style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["Expected Price",`₹${f.exp}`],["Fairness Score",`${f.r}%`],["Condition",p.condition],["Product Age",`${p.age}yr`]].map(([k,v])=>(
                <V key={k}><P style={{fontSize:11,color:"#9ca3af"}}>{k}</P><P style={{fontWeight:700,color:"#1e1b4b",fontSize:13}}>{v}</P></V>
              ))}
            </V>
          </Card>
          <P style={{fontSize:14,color:"#4b5563",lineHeight:1.7,marginBottom:16}}>{p.desc}</P>
          {/* Seller */}
          <V style={{display:"flex",alignItems:"center",gap:12,background:"#f9fafb",padding:"12px 14px",borderRadius:12,marginBottom:16}}>
            <Avt initials={p.sInit} size={44} bg="#7c3aed"/>
            <V>
              <P style={{fontWeight:700,color:"#1e1b4b"}}>{p.seller}</P>
              <P style={{fontSize:12,color:"#9ca3af"}}>Seller · {p.college}</P>
              <Star />
            </V>
            <V style={{marginLeft:"auto",textAlign:"right"}}>
              <P style={{fontSize:12,color:"#9ca3af"}}>👁 {p.views} views</P>
              <P style={{fontSize:11,color:"#22c55e",fontWeight:700}}>● Active</P>
            </V>
          </V>
          <V style={{display:"flex",gap:10}}>
            <Btn onClick={()=>onChat(p)} style={{flex:1,padding:"13px"}}>💬 Chat with Seller</Btn>
            {onBuy&&!p.sold&&<Btn variant="outline" onClick={()=>onBuy(p)} style={{padding:"13px 20px"}}>🛒 Buy Now</Btn>}
            <Btn variant="outline" danger onClick={()=>alert("Report submitted. Our team will review within 24 hours.")}>🚩</Btn>
          </V>
        </V>
      </V>
    </V>
  );
}

/* ─────────────── CHAT MODAL ─────────────── */
function ChatModal({p,onClose}) {
  const [msgs,setMsgs]=useState([{from:"seller",text:`Hi! Yes, "${p?.title}" is still available. Are you interested?`}]);
  const [inp,setInp]=useState("");
  const end=useRef(null);
  useEffect(()=>end.current?.scrollIntoView({behavior:"smooth"}),[msgs]);
  const REPLIES=[
    "Great! I can meet you at the college gate anytime after 3 PM.",
    "The condition is exactly as described. You can check before buying.",
    "Sure, I can give a small discount if you pick it up today!",
    "Payment: cash on delivery preferred. UPI also works.",
    "Let me know your convenient time and location in Bhopal."
  ];
  function send(){
    if(!inp.trim())return;
    const t=inp;setInp("");
    setMsgs(m=>[...m,{from:"buyer",text:t}]);
    setTimeout(()=>setMsgs(m=>[...m,{from:"seller",text:REPLIES[Math.floor(Math.random()*REPLIES.length)]}]),900+Math.random()*700);
  }
  return (
    <V style={{position:"fixed",inset:0,background:"rgba(30,27,75,.65)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <V onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:440,boxShadow:"0 24px 80px rgba(124,58,237,.28)",display:"flex",flexDirection:"column",height:520}}>
        <V style={{padding:"14px 18px",borderBottom:"1px solid #f0e8ff",display:"flex",alignItems:"center",gap:12}}>
          <Avt initials={p?.sInit} size={38} bg="#7c3aed"/>
          <V><P style={{fontWeight:700,color:"#1e1b4b",fontSize:14}}>{p?.seller}</P><P style={{fontSize:12,color:"#22c55e",fontWeight:700}}>● Online</P></V>
          <button onClick={onClose} style={{marginLeft:"auto",background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#9ca3af"}}>✕</button>
        </V>
        <V style={{padding:"8px 14px",background:"#faf5ff",borderBottom:"1px solid #f0e8ff",fontSize:12,color:"#7c3aed"}}>📦 <strong>{p?.title}</strong> · ₹{p?.sellP}</V>
        <V style={{flex:1,overflow:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}}>
          {msgs.map((m,i)=>(
            <V key={i} style={{display:"flex",justifyContent:m.from==="buyer"?"flex-end":"flex-start"}}>
              <V style={{maxWidth:"75%",padding:"10px 14px",borderRadius:m.from==="buyer"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.from==="buyer"?"#7c3aed":"#f3f4f6",color:m.from==="buyer"?"#fff":"#1e1b4b",fontSize:13,lineHeight:1.5}}>{m.text}</V>
            </V>
          ))}
          <div ref={end}/>
        </V>
        <V style={{padding:12,borderTop:"1px solid #f0e8ff",display:"flex",gap:8}}>
          <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
            placeholder="Type a message..." style={{flex:1,padding:"10px 14px",borderRadius:24,border:"1px solid #e9d5ff",fontSize:13,outline:"none",fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
          <Btn onClick={send} style={{borderRadius:24,padding:"10px 18px"}}>Send</Btn>
        </V>
      </V>
    </V>
  );
}

/* ─────────────── LISTING FORM ─────────────── */
function ListingForm({onSubmit,onClose,editProduct}) {
  const [f,setF]=useState(editProduct?{
    title:editProduct.title,category:editProduct.category,condition:editProduct.condition,
    origP:editProduct.origP,sellP:editProduct.sellP,college:editProduct.college,
    area:editProduct.area,subject:editProduct.subject,desc:editProduct.desc,
    age:editProduct.age,demand:editProduct.demand
  }:{title:"",category:"books",condition:"Good",origP:"",sellP:"",college:COLLEGES[0],area:AREAS[0],subject:SUBJECTS[0],desc:"",age:1,demand:"Medium"});
  const fair=f.origP&&f.sellP?fairness(+f.origP,f.condition,+f.age,f.demand,+f.sellP):null;
  const upd=(k,v)=>setF(x=>({...x,[k]:v}));
  const iS={width:"100%",padding:"9px 11px",borderRadius:10,border:"1px solid #e9d5ff",fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif",outline:"none",boxSizing:"border-box"};
  const lS={fontSize:12,fontWeight:700,color:"#7c3aed",marginBottom:4,display:"block"};
  const Row=({children,cols="1fr 1fr"})=><V style={{display:"grid",gridTemplateColumns:cols,gap:12}}>{children}</V>;
  const Field=({label,children})=><V><label style={lS}>{label}</label>{children}</V>;
  return (
    <V style={{position:"fixed",inset:0,background:"rgba(30,27,75,.65)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <V onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,maxWidth:560,width:"100%",maxHeight:"92vh",overflow:"auto",boxShadow:"0 24px 80px rgba(124,58,237,.28)"}}>
        <V style={{padding:"18px 22px",borderBottom:"1px solid #f0e8ff",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <P style={{fontSize:17,fontWeight:800,color:"#1e1b4b"}}>{editProduct?"✏️ Edit Listing":"📦 Create New Listing"}</P>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#9ca3af"}}>✕</button>
        </V>
        <V style={{padding:22,display:"flex",flexDirection:"column",gap:14}}>
          <Field label="Product Title"><input value={f.title} onChange={e=>upd("title",e.target.value)} placeholder="e.g. Engineering Maths Vol 1" style={iS}/></Field>
          <Row>
            <Field label="Category"><select value={f.category} onChange={e=>upd("category",e.target.value)} style={iS}>{CATS.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}</select></Field>
            <Field label="Condition"><select value={f.condition} onChange={e=>upd("condition",e.target.value)} style={iS}>{CONDITIONS.map(c=><option key={c}>{c}</option>)}</select></Field>
          </Row>
          <Row>
            <Field label="Original Price (₹)"><input type="number" value={f.origP} onChange={e=>upd("origP",e.target.value)} placeholder="500" style={iS}/></Field>
            <Field label="Your Selling Price (₹)"><input type="number" value={f.sellP} onChange={e=>upd("sellP",e.target.value)} placeholder="200" style={iS}/></Field>
          </Row>
          <Row cols="1fr 1fr 1fr">
            <Field label="Age (years)"><input type="number" value={f.age} onChange={e=>upd("age",e.target.value)} min={0} max={10} style={iS}/></Field>
            <Field label="Demand"><select value={f.demand} onChange={e=>upd("demand",e.target.value)} style={iS}>{"Low Medium High Very High".split(" ").map((d,i)=><option key={i}>{d}</option>)}</select></Field>
            <Field label="Subject"><select value={f.subject} onChange={e=>upd("subject",e.target.value)} style={iS}>{SUBJECTS.map(s=><option key={s}>{s}</option>)}</select></Field>
          </Row>
          <Row>
            <Field label="College"><select value={f.college} onChange={e=>upd("college",e.target.value)} style={iS}>{COLLEGES.map(c=><option key={c}>{c}</option>)}</select></Field>
            <Field label="Area in Bhopal"><select value={f.area} onChange={e=>upd("area",e.target.value)} style={iS}>{AREAS.map(a=><option key={a}>{a}</option>)}</select></Field>
          </Row>
          <Field label="Description"><textarea value={f.desc} onChange={e=>upd("desc",e.target.value)} rows={3} placeholder="Describe your item honestly..." style={{...iS,resize:"vertical"}}/></Field>
          {fair&&(
            <Card style={{background:"#faf5ff",border:`1px solid ${fair.color}40`}}>
              <P style={{fontWeight:800,color:fair.color,fontSize:14,marginBottom:4}}>{fair.emoji} {fair.label}</P>
              <P style={{fontSize:13,color:"#6b7280"}}>Expected: <strong style={{color:"#1e1b4b"}}>₹{fair.exp}</strong> · Your price is <strong style={{color:fair.color}}>{fair.r}%</strong> of market value</P>
            </Card>
          )}
          <Btn onClick={()=>{
            if(!f.title||!f.origP||!f.sellP){alert("Please fill title and prices.");return;}
            onSubmit({...f,origP:+f.origP,sellP:+f.sellP,age:+f.age,img:CAT_IMGS[f.category]||IMGS.books,id:editProduct?editProduct.id:Date.now(),seller:"You",sInit:"ME",views:0,sold:false,reported:false,mine:true,phone:""});
            onClose();
          }} style={{padding:13,fontSize:14}}>
            {editProduct?"💾 Save Changes":"🚀 Publish Listing"}
          </Btn>
        </V>
      </V>
    </V>
  );
}

/* ═══════════════════════════════════════════════════════
   BUYER DASHBOARD
═══════════════════════════════════════════════════════ */
function BuyerDashboard({products,wishlist,onWishlist,purchases,setPurchases,onProductClick,onChat}) {
  const [tab,setTab]=useState("browse");
  const wlItems=products.filter(p=>wishlist.includes(p.id));
  const recentSearches=["Engineering Maths","Arduino Kit","GATE Notes","Casio Calculator","Lab Coat"];
  const TABS=[["browse","🏪 Browse Saved"],["wishlist","❤️ Wishlist"],["purchases","✅ Purchases"],["history","🕐 Recent Searches"]];
  return (
    <V style={{padding:24}}>
      <V style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <V>
          <P style={{fontSize:22,fontWeight:800,color:"#1e1b4b"}}>🎒 Buyer Dashboard</P>
          <P style={{fontSize:14,color:"#9ca3af"}}>Your activity, wishlist and purchases</P>
        </V>
        <V style={{background:"linear-gradient(135deg,#7c3aed,#a855f7)",borderRadius:14,padding:"12px 18px",textAlign:"center"}}>
          <P style={{color:"#fff",fontWeight:800,fontSize:20}}>₹{purchases.reduce((s,p)=>s+p.sellP,0).toLocaleString()}</P>
          <P style={{color:"#e9d5ff",fontSize:11,fontWeight:600}}>Total Spent</P>
        </V>
      </V>
      {/* Metrics */}
      <V style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:22}}>
        <MetricCard icon="❤️" label="Wishlist" value={wishlist.length} color="#ef4444"/>
        <MetricCard icon="✅" label="Purchases" value={purchases.length} color="#22c55e"/>
        <MetricCard icon="💬" label="Active Chats" value={3} color="#3b82f6"/>
        <MetricCard icon="💰" label="Total Saved" value={`₹${wlItems.reduce((s,p)=>s+(p.origP-p.sellP),0).toLocaleString()}`} color="#f59e0b" sub="vs original price"/>
      </V>
      {/* Tabs */}
      <V style={{display:"flex",gap:6,marginBottom:18,background:"#faf5ff",padding:5,borderRadius:12,border:"1px solid #ede9fe"}}>
        {TABS.map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"8px 10px",border:"none",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:12,background:tab===id?"#7c3aed":"transparent",color:tab===id?"#fff":"#7c3aed",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .15s"}}>
            {label}
          </button>
        ))}
      </V>

      {tab==="browse"&&(
        <V>
          <SectionTitle sub="Products you might like based on your activity">Recommended for You</SectionTitle>
          <V style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:14}}>
            {products.filter(p=>!p.sold).slice(0,8).map(p=>(
              <ProductCard key={p.id} p={p} onClick={()=>onProductClick(p)} onWishlist={onWishlist} wishlisted={wishlist.includes(p.id)} onChat={onChat}/>
            ))}
          </V>
        </V>
      )}

      {tab==="wishlist"&&(
        <V>
          <SectionTitle sub={`${wlItems.length} items saved`}>Your Wishlist</SectionTitle>
          {wlItems.length===0?(
            <Card style={{textAlign:"center",padding:48}}>
              <P style={{fontSize:40,marginBottom:12}}>🤍</P>
              <P style={{fontWeight:800,color:"#1e1b4b",marginBottom:8}}>Wishlist is empty</P>
              <P style={{fontSize:14,color:"#9ca3af"}}>Tap the heart on any listing to save it here</P>
            </Card>
          ):(
            <V style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:14}}>
              {wlItems.map(p=>(
                <ProductCard key={p.id} p={p} onClick={()=>onProductClick(p)} onWishlist={onWishlist} wishlisted={true} onChat={onChat}/>
              ))}
            </V>
          )}
        </V>
      )}

      {tab==="purchases"&&(
        <V>
          <SectionTitle sub="Items you've purchased">Purchase History</SectionTitle>
          {purchases.length===0?(
            <Card style={{textAlign:"center",padding:48}}>
              <P style={{fontSize:40,marginBottom:12}}>🛒</P>
              <P style={{fontWeight:800,color:"#1e1b4b",marginBottom:8}}>No purchases yet</P>
              <P style={{fontSize:14,color:"#9ca3af"}}>Browse listings and click "Buy Now" to purchase</P>
            </Card>
          ):(
            <V style={{display:"flex",flexDirection:"column",gap:10}}>
              {purchases.map((p,i)=>(
                <Card key={i} style={{display:"flex",gap:14,alignItems:"center"}}>
                  <ImgBox src={p.img} h={60} radius={10}/>
                  <V style={{flex:1}}>
                    <P style={{fontWeight:700,color:"#1e1b4b",fontSize:14}}>{p.title}</P>
                    <P style={{fontSize:12,color:"#9ca3af"}}>{p.seller} · {p.area}</P>
                    <Star n={4}/>
                  </V>
                  <V style={{textAlign:"right"}}>
                    <P style={{fontWeight:800,color:"#7c3aed",fontSize:16}}>₹{p.sellP}</P>
                    <Pill color="#22c55e" sm>✅ Purchased</Pill>
                  </V>
                  <Btn sm variant="outline" onClick={()=>alert("Review submitted! Thank you.")}>⭐ Review</Btn>
                </Card>
              ))}
            </V>
          )}
        </V>
      )}

      {tab==="history"&&(
        <V>
          <SectionTitle sub="Your recent search queries">Recent Searches</SectionTitle>
          <V style={{display:"flex",flexWrap:"wrap",gap:10}}>
            {recentSearches.map(s=>(
              <V key={s} style={{background:"#faf5ff",border:"1px solid #e9d5ff",borderRadius:20,padding:"8px 16px",display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:14}}>🔍</span>
                <span style={{fontSize:13,fontWeight:600,color:"#4b5563"}}>{s}</span>
                <button style={{background:"none",border:"none",color:"#9ca3af",cursor:"pointer",fontSize:14,padding:0}}>✕</button>
              </V>
            ))}
          </V>
          <V style={{marginTop:20}}>
            <SectionTitle sub="Based on your searches">Trending Near You</SectionTitle>
            <V style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:14}}>
              {products.filter(p=>p.demand==="Very High"&&!p.sold).slice(0,4).map(p=>(
                <ProductCard key={p.id} p={p} onClick={()=>onProductClick(p)} onWishlist={onWishlist} wishlisted={wishlist.includes(p.id)}/>
              ))}
            </V>
          </V>
        </V>
      )}
    </V>
  );
}

/* ═══════════════════════════════════════════════════════
   SELLER DASHBOARD
═══════════════════════════════════════════════════════ */
function SellerDashboard({myListings,setMyListings,onAddListing}) {
  const [tab,setTab]=useState("listings");
  const [editTarget,setEditTarget]=useState(null);
  const active=myListings.filter(p=>!p.sold);
  const sold=myListings.filter(p=>p.sold);
  const revenue=sold.reduce((s,p)=>s+p.sellP,0);
  const totalViews=myListings.reduce((s,p)=>s+p.views,0);
  const TABS=[["listings","📋 My Listings"],["sold","✅ Sold Items"],["analytics","📊 My Analytics"],["inquiries","💬 Inquiries"]];

  function handleDelete(id){if(window.confirm("Delete this listing?"))setMyListings(ls=>ls.filter(l=>l.id!==id));}
  function handleMarkSold(id){setMyListings(ls=>ls.map(l=>l.id===id?{...l,sold:true}:l));}
  function handleEdit(p){setEditTarget(p);}
  function handleSaveEdit(updated){setMyListings(ls=>ls.map(l=>l.id===updated.id?{...updated,mine:true,views:l.views,sold:l.sold}:l));setEditTarget(null);}

  const inquiries=[
    {buyer:"Rohit K.",product:"Control Systems Book",msg:"Is it still available? Can we meet at RGPV gate?",time:"2h ago"},
    {buyer:"Sneha R.",product:"Control Systems Book",msg:"What's the lowest you can go?",time:"5h ago"},
    {buyer:"Aman T.",product:"Casio Calculator",msg:"Bhai meet kar skte h MP Nagar mein?",time:"1d ago"},
  ];

  return (
    <V style={{padding:24}}>
      {editTarget&&<ListingForm editProduct={editTarget} onSubmit={handleSaveEdit} onClose={()=>setEditTarget(null)}/>}
      <V style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <V>
          <P style={{fontSize:22,fontWeight:800,color:"#1e1b4b"}}>🏪 Seller Dashboard</P>
          <P style={{fontSize:14,color:"#9ca3af"}}>Manage your listings and track sales</P>
        </V>
        <Btn onClick={onAddListing} style={{padding:"10px 20px",fontSize:14}}>+ New Listing</Btn>
      </V>
      <V style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:22}}>
        <MetricCard icon="📋" label="Total Listings" value={myListings.length} color="#7c3aed"/>
        <MetricCard icon="🟢" label="Active" value={active.length} color="#22c55e"/>
        <MetricCard icon="✅" label="Sold" value={sold.length} color="#f59e0b"/>
        <MetricCard icon="💰" label="Revenue" value={`₹${revenue.toLocaleString()}`} color="#ef4444" sub="from sold items"/>
      </V>
      <V style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:22}}>
        <MetricCard icon="👁" label="Total Views" value={totalViews} color="#3b82f6"/>
        <MetricCard icon="💬" label="Inquiries" value={inquiries.length} color="#8b5cf6"/>
        <MetricCard icon="⭐" label="Avg Rating" value="4.3 / 5" color="#f97316"/>
      </V>
      <V style={{display:"flex",gap:6,marginBottom:18,background:"#faf5ff",padding:5,borderRadius:12,border:"1px solid #ede9fe"}}>
        {TABS.map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"8px 6px",border:"none",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:12,background:tab===id?"#7c3aed":"transparent",color:tab===id?"#fff":"#7c3aed",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .15s"}}>
            {label}
          </button>
        ))}
      </V>

      {tab==="listings"&&(
        <V>
          {myListings.length===0?(
            <Card style={{textAlign:"center",padding:52}}>
              <P style={{fontSize:48,marginBottom:12}}>📦</P>
              <P style={{fontWeight:800,color:"#1e1b4b",marginBottom:8}}>No listings yet</P>
              <P style={{fontSize:14,color:"#9ca3af",marginBottom:16}}>Click "New Listing" to sell your first item</P>
              <Btn onClick={onAddListing}>+ Create Listing</Btn>
            </Card>
          ):(
            <V style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
              {myListings.map(p=>(
                <ProductCard key={p.id} p={p} showActions onEdit={handleEdit} onDelete={handleDelete} onMarkSold={handleMarkSold}/>
              ))}
            </V>
          )}
        </V>
      )}

      {tab==="sold"&&(
        <V>
          {sold.length===0?(
            <Card style={{textAlign:"center",padding:52}}>
              <P style={{fontSize:40,marginBottom:12}}>📊</P>
              <P style={{fontWeight:800,color:"#1e1b4b",marginBottom:8}}>No sold items yet</P>
              <P style={{fontSize:14,color:"#9ca3af"}}>Mark listings as sold when they're purchased</P>
            </Card>
          ):(
            <V style={{display:"flex",flexDirection:"column",gap:10}}>
              {sold.map(p=>(
                <Card key={p.id} style={{display:"flex",gap:14,alignItems:"center"}}>
                  <ImgBox src={p.img} h={60} radius={10}/>
                  <V style={{flex:1}}>
                    <P style={{fontWeight:700,color:"#1e1b4b"}}>{p.title}</P>
                    <P style={{fontSize:12,color:"#9ca3af"}}>{p.college} · {p.area}</P>
                  </V>
                  <V style={{textAlign:"right"}}>
                    <P style={{fontWeight:800,color:"#22c55e",fontSize:17}}>₹{p.sellP}</P>
                    <Pill color="#22c55e" sm>✅ Sold</Pill>
                  </V>
                </Card>
              ))}
              <Card style={{background:"#f0fdf4",border:"1px solid #bbf7d0"}}>
                <P style={{fontWeight:800,color:"#16a34a",fontSize:16}}>💰 Total Revenue: ₹{revenue.toLocaleString()}</P>
                <P style={{fontSize:13,color:"#4ade80"}}>from {sold.length} sold items</P>
              </Card>
            </V>
          )}
        </V>
      )}

      {tab==="analytics"&&(
        <V style={{display:"flex",flexDirection:"column",gap:16}}>
          <Card>
            <P style={{fontWeight:800,color:"#1e1b4b",marginBottom:14}}>📈 Views Per Listing</P>
            <BarChart data={myListings.map(p=>({cat:p.title.slice(0,28)+(p.title.length>28?"…":""),val:p.views}))} keyLabel="cat" keyVal="val"/>
          </Card>
          <Card>
            <P style={{fontWeight:800,color:"#1e1b4b",marginBottom:14}}>📅 Weekly Activity</P>
            <V style={{display:"flex",alignItems:"flex-end",gap:8,height:80}}>
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i)=>{
                const h=[20,45,38,60,55,75,30][i];
                return <V key={d} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                  <V style={{width:"100%",background:h>50?"#7c3aed":"#e9d5ff",borderRadius:"4px 4px 0 0",height:`${h}%`}}/>
                  <P style={{fontSize:9,color:"#9ca3af",fontWeight:700}}>{d}</P>
                </V>;
              })}
            </V>
          </Card>
          <V style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Card>
              <P style={{fontWeight:800,color:"#1e1b4b",marginBottom:10}}>🏷️ Price Distribution</P>
              {myListings.map(p=><V key={p.id} style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}}>
                <span style={{color:"#4b5563"}}>{p.title.slice(0,20)}…</span>
                <span style={{fontWeight:700,color:"#7c3aed"}}>₹{p.sellP}</span>
              </V>)}
            </Card>
            <Card>
              <P style={{fontWeight:800,color:"#1e1b4b",marginBottom:10}}>💡 Pricing Tips</P>
              <V style={{display:"flex",flexDirection:"column",gap:8}}>
                {[["Keep prices fair","Listings priced ≤market value get 3× more views"],["Add good photos","Real images improve click rate by 60%"],["Respond fast","Sellers who reply within 1hr close 70% more deals"]].map(([t,d])=>(
                  <V key={t} style={{background:"#faf5ff",borderRadius:10,padding:"8px 10px"}}>
                    <P style={{fontSize:12,fontWeight:700,color:"#7c3aed"}}>{t}</P>
                    <P style={{fontSize:11,color:"#9ca3af"}}>{d}</P>
                  </V>
                ))}
              </V>
            </Card>
          </V>
        </V>
      )}

      {tab==="inquiries"&&(
        <V style={{display:"flex",flexDirection:"column",gap:10}}>
          {inquiries.map((q,i)=>(
            <Card key={i} style={{display:"flex",gap:14,alignItems:"center"}}>
              <Avt initials={q.buyer.split(" ").map(n=>n[0]).join("")} size={42}/>
              <V style={{flex:1}}>
                <V style={{display:"flex",justifyContent:"space-between"}}>
                  <P style={{fontWeight:700,color:"#1e1b4b"}}>{q.buyer}</P>
                  <P style={{fontSize:11,color:"#9ca3af"}}>{q.time}</P>
                </V>
                <P style={{fontSize:12,color:"#7c3aed",fontWeight:600}}>Re: {q.product}</P>
                <P style={{fontSize:13,color:"#4b5563",marginTop:4}}>"{q.msg}"</P>
              </V>
              <V style={{display:"flex",gap:6}}>
                <Btn sm onClick={()=>alert("Opening chat...")} >💬 Reply</Btn>
                <Btn sm variant="outline" danger onClick={()=>alert("Inquiry dismissed.")}>✕</Btn>
              </V>
            </Card>
          ))}
        </V>
      )}
    </V>
  );
}

/* ═══════════════════════════════════════════════════════
   ADMIN DASHBOARD
═══════════════════════════════════════════════════════ */
function AdminDashboard({products,setProducts}) {
  const [tab,setTab]=useState("overview");
  const [users,setUsers]=useState([
    {id:1,name:"Rahul Tiwari",email:"rahul@rgpv.ac.in",college:"RGPV Bhopal",role:"seller",listings:4,reports:0,status:"active",joined:"12 Jan 2024"},
    {id:2,name:"Priya Sen",email:"priya@manit.ac.in",college:"MANIT Bhopal",role:"buyer",listings:0,reports:0,status:"active",joined:"3 Feb 2024"},
    {id:3,name:"Amit Dubey",email:"amit@lnct.ac.in",college:"LNCT Bhopal",role:"seller",listings:6,reports:1,status:"active",joined:"18 Jan 2024"},
    {id:4,name:"SuspectUser99",email:"money@gmail.com",college:"Unknown",role:"seller",listings:18,reports:4,status:"flagged",joined:"2 May 2024"},
    {id:5,name:"Fake Seller",email:"scam@yahoo.com",college:"Unknown",role:"seller",listings:22,reports:7,status:"banned",joined:"1 May 2024"},
    {id:6,name:"Sneha Malviya",email:"sneha@rgpv.ac.in",college:"RGPV Bhopal",role:"buyer",listings:1,reports:0,status:"active",joined:"22 Mar 2024"},
  ]);
  const [reports,setReports]=useState([
    {id:1,reporter:"Priya Sen",product:"Overpriced GATE Notes",reason:"Price is 3× market value, misleading photos",status:"pending"},
    {id:2,reporter:"Rohit K.",product:"Fake Arduino Kit",reason:"Seller not responding, item looks fake in photo",status:"investigating"},
    {id:3,reporter:"Aman T.",product:"Lab Coat (wrong size)",reason:"Item condition was 'Excellent' but received 'Poor'",status:"resolved"},
  ]);
  const [pendingColleges,setPendingColleges]=useState([
    {name:"IIT Indore","students":240,status:"pending"},
    {name:"NIT Bhopal","students":180,status:"pending"},
    {name:"AISECT University","students":120,status:"approved"},
  ]);
  const TABS=[["overview","📊 Overview"],["users","👥 Users"],["listings","📋 Listings"],["reports","🚨 Reports"],["colleges","🏫 Colleges"]];
  const catSales=CATS.map(c=>({cat:c.label,val:products.filter(p=>p.category===c.id).length})).sort((a,b)=>b.val-a.val);
  const collegeSales=COLLEGES.slice(0,6).map(c=>({cat:c.replace(" Bhopal",""),val:products.filter(p=>p.college===c).length}));
  function approveProduct(id){setProducts(ps=>ps.map(p=>p.id===id?{...p,adminApproved:true}:p));}
  function removeProduct(id){if(window.confirm("Remove this listing?"))setProducts(ps=>ps.filter(p=>p.id!==id));}
  function banUser(id){setUsers(us=>us.map(u=>u.id===id?{...u,status:"banned"}:u));}
  function approveUser(id){setUsers(us=>us.map(u=>u.id===id?{...u,status:"active"}:u));}
  function resolveReport(id){setReports(rs=>rs.map(r=>r.id===id?{...r,status:"resolved"}:r));}
  function approveCollege(name){setPendingColleges(cs=>cs.map(c=>c.name===name?{...c,status:"approved"}:c));}

  return (
    <V style={{padding:24}}>
      <V style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <V>
          <P style={{fontSize:22,fontWeight:800,color:"#1e1b4b"}}>🛡️ Admin Panel</P>
          <P style={{fontSize:14,color:"#9ca3af"}}>Platform control center</P>
        </V>
        <V style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:12,padding:"10px 16px",display:"flex",gap:16}}>
          <V style={{textAlign:"center"}}><P style={{fontWeight:800,color:"#dc2626",fontSize:16}}>{reports.filter(r=>r.status==="pending").length}</P><P style={{fontSize:11,color:"#9ca3af"}}>Pending Reports</P></V>
          <V style={{textAlign:"center"}}><P style={{fontWeight:800,color:"#f97316",fontSize:16}}>{users.filter(u=>u.status==="flagged").length}</P><P style={{fontSize:11,color:"#9ca3af"}}>Flagged Users</P></V>
        </V>
      </V>
      <V style={{display:"flex",gap:6,marginBottom:22,background:"#faf5ff",padding:5,borderRadius:12,border:"1px solid #ede9fe"}}>
        {TABS.map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"8px 6px",border:"none",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:12,background:tab===id?"#7c3aed":"transparent",color:tab===id?"#fff":"#7c3aed",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
            {label}
          </button>
        ))}
      </V>

      {tab==="overview"&&(
        <V style={{display:"flex",flexDirection:"column",gap:16}}>
          <V style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
            <MetricCard icon="👥" label="Total Users" value="1,284" color="#7c3aed"/>
            <MetricCard icon="📦" label="Live Listings" value={products.filter(p=>!p.sold).length} color="#22c55e"/>
            <MetricCard icon="✅" label="Sold This Week" value="342" color="#f59e0b"/>
            <MetricCard icon="🚨" label="Open Reports" value={reports.filter(r=>r.status==="pending").length} color="#ef4444"/>
          </V>
          <V style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <Card>
              <P style={{fontWeight:800,color:"#1e1b4b",marginBottom:14}}>📦 Listings by Category</P>
              <BarChart data={catSales.slice(0,7)} keyLabel="cat" keyVal="val"/>
            </Card>
            <Card>
              <P style={{fontWeight:800,color:"#1e1b4b",marginBottom:14}}>🏫 Listings by College</P>
              <BarChart data={collegeSales} keyLabel="cat" keyVal="val" color="#06b6d4"/>
            </Card>
          </V>
          <Card>
            <P style={{fontWeight:800,color:"#1e1b4b",marginBottom:14}}>📅 Monthly Growth (Jan–Oct 2024)</P>
            <V style={{display:"flex",alignItems:"flex-end",gap:6,height:100}}>
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"].map((m,i)=>{
                const h=[18,28,35,42,55,60,72,80,88,95][i];
                return <V key={m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <V style={{width:"100%",background:i>=8?"#7c3aed":i>=5?"#a855f7":"#e9d5ff",borderRadius:"4px 4px 0 0",height:`${h}%`,transition:"height .8s"}}/>
                  <P style={{fontSize:9,color:"#9ca3af",fontWeight:700}}>{m}</P>
                </V>;
              })}
            </V>
          </Card>
        </V>
      )}

      {tab==="users"&&(
        <V style={{display:"flex",flexDirection:"column",gap:10}}>
          {users.map(u=>(
            <Card key={u.id} style={{display:"flex",alignItems:"center",gap:14,border:`1px solid ${u.status==="banned"?"#fecaca":u.status==="flagged"?"#fed7aa":"#ede9fe"}`}}>
              <Avt initials={u.name.slice(0,2).toUpperCase()} bg={u.status==="banned"?"#ef4444":u.status==="flagged"?"#f97316":"#7c3aed"} size={42}/>
              <V style={{flex:1}}>
                <V style={{display:"flex",alignItems:"center",gap:8}}>
                  <P style={{fontWeight:700,color:"#1e1b4b"}}>{u.name}</P>
                  <Pill color={u.status==="active"?"#22c55e":u.status==="flagged"?"#f97316":"#ef4444"} sm>{u.status}</Pill>
                </V>
                <P style={{fontSize:12,color:"#9ca3af"}}>{u.email} · {u.college}</P>
                <P style={{fontSize:11,color:"#6b7280"}}>📋 {u.listings} listings · 🚨 {u.reports} reports · Joined {u.joined}</P>
              </V>
              <V style={{display:"flex",gap:6}}>
                {u.status!=="active"&&<Btn sm onClick={()=>approveUser(u.id)}>✅ Unban</Btn>}
                {u.status==="active"&&<Btn sm variant="outline" onClick={()=>banUser(u.id)} danger>🚫 Ban</Btn>}
                {u.status==="flagged"&&<Btn sm variant="outline" danger onClick={()=>banUser(u.id)}>🔨 Ban</Btn>}
                <Btn sm variant="ghost" onClick={()=>alert(`Viewing profile of ${u.name}`)}>👁 View</Btn>
              </V>
            </Card>
          ))}
        </V>
      )}

      {tab==="listings"&&(
        <V>
          <V style={{display:"flex",gap:10,marginBottom:16,background:"#fef2f2",border:"1px solid #fecaca",borderRadius:12,padding:12}}>
            <span style={{fontSize:20}}>⚠️</span>
            <P style={{fontSize:13,color:"#dc2626"}}>Review listings carefully. Approve genuine items and remove spam/fraud listings.</P>
          </V>
          <V style={{display:"flex",flexDirection:"column",gap:10}}>
            {products.map(p=>(
              <Card key={p.id} style={{display:"flex",gap:14,alignItems:"center"}}>
                <ImgBox src={p.img} h={56} radius={8}/>
                <V style={{flex:1}}>
                  <P style={{fontWeight:700,color:"#1e1b4b",fontSize:13}}>{p.title}</P>
                  <P style={{fontSize:12,color:"#9ca3af"}}>{p.seller} · {p.college} · ₹{p.sellP}</P>
                  <FTag p={p}/>
                </V>
                <V style={{display:"flex",gap:6}}>
                  <Btn sm onClick={()=>approveProduct(p.id)}>✅ Approve</Btn>
                  <Btn sm variant="outline" danger onClick={()=>removeProduct(p.id)}>🗑 Remove</Btn>
                </V>
              </Card>
            ))}
          </V>
        </V>
      )}

      {tab==="reports"&&(
        <V style={{display:"flex",flexDirection:"column",gap:10}}>
          {reports.map(r=>(
            <Card key={r.id} style={{border:`1px solid ${r.status==="resolved"?"#bbf7d0":r.status==="investigating"?"#fed7aa":"#fecaca"}`}}>
              <V style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                <V style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:18}}>🚨</span>
                  <P style={{fontWeight:700,color:"#1e1b4b"}}>{r.product}</P>
                </V>
                <Pill color={r.status==="resolved"?"#22c55e":r.status==="investigating"?"#f97316":"#ef4444"} sm>{r.status}</Pill>
              </V>
              <P style={{fontSize:12,color:"#6b7280",marginBottom:4}}>Reported by: <strong>{r.reporter}</strong></P>
              <P style={{fontSize:13,color:"#4b5563",marginBottom:10}}>"{r.reason}"</P>
              {r.status!=="resolved"&&(
                <V style={{display:"flex",gap:8}}>
                  <Btn sm onClick={()=>resolveReport(r.id)}>✅ Mark Resolved</Btn>
                  <Btn sm variant="outline" onClick={()=>alert("Investigation note saved.")}>🔍 Investigate</Btn>
                  <Btn sm variant="outline" danger onClick={()=>alert("Listing removed.")}>🗑 Remove Listing</Btn>
                </V>
              )}
            </Card>
          ))}
        </V>
      )}

      {tab==="colleges"&&(
        <V style={{display:"flex",flexDirection:"column",gap:10}}>
          <Card style={{background:"#eff6ff",border:"1px solid #bfdbfe",marginBottom:4}}>
            <P style={{fontWeight:800,color:"#1e40af",marginBottom:4}}>College Onboarding</P>
            <P style={{fontSize:13,color:"#3b82f6"}}>Approve new colleges to allow their students to register and list items on Packback.</P>
          </Card>
          {pendingColleges.map(c=>(
            <Card key={c.name} style={{display:"flex",alignItems:"center",gap:14}}>
              <span style={{fontSize:30}}>🏫</span>
              <V style={{flex:1}}>
                <P style={{fontWeight:700,color:"#1e1b4b"}}>{c.name}</P>
                <P style={{fontSize:12,color:"#9ca3af"}}>{c.students} students waiting · Bhopal region</P>
              </V>
              <Pill color={c.status==="approved"?"#22c55e":"#f97316"} sm>{c.status}</Pill>
              {c.status==="pending"&&<Btn sm onClick={()=>approveCollege(c.name)}>✅ Approve</Btn>}
              {c.status==="approved"&&<Btn sm variant="outline" onClick={()=>alert("College settings opened.")}>⚙️ Manage</Btn>}
            </Card>
          ))}
          <Card style={{background:"#f0fdf4",border:"1px solid #bbf7d0"}}>
            <P style={{fontWeight:800,color:"#16a34a",marginBottom:10}}>✅ Active Colleges in Bhopal</P>
            <V style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
              {COLLEGES.map(c=>(
                <V key={c} style={{background:"#fff",border:"1px solid #bbf7d0",borderRadius:10,padding:"8px 12px",display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:16}}>🏫</span>
                  <P style={{fontSize:12,fontWeight:600,color:"#1e1b4b"}}>{c}</P>
                </V>
              ))}
            </V>
          </Card>
        </V>
      )}
    </V>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════ */
export default function Packback() {
  const [page,setPage]=useState("home");
  const [allProducts,setAllProducts]=useState(initProducts);
  const [myListings,setMyListings]=useState(MY_SELLER_LISTINGS_INIT);
  const [wishlist,setWishlist]=useState([]);
  const [purchases,setPurchases]=useState([]);
  const [selectedP,setSelectedP]=useState(null);
  const [chatP,setChatP]=useState(null);
  const [showForm,setShowForm]=useState(false);
  const [search,setSearch]=useState("");
  const [filterCat,setFilterCat]=useState("all");
  const [filterCol,setFilterCol]=useState("all");
  const [filterCond,setFilterCond]=useState("all");
  const [sort,setSort]=useState("recent");
  const [maxP,setMaxP]=useState(3000);
  const [notifs,setNotifs]=useState([
    {id:1,text:"Rohit replied to your inquiry about Engineering Maths",read:false},
    {id:2,text:"Price drop! Casio Calculator wishlist item now ₹399",read:false},
    {id:3,text:"Your listing got 12 new views today",read:true},
    {id:4,text:"New item matching your search 'Arduino Kit' listed!",read:false},
  ]);
  const [showNotifs,setShowNotifs]=useState(false);
  const unread=notifs.filter(n=>!n.read).length;

  const products=[...allProducts,...myListings.filter(m=>!allProducts.find(a=>a.id===m.id))];

  const filtered=products.filter(p=>{
    if(p.sold)return false;
    if(search&&!p.title.toLowerCase().includes(search.toLowerCase())&&!p.seller.toLowerCase().includes(search.toLowerCase())&&!p.subject.toLowerCase().includes(search.toLowerCase()))return false;
    if(filterCat!=="all"&&p.category!==filterCat)return false;
    if(filterCol!=="all"&&p.college!==filterCol)return false;
    if(filterCond!=="all"&&p.condition!==filterCond)return false;
    if(p.sellP>maxP)return false;
    return true;
  }).sort((a,b)=>{
    if(sort==="price-asc")return a.sellP-b.sellP;
    if(sort==="price-desc")return b.sellP-a.sellP;
    if(sort==="popular")return b.views-a.views;
    return b.id-a.id;
  });

  function toggleWishlist(id){setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);}
  function handleBuy(p){
    if(purchases.find(x=>x.id===p.id)){alert("Already purchased!");return;}
    setPurchases(ps=>[...ps,p]);
    alert(`🎉 Purchase confirmed!\n\nItem: ${p.title}\nPrice: ₹${p.sellP}\nSeller: ${p.seller}\nPickup: ${p.area}\n\nContact seller to arrange pickup!`);
    setSelectedP(null);
  }
  function handleAddListing(newP){
    setMyListings(ls=>{
      const existing=ls.findIndex(l=>l.id===newP.id);
      if(existing>=0){const updated=[...ls];updated[existing]=newP;return updated;}
      return [newP,...ls];
    });
  }
  function handleAdminSetProducts(fn){
    if(typeof fn==="function"){setAllProducts(fn);}else{setAllProducts(fn);}
  }

  const NAV=[
    {id:"home",label:"Browse",icon:"🏠"},
    {id:"buyer",label:"Buyer",icon:"🎒"},
    {id:"seller",label:"Seller",icon:"🏪"},
    {id:"admin",label:"Admin",icon:"🛡️"},
  ];

  const iS={fontFamily:"'Plus Jakarta Sans',sans-serif"};

  return (
    <V style={{fontFamily:"'Plus Jakarta Sans',sans-serif",minHeight:"100vh",background:"#fbf8ff"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:#fbf8ff}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#c4b5fd;border-radius:2px}`}</style>

      {/* HEADER */}
      <V style={{background:"#fff",borderBottom:"1px solid #ede9fe",position:"sticky",top:0,zIndex:200}}>
        <V style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",height:58,display:"flex",alignItems:"center",gap:16}}>
          <V onClick={()=>setPage("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
            <V style={{width:34,height:34,background:"linear-gradient(135deg,#7c3aed,#a855f7)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🎒</V>
            <span style={{fontSize:19,fontWeight:800,color:"#1e1b4b",letterSpacing:"-0.5px"}}>Pack<span style={{color:"#7c3aed"}}>back</span></span>
            <Pill color="#7c3aed" sm>Bhopal</Pill>
          </V>
          <V style={{flex:1,maxWidth:420,position:"relative"}}>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage("home");}} placeholder="Search books, calculators, notes..." style={{...iS,width:"100%",padding:"8px 14px 8px 38px",borderRadius:22,border:"1.5px solid #e9d5ff",fontSize:12,outline:"none",background:"#faf5ff"}}/>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14}}>🔍</span>
          </V>
          <nav style={{display:"flex",gap:3}}>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setPage(n.id)} style={{...iS,padding:"6px 12px",borderRadius:18,border:"none",cursor:"pointer",background:page===n.id?"#7c3aed":"transparent",color:page===n.id?"#fff":"#6b7280",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:4,whiteSpace:"nowrap"}}>
                <span>{n.icon}</span><span>{n.label}</span>
              </button>
            ))}
          </nav>
          <V style={{display:"flex",gap:8,alignItems:"center"}}>
            <V style={{position:"relative"}}>
              <button onClick={()=>setShowNotifs(!showNotifs)} style={{background:"none",border:"1px solid #e9d5ff",borderRadius:18,padding:"7px 11px",cursor:"pointer",fontSize:16,position:"relative"}}>
                🔔{unread>0&&<span style={{position:"absolute",top:-4,right:-4,background:"#ef4444",color:"#fff",fontSize:9,fontWeight:800,padding:"1px 5px",borderRadius:10}}>{unread}</span>}
              </button>
              {showNotifs&&(
                <V style={{position:"absolute",right:0,top:44,background:"#fff",border:"1px solid #ede9fe",borderRadius:14,padding:12,minWidth:280,boxShadow:"0 8px 32px rgba(124,58,237,.15)",zIndex:300}}>
                  <P style={{fontSize:13,fontWeight:800,color:"#1e1b4b",marginBottom:10}}>🔔 Notifications</P>
                  {notifs.map(n=>(
                    <V key={n.id} onClick={()=>setNotifs(ns=>ns.map(x=>x.id===n.id?{...x,read:true}:x))} style={{padding:"8px 10px",borderRadius:10,background:n.read?"transparent":"#faf5ff",marginBottom:4,cursor:"pointer",fontSize:12,color:"#4b5563",borderLeft:n.read?"2px solid transparent":"2px solid #7c3aed"}}>
                      {n.text}
                    </V>
                  ))}
                  <button onClick={()=>setNotifs(ns=>ns.map(n=>({...n,read:true})))} style={{...iS,width:"100%",padding:8,background:"none",border:"none",fontSize:12,color:"#7c3aed",cursor:"pointer",fontWeight:700,marginTop:4}}>Mark all read</button>
                </V>
              )}
            </V>
            <Btn onClick={()=>setShowForm(true)} style={{padding:"7px 16px",fontSize:12}}>+ Sell</Btn>
          </V>
        </V>
      </V>

      {/* MODALS */}
      {selectedP&&<ProductModal p={selectedP} onClose={()=>setSelectedP(null)} onChat={p=>{setChatP(p);setSelectedP(null);}} onWishlist={toggleWishlist} wishlisted={wishlist.includes(selectedP.id)} onBuy={handleBuy}/>}
      {chatP&&<ChatModal p={chatP} onClose={()=>setChatP(null)}/>}
      {showForm&&<ListingForm onSubmit={p=>{handleAddListing(p);}} onClose={()=>setShowForm(false)}/>}

      <V style={{maxWidth:1200,margin:"0 auto",padding:"0 20px"}}>

        {/* ── HOME ── */}
        {page==="home"&&(
          <V>
            {!search&&(
              <V style={{padding:"32px 0 24px",textAlign:"center"}}>
                <V style={{display:"inline-flex",alignItems:"center",gap:6,background:"#f3e8ff",color:"#7c3aed",fontSize:12,fontWeight:700,padding:"4px 14px",borderRadius:20,marginBottom:14}}>
                  📍 Serving RGPV · MANIT · LNCT · TIT & more in Bhopal
                </V>
                <P style={{fontSize:38,fontWeight:800,color:"#1e1b4b",letterSpacing:"-1.5px",lineHeight:1.15,marginBottom:10}}>
                  Buy & Sell Academic<br/><span style={{color:"#7c3aed"}}>Materials</span> in Bhopal
                </P>
                <P style={{fontSize:15,color:"#6b7280",marginBottom:22,maxWidth:480,margin:"0 auto 22px"}}>
                  Engineering books, calculators, Arduino kits, notes & more — from students in your city.
                </P>
                <V style={{display:"flex",justifyContent:"center",gap:36}}>
                  {[["👥","1,284","Students"],["📦","8,341","Items Sold"],["📋",filtered.length,"Live Now"]].map(([ico,val,lab])=>(
                    <V key={lab} style={{textAlign:"center"}}><P style={{fontSize:22}}>{ico}</P><P style={{fontSize:22,fontWeight:800,color:"#1e1b4b"}}>{val}</P><P style={{fontSize:12,color:"#9ca3af"}}>{lab}</P></V>
                  ))}
                </V>
              </V>
            )}
            {/* Category Scroll */}
            <V style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:6,marginBottom:16,scrollbarWidth:"none"}}>
              <button onClick={()=>setFilterCat("all")} style={{...iS,padding:"6px 16px",borderRadius:20,border:"none",cursor:"pointer",background:filterCat==="all"?"#7c3aed":"#fff",color:filterCat==="all"?"#fff":"#6b7280",fontWeight:700,fontSize:12,whiteSpace:"nowrap"}}>All</button>
              {CATS.map(c=>(
                <button key={c.id} onClick={()=>setFilterCat(filterCat===c.id?"all":c.id)} style={{...iS,padding:"6px 13px",borderRadius:20,border:"none",cursor:"pointer",whiteSpace:"nowrap",background:filterCat===c.id?c.color:"#fff",color:filterCat===c.id?"#fff":"#6b7280",fontWeight:700,fontSize:12}}>
                  {c.icon} {c.label}
                </button>
              ))}
            </V>
            {/* Filters */}
            <V style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"center",background:"#fff",border:"1px solid #ede9fe",borderRadius:12,padding:"10px 14px"}}>
              <select value={filterCol} onChange={e=>setFilterCol(e.target.value)} style={{...iS,padding:"7px 10px",borderRadius:9,border:"1px solid #e9d5ff",fontSize:12,cursor:"pointer",outline:"none",color:"#4b5563"}}>
                <option value="all">🏫 All Colleges</option>
                {COLLEGES.map(c=><option key={c}>{c}</option>)}
              </select>
              <select value={filterCond} onChange={e=>setFilterCond(e.target.value)} style={{...iS,padding:"7px 10px",borderRadius:9,border:"1px solid #e9d5ff",fontSize:12,cursor:"pointer",outline:"none",color:"#4b5563"}}>
                <option value="all">⭐ Any Condition</option>
                {CONDITIONS.map(c=><option key={c}>{c}</option>)}
              </select>
              <select value={sort} onChange={e=>setSort(e.target.value)} style={{...iS,padding:"7px 10px",borderRadius:9,border:"1px solid #e9d5ff",fontSize:12,cursor:"pointer",outline:"none",color:"#4b5563"}}>
                <option value="recent">🕐 Most Recent</option>
                <option value="popular">🔥 Popular</option>
                <option value="price-asc">↑ Price Low→High</option>
                <option value="price-desc">↓ Price High→Low</option>
              </select>
              <V style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:"#6b7280"}}>
                <span>Max ₹{maxP}</span>
                <input type="range" min={50} max={3000} step={50} value={maxP} onChange={e=>setMaxP(+e.target.value)} style={{width:100}}/>
              </V>
              <P style={{marginLeft:"auto",fontSize:12,color:"#9ca3af",fontWeight:700}}>{filtered.length} results</P>
            </V>
            {filtered.length===0?(
              <V style={{textAlign:"center",padding:"72px 0"}}>
                <P style={{fontSize:48,marginBottom:12}}>🔍</P>
                <P style={{fontWeight:800,color:"#1e1b4b",fontSize:18,marginBottom:8}}>No results found</P>
                <P style={{fontSize:14,color:"#9ca3af"}}>Try adjusting your filters or search term</P>
              </V>
            ):(
              <V style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(205px,1fr))",gap:14,paddingBottom:48}}>
                {filtered.map(p=>(
                  <ProductCard key={p.id} p={p} onClick={()=>setSelectedP(p)} onWishlist={toggleWishlist} wishlisted={wishlist.includes(p.id)}/>
                ))}
              </V>
            )}
          </V>
        )}

        {page==="buyer"&&<BuyerDashboard products={products} wishlist={wishlist} onWishlist={toggleWishlist} purchases={purchases} setPurchases={setPurchases} onProductClick={setSelectedP} onChat={setChatP}/>}
        {page==="seller"&&<SellerDashboard myListings={myListings} setMyListings={setMyListings} onAddListing={()=>setShowForm(true)}/>}
        {page==="admin"&&<AdminDashboard products={allProducts} setProducts={setAllProducts}/>}
      </V>
    </V>
  );
}
