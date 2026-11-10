(() => {
"use strict";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const KEY="spendwise-v2", icons={Food:"🥗",Transport:"🚗",Rent:"🏠",Entertainment:"🎬",Utilities:"💡",Health:"💊",Shopping:"🛍️",Education:"📚",Other:"📌",Salary:"💼",Freelance:"💻",Business:"🏪",Investment:"📈",Gift:"🎁"};
const cats={expense:["Food","Transport","Rent","Entertainment","Utilities","Health","Shopping","Education","Other"],income:["Salary","Freelance","Business","Investment","Gift","Other"]};
const now=new Date(), key=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");
let month=key(now),transactions=[],budget=1500,currency="USD",filter="all",search="",editing=null;
const money=n=>new Intl.NumberFormat(undefined,{style:"currency",currency:currency,maximumFractionDigits:2}).format(Number(n)||0);
const safe=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const monthItems=()=>transactions.filter(x=>x.date.slice(0,7)===month);
function save(){localStorage.setItem(KEY,JSON.stringify({transactions,budget,currency,theme:document.documentElement.dataset.theme||"light"}));}
function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||"{}");if(Array.isArray(x.transactions))transactions=x.transactions;if(Number.isFinite(x.budget)&&x.budget>=0)budget=x.budget;if(["USD","KES","SSP","EUR","GBP"].includes(x.currency))currency=x.currency;if(x.theme==="dark")document.documentElement.dataset.theme="dark";}catch(e){console.warn("Could not load saved SpendWise data",e);}}
function render(){
const items=monthItems(),income=items.filter(x=>x.type==="income").reduce((a,x)=>a+x.amount,0),expenses=items.filter(x=>x.type==="expense").reduce((a,x)=>a+x.amount,0),balance=income-expenses,pct=budget?Math.min(100,expenses/budget*100):(expenses?100:0),remaining=budget-expenses;
$("#monthLabel").textContent=new Date(Number(month.slice(0,4)),Number(month.slice(5,7))-1,1).toLocaleDateString(undefined,{month:"long",year:"numeric"});
$("#totalIncome").textContent=money(income);$("#totalExpenses").textContent=money(expenses);$("#netBalance").textContent=money(balance);$("#balanceCard").classList.toggle("negative",balance<0);
$("#budgetAmount").textContent=money(budget);$("#budgetSpent").textContent=money(expenses);$("#budgetRemaining").textContent=money(Math.max(0,remaining))+" remaining";$("#budgetProgress").style.width=pct+"%";$("#budgetProgress").classList.toggle("over",expenses>budget);$("#budgetPercent").textContent=Math.round(pct)+"%";$("#budgetMessage").textContent=budget===0?"Set a monthly budget to track spending.":expenses>budget?"You are "+money(expenses-budget)+" over budget.":money(remaining)+" left in your monthly budget.";
$("#currencySelect").value=currency;$("#budgetInput").value=budget;$("#transactionCount").textContent=items.length+" transaction"+(items.length===1?"":"s");
const groups={};items.filter(x=>x.type==="expense").forEach(x=>groups[x.category]=(groups[x.category]||0)+x.amount);
const entries=Object.entries(groups).sort((a,b)=>b[1]-a[1]);
$("#categoryBreakdown").innerHTML=entries.length?entries.map(([n,v])=>'<div class="category-row"><div class="category-meta"><span>'+(icons[n]||"📌")+" "+safe(n)+'</span><strong>'+money(v)+'</strong></div><div class="mini-track"><span style="width:'+(expenses?v/expenses*100:0)+'%"></span></div></div>').join(""):'<p class="muted empty-inline">Your spending categories will appear here.</p>';
const shown=items.filter(x=>(filter==="all"||x.type===filter)&&(x.title+" "+x.category+" "+(x.note||"")).toLowerCase().includes(search.toLowerCase())).sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt);
$("#transactionList").innerHTML=shown.map(x=>'<article class="transaction-row"><div class="transaction-icon">'+(icons[x.category]||"📌")+'</div><div class="transaction-description"><strong>'+safe(x.title)+'</strong><span>'+safe(x.category)+' · '+new Date(x.date+"T12:00:00").toLocaleDateString()+'</span></div><strong class="transaction-amount '+x.type+'">'+(x.type==="income"?"+":"−")+money(x.amount)+'</strong><div class="transaction-actions"><button class="icon-button" data-edit="'+x.id+'" aria-label="Edit '+safe(x.title)+'">✎</button><button class="icon-button danger-text" data-delete="'+x.id+'" aria-label="Delete '+safe(x.title)+'">×</button></div></article>').join("");
$("#emptyState").hidden=shown.length!==0;
const days=new Date(Number(month.slice(0,4)),Number(month.slice(5,7)),0).getDate(),daily=Array.from({length:days},(_,i)=>items.filter(x=>x.type==="expense"&&Number(x.date.slice(8,10))===i+1).reduce((a,x)=>a+x.amount,0)),max=Math.max(1,...daily);
$("#spendingChart").innerHTML=daily.map((v,i)=>'<div class="chart-column" title="'+(i+1)+": "+money(v)+'"><span class="chart-bar" style="height:'+(v?Math.max(4,v/max*100):0)+'%"></span><small>'+(i%5===0||i===days-1?i+1:"&nbsp;")+'</small></div>').join("");
$("#chartEmpty").hidden=daily.some(v=>v>0);
}
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2400);}
function categories(type,selected){$("#transactionCategory").innerHTML=cats[type].map(c=>'<option value="'+c+'" '+(c===selected?"selected":"")+'>'+c+"</option>").join("");}
function openModal(item){editing=item?item.id:null;$("#transactionForm").reset();$("#modalTitle").textContent=item?"Edit transaction":"Add transaction";$("#transactionType").value=item?item.type:"expense";$("#transactionTitle").value=item?item.title:"";$("#transactionAmount").value=item?item.amount:"";$("#transactionDate").value=item?item.date:now.toISOString().slice(0,10);$("#transactionNote").value=item?(item.note||""):"";categories(item?item.type:"expense",item?item.category:null);$("#transactionModal").showModal();$("#transactionTitle").focus();}
function closeModal(){$("#transactionModal").close();editing=null;}
function csv(){const rows=monthItems();if(!rows.length){toast("No transactions to export.");return;}const text=[["Date","Type","Description","Category","Amount","Note"],...rows.map(x=>[x.date,x.type,x.title,x.category,x.amount,x.note||""])].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(",")).join("\n");const url=URL.createObjectURL(new Blob([text],{type:"text/csv"})),a=document.createElement("a");a.href=url;a.download="spendwise-"+month+".csv";a.click();URL.revokeObjectURL(url);}
load();$("#currentYear").textContent=now.getFullYear();
$("#addTransaction").onclick=()=>openModal(null);$("#addFirstTransaction").onclick=()=>openModal(null);$("#closeModal").onclick=closeModal;$("#cancelModal").onclick=closeModal;
$("#transactionType").onchange=e=>categories(e.target.value);
$("#transactionForm").onsubmit=e=>{e.preventDefault();const amount=Number($("#transactionAmount").value),title=$("#transactionTitle").value.trim();if(!title||!Number.isFinite(amount)||amount<=0)return;const old=transactions.find(x=>x.id===editing),item={id:old?old.id:(crypto.randomUUID?crypto.randomUUID():String(Date.now())),type:$("#transactionType").value,title,amount,category:$("#transactionCategory").value,date:$("#transactionDate").value,note:$("#transactionNote").value.trim(),createdAt:old?old.createdAt:Date.now()};if(old)transactions=transactions.map(x=>x.id===old.id?item:x);else transactions.push(item);save();closeModal();render();toast(old?"Transaction updated.":"Transaction added.");};
$("#transactionList").onclick=e=>{const edit=e.target.closest("[data-edit]"),del=e.target.closest("[data-delete]");if(edit){const item=transactions.find(x=>x.id===edit.dataset.edit);if(item)openModal(item);}if(del){const item=transactions.find(x=>x.id===del.dataset.delete);if(item&&confirm('Delete "'+item.title+'"?')){transactions=transactions.filter(x=>x.id!==item.id);save();render();toast("Transaction deleted.");}}};
$("#prevMonth").onclick=()=>{const d=new Date(Number(month.slice(0,4)),Number(month.slice(5,7))-2,1);month=key(d);render();};
$("#nextMonth").onclick=()=>{const d=new Date(Number(month.slice(0,4)),Number(month.slice(5,7)),1);month=key(d);render();};
$("#transactionSearch").oninput=e=>{search=e.target.value;render();};$("#transactionFilter").onchange=e=>{filter=e.target.value;render();};
$("#currencySelect").onchange=e=>{currency=e.target.value;save();render();};
$("#budgetForm").onsubmit=e=>{e.preventDefault();const v=Number($("#budgetInput").value);if(Number.isFinite(v)&&v>=0){budget=v;save();render();toast("Monthly budget saved.");}};
$("#exportCsv").onclick=csv;$("#themeToggle").onclick=()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==="dark"?"light":"dark";save();};
$("#clearMonth").onclick=()=>{const n=monthItems().length;if(n&&confirm("Delete all "+n+" transactions for "+month+"?")){transactions=transactions.filter(x=>x.date.slice(0,7)!==month);save();render();toast("Monthly transactions cleared.");}};
$$(".nav-link").forEach(a=>a.onclick=()=>{$$(".nav-link").forEach(x=>x.classList.remove("active"));a.classList.add("active");});
render();
})();