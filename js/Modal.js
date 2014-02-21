function Modal(t){"use strict";var e={width:0,height:0,padding:20,autoDimension:!0,autoShow:!0,locked:!1,title:"",html:"",buttons:[],url:"",onShow:!1,beforeClose:!1,onClose:!1,loading_text:"loading..."};this.options=this._merge(e,t),this._validate(),this._elements={mask:this._create("mask"),container:this._create("container")},this._visible=!1,this._build(),this.options.autoShow&&this.show()}Modal.prototype._merge=function(t,e){"use strict";var n={},o=0;for(o in t)t.hasOwnProperty(o)&&(n[o]=e.hasOwnProperty(o)?e[o]:t[o]);return n},Modal.prototype._create=function(t,e){"use strict";if("string"!=typeof t||!t.length)throw"className MUST be a non empty string";var n=document.createElement("div");return n.className="modal-"+t,"string"==typeof e&&e.length&&(n.innerHTML=e),n},Modal.prototype._validate=function(){"use strict";var t=this.options,e=0,n=0;if("boolean"!=typeof t.autoDimension)throw"autoDimension MUST be boolean";if(t.autoDimension===!0?(t.width="0px",t.height="0px"):(t.width="number"==typeof t.width?t.width+"px":t.width,t.height="number"==typeof t.height?t.height+"px":t.height),"string"!=typeof t.width)throw"width MUST be a string or a number";if(-1===t.width.indexOf("%")&&-1===t.width.indexOf("px"))throw"width MUST be in pt or % units";if("string"!=typeof t.height)throw"height MUST be a string or a number";if(-1===t.height.indexOf("%")&&-1===t.height.indexOf("px"))throw"height MUST be in pt or % units";if(t.padding="number"==typeof t.padding?t.padding+"px":t.padding,"string"!=typeof t.padding)throw"padding MUST be a string or a number";if(-1===t.padding.indexOf("%")&&-1===t.padding.indexOf("px"))throw"padding MUST be in pt or % units";if("boolean"!=typeof t.locked)throw"locked MUST be a boolean";if("boolean"!=typeof t.autoShow)throw"autoshow MUST be a boolean";if("string"!=typeof t.title)throw"title MUST be string";if("string"!=typeof t.html&&"object"!=typeof t.html)throw"html MUST be string or a HTML Object";if("string"!=typeof t.url)throw"url MUST be string";if("string"!=typeof t.url)throw"url MUST be string";if(t.onShow!==!1&&"function"!=typeof t.onShow)throw"onShow MUST be function";if(t.onClose!==!1&&"function"!=typeof t.onClose)throw"onClose MUST be function";if(t.beforeClose!==!1&&"function"!=typeof t.beforeClose)throw"beforeClose MUST be function";if("string"==typeof t.html&&!t.html.length&&!t.url.length)throw"you MUST provide a html content or a URL";if("object"!=typeof t.buttons||"number"!=typeof t.buttons.length)throw"buttons MUST be array";for(e=t.buttons.length,n=0;e>n;n+=1){if("string"!=typeof t.buttons[n].title||!t.buttons[n].title.length)throw"button "+n+" has a invalid title (MUST be a non empty string)";if("function"!=typeof t.buttons[n].click)throw"button "+n+" has a invalid callback for click event";if(t.buttons[n].hasOwnProperty("className")&&"string"!=typeof t.buttons[n].className)throw"button "+n+" has a invalid className (MUST be a string)"}},Modal.prototype._align=function(){"use strict";var t=0,e=0,n={},o=0;if(this._elements.container.style.padding=this.options.padding,this._elements.hasOwnProperty("header")||this._elements.hasOwnProperty("buttons_container")||"0px"!==this.options.padding||(this._elements.content.style.padding="0px"),this.options.autoDimension){for(n={width:["content","loading"],height:["content","header","loading","buttons_container"]},this._elements.container.className+=" hide-modal",document.body.appendChild(this._elements.container),o=0;o<n.width.length;o+=1)this._elements.hasOwnProperty(n.width[o])&&(t+=this._elements[n.width[o]].offsetWidth);for(this._elements.hasOwnProperty("header")&&(this._elements.header.style.width=t+"px"),o=0;o<n.height.length;o+=1)this._elements.hasOwnProperty(n.height[o])&&(e+=this._elements[n.height[o]].offsetHeight);this._remove(this._elements.container),this._elements.container.className=this._elements.container.className.replace(" hide-modal",""),this._elements.container.style.height=e+"px",this._elements.container.style.width=t+"px"}else this._elements.container.style.width=this.options.width,this._elements.container.style.height=this.options.height,t=this.options.width,e=this.options.height;e<window.outerHeight?this._elements.container.className+=" modal-centered":(this._elements.container.className.replace("modal-centered",""),this._elements.container.style.top=document.body.scrollTop+30+"px")},Modal.prototype._build=function(){"use strict";var t=this.options,e=this,n=t.buttons.length,o=0;if(t.url.length)this._elements.loading=this._create("loading",this.options.loading_text),this._elements.container.appendChild(this._elements.loading),this._getContentFromURL(t.url,function(t){this.update({url:"",html:t,autoShow:this._visible})});else if(t.title.length&&(this._elements.header=this._create("header",t.title),this._elements.container.appendChild(this._elements.header)),t.locked||(this._elements.close=this._create("close","x"),this._elements.container.appendChild(this._elements.close),this._elements.close.onclick=function(){e.close()}),this._elements.content=this._create("content"),"string"==typeof this.options.html?this._elements.content.innerHTML=this.options.html:this._elements.content.appendChild(this.options.html.cloneNode()),this._elements.container.appendChild(this._elements.content),n){for(this._elements.buttons_container=this._create("buttons-container"),this._elements.buttons=[],o=0;n>o;o+=1)this._elements.buttons.push(document.createElement("button")),this._elements.buttons[o].innerHTML=t.buttons[o].title,this._elements.buttons[o].className=t.buttons[o].hasOwnProperty("className")?t.buttons[o].className:"modal-button",this._elements.buttons[o].onclick=t.buttons[o].click,this._elements.buttons_container.appendChild(this._elements.buttons[o]);this._elements.container.appendChild(this._elements.buttons_container)}t.locked||(this._elements.mask.onclick=function(){e.close()}),this._align()},Modal.prototype._getContentFromURL=function(t,e){"use strict";var n,o=this;window.XMLHttpRequest?n=new XMLHttpRequest:window.ActiveXObject&&(n=new ActiveXObject("Microsoft.XMLHTTP")),n.onreadystatechange=function(){4===n.readyState&&200===n.status&&e.call(o,n.responseText)},n.open("GET",t,!0),n.send(null)},Modal.prototype.show=function(){"use strict";document.body.querySelectorAll(".modal-mask")&&document.body.appendChild(this._elements.mask),document.body.appendChild(this._elements.container),this._visible=!0,this.options.onShow&&this.options.onShow()},Modal.prototype.update=function(t){"use strict";this.options=this._merge(this.options,t),this._validate(),this._remove(this._elements.container),this._elements.container.innerHTML="",this._build(),this.options.autoShow&&this.show()},Modal.prototype.close=function(){"use strict";var t=!0;this.options.beforeClose&&(t=this.options.beforeClose()===!1?!1:!0),t&&(this._remove(this._elements.container,this._elements.mask),this.options.onClose&&this.options.onClose()),this._visible=!1},Modal.prototype._remove=function(){"use strict";var t=0,e=arguments.length;for(t=0;e>t;t+=1)try{document.body.removeChild(arguments[t])}catch(n){}};