(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,t){e.exports=t(39)},19:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),u=t(11),l=t.n(u),c=(t(19),t(12)),r=t(3),i=t(2),s=t.n(i),m="/api/persons",f=function(e){return s.a.post(m,e).then(function(e){return e.data})},d=function(e,n){return s.a.put("".concat(m,"/").concat(e),n).then(function(e){return e.data})},h=function(e){return s.a.delete("".concat(m,"/").concat(e)).then(function(e){return e.data})},p=function(e){var n=e.newFilter,t=e.handleNoteChange3;return o.a.createElement("form",null," rajaa n\xe4ytett\xe4v\xe4",o.a.createElement("input",{value:n,onChange:t}))},g=function(e){var n=e.addPerson,t=e.newName,a=e.newNumber,u=e.handleNoteChange1,l=e.handleNoteChange2;return o.a.createElement("form",{onSubmit:n},o.a.createElement("div",null,"nimi:",o.a.createElement("input",{value:t,onChange:u})),o.a.createElement("div",null,"numero:",o.a.createElement("input",{value:a,onChange:l})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},v=function(e){return(0,e.showPersons)()},E=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"error"},n)},b=function(e){var n=e.message;return null===n?null:o.a.createElement("div",{className:"ok"},n)},w=function(){var e=Object(a.useState)([]),n=Object(r.a)(e,2),t=n[0],u=n[1],l=Object(a.useState)(""),i=Object(r.a)(l,2),m=i[0],w=i[1],j=Object(a.useState)(""),O=Object(r.a)(j,2),N=O[0],C=O[1],k=Object(a.useState)(""),P=Object(r.a)(k,2),T=P[0],R=P[1],S=Object(a.useState)(null),y=Object(r.a)(S,2),F=y[0],I=y[1],L=Object(a.useState)(null),H=Object(r.a)(L,2),J=H[0],x=H[1];Object(a.useEffect)(function(){console.log("effect"),s.a.get("/api/persons").then(function(e){console.log("promise fulfilled"),u(e.data)})},[]),console.log("render",t.length,"persons");return o.a.createElement("div",null,o.a.createElement("h2",null,"Puhelinluettelo"),o.a.createElement(E,{message:F}),o.a.createElement(b,{message:J}),o.a.createElement(p,{newFilter:T,handleNoteChange3:function(e){console.log(e.target.value),R(e.target.value)}}),o.a.createElement("h3",null,"lis\xe4\xe4 uusi"),o.a.createElement(g,{addPerson:function(e){if(e.preventDefault(),t.map(function(e){return e.name}).includes(m)){if(window.confirm("".concat(m," on jo luettelossa, korvataanko vanha uudella numerolla?"))){var n=t.find(function(e){return e.name===m}),a=Object(c.a)({},n,{number:N}),o=n.id;d(o,a).then(function(e){u(t.map(function(n){return n.id!==o?n:e})),w(""),C(""),x("P\xe4ivitettiin ".concat(n.name)),setTimeout(function(){x(null)},5e3)}).catch(function(e){s.a.get("/api/persons").then(function(e){console.log("promise fulfilled"),u(e.data)}),I("Henkil\xf6 ".concat(n.name," oli jo poistettu")),setTimeout(function(){I(null)},5e3)})}}else f({name:m,number:N}).then(function(e){u(t.concat(e)),w(""),C(""),x("Lis\xe4ttiin ".concat(e.name)),setTimeout(function(){x(null)},5e3)}).catch(function(e){I("ERROR : ".concat(e.response.data.error)),console.log("FRONTTI ERRORI: ",e.response.data.error),setTimeout(function(){I(null)},5e3)})},newName:m,newNumber:N,handleNoteChange1:function(e){console.log(e.target.value),w(e.target.value)},handleNoteChange2:function(e){console.log(e.target.value),C(e.target.value)}}),o.a.createElement("h2",null,"Numerot"),o.a.createElement(v,{showPersons:function(){return t.filter(function(e){return e.name.toLowerCase().match(T.toLowerCase())}).map(function(e){return o.a.createElement("p",{key:e.id},e.name+" ",e.number,o.a.createElement("button",{onClick:function(){return function(e){window.confirm("Poistetaanko ".concat(e.name,"?"))&&h(e.id).then(function(n){console.log("removed:",n),u(t.filter(function(n){return n.id!==e.id})),w(""),C(""),x("Poistettiin ".concat(e.name)),setTimeout(function(){x(null)},5e3)}).catch(function(n){s.a.get("http:/api/persons").then(function(e){console.log("promise fulfilled"),u(e.data)}),I("Henkil\xf6 ".concat(e.name," oli jo poistettu")),setTimeout(function(){I(null)},5e3)})}(e)}},"poista"))})}}))};l.a.render(o.a.createElement(w,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.c89fc2b7.chunk.js.map