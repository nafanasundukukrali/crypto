"use strict";(self.webpackChunkcrypto=self.webpackChunkcrypto||[]).push([[179],{8183:function(e,t,n){var r,a=n(7294),c=n(745),i="/",s="/Card/:id",l="/Search",u=n(5861),o=n(4687),d=n.n(o),m=function(e){var t=e.image,n=e.title,r=e.subtitle,c=e.content,i=e.onClick,s=e.refEndFunction;return a.createElement("div",{ref:s,onClick:i,className:"t3s26QVSgcFUkHVBkvzg"},a.createElement("img",{src:t,alt:"",className:"Ckkdf72tAtT70cgrVOSC"}),a.createElement("title",{className:"qd6yvPCVIllmofRExp1H"},n),a.createElement("span",{className:"RCAYMC7D6MTAbelNiixE"},r),a.createElement("div",{className:"cWcHgEr72D10hRGFoIMS"},c))},_=n(4184),h=n.n(_);!function(e){e.s="s",e.m="m",e.l="l"}(r||(r={}));var p,f=function(e){var t=e.loading,n=void 0===t||t,c=e.size,i=void 0===c?r.m:c,s=e.className;return n?a.createElement("div",{className:h()("loader_size-".concat(i),s,"loader_position")},a.createElement("svg",{className:"loader__svg_animation",version:"1.1",baseProfile:"full",width:"100%",height:"100%",xmlns:"http://www.w3.org/2000/svg"},a.createElement("g",{fill:"none",strokeWidth:"3"},a.createElement("circle",{cx:"50%",cy:"50%",r:"40%",stroke:"#6C757D",strokeDasharray:"360 20",strokeDashoffset:"360"})))):null},y=n(2982),k=n(885),g=n(9669),v=n.n(g),C=n(8765),b=function(e){var t=e.id,n=e.timing,r=e.currency,c=(0,a.useRef)(),i=(0,a.useState)(!0),s=(0,k.Z)(i,2),l=s[0],o=s[1],m=(0,a.useState)([]),_=(0,k.Z)(m,2),h=_[0],p=_[1],g=(0,a.useState)(!1),b=(0,k.Z)(g,2),E=b[0],M=b[1],N=(0,a.useState)(),D=(0,k.Z)(N,2),L=(D[0],D[1],(0,a.useCallback)((0,u.Z)(d().mark((function e(){var a,c,i,s,l;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=function(e){var t=[];if(1===n){var r=new Date;r.setTime(Date.now()+72e5);for(var a=0;a<=12;a++)t.push({value:e[a][1],time:Math.round((r.getTime()+5*a*60*1e3)/1e3)})}else e.forEach((function(e){return t.push({time:Math.round(e[0]/1e3),value:e[2]})}));return t},c="",!(n<24)){e.next=6;break}c="https://api.coingecko.com/api/v3/coins/".concat(t,"/market_chart?vs_currency=").concat(r,"&days=1"),e.next=12;break;case 6:if(!(n>=24)){e.next=10;break}c="https://api.coingecko.com/api/v3/coins/".concat(t,"/ohlc?vs_currency=").concat(r,"&days=").concat(n/24),e.next=12;break;case 10:return M(!0),e.abrupt("return");case 12:return o(!0),e.next=15,v().get(c);case 15:i=e.sent;try{s=i.status,l=i.data,200!==s||0===Object.keys(l).length?(M(!0),o(!1)):p((0,y.Z)(a(n<24?l.prices:l)))}catch(e){M(!0)}o(!1);case 18:case"end":return e.stop()}}),e)}))),[r,t,n]));return(0,a.useEffect)((function(){L().catch((function(){}))}),[r,L,t,n]),(0,a.useEffect)((function(){if(h.length&&c.current){var e=(0,C.C2)(c.current,{grid:{vertLines:{visible:!1},horzLines:{visible:!1}}});n<=24&&e.applyOptions({timeScale:{timeVisible:!0,secondsVisible:!0}}),e.addLineSeries({lineWidth:3,color:"#0063f5",lastValueVisible:!1,crosshairMarkerVisible:!0,priceFormat:{precision:2}}).setData(h),e.timeScale().fitContent()}}),[h]),a.createElement(a.Fragment,null,l&&!E&&a.createElement(f,null),!l&&!E&&a.createElement("div",{ref:c,className:"iCVk_fSJ4S7GZmG6cDgZ"}))},E={"PeriodBar__main-block":"J6NhZRQ9jd0tUSOnHVo3","PeriodBar__choose-variant":"pTVA6_bVia14F8aYirBK","PeriodBar__choose-variant_active":"XMvNdtL9e1_ORckbU5CA"},M={"1 H":1,"24 H":24,"1 W":168,"1 M":720,"6 M":4320,"1 Y":8760,All:8760},N=function(e){var t=e.onChange,n=(0,a.useState)("1H"),r=(0,k.Z)(n,2),c=r[0],i=r[1],s=(0,a.useCallback)((function(e){i(e),t(M[e])}),[c]);return a.createElement("ul",{className:E["PeriodBar__main-block"]},Object.keys(M).map((function(e){return a.createElement("li",{className:h()(E["PeriodBar__choose-variant"],c===e?E["PeriodBar__choose-variant_active"]:null),onClick:function(){return s(e)},key:e},a.createElement("a",{className:E.PeriodBar__link__value},e))})))},D=n(5671),L=n(3144),S=n(8949),x=function(){function e(){(0,D.Z)(this,e),this._loading=!1,this._error=!1,this._coinMainData={},this._actualDatePeriod=1,(0,S.rC)(this,{_loading:S.LO,_error:S.LO,_coinMainData:S.LO.ref,_actualDatePeriod:S.LO,loading:S.Fl,error:S.Fl,coinMainData:S.Fl,actualDatePeriod:S.Fl,fetchData:S.aD.bound})}var t;return(0,L.Z)(e,[{key:"fetchData",value:(t=(0,u.Z)(d().mark((function e(t){var n,r=this;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=function(){var e=(0,u.Z)(d().mark((function e(){var n,a,c;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r._loading=!0,e.prev=1,e.next=4,v().get("https://api.coingecko.com/api/v3/coins/".concat(t,"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true"));case 4:if(n=e.sent,a=n.status,c=n.data,200===a&&0!==Object.keys(c).length){e.next=11;break}r._error=!0,e.next=12;break;case 11:return e.abrupt("return",c);case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),r._error=!0;case 17:return e.abrupt("return",null);case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(){return e.apply(this,arguments)}}(),e.next=3,(0,S.z)((0,u.Z)(d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n();case 3:r._coinMainData=e.sent,e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0),r._error=!0;case 10:r.loading=!1;case 11:case"end":return e.stop()}}),e,null,[[0,6]])}))));case 3:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})},{key:"loading",get:function(){return this._loading},set:function(e){this._loading=e}},{key:"error",get:function(){return this._error},set:function(e){this._error=e}},{key:"coinMainData",get:function(){return this._coinMainData},set:function(e){this._coinMainData=e}},{key:"actualDatePeriod",get:function(){return this._actualDatePeriod},set:function(e){this._actualDatePeriod=e}},{key:"destroy",value:function(){}}]),e}(),O=n(1463),w=n.n(O),T=function(){function e(){var t=this;(0,D.Z)(this,e),this._currencyList=[],this._selectedCurrencyList=[],this._selectedCurrencySymbol="",this._selectedSortType="market_cap_desc",(0,S.rC)(this,{_currencyList:S.LO.ref,_selectedCurrencyList:S.LO.ref,_selectedCurrencySymbol:S.LO,_selectedSortType:S.LO,prepareCurrencyDate:S.aD,getCurrencyList:S.aD,selectedSortType:S.Fl,selectedCurrencyList:S.Fl}),(0,S.z)((function(){t.getCurrencyList().then((function(){var e=localStorage.getItem("selectedCurrency");if(e){for(var n=JSON.parse(e),r=0,a=0;a<n.length;a++)for(var c=0;c<t._currencyList.length;c++)if(n[a].key===t._currencyList[c].key){r++;break}n.length&&r===n.length?t._selectedCurrencyList=n:t._selectedCurrencyList=[t._currencyList[0]]}else t._selectedCurrencyList=[t._currencyList[0]];t._selectedCurrencySymbol=w()(t._selectedCurrencyList[0].key)}))}))}var t;return(0,L.Z)(e,[{key:"selectedCurrencySymbol",get:function(){return this._selectedCurrencySymbol?this._selectedCurrencySymbol:""}},{key:"prepareCurrencyDate",value:function(e){var t=[];return e.forEach((function(e){return t.push({key:e,value:"Market-".concat(e.toUpperCase())})})),t}},{key:"getCurrencyList",value:(t=(0,u.Z)(d().mark((function e(){var t,n,r,a=this;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v()({method:"get",url:"https://api.coingecko.com/api/v3/simple/supported_vs_currencies"});case 2:t=e.sent;try{n=t.status,r=t.data,(0,S.z)((function(){200===n&&(a._currencyList=a.prepareCurrencyDate(r))}))}catch(e){}case 4:case"end":return e.stop()}}),e)}))),function(){return t.apply(this,arguments)})},{key:"currencyList",get:function(){return this._currencyList}},{key:"selectedSortType",get:function(){return this._selectedSortType},set:function(e){this._selectedSortType=e}},{key:"selectedCurrencyList",get:function(){return this._selectedCurrencyList},set:function(e){e.length&&(this._selectedCurrencyList=e,this._selectedCurrencySymbol=w()(this._selectedCurrencyList[0].key),localStorage.setItem("selectedCurrency",JSON.stringify(this._selectedCurrencyList)))}}]),e}(),Z=n(129),z=function(){function e(){(0,D.Z)(this,e),this._params={},this._search="",(0,S.rC)(this,{_params:S.LO.ref,_search:S.LO,setSearch:S.aD})}return(0,L.Z)(e,[{key:"search",get:function(){return this._search}},{key:"destroy",value:function(){this._params={},this._search=""}},{key:"setSearch",value:function(e){e&&(e=e.startsWith("?")?e.slice(1):e,this._search!==e&&(this._search=e,this._params=Z.parse(e)))}}]),e}(),j=new((0,L.Z)((function e(){(0,D.Z)(this,e),this.query=new z,this.currency=new T,this.coinsOnePageCoinsCount=10}))),I=function(){return j.currency},A=function(e){var t=(0,a.useRef)(null);return null===t.current&&(t.current=e()),(0,a.useEffect)((function(){var e;null===(e=t.current)||void 0===e||e.destroy()}),[]),t.current},P=n(2766),F=n(6974),V={"CoinsCard__main-block":"Oqp53GOBa55I7tPnN9NQ","CoinsCard__main-block__header":"pIxUtUuEQlPY2zaDmauM","CoinsCard__main-block__header__return-button":"boFz3nVJkJaQCihVm2wb","CoinsCard__main-block__header__coin-attributes":"slwq4bp0meRQJ9UGaxBN","CoinsCard__main-block__graph-header":"CDih2beMjRwxpEAmfrka","CoinsCard__main-block__graph":"FJTQk_jhIAcmu5JRWHtr","CoinsCard__main-block__choose-period":"FQjez6mHF_kOhjvs2wRa",root:"_umf43px0Yytq0LqaU1_"},H=(0,P.Pi)((function(){var e=I(),t=A((function(){return new x})),n=(0,F.UO)().id,r=(0,F.s0)(),c=(0,a.useCallback)((function(){r(-1)}),[r]);(0,a.useEffect)((function(){var e=function(){var e=(0,u.Z)(d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=3;break}return e.next=3,t.fetchData(n);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var i=(0,a.useCallback)((function(e){t.actualDatePeriod=e}),[null==t?void 0:t.actualDatePeriod]);return a.createElement(a.Fragment,null,!(null!=t&&t.error)&&(null==t?void 0:t.coinMainData.hasOwnProperty("image"))&&a.createElement("div",{className:V["CoinsCard__main-block"]},a.createElement("div",{className:V["CoinsCard__main-block__header"]},a.createElement("button",{className:V["CoinsCard__main-block__header__return-button"],onClick:function(){return c()}}),a.createElement("div",{className:V["CoinsCard__main-block__header__coin-attributes"]},a.createElement("img",{src:null==t?void 0:t.coinMainData.image.small,alt:"",className:V["CoinsCard__main-block__header__coin-attributes__img"]}),a.createElement("span",{className:V.card__title},null==t?void 0:t.coinMainData.name),a.createElement("span",{className:V.card__subtitle},"(",null==t?void 0:t.coinMainData.symbol.toUpperCase(),")"))),a.createElement("div",{className:V["CoinsCard__main-block__graph-header"]},a.createElement("span",null,null==t?void 0:t.coinMainData.market_data.current_price[e.selectedCurrencyList[0].key].toFixed(2)),a.createElement("span",null,null==t?void 0:t.coinMainData.market_data.price_change_percentage_24h.toFixed(2))),a.createElement("div",{className:V["CoinsCard__main-block__graph"]},a.createElement(b,{id:"".concat(n),currency:e.selectedCurrencyList[0].key,timing:null==t?void 0:t.actualDatePeriod})),a.createElement("div",{className:V["CoinsCard__main-block__choose-period"]},a.createElement(N,{onChange:i})),a.createElement("div",{className:V["CoinsCard__main-block__card"]},a.createElement(m,{image:null==t?void 0:t.coinMainData.image.small,title:null==t?void 0:t.coinMainData.name,subtitle:null==t?void 0:t.coinMainData.sumbol})),a.createElement("div",{className:V["CoinsCard__main-block__transactions"]})),a.createElement(f,{loading:null==t?void 0:t.loading}))})),Q=function(e){var t=e.priceChangePercentage,n=e.sparklineIn7d,r=e.currencySymbol,c=e.price,i=(0,a.useRef)();return(0,a.useEffect)((function(){var e=(0,C.C2)(i.current,{rightPriceScale:!1,timeScale:{visible:!1},overlayPriceScales:!1,grid:{vertLines:{visible:!1},horzLines:{visible:!1}}}),r=e.addLineSeries({lineWidth:1,color:t<0?"#d90429":"#21bf73",crosshairMarkerVisible:!1});return r.applyOptions({baseLineVisible:!1,priceLineVisible:!1,lastValueVisible:!1}),r.setData(n),e.applyOptions({crosshair:{vertLine:{visible:!1,labelVisible:!1},horzLine:{visible:!1,labelVisible:!1}},handleScale:!1,handleScroll:!1}),e.timeScale().setVisibleLogicalRange({from:0,to:n.length}),e.timeScale().fitContent(),function(){return e.remove()}}),[]),a.createElement("div",{className:"vhrdwQVvZ61HRcDMetSS"},a.createElement("div",{ref:i,className:"rAbVKEyYbGNV6P0R4C04"}),a.createElement("div",{className:"j8ei7sa7SkMDH2n5l9Wt"},(r||"").concat(null!==c?c.toFixed(2).toString():"0.00")),a.createElement("div",{className:h()("SS52GJpnomnQjbOJCnjZ",t>=0?"n0WSANn9oDEhSSJQob_A":"iM8yiLJiENhl9Qg0mY03")},(t>0?"+":"").concat((t/100).toFixed(2))))},U=n(348),Y=function(e){var t=e.isVisible,n=e.coinsList,r=e.handleCoins,c=e.handleCoinNavigate,i=e.symbol,s=e.onePageCountCoins,l=e.endList,u=(0,a.useCallback)((function(e){var t=[];return e.forEach((function(e,n){return t.push({value:e,time:n})})),t}),[]);return a.createElement(a.Fragment,null,t&&a.createElement(U.OO,{useWindowScroll:!0,data:n,endReached:l?void 0:r,overscan:s,itemContent:function(e,t){return a.createElement("div",{id:t.id,key:e},a.createElement(m,{image:t.image,title:t.name,subtitle:t.symbol.toUpperCase(),onClick:function(){return c(t.id)},content:a.createElement(Q,{priceChangePercentage:t.price_change_percentage_24h?t.price_change_percentage_24h:0,sparklineIn7d:u(t.sparkline_in_7d.price?t.sparkline_in_7d.price:0),currencySymbol:i,price:t.current_price})}))},components:{Footer:l?void 0:function(){return a.createElement(f,null)}}}))},J=function(e){var t=e.isVisible;return a.createElement(a.Fragment,null,t&&a.createElement("p",null,"Ошибка при загрузке данных. Перезагрузите страницу."))};!function(e){e.initial="initial",e.loading="loading",e.error="error",e.success="success"}(p||(p={}));var R,W=function(){var e=(0,u.Z)(d().mark((function e(t){var n,r,a;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=function(){var e=(0,u.Z)(d().mark((function e(t){var n,r;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://api.coingecko.com/api/v3/coins/".concat(t,"?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true"),e.prev=1,e.next=4,v().get(n);case 4:if(200!==(r=e.sent).status){e.next=9;break}return e.abrupt("return",r.data);case 9:return e.abrupt("return",[]);case 10:e.next=15;break;case 12:return e.prev=12,e.t0=e.catch(1),e.abrupt("return",[]);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),r=function(){var e=(0,u.Z)(d().mark((function e(t){var r;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(t);case 2:if(r=e.sent,!Object.keys(r).length){e.next=5;break}return e.abrupt("return",{price_change_percentage_24h:r.market_data.price_change_percentage_24h_in_currency[j.currency.selectedCurrencyList[0].key],sparkline_in_7d:r.market_data.sparkline_7d,symbol:r.symbol,image:r.image.small,current_price:r.market_data.current_price[j.currency.selectedCurrencyList[0].key]});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),!t){e.next=14;break}a=0;case 4:if(!(a<t.length)){e.next=14;break}return e.t0=Object,e.t1=t[a],e.next=9,r(t[a].id);case 9:e.t2=e.sent,t[a]=e.t0.assign.call(e.t0,e.t1,e.t2);case 11:a++,e.next=4;break;case 14:return e.abrupt("return",t);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=function(){function e(){(0,D.Z)(this,e),this._list=[],this._meta=p.initial,this._page=1,this._listEnd=!1,(0,S.rC)(this,{_list:S.LO.ref,_meta:S.LO,_page:S.LO,_listEnd:S.LO,list:S.Fl,meta:S.Fl,page:S.Fl,listEnd:S.Fl,initCoins:S.aD,getCoinsList:S.aD}),0!==j.currency.selectedCurrencyList.length&&this.initCoins({initial:!0})}var t,n;return(0,L.Z)(e,[{key:"listEnd",get:function(){return this._listEnd}},{key:"list",get:function(){return this._list}},{key:"meta",get:function(){return this._meta}},{key:"page",get:function(){return this._page}},{key:"getCoinsList",value:(n=(0,u.Z)(d().mark((function e(){var t,n,r=this;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"",j.currency.selectedSortType||(j.currency.selectedSortType="market_cap_desc"),t=j.query.search?"https://api.coingecko.com/api/v3/search?query=".concat(j.query.search):"https://api.coingecko.com/api/v3/coins/markets?vs_currency=".concat(j.currency.selectedCurrencyList[0].key,"&order=").concat(j.currency.selectedSortType,"&per_page=").concat(j.coinsOnePageCoinsCount,"&page=").concat(this.page,"&sparkline=true"),e.next=5,v().get(t);case 5:return n=e.sent,e.abrupt("return",(0,S.z)((function(){if(200===n.status)return j.query.search?(j.coinsOnePageCoinsCount*r._page>n.data.coins.length&&(r._listEnd=!0),n.data.coins.slice(j.coinsOnePageCoinsCount*(r._page-1),j.coinsOnePageCoinsCount*r._page)):(n.data.length<j.coinsOnePageCoinsCount&&(r._listEnd=!0),n.data);throw new Error})));case 7:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"initCoins",value:(t=(0,u.Z)(d().mark((function e(t){var n,r=this;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t&&t.initial&&(this._list=[],this._page=1,this._listEnd=!1),this._meta=p.loading,e.prev=2,e.next=5,this.getCoinsList();case 5:if(!(n=e.sent)||!j.query.search){e.next=10;break}return e.next=9,W(n);case 9:n=e.sent;case 10:n.length&&(n=n.filter((function(e,t){return!r._list.includes(e)})),(0,S.z)((function(){r._list=[].concat((0,y.Z)(r._list),(0,y.Z)(n)),r._page++,r._meta=p.success}))),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),this._meta=p.error,this._listEnd=!0;case 17:case"end":return e.stop()}}),e,this,[[2,13]])}))),function(e){return t.apply(this,arguments)})},{key:"destroy",value:function(){}}]),e}(),B=(0,P.Pi)((function(){var e=A((function(){return new q})),t=I();(0,a.useEffect)((function(){var t=function(){var t=(0,u.Z)(d().mark((function t(){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,null==e?void 0:e.initCoins({initial:!0});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();try{t()}catch(e){}}),[t.selectedCurrencyList,t.selectedSortType,j.query.search]);var n=(0,F.s0)(),r=(0,a.useCallback)((function(e){n(function(e){return"/Card/".concat(e)}(e),{state:{from:{pathname:j.query.search?j.query.search:i},currency:t.selectedCurrencyList}})}),[n,t.selectedCurrencyList]),c=(0,a.useCallback)((function(t){null==e||e.initCoins()}),[t.selectedCurrencyList,t.selectedSortType]);return a.createElement("div",{style:{display:"flex",flexDirection:"column"}},a.createElement(Y,{isVisible:e.meta!==p.error,coinsList:e.list,handleCoins:c,handleCoinNavigate:r,symbol:t.selectedCurrencySymbol,onePageCountCoins:j.coinsOnePageCoinsCount,endList:null==e?void 0:e.listEnd}),a.createElement(J,{isVisible:(null==e?void 0:e.meta)===p.error}))})),G="OooBw_uETe3FQoGp2iJU",X=function(e){var t=e.sortType,n=(0,a.useCallback)((function(e){j.currency.selectedSortType=e}),[]),r={All:"market_cap_desc",Gainer:"gecko_desc",Looser:"gecko_asc"};return a.createElement("ul",{className:"SNcP8JUU0QOjS18L1hHp"},Object.keys(r).map((function(e){return a.createElement("li",{key:e,className:"".concat(G," ").concat(t===r[e]?"wbn6vWW096er77cdy9jb":null),onClick:function(){return n(r[e])}},a.createElement("a",null,e))})),a.createElement("li",{key:"Favourites",className:G},a.createElement("a",null,"Favourites")))},K=function(e){var t=e.isVisible,n=e.onClick,r=e.disabled,c=e.actualValueString;return a.createElement("button",{key:"multiDropdown__block__mainClickButton",className:h()("yX0p1019xiLs8HGza3dg",t&&"WrI02GoFwJd6LYTbBQ_q"),onClick:n,disabled:r},a.createElement("div",{className:"S8P5f12WQtSz_uNofj5H"},c),a.createElement("div",{className:h()("oFO2PoxO0xHQIXNwjn2h",t&&"Y2AJbmd5vP18u7ax6z3E")}))},$=a.memo(K),ee=function(e){var t=e.options,n=e.value,r=e.onChange,c=e.disabled,i=e.pluralizeOptions,s=(0,a.useState)(!1),l=(0,k.Z)(s,2),u=l[0],o=l[1],d=(0,a.useState)(i(n)),m=(0,k.Z)(d,2),_=m[0],h=m[1],p=(0,a.useCallback)((function(e){h(i(e))}),[]),f=(0,a.useCallback)((function(e){n=-1===n.indexOf(e)?[e]:[].concat((0,y.Z)(n.slice(0,n.indexOf(e))),(0,y.Z)(n.slice(n.indexOf(e)+1))),r(n),p(n)}),[n]),g=(0,a.useCallback)((function(){return o((function(e){return!e}))}),[]);return a.createElement("div",{key:"multiDropdown__block",className:"multiDropdown__block"},a.createElement($,{isVisible:u,onClick:g,actualValueString:_}),u&&!c&&a.createElement("div",{key:"multiDropdown__block__optionsList",className:"hvrnGwhtuNCvOIRunEHL"},t.map((function(e){return a.createElement("div",{key:e.key,className:"SmzczONYCkHs5guuJzkT",onClick:function(){return f(e)}},a.createElement("div",null,e.value))}))))},te=(0,a.memo)(ee),ne={"MarketHeader__main-block":"uWWPDwXIY6WKJaEVrsJ3","MarketHeader__market-status":"YNbbUzDsA3a6Ljw5tTvL","MarketHeader__market-status__header":"C5xNCdVSjO0Md22HNq4Z","MarketHeader__market-status__header__span_green":"UTLkleqnWAfae7waapgS","MarketHeader__market-status__header__span_red":"hGaAQX2F150p0RPH3Y7o","MarketHeader__search-item":"mM3MnDNhrInVk5_OP2wu","MarketHeader__coins-item":"Zfvsla1qDPzFD7Z28Sdb","MarketHeader__currency-dropdown":"zTiNJ9FgzGOqg4CrzJM5"},re=function(e){var t=e.capChangePercentage,n=(0,F.s0)(),r=I(),c=(0,a.useCallback)((function(){n(l,{state:{location:i}})}),[n]),s=(0,a.useCallback)((function(e){r.selectedCurrencyList=e}),[r.selectedCurrencyList]),u=(0,a.useCallback)((function(e){return e.reduce((function(e,t){return e+t.value+" "}),"")}),[r.selectedCurrencyList]);return a.createElement("div",{className:ne["MarketHeader__main-block"]},a.createElement("div",{className:ne["MarketHeader__market-status"]},a.createElement("div",{className:ne["MarketHeader__market-status__header"]},"Market is ",t>=0?" up ":" down ",a.createElement("span",{className:ne["MarketHeader__market-status__header__span_".concat(t>0?"green":"red")]},t.toFixed(2))),a.createElement("span",null,"In the past 24 hours")),a.createElement("div",{className:ne["MarketHeader__search-item"]},a.createElement("img",{src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNiAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuODQxOTkgMTIuMTUwNEM4LjM2MDA0IDEyLjE1MDIgOS44MzQzNCAxMS42OTg5IDExLjAzMDEgMTAuODY4NkwxNC43ODk4IDE0LjIwNjlMMTUuOTk5MSAxMy4xMzMxTDEyLjIzOTUgOS43OTQ3N0MxMy4xNzUxIDguNzMyODcgMTMuNjgzNiA3LjQyMzQ5IDEzLjY4NCA2LjA3NTIyQzEzLjY4NCAyLjcyNTQ5IDEwLjYxNDUgMCA2Ljg0MTk5IDBDMy4wNjk0OSAwIDAgMi43MjU0OSAwIDYuMDc1MjJDMCA5LjQyNDk0IDMuMDY5NDkgMTIuMTUwNCA2Ljg0MTk5IDEyLjE1MDRaTTYuODQxOTkgMS41MTg4QzkuNjcyMDEgMS41MTg4IDExLjk3MzUgMy41NjIzNiAxMS45NzM1IDYuMDc1MjJDMTEuOTczNSA4LjU4ODA4IDkuNjcyMDEgMTAuNjMxNiA2Ljg0MTk5IDEwLjYzMTZDNC4wMTE5NyAxMC42MzE2IDEuNzEwNSA4LjU4ODA4IDEuNzEwNSA2LjA3NTIyQzEuNzEwNSAzLjU2MjM2IDQuMDExOTcgMS41MTg4IDYuODQxOTkgMS41MTg4WiIgZmlsbD0iI0RGRTJFNCIvPgo8L3N2Zz4K",onClick:c})),a.createElement("div",{className:ne["MarketHeader__coins-item"]},"Coins"),a.createElement("div",{className:ne["MarketHeader__currency-dropdown"]},a.createElement(te,{options:r.currencyList,value:r.selectedCurrencyList,onChange:s,pluralizeOptions:u})))},ae=function(){function e(){(0,D.Z)(this,e),this._dailyMarketChange=null,this._error=!1,(0,S.rC)(this,{_dailyMarketChange:S.LO,_error:S.LO,dailyMarketChange:S.Fl,error:S.Fl,fetchData:S.aD}),this.fetchData()}var t;return(0,L.Z)(e,[{key:"fetchData",value:(t=(0,u.Z)(d().mark((function e(){var t,n=this;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v()({method:"get",url:"https://api.coingecko.com/api/v3/global"});case 2:t=e.sent,(0,S.z)((function(){try{var e=t.status,r=t.data;200===e&&Object.keys(r).length?n._dailyMarketChange=t.data.data.market_cap_change_percentage_24h_usd:n._error=!0}catch(e){n._error=!0}}));case 4:case"end":return e.stop()}}),e)}))),function(){return t.apply(this,arguments)})},{key:"dailyMarketChange",get:function(){return this._dailyMarketChange},set:function(e){this._dailyMarketChange=e}},{key:"error",get:function(){return this._error},set:function(e){this._error=e}},{key:"destroy",value:function(){}}]),e}(),ce=(0,P.Pi)((function(){var e=I(),t=A((function(){return new ae}));return null==t||t.fetchData(),(0,a.useEffect)((function(){t&&t.fetchData()}),[t,null==t?void 0:t.dailyMarketChange]),(0,a.useEffect)((function(){t&&t.fetchData()}),[]),a.createElement(a.Fragment,null,t&&null!==t.dailyMarketChange&&0!==e.currencyList.length&&a.createElement("div",{className:"_wmfpYeE0Fy3t8eaBtod"},a.createElement(re,{capChangePercentage:t.dailyMarketChange}),a.createElement(X,{sortType:j.currency.selectedSortType}),a.createElement("div",{className:"SnXNZdmFN19_Z5Rpcump"},a.createElement(B,null))),a.createElement(J,{isVisible:!t||(null==t?void 0:t.error)}))})),ie=n(7462),se=n(4925),le={button:"b_aG7bzo5aM2mIR7O3BA","button_color-primary":"d688h0GzvJCcheM71yPI","button_color-secondary":"vn1j1uVyybej_3ML3vnf"},ue=["loading","color","children"];!function(e){e.primary="primary",e.secondary="secondary"}(R||(R={}));var oe=function(e){var t=e.loading,n=e.color,r=void 0===n?R.primary:n,c=e.children,i=(0,se.Z)(e,ue),s=(0,a.useMemo)((function(){return h()(le.button,t||i.disabled?le.button_disabled:null,le["button_color-".concat(r)],i.className)}),[t,i,r]);return a.createElement("button",(0,ie.Z)({disabled:t,className:s},i),c,t?a.createElement(f,null):null)},de=["value","onChange"],me=function(e){var t=e.value,n=e.onChange,r=(0,se.Z)(e,de),c=h()(r.className,r.disabled?"input_disabled":null),i=(0,a.useCallback)((function(e){n(e.target.value)}),[n]);return a.createElement("input",(0,ie.Z)({type:"text",value:t,className:c},r,{onChange:i}))},_e=function(){var e;e=(0,F.TH)().search,j.query.setSearch(e);var t=(0,F.s0)(),n=(0,a.useState)(""),r=(0,k.Z)(n,2),c=r[0],s=r[1],u=(0,a.useCallback)((function(){j.query.destroy(),t(i)}),[t]),o=(0,a.useCallback)((function(e){j.query.setSearch(e),t({pathname:l,search:j.query.search})}),[j.query.search]);return(0,a.useEffect)((function(){var e=setTimeout((function(){return o(c)}),500);return function(){return clearTimeout(e)}}),[c]),a.createElement("div",{className:"D1Y8iF1u5st07x_0pgL3"},a.createElement("div",{className:"h4YOR7WFBTusHP5LVFVL"},a.createElement(me,{value:c,onChange:function(e){return s(e)}}),a.createElement(oe,{onClick:u},"Cancel")),a.createElement("div",{className:"ip5KNgAuwGrpyqCQENFe"},a.createElement(B,null)))},he=n(9711),pe=function(){return a.createElement("div",{className:"x_yUXMQlAkeHC5BsgUuv"},a.createElement(he.VK,null,a.createElement(F.Z5,null,a.createElement(F.AW,{path:i,element:a.createElement(ce,null)}),a.createElement(F.AW,{path:l,element:a.createElement(_e,null)}),a.createElement(F.AW,{path:s,element:a.createElement(H,null)}),a.createElement(F.AW,{path:"*",element:a.createElement(F.Fg,{to:i})}))))};c.createRoot(document.getElementById("root")).render(a.createElement(pe,null))}},function(e){e.O(0,[931],(function(){return 8183,e(e.s=8183)})),e.O()}]);