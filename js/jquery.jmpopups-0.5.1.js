(function(P){var S=[];var V=false;var U=[];var X={screenLockerBackground:"url(../img/bg_fix.png)",screenLockerOpacity:"1"};P.setupJMPopups=function(A){X=jQuery.extend(X,A);return this};P.openPopupLayer=function(A){if(typeof(A.name)!="undefined"&&!Q(A.name)){A=jQuery.extend({width:"auto",height:"auto",parameters:{},target:"",success:function(){},error:function(){},beforeClose:function(){},afterClose:function(){},reloadSuccess:null,cache:false},A);N(A,true);return this}};P.closePopupLayer=function(A){if(A){for(var C=0;C<S.length;C++){if(S[C].name==A){var B=S[C];S.splice(C,1);B.beforeClose();P("#"+A).hide(function(){P("#"+A).find(".jmp-link-at-top,.jmp-link-at-bottom").remove();P("#"+A).hide();U.pop();if(U.length>0){P(U[U.length-1]).focus()}B.afterClose();O(A)});break}}}else{if(S.length>0){P.closePopupLayer(S[S.length-1].name)}}return this};P.reloadPopupLayer=function(A,C){if(A){for(var B=0;B<S.length;B++){if(S[B].name==A){if(C){S[B].reloadSuccess=C}N(S[B],false);break}}}else{if(S.length>0){P.reloadPopupLayer(S[S.length-1].name)}}return this};function R(){if(V){P("#popupLayerScreenLocker").height(P(document).height()+"px");P("#popupLayerScreenLocker").width(P(document.body).outerWidth(true)+"px")}}function Q(A){if(A){for(var B=0;B<S.length;B++){if(S[B].name==A){return true}}}return false}function W(){if(P("#popupLayerScreenLocker").length){if(S.length==1){V=true;R();P("#popupLayerScreenLocker").show()}if(P.browser.msie&&P.browser.version<7){P("select:not(.hidden-by-jmp)").addClass("hidden-by-jmp hidden-by-"+S[S.length-1].name).css("visibility","hidden")}P("#popupLayerScreenLocker").css("z-index",parseInt(S.length==1?99:P("#"+S[S.length-2].name).css("z-index"))+1)}else{P("body").append("<div id='popupLayerScreenLocker'><!-- --></div>");P("#popupLayerScreenLocker").css({position:"absolute",background:X.screenLockerBackground,left:"0",top:"0",opacity:X.screenLockerOpacity,display:"none"});W()}}function O(A){if(S.length==0){screenlocker=false;P("#popupLayerScreenLocker").hide()}else{P("#popupLayerScreenLocker").css("z-index",parseInt(P("#"+S[S.length-1].name).css("z-index"))-1)}if(P.browser.msie&&P.browser.version<7){P("select.hidden-by-"+A).removeClass("hidden-by-jmp hidden-by-"+A).css("visibility","visible")}}function M(F,C){if(F){var D;var B;if(F.width()<P(window).width()){D=(document.documentElement.offsetWidth-F.width())/2}else{D=document.documentElement.scrollLeft+5}if(F.height()<P(window).height()){B=P(window).scrollTop()+(P(window).height()-F.height())/2}else{B=P(window).scrollTop()+5}var E={left:D+"px",top:B+"px"};if(!C){F.css(E)}else{F.animate(E,"slow")}R()}else{for(var A=0;A<S.length;A++){M(P("#"+S[A].name),true)}}}function T(H,D,B){var G=H.name;if(D){W();var A=parseInt(S.length==1?100:P("#"+S[S.length-2].name).css("z-index"))+2}else{var A=P("#"+G).css("z-index")}var I=P("#"+G);I.css({visibility:"hidden",width:H.width=="auto"?"":H.width+"px",height:H.height=="auto"?"":H.height+"px",position:"absolute","z-index":A});var C="<a href='#' class='jmp-link-at-top' style='position:absolute; left:-9999px; top:-1px;'>&nbsp;</a><input class='jmp-link-at-top' style='position:absolute; left:-9999px; top:-1px;' />";var F="<a href='#' class='jmp-link-at-bottom' style='position:absolute; left:-9999px; bottom:-1px;'>&nbsp;</a><input class='jmp-link-at-bottom' style='position:absolute; left:-9999px; top:-1px;' />";if(B){I.html(C+B+F)}M(I);I.css("display","none");I.css("visibility","visible");if(D){I.show()}else{I.show()}P("#"+G+" .jmp-link-at-top, #"+G+" .jmp-link-at-bottom").focus(function(){P(U[U.length-1]).focus()});var E=P("#"+G+" a:visible:not(.jmp-link-at-top, .jmp-link-at-bottom), #"+G+" *:input:visible:not(.jmp-link-at-top, .jmp-link-at-bottom)");if(E.length==0){var J="<a href='#' class='jmp-link-inside-popup' style='position:absolute; left:-9999px;'>&nbsp;</a>";I.find(".jmp-link-at-top").after(J);U.push(P(I).find(".jmp-link-inside-popup")[0])}else{E.each(function(){if(!P(this).hasClass("jmp-link-at-top")&&!P(this).hasClass("jmp-link-at-bottom")){U.push(this);return false}})}P(U[U.length-1]).focus();H.success();if(H.reloadSuccess){H.reloadSuccess();H.reloadSuccess=null}}function N(A,B){if(B){S.push(A)}if(A.target!=""){T(A,B)}else{P.ajax({url:A.url,data:A.parameters,cache:A.cache,dataType:"html",method:"GET",success:function(C){T(A,B,C)},error:A.error})}}})(jQuery);function openShowDiv(B){$.openPopupLayer({name:B,target:B})}function closeDiv(B){$.closePopupLayer(B)};