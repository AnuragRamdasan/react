"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("react"),t=require("@shopify/polaris");class Z{constructor({appId:a,apiKey:m,customerApiToken:i,apiUrl:l="https://appapi.heymantle.com/v1"}){if(!a)throw new Error("MantleClient appId is required");if(typeof window<"u"&&m)throw new Error("MantleClient apiKey should never be used in the browser");if(!m&&!i)throw new Error("MantleClient one of apiKey or customerApiToken is required");this.appId=a,this.apiKey=m,this.customerApiToken=i,this.apiUrl=l}async mantleRequest({path:a,method:m="GET",body:i}){try{return await(await fetch(`${this.apiUrl}${a.startsWith("/")?"":"/"}${a}`,{method:m,headers:{"Content-Type":"application/json",Accept:"application/json","X-Mantle-App-Id":this.appId,...this.apiKey?{"X-Mantle-App-Api-Key":this.apiKey}:{},...this.customerApiToken?{"X-Mantle-Customer-Api-Token":this.customerApiToken}:{}},...i&&{body:JSON.stringify(i)}})).json()}catch(l){throw console.error(`[mantleRequest] ${a} error: ${l.message}`),l}}async identify({platformId:a,myshopifyDomain:m,platform:i="shopify",accessToken:l,name:s,email:k,customFields:p}){return await this.mantleRequest({path:"identify",method:"POST",body:{platformId:a,myshopifyDomain:m,platform:i,accessToken:l,name:s,email:k,customFields:p}})}async getCustomer(){return(await this.mantleRequest({path:"customer"})).customer}async subscribe({planId:a,planIds:m,discountId:i,returnUrl:l,billingProvider:s}){return await this.mantleRequest({path:"subscriptions",method:"POST",body:{planId:a,planIds:m,discountId:i,returnUrl:l,billingProvider:s}})}async cancelSubscription({cancelReason:a}={}){return await this.mantleRequest({path:"subscriptions",method:"DELETE",...a&&{body:{cancelReason:a}}})}async updateSubscription({id:a,cappedAmount:m}){return await this.mantleRequest({path:"subscriptions",method:"PUT",body:{id:a,cappedAmount:m}})}async sendUsageEvent({eventId:a,eventName:m,customerId:i,properties:l={}}){return await this.mantleRequest({path:"usage_events",method:"POST",body:{eventId:a,eventName:m,...i?{customerId:i}:{},properties:l}})}async sendUsageEvents({events:a}){return await this.mantleRequest({path:"usage_events",method:"POST",body:{events:a}})}}var J={MantleClient:Z};const O=e.createContext(),K=({feature:n,count:a=0})=>(n==null?void 0:n.type)==="boolean"?n.value:(n==null?void 0:n.type)==="limit"?a<n.value||n.value===-1:!1,Q=({appId:n,customerApiToken:a,apiUrl:m="https://appapi.heymantle.com/v1",children:i})=>{const l=new J.MantleClient({appId:n,customerApiToken:a,apiUrl:m}),[s,k]=e.useState(null),[p,f]=e.useState(!0),[A,B]=e.useState(null),Y=async()=>{try{f(!0);const b=await l.getCustomer();k(b)}catch(b){B(b)}finally{f(!1)}},C=async b=>{await l.sendUsageEvent(b)},D=async({planId:b,planIds:L,discountId:g,billingProvider:x,returnUrl:M})=>await l.subscribe({planId:b,planIds:L,discountId:g,billingProvider:x,returnUrl:M}),P=async()=>await l.cancelSubscription();e.useEffect(()=>{a&&Y()},[a]);const S=(s==null?void 0:s.plans)||[],v=s==null?void 0:s.subscription,T=v==null?void 0:v.plan;return e.createElement(O.Provider,{value:{customer:s,subscription:v,plans:S,loading:p,error:A,client:l,sendUsageEvent:C,subscribe:D,cancelSubscription:P,isFeatureEnabled:({featureKey:b,count:L=0})=>s!=null&&s.features[b]?K({feature:s.features[b],count:L}):!1,limitForFeature:({featureKey:b})=>s!=null&&s.features[b]&&T.features[b].type==="limit"?s.features[b].value:-1,refetch:async()=>{await Y()}}},i)},ee=()=>{const n=e.useContext(O);if(n===void 0)throw new Error("useMantle must be used within a MantleProvider");return n},$=n=>n.type==="boolean"&&n.value==!0||n.type==="limit"&&n.value!==0,te=(n,a)=>$(a)-$(n)||n.name.localeCompare(a.name),ne=(n="USD")=>new Intl.NumberFormat("en-US",{style:"currency",currency:n,notation:"standard"}),_=(n,a="USD",m=!0)=>{let i=ne(a).format(n);return m&&(i=i.replace(/\.00$/,"")),i},d={ANNUAL:"ANNUAL",EVERY_30_DAYS:"EVERY_30_DAYS"},u={Back:"Back",CurrentPlan:"Current plan",CustomPlans:"Custom plans",CustomPlansDescription:"Plans tailored to your specific needs",FreeTrialLength:"{{ trialDays }}-day free trial",Features:"Features",Month:"month",MonthShort:"mo",Monthly:"Monthly",Year:"year",YearShort:"yr",Yearly:"Yearly",MostPopular:"Most popular",Per:"/",Plans:"Plans",SelectPlan:"Select plan",SubscribeSuccessTitle:"Subscription successful",SubscribeSuccessBody:"Thanks for subscribing to our app!"},H=(n=d.EVERY_30_DAYS)=>{switch(n){case d.ANNUAL:return"year";case d.EVERY_30_DAYS:default:return"month"}},W=(n=d.EVERY_30_DAYS)=>{switch(n){case d.ANNUAL:return"yr";case d.EVERY_30_DAYS:default:return"mo"}},R=({interval:n=d.EVERY_30_DAYS,useShortFormPlanIntervals:a=!0})=>a?W(n):H(n);var F=function(a){return e.createElement("svg",Object.assign({viewBox:"0 0 20 20"},a),e.createElement("path",{fillRule:"evenodd",d:"M15.78 5.97a.75.75 0 0 1 0 1.06l-6.5 6.5a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 1 1 1.06-1.06l2.72 2.72 5.97-5.97a.75.75 0 0 1 1.06 0Z"}))};F.displayName="CheckIcon";var V=function(a){return e.createElement("svg",Object.assign({viewBox:"0 0 20 20"},a),e.createElement("path",{d:"M10.75 6.75a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"}))};V.displayName="PlusIcon";const X=({plan:n,isRecommendedPlan:a=!1})=>e.createElement(t.BlockStack,null,e.createElement(t.InlineStack,{align:"space-between",gap:"100"},e.createElement(t.Text,{variant:"bodyLg"},n.name),a&&e.createElement(t.Badge,{tone:"success"},u.MostPopular)),n.description&&e.createElement(t.Text,{tone:"subdued"},n.description)),z=({plan:n,discount:a,useShortFormPlanIntervals:m=!0})=>e.createElement(t.BlockStack,{gap:"100"},!!a&&e.createElement(t.InlineStack,{blockAlign:"center",gap:"200"},e.createElement(t.Text,{variant:"headingXl"},_(a.discountedAmount,n.currency)),e.createElement(t.Text,{variant:"headingXl",tone:"subdued",fontWeight:"medium",textDecorationLine:"line-through"},n.amount),e.createElement(t.Text,{variant:"bodyLg",tone:"subdued"},u.Per," ",R({interval:n.interval,useShortFormPlanIntervals:m}))),!a&&e.createElement(t.InlineStack,{blockAlign:"center",gap:"200"},e.createElement(t.Text,{alignment:"center",variant:"headingXl"},_(n.amount,n.currency)),e.createElement(t.Text,{alignment:"center",variant:"bodyLg",tone:"subdued"},u.Per," ",R({interval:n.interval,useShortFormPlanIntervals:m}))),n.usageCharges&&n.usageCharges.length>0&&e.createElement(t.BlockStack,null,n.usageCharges.map((i,l)=>e.createElement(t.InlineStack,{key:`plan-usageCharge-${l}`,align:"start",gap:"100"},e.createElement(t.Box,null,e.createElement(t.Icon,{source:V,tone:"positive"})),e.createElement(t.Text,{variant:"bodyLg"},i.terms))))),j=({plan:n,trialDaysAsFeature:a=!1})=>e.createElement(t.BlockStack,{gap:"100"},a&&n.trialDays&&n.trialDays>0?e.createElement(t.InlineStack,{align:"start",gap:"100"},e.createElement(t.Box,null,e.createElement(t.Icon,{source:F,tone:"positive"})),e.createElement(t.Text,{tone:"subdued"},u.FreeTrialLength.replace("{{ trialDays }}",n.trialDays))):null,n.featuresOrder.map((m,i)=>{const l=n.features[m];if(l.type!=="boolean"||l.value===!0)return e.createElement(t.InlineStack,{key:`plan-feature-${i}`,align:"start",gap:"100"},e.createElement(t.Box,null,e.createElement(t.Icon,{source:F,tone:"positive"})),l.type==="boolean"?e.createElement(t.Text,{tone:"subdued"},l.name):e.createElement(t.Text,{tone:"subdued"},l.value," ",l.name))})),G=({plan:n,discount:a,buttonLabel:m,onSelectPlan:i,useShortFormPlanIntervals:l=!0,trialDaysAsFeature:s=!1,isRecommendedPlan:k=!1,isActivePlan:p=!1})=>e.createElement(t.Card,null,e.createElement(t.BlockStack,{gap:"400"},e.createElement(X,{plan:n,isRecommendedPlan:k}),e.createElement(z,{plan:n,discount:a,useShortFormPlanIntervals:l}),e.createElement(t.Button,{size:"large",variant:k?"primary":"secondary",onClick:()=>{i(n)},disabled:p},p?u.CurrentPlan:m||u.SelectPlan),e.createElement(j,{plan:n,trialDaysAsFeature:s}))),ae=({customer:n,plans:a,onSubscribe:m,backUrl:i="",showRecommendedBadge:l=!0,customFieldCta:s,customFieldPlanRecommended:k="Recommended",showPlanIntervalToggle:p=!0,showTrialDaysAsFeature:f=!0,useShortFormPlanIntervals:A,pageWidth:B="default",showCustomPlans:Y=!0})=>{const C=n==null?void 0:n.subscription,D=new URLSearchParams(window.location.search),P=a.some(o=>o.interval===d.ANNUAL)&&a.some(o=>o.interval===d.EVERY_30_DAYS),S=a.find(o=>o.id===(C==null?void 0:C.plan.id)),[v,T]=e.useState(S?S.interval:P?d.ANNUAL:d.EVERY_30_DAYS),b=a.filter(o=>o.availability!=="customerTag"&&o.availability!=="customer"),L=p&&P?b.filter(o=>o.interval===v):b,g=Y?a.filter(o=>o.availability==="customerTag"||o.availability==="customer"):[],[x,M]=e.useState(D.get("subscribed")==="true"),N=(o=L.length)=>o%4===0?{xs:6,sm:6,md:2,lg:3,xl:3}:o%3===0?{xs:6,sm:6,md:2,lg:4,xl:4}:o%2===0?{xs:6,sm:6,md:3,lg:6,xl:6}:o===1?{xs:6,sm:6,md:6,lg:12,xl:12}:{xs:6,sm:6,md:2,lg:4,xl:4};return e.createElement(t.Page,{title:u.Plans,backAction:i?{content:u.Back,url:i}:void 0,secondaryActions:p&&P?e.createElement(t.ButtonGroup,{variant:"segmented"},e.createElement(t.Button,{pressed:v===d.EVERY_30_DAYS,onClick:()=>T(d.EVERY_30_DAYS)},u.Monthly),e.createElement(t.Button,{pressed:v===d.ANNUAL,onClick:()=>T(d.ANNUAL)},u.Yearly)):void 0,fullWidth:B==="full",narrowWidth:B==="narrow"},e.createElement(t.Layout,null,e.createElement(t.Layout.Section,null,e.createElement(t.BlockStack,{gap:"1000"},x&&e.createElement(t.Banner,{tone:"success",title:u.SubscribeSuccessTitle,onDismiss:()=>{M(!1),window.history.replaceState({},document.title,window.location.pathname)}},u.SubscribeSuccessBody),e.createElement(t.Grid,null,L.map((o,I)=>{var h;const c=((h=o.discounts)==null?void 0:h.length)>0?o.discounts.reduce((E,y)=>E.discountedAmount<y.discountedAmount?E:y):null,r=s&&o.customFields?o.customFields[s]:void 0;return e.createElement(t.Grid.Cell,{key:`plan-${I}`,columnSpan:N()},e.createElement(G,{plan:o,discount:c,onSelectPlan:E=>{m(E)},isActivePlan:(S==null?void 0:S.id)===o.id,useShortFormPlanIntervals:A,isRecommendedPlan:l&&o.customFields&&o.customFields[k],trialDaysAsFeature:f,buttonLabel:r}))})),(g==null?void 0:g.length)>0&&e.createElement(t.Divider,{borderColor:"border"}),(g==null?void 0:g.length)>0&&e.createElement(t.BlockStack,{gap:"300"},e.createElement(t.Box,{paddingInline:{xs:400,sm:0}},e.createElement(t.Text,{variant:"headingMd"},u.CustomPlans)),e.createElement(t.Grid,null,g.map((o,I)=>{var h;const c=((h=o.discounts)==null?void 0:h.length)>0?o.discounts.reduce((E,y)=>E.discountedAmount<y.discountedAmount?E:y):null,r=s&&o.customFields?o.customFields[s]:void 0;return e.createElement(t.Grid.Cell,{key:`custom-plan-${I}`,columnSpan:N()},e.createElement(G,{plan:o,discount:c,onSelectPlan:E=>{m(E)},isActivePlan:(S==null?void 0:S.id)===o.id,useShortFormPlanIntervals:A,isRecommendedPlan:l&&o.customFields&&o.customFields[k],trialDaysAsFeature:f,buttonLabel:r}))})))))))},re=({plan:n})=>e.createElement(t.BlockStack,{gap:"100"},e.createElement(t.Text,{variant:"headingMd",alignment:"center"},n.name),n.description&&e.createElement(t.Text,{variant:"bodyLg",tone:"subdued",alignment:"center"},n.description)),le=({plan:n,discount:a,useShortFormPlanIntervals:m=!0})=>e.createElement(t.BlockStack,{gap:"100"},!!a&&e.createElement(t.InlineStack,{align:"center",blockAlign:"center",gap:"200"},e.createElement(t.Text,{variant:"heading3xl"},_(discountedAmount,n.currency,!0)),e.createElement(t.Text,{variant:"heading3xl",tone:"subdued",fontWeight:"medium",textDecorationLine:"line-through"},_(n.amount,n.currency,!0)),e.createElement(t.Text,{variant:"bodyLg",tone:"subdued"},u.Per," ",R({interval:n.interval,useShortFormPlanIntervals:m}))),!a&&e.createElement(t.InlineStack,{align:"center",blockAlign:"center",gap:"200"},e.createElement(t.Text,{alignment:"center",variant:"heading3xl"},_(n.amount,n.currency,!0)),e.createElement(t.Text,{alignment:"center",variant:"bodyLg",tone:"subdued"},u.Per," ",R({interval:n.interval,useShortFormPlanIntervals:m}))),n.usageCharges.length>0&&e.createElement(t.BlockStack,null,n.usageCharges.map((i,l)=>e.createElement(t.InlineStack,{key:`plan-usageCharge-${l}`,align:"center",gap:"100"},e.createElement(t.Box,null,e.createElement(t.Icon,{source:V,tone:"positive"})),e.createElement(t.Text,{variant:"bodyLg"},i.terms))))),ce=({plan:n,trialDaysAsFeature:a=!1})=>e.createElement(t.BlockStack,{gap:"300"},a&&n.trialDays&&n.trialDays>0?e.createElement(t.InlineStack,{align:"center",blockAlign:"center",gap:"100"},e.createElement(t.Box,null,e.createElement(t.Icon,{source:F,tone:"positive"})),e.createElement(t.Text,{tone:"subdued"},u.FreeTrialLength.replace("{{ trialDays }}",n.trialDays))):null,n.featuresOrder.map((m,i)=>{const l=n.features[m];if(l.type!=="boolean"||l.value===!0)return e.createElement(t.InlineStack,{key:`plan-feature-${i}`,align:"center",gap:"100"},e.createElement(t.Box,null,e.createElement(t.Icon,{source:F,tone:"positive"})),l.type==="boolean"?e.createElement(t.Text,{tone:"subdued"},l.name):e.createElement(t.Text,{tone:"subdued"},l.value," ",l.name))})),q=({plan:n,discount:a,buttonLabel:m,onSelectPlan:i,useShortFormPlanIntervals:l=!0,trialDaysAsFeature:s=!1,expanded:k=!1,isActivePlan:p=!1,isRecommendedPlan:f=!1,isCustomPlan:A=!1,showRecommendedPlanBadge:B=!1})=>e.createElement(t.Box,{position:"relative",minHeight:"100%"},e.createElement(t.Box,{paddingBlock:k||f?void 0:"800",minHeight:"100%"},e.createElement(t.Box,{background:f||A?"bg-surface":"bg-surface-secondary",borderStyle:"solid",borderColor:"border",borderWidth:"025",paddingBlock:k||f?"1600":"800",paddingInline:"400",borderRadius:"200",minHeight:"calc(100% - calc(var(--p-space-800) * 2))"},e.createElement(t.BlockStack,{gap:"800"},e.createElement(t.BlockStack,{gap:"400"},e.createElement(re,{plan:n}),e.createElement(le,{plan:n,discount:a,useShortFormPlanIntervals:l})),e.createElement(t.Button,{size:"large",variant:f?"primary":"secondary",onClick:()=>i(n),disabled:p},m||u.SelectPlan),e.createElement(ce,{plan:n,trialDaysAsFeature:s}),f&&B&&e.createElement(t.InlineStack,{align:"center",gap:"100"},e.createElement(t.Badge,{tone:"success"},u.MostPopular)))))),se=({customer:n,plans:a,onSubscribe:m,backUrl:i="",showRecommendedBadge:l=!0,customFieldCta:s=null,customFieldPlanRecommended:k="Recommended",addSpacingToNonRecommendedPlans:p=!0,showPlanIntervalToggle:f=!0,showTrialDaysAsFeature:A=!0,useShortFormPlanIntervals:B=!0,pageWidth:Y="default",showCustomPlans:C=!0})=>{const D=n==null?void 0:n.subscription,P=new URLSearchParams(window.location.search),S=a.some(c=>c.interval===d.ANNUAL)&&a.some(c=>c.interval===d.EVERY_30_DAYS),v=a.find(c=>c.id===(D==null?void 0:D.plan.id)),[T,b]=e.useState(v?v.interval:S?d.ANNUAL:d.EVERY_30_DAYS),L=a.filter(c=>c.availability!=="customerTag"&&c.availability!=="customer"),g=f&&S?L.filter(c=>c.interval===T):L,x=C?a.filter(c=>c.availability==="customerTag"||c.availability==="customer"):[],[M,N]=e.useState(P.get("subscribed")==="true"),o=(c=g.length)=>c%4===0?{xs:6,sm:6,md:2,lg:3,xl:3}:c%3===0?{xs:6,sm:6,md:2,lg:4,xl:4}:c%2===0?{xs:6,sm:6,md:3,lg:6,xl:6}:c===1?{xs:6,sm:6,md:6,lg:12,xl:12}:{xs:6,sm:6,md:2,lg:4,xl:4},I=()=>g.length%4===0?4:g.length%3===0?3:g.length%2===0?2:g.length===1?1:4;return e.createElement(t.Page,{title:u.Plans,backAction:i&&i!==""?{content:u.Back,url:i}:void 0,secondaryActions:f&&S?e.createElement(t.ButtonGroup,{variant:"segmented"},e.createElement(t.Button,{pressed:T===d.EVERY_30_DAYS,onClick:()=>b(d.EVERY_30_DAYS)},u.Monthly),e.createElement(t.Button,{pressed:T===d.ANNUAL,onClick:()=>b(d.ANNUAL)},u.Yearly)):void 0,fullWidth:Y==="full",narrowWidth:Y==="narrow"},e.createElement(t.Box,{paddingBlockEnd:"800"},e.createElement(t.Layout,null,e.createElement(t.Layout.Section,null,e.createElement(t.BlockStack,{gap:"1000"},M&&e.createElement(t.Banner,{tone:"success",title:u.SubscribeSuccessTitle,onDismiss:()=>{N(!1),window.history.replaceState({},document.title,window.location.pathname)}},u.SubscribeSuccessBody),e.createElement(t.Grid,{columns:I()},g.map((c,r)=>{var y;const h=c.customFields&&c.customFields[k],E=s&&c.customFields[s];return e.createElement(t.Grid.Cell,{key:`plan-${r}`,columnSpan:o()},e.createElement(q,{plan:c,discount:((y=c.discounts)==null?void 0:y.length)>0?c.discounts[0]:null,buttonLabel:E?c.customFields[s]:void 0,onSelectPlan:m,useShortFormPlanIntervals:B,trialDaysAsFeature:A,expanded:p||h,isActivePlan:(v==null?void 0:v.id)===c.id,isRecommendedPlan:h,showRecommendedPlanBadge:l}))})),(x==null?void 0:x.length)>0&&e.createElement(t.Divider,{borderColor:"border"}),(x==null?void 0:x.length)>0&&e.createElement(t.BlockStack,{gap:"300"},e.createElement(t.Box,{paddingInline:{xs:400,sm:0}},e.createElement(t.Text,{variant:"headingMd"},u.CustomPlans)),e.createElement(t.Grid,null,x.map((c,r)=>{var y;const h=c.customFields&&c.customFields[k],E=s&&c.customFields[s];return e.createElement(t.Grid.Cell,{key:`custom-plan-${r}`,columnSpan:o(x.length)},e.createElement(q,{plan:c,discount:((y=c.discounts)==null?void 0:y.length)>0?c.discounts[0]:null,buttonLabel:E?c.customFields[s]:void 0,onSelectPlan:m,useShortFormPlanIntervals:B,trialDaysAsFeature:A,expanded:p||h,isActivePlan:(v==null?void 0:v.id)===c.id,isRecommendedPlan:h,showRecommendedPlanBadge:l,isCustomPlan:!0}))}))))))))},oe=({customer:n,plans:a,onSubscribe:m,backUrl:i="",showRecommendedBadge:l=!0,customFieldCta:s=null,customFieldPlanRecommended:k="Recommended",showPlanIntervalToggle:p=!1,showTrialDaysAsFeature:f=!0,useShortFormPlanIntervals:A=!0,pageWidth:B="default",showCustomPlans:Y=!0})=>{const C=n==null?void 0:n.subscription,D=new URLSearchParams(window.location.search),P=a.some(r=>r.interval===d.ANNUAL)&&a.some(r=>r.interval===d.EVERY_30_DAYS),S=a.find(r=>r.id===(C==null?void 0:C.plan.id)),[v,T]=e.useState(S?S.interval:P?d.ANNUAL:d.EVERY_30_DAYS),b=a.filter(r=>r.availability!=="customerTag"&&r.availability!=="customer"),L=p&&P?b.filter(r=>r.interval===v):b,g=Y?a.filter(r=>r.availability==="customerTag"||r.availability==="customer"):[],[x,M]=e.useState(D.get("subscribed")==="true"),N=({plan:r,discount:h})=>e.createElement(t.BlockStack,null,e.createElement(t.Text,{variant:"bodyLg"},r.name),r.description&&e.createElement(t.Text,{tone:"subdued"},r.description)),o=({plan:r,discount:h})=>e.createElement(t.BlockStack,{gap:"200"},e.createElement(t.Text,{fontWeight:"medium"},u.Features),e.createElement(t.BlockStack,{gap:"100"},f&&r.trialDays!==0&&e.createElement(t.InlineStack,{align:"start",gap:"100"},e.createElement(t.Box,null,e.createElement(t.Icon,{source:F,tone:"positive"})),e.createElement(t.Text,{tone:"subdued"},u.FreeTrialLength.replace("{{ trialDays }}",r.trialDays))),r.featuresOrder.map((E,y)=>{const w=r.features[E];if(w.type!=="boolean"||w.value===!0)return e.createElement(t.InlineStack,{key:`plan-feature-${y}`,align:"start",gap:"100"},e.createElement(t.Box,null,e.createElement(t.Icon,{source:F,tone:"positive"})),w.type==="boolean"?e.createElement(t.Text,{tone:"subdued"},w.name):e.createElement(t.Text,{tone:"subdued"},w.value," ",w.name))}))),I=({plan:r,discount:h})=>e.createElement(t.BlockStack,{gap:"100"},h?e.createElement(t.InlineStack,{blockAlign:"center",gap:"200"},e.createElement(t.Text,{variant:"headingXl"},_(h.discountedAmount,r.currency)),e.createElement(t.Text,{variant:"headingXl",tone:"subdued",fontWeight:"medium",textDecorationLine:"line-through"},r.amount),e.createElement(t.Text,{variant:"bodyLg",tone:"subdued"},u.Per," ",R({interval:r.interval,useShortFormPlanIntervals:A}))):e.createElement(t.InlineStack,{blockAlign:"center",gap:"200"},e.createElement(t.Text,{alignment:"center",variant:"headingXl"},_(r.amount,r.currency)),e.createElement(t.Text,{alignment:"center",variant:"bodyLg",tone:"subdued"},u.Per," ",R({interval:r.interval,useShortFormPlanIntervals:A}))),r.usageCharges.length>0&&e.createElement(t.BlockStack,null,r.usageCharges.map((E,y)=>e.createElement(t.InlineStack,{key:`plan-usageCharge-${y}`,align:"start",gap:"100"},e.createElement(t.Box,null,e.createElement(t.Icon,{source:V,tone:"positive"})),e.createElement(t.Text,{variant:"bodyLg"},E.terms))))),c=({plan:r,discount:h})=>{const E=s&&r.customFields[s],y=r.customFields&&r.customFields[k];return e.createElement(t.InlineStack,{blockAlign:"center",gap:"400"},e.createElement(t.Button,{size:"large",variant:y?"primary":"secondary",onClick:()=>m({planId:r.id,discountId:h==null?void 0:h.id}),disabled:(S==null?void 0:S.id)===r.id},(S==null?void 0:S.id)===r.id?u.CurrentPlan:E?r.customFields[s]:u.SelectPlan),y&&l&&e.createElement(t.Box,null,e.createElement(t.Badge,{tone:"success"},u.MostPopular)))};return e.createElement(t.Page,{title:u.Plans,backAction:i!==""?{content:u.Back,url:i}:void 0,secondaryActions:p&&P?e.createElement(t.ButtonGroup,{variant:"segmented"},e.createElement(t.Button,{pressed:v===d.EVERY_30_DAYS,onClick:()=>T(d.EVERY_30_DAYS)},u.Monthly),e.createElement(t.Button,{pressed:v===d.ANNUAL,onClick:()=>T(d.ANNUAL)},u.Year)):void 0,fullWidth:B==="full",narrowWidth:B==="narrow"},e.createElement(t.Layout,null,e.createElement(t.Layout.Section,null,e.createElement(t.BlockStack,{gap:"400"},x&&e.createElement(t.Banner,{tone:"success",title:u.SubscribeSuccessTitle,onDismiss:()=>{M(!1),window.history.replaceState({},document.title,window.location.pathname)}},u.SubscribeSuccessBody),L.map((r,h)=>{var y;const E=((y=r.discounts)==null?void 0:y.length)>0?r.discounts.reduce((w,U)=>w.discountedAmount<U.discountedAmount?w:U):null;return e.createElement(t.Card,{key:`plan-${h}`},e.createElement(t.Grid,null,e.createElement(t.Grid.Cell,{columnSpan:{xs:6,sm:6,md:3,lg:6,xl:12}},e.createElement(t.BlockStack,{gap:"400"},e.createElement(t.BlockStack,{gap:"200"},N({plan:r,discount:E}),I({plan:r,discount:E})),e.createElement(t.Box,null,c({plan:r,discount:E})))),e.createElement(t.Grid.Cell,{columnSpan:{xs:6,sm:6,md:3,lg:6,xl:12}},o({plan:r,discount:E}))))}),(g==null?void 0:g.length)>0&&e.createElement(t.Divider,{borderColor:"border"}),(g==null?void 0:g.length)>0&&e.createElement(t.BlockStack,{gap:"300"},e.createElement(t.Box,{paddingInline:{xs:400,sm:0}},e.createElement(t.Text,{variant:"headingMd"},u.CustomPlans)),e.createElement(t.Grid,null,g.map((r,h)=>{var y;const E=((y=r.discounts)==null?void 0:y.length)>0?r.discounts.reduce((w,U)=>w.discountedAmount<U.discountedAmount?w:U):null;return e.createElement(t.Grid.Cell,{key:`custom-plan-${h}`,columnSpan:columnSpan()},e.createElement(t.Card,null,e.createElement(t.BlockStack,{gap:"400"},N({plan:r,discount:E}),I({plan:r,discount:E}),c({plan:r,discount:E}),o({plan:r,discount:E}))))})))))))};exports.HighlightedPlanCards=se;exports.HorizontalPlanCard=G;exports.HorizontalPlanCards=ae;exports.Labels=u;exports.MantleProvider=Q;exports.PlanFeaturesSection=j;exports.PlanInterval=d;exports.PlanPricingSection=z;exports.PlanTitleSection=X;exports.VerticalPlanCards=oe;exports.featureEnabled=$;exports.featureSort=te;exports.intervalLabel=R;exports.intervalLabelLong=H;exports.intervalLabelShort=W;exports.money=_;exports.useMantle=ee;
