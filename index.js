import{a as q,S as L,i}from"./assets/vendor-D1LKfBqE.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const S="48848335-f5abf64d59c2aabc1155fb6ba",v="https://pixabay.com/api/";async function h(o,t=1,l=40){try{return(await q.get(v,{params:{key:S,q:o,Image_type:"photo",orientation:"horisontal",safesearch:!0,page:t,per_page:l}})).data}catch(s){console.error("Sorry, there are no images matching your search query. Please try again!",s)}}function m(o){return o.map(({webformatURL:t,largeImageURL:l,tags:s,likes:e,views:r,comments:c,downloads:w})=>`<div class="photo-card">
                    <a href="${l}" class="gallery-link">
                        <img src="${t}" alt="${s}" loading="lazy" />
                    </a>
                    <div class="info">
                        <p><strong>Likes:</strong> ${e}</p>
                        <p><strong>Views:</strong> ${r}</p>
                        <p><strong>Comments:</strong> ${c}</p>
                        <p><strong>Downloads:</strong> ${w}</p>
                    </div>
                </div>`).join("")}const f=document.querySelector("#search-form"),p=document.querySelector(".gallery"),n=document.querySelector(".load-more"),y=document.querySelector(".loader");let d="",a=1;const u=40;let g=0,b=new L(".gallery a");document.querySelector("button[type='submit']");n.style.display="none";y.style.display="none";f.addEventListener("submit",async o=>{if(o.preventDefault(),d=o.target.elements.searchQuery.value.trim(),!d){i.warning({title:"Warning",message:"Please enter a search query!",position:"topRight"});return}a=1,p.innerHTML="",n.style.display="none",y.style.display="block";try{const t=await h(d,a,u);if(g=t.totalHits||0,t.hits.length===0){i.info({title:"Info",message:"No results found. Try another search query!",position:"topRight"});return}p.innerHTML=m(t.hits),b.refresh(),f.reset(),a*u<g&&(n.style.display="block")}catch{i.error({title:"Error",message:"Something went wrong! Please try again.",position:"topRight"})}finally{y.style.display="none"}});n.addEventListener("click",async()=>{a++,n.style.display="none",y.style.display="block";try{const o=await h(d,a,u);if(o.hits.length===0){i.info({title:"Info",message:"No results found. Try another search query!",position:"topRight"});return}p.insertAdjacentHTML("beforeend",m(o.hits)),b.refresh();const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*3,behavior:"smooth"}),a*u>=g?(i.info({title:"End or collection",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),n.style.display="none"):n.style.display="block"}catch{i.error({title:"Error",message:"Something went wrong! Please try again.",position:"topRight"})}finally{y.style.display="none"}});
//# sourceMappingURL=index.js.map
