(() => {
"use strict";
const KEY="spendwise-v2";
const defaults={transactions:[],budget:1500,currency:"USD",theme:"light"};
const state=(()=>{try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return {...defaults}}})();
const $=s=>document.querySelector(s);
const money=n=>new Intl.NumberFormat(undefined,{style:"currency",currency:state.currency,maximumFractionDigits:2}).format(Number(n)||0);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const monthKey=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");
const currentMonth=monthKey(new Date());
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function toast(message){const el=$("#toast");if(!el)return;el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2300)}
function setTheme(){document.documentElement.dataset.theme=state.theme}
function header(){const year=$("#currentYear");if(year)year.textContent=new Date().getFullYear();const currency=$("#currencySelect");if(currency){currency.value=state.currency;currency.onchange=()=>{state.currency=currency.value;save();location.reload()}}const toggle=$("#themeToggle");if(toggle)toggle.onclick=()=>{state.theme=state.theme==="dark"?"light":"dark";save();setTheme()};document.querySelectorAll(".nav-link").forEach(a=>{if(a.getAttribute("href")===location.pathname.split("/").pop()||(location.pathname.endsWith("/")&&a.getAttribute("href")==="index.html"))a.classList.add("active")})}
function items(month=currentMonth){return state.transactions.filter(t=>!month||t.date.slice(0,7)===month)}
function totals(month=currentMonth){const list=items(month);const income=list.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);const expenses=list.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);return {income,expenses,balance:income-expenses}}
function addTransaction(data){state.transactions.push({...data,id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),createdAt:Date.now()});save()}
function updateTransaction(id,data){state.transactions=state.transactions.map(t=>t.id===id?{...t,...data}:t);save()}
function deleteTransaction(id){state.transactions=state.transactions.filter(t=>t.id!==id);save()}
function exportCSV(list=items()){if(!list.length){toast("There are no transactions to export.");return}const rows=[["Date","Type","Description","Category","Amount","Note"],...list.map(t=>[t.date,t.type,t.title,t.category,t.amount,t.note||""])];const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(",")).join("\n");const url=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));const a=document.createElement("a");a.href=url;a.download="spendwise-transactions.csv";a.click();URL.revokeObjectURL(url)}
setTheme();header();
window.SpendWise={state,$,money,esc,monthKey,currentMonth,save,toast,items,totals,addTransaction,updateTransaction,deleteTransaction,exportCSV};
})();