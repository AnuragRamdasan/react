(function(o,r){typeof exports=="object"&&typeof module<"u"?r(exports,require("react")):typeof define=="function"&&define.amd?define(["exports","react"],r):(o=typeof globalThis<"u"?globalThis:o||self,r(o["@mantle/surface"]={},o.React))})(this,function(o,r){"use strict";class c{constructor({appId:n,customerApiToken:i,apiUrl:a="https://appapi.heymantle.com/v1"}){this.appId=n,this.customerApiToken=i,this.apiUrl=a}async mantleRequest({resource:n,method:i="GET",body:a}){return await(await fetch(`${this.apiUrl}/${n}`,{method:i,headers:{"Content-Type":"application/json",Accept:"application/json","X-Mantle-App-Id":this.appId,"X-Mantle-Customer-Api-Token":this.customerApiToken},...a&&{body:JSON.stringify(a)}})).json()}async getCustomer(){return(await this.mantleRequest({resource:"customer"})).customer}async subscribe({planId:n,returnUrl:i}){return await this.mantleRequest({resource:"subscriptions",method:"POST",body:{planId:n,returnUrl:i}})}async cancelSubscription(){return await this.mantleRequest({resource:"subscriptions",method:"DELETE"})}async updateSubscription({id:n,cappedAmount:i}){return await this.mantleRequest({resource:"subscriptions",method:"PUT",body:{id:n,cappedAmount:i}})}async sendUsageEvent({eventId:n,eventName:i,properties:a={}}){return await this.mantleRequest({resource:"usage_events",method:"POST",body:{event_id:n,event_name:i,properties:a}})}}const p=r.createContext(),y=({feature:t,count:n=0})=>(t==null?void 0:t.type)==="boolean"?t.value:(t==null?void 0:t.type)==="limit"?n<t.value||t.value===-1:!1,f=({appId:t,customerApiToken:n,apiUrl:i="https://appapi.heymantle.com/v1",children:a})=>{const l=new c({appId:t,customerApiToken:n,apiUrl:i}),[e,b]=r.useState(null),[C,d]=r.useState(!0),[w,M]=r.useState(null),T=async()=>{try{d(!0);const s=await l.getCustomer();b(s)}catch(s){M(s)}finally{d(!1)}};r.useEffect(()=>{T()},[]);const m=(e==null?void 0:e.plans)||[],u=e==null?void 0:e.subscription,h=(u==null?void 0:u.plan)||m.find(s=>s.amount===0&&s.public);return r.createElement(p.Provider,{value:{customer:e,subscription:u,currentPlan:h,plans:m,loading:C,error:w,client:l,isFeatureEnabled:({featureKey:s,count:E=0})=>e!=null&&e.features[s]?y(e.features[s]):!1,limitForFeature:({featureKey:s})=>e!=null&&e.features[s]&&h.features[s].type==="limit"?e.features[s].value:-1,refetch:async()=>{await fetchCurrentCustomer()}}},a)},v=()=>{const t=r.useContext(p);if(t===void 0)throw new Error("useMantle must be used within a MantleProvider");return t};module.exports={},o.MantleClient=c,o.MantleProvider=f,o.useMantle=v,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
