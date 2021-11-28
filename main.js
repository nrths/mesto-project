(()=>{"use strict";function e(e){e.classList.add("popup_opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_opened"))}var r={baseUrl:"https://nomoreparties.co/v1/plus-cohort-4",headers:{authorization:"3874ec8d-d96c-4b9e-9955-f2d143817211","Content-type":"application/json"}},o=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},c=document.querySelector(".elements"),a=document.querySelector(".popup__mode_card-show"),i=a.querySelector(".popup__figure-image"),u=a.querySelector(".popup__figcaption"),l=document.querySelector("#elements-item").content;function s(e){c.prepend(e)}function d(t,n){var c=l.querySelector(".element").cloneNode(!0),s=c.querySelector(".element__image"),d=c.querySelector(".element__title"),f=c.querySelector(".element__like"),m=c.querySelector(".element__delete-button"),p=c.querySelector(".element__like-count");return s.src=t.link,s.alt=t.name,d.textContent=t.name,p.textContent=t.likes.length,s.addEventListener("click",(function(){return function(t){i.src=t.link,i.alt=t.name,u.textContent=t.name,e(a)}(t)})),t.likes.some((function(e){if(e._id===n._id)return!0}))&&f.classList.add("element__like_active"),f.addEventListener("click",(function(e){return function(e,t){var n,c=e._id;t.target.classList.contains("element__like_active")?(n=c,fetch("".concat(r.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:r.headers}).then(o)).then((function(e){t.target.classList.remove("element__like_active"),p.textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then(o)}(c).then((function(e){t.target.classList.add("element__like_active"),p.textContent=e.likes.length})).catch((function(e){return console.log(e)}))}(t,e)})),t.owner._id!==n._id&&(m.style.display="none"),m.addEventListener("click",(function(){var e;console.log(t._id),(e=t,fetch("".concat(r.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:r.headers}).then(o)).then((function(e){console.log(e),m.closest(".element").remove()})).catch((function(e){return console.log(e)}))})),c}var f=function(e){e.disabled=!1},m=function(e){e.disabled=!0};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var _=document.querySelector(".profile"),y=_.querySelector(".profile__add-button"),h=_.querySelector(".profile__edit-button"),v=_.querySelector(".profile__avatar"),S=_.querySelector(".profile__avatar-edit-button"),b=document.querySelector(".popup__mode_place-add"),q=b.querySelector('.form[name="place-add-form"]'),g=q.querySelector('.form__item[name="place-name"]'),E=q.querySelector('.form__item[name="place-link"]'),k=b.querySelector(".popup__submit"),L=document.querySelector(".popup__mode_profile-edit"),C=L.querySelector('.form[name="profile-edit-form"]'),x=C.querySelector('.form__item[id="username"]'),A=C.querySelector('.form__item[id="description"]'),U=document.querySelector(".profile__name"),w=document.querySelector(".profile__description"),T=L.querySelector(".popup__submit"),j=document.querySelector(".popup__mode_avatar-edit"),D=j.querySelector('.form[name="avatar-edit-form"]'),O=j.querySelector('.form__item[id="new-avatar"]'),P=j.querySelector(".popup__submit"),N=document.querySelectorAll(".popup"),I=void 0;function J(e,t,n){U.textContent=e,w.textContent=t,v.src=n}!function(e){var t=function(e,t){return t.querySelector("#".concat(e.id,"-error"))},n=function(e,t){!function(e){return e.every((function(e){return e.validity.valid}))}(t)?m(e):f(e)};Array.from(document.querySelectorAll(e.formSelector)).forEach((function(r){!function(r){r.addEventListener("submit",(function(e){e.preventDefault()}));var o=Array.from(r.querySelectorAll(e.inputSelector)),c=r.querySelector(e.submitButtonSelector);o.forEach((function(a){a.addEventListener("input",(function(){(function(n,r){n.validity.valid?function(n,r){t(n,r).textContent="",n.classList.remove(e.inputErrorClass)}(n,r):function(n,r){t(n,r).textContent=n.validationMessage,n.classList.add(e.inputErrorClass)}(n,r,n.validationMessage)})(a,r),n(c,o)}))})),n(c,o)}(r)}))}({formSelector:".form",inputSelector:".form__item",submitButtonSelector:".popup__submit",inputErrorClass:"form__item_type_error"}),Promise.all([fetch("".concat(r.baseUrl,"/cards"),{method:"GET",headers:r.headers}).then(o),fetch("".concat(r.baseUrl,"/users/me"),{method:"GET",headers:r.headers}).then(o)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){i=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];console.log(o,c),o.reverse(),o.forEach((function(e){I=c,s(d(e,c)),J(c.name,c.about,c.avatar)}))})).catch((function(e){return console.log(e)})),h.addEventListener("click",(function(){e(L),x.value=U.textContent,A.value=w.textContent,f(T)})),C.addEventListener("submit",(function(e){var n,c;e.preventDefault(),T.textContent="Сохранение...",(n=x.value,c=A.value,fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:n,about:c})}).then(o)).then((function(e){J(e.name,e.about,e.avatar),t(L),C.reset()})).catch((function(e){return alert(e)})).finally((function(){T.textContent="Сохранить"}))})),y.addEventListener("click",(function(){e(b),m(k)})),q.addEventListener("submit",(function(e){var n;e.preventDefault(),k.textContent="Создание...",(n={name:g.value,link:E.value},fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:n.name,link:n.link})}).then(o)).then((function(e){s(d(e,I)),t(b),q.reset()})).catch((function(e){return console.log(e)})).finally((function(){return k.textContent="Создать"}))})),S.addEventListener("click",(function(){e(j),m(P)})),D.addEventListener("submit",(function(e){var n;e.preventDefault(),P.textContent="Сохранение...",(n=O.value,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:n})}).then(o)).then((function(e){v.src=e.avatar,t(j),D.reset()})).catch((function(e){return console.log(e)})).finally((function(){return P.textContent="Сохранить"}))})),N.forEach((function(e){e.addEventListener("click",(function(n){(n.target.classList.contains("popup__button_assignment_close")||n.target.classList.contains("popup_opened"))&&t(e)}))}))})();