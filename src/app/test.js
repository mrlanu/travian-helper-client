jQuery(document).ready(function(){
  var f={
        get:function(a){
          return(a=document.cookie.match(new RegExp("(?:^|; )"+a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)")))?decodeURIComponent(a[1]):void 0
        },
        del:function(a){
          setCookie(a,"",{expires:-1})
        },
        set:function(a,c,g){
          g=g||{
            path:"/",expires:604800
          };
          var b=g.expires;
          if("number"===typeof b&&b){
            var d=new Date;
            d.setTime(d.getTime()+1E3*b);
            b=g.expires=d
          }
          b&&b.toUTCString&&(g.expires=b.toUTCString());c=encodeURIComponent(c);a=a+"="+c;
          for(var h in g)a+="; "+h,c=g[h],!0!==c&&(a+="="+c);
          document.cookie=a
        },
        getInterval:function(a){
          var c=(new Date).getTime(),g=f.get("ttools-time-"+a);
          return void 0===g?(f.setInterval(a),0):c-parseInt(g)
        },
        setInterval:function(a){
        var c=(new Date).getTime();
        f.set("ttools-time-"+a,c)}
      }
    ,

    l={
        sendAttacks:function(a){
          console.log("send");
          console.log(d.attacks);
/*
          jQuery.post("https://ts4.vtraviane.ru/dc/raw",{raw:JSON.stringify(d.attacks)},
*/
          jQuery.post("http://localhost:8080/test",{raw:JSON.stringify(d.attacks)},
            function(c){"false"===c?(console.log("false"),
                b.objects.window.html("\u041d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u044f \u043d\u0435 \u0441\u043d\u044f\u0442\u044b. \u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0432\u0430\u0448 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 \u043d\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d \u043d\u0430 \u0441\u0430\u0439\u0442\u0435.")):
                (console.log(c),
                console.log("complete"),
                a())
            })
        },
        sendTroops:function(a){
          jQuery.post("https://ts4.vtraviane.ru/troops/raw/ajax",{raw:JSON.stringify(d.troops)},
            function(c){
            "true"===c?(console.log(c), console.log("complete"), a()):(console.log("false"),
              b.objects.window.html("\u0412\u043e\u0439\u0441\u043a\u0430 \u043d\u0435 \u0441\u043d\u044f\u0442\u044b. \u0412\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0432\u0430\u0448 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 \u043d\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d \u043d\u0430 \u0441\u0430\u0439\u0442\u0435."))})
        },
        getMessage:function(a,c){
          a?jQuery.getJSON("https://ts4.vtraviane.ru/travian/message/ajax/get/"+k.account()+"/full",
          function(a){
          a.hash!==f.get("ttools-message-hash")&&"not"!==a.hash&&"error"!==a.hash?(f.set("ttools-message-hash",a.hash),
            c({status:!0,message:a.message,hash:a.hash})):c({status:!1,message:a.message,hash:a.hash})}):jQuery.getJSON("https://ts4.vtraviane.ru/travian/message/ajax/get/"+k.account(),function(a){a.hash!==f.get("ttools-message-hash")&&"not"!==a.hash&&"error"!==a.hash?(f.set("ttools-message-hash", a.hash),
          jQuery.getJSON("https://ts4.vtraviane.ru/travian/message/ajax/get/"+k.account()+"/full",
            function(a){
              c({status:!0,message:a.message})})):c({status:!1})
            })
        },
        getHero:function(a){
          console.log("snap-hero: start");
          jQuery.getJSON("https://ts4.vtraviane.ru/dc/hero/json/api/get/"+k.account(),
            function(c){d.snapHero(c,a)})
        },
        sendHero:function(){
          console.log("snap-hero: send");
          jQuery.post("https://ts4.vtraviane.ru/dc/hero/ajax/api/send",{json:JSON.stringify(d.heroExp)},
          function(a){console.log("snap-hero: complete send");
          console.log("snap-hero: end")})
        },
        getList:function(){
          jQuery.getJSON("https://ts4.vtraviane.ru/send/counter/json/get/"+k.account(),
          function(a){l.setList(a);f.set("ttools-counter",JSON.stringify(a))})
        },
        setList:function(a){
          if(void 0===a){
            a=f.get("ttools-counter");
            if(void 0===a)return;
            a=JSON.parse(a)
          }
          b.controlItem(a)
        }
      },
    k={
        page:{
              troops:"https://ts4.travian.ru/dorf3.php?s=5",
              attacks:"https://ts4.travian.ru/build.php?gid=16&filter=1&tt=1&subfilters=1&page=1000",
              attackPage:"https://ts4.travian.ru/build.php?gid=16&filter=1&tt=1&subfilters=1&page=",
              dorf1:"https://ts4.travian.ru/dorf1.php",
              hero:"https://ts4.travian.ru/statistiken.php?id=3&name="
        },
      init:function(){
          jQuery("body").append('<div id="ttools" style="display:none"></div>');
          b.init();
          l.setList();
          setInterval(function(){
            6E4<f.getInterval("message")&&(l.getMessage(!1,function(a){
              a.status?b.showMessage(a.message,a.hash):a.status||"error"!==a.hash||b.showMessage(a.message,a.hash)}),
              f.setInterval("message"))
          },1E4);
              setInterval(function(){
                6E5<f.getInterval("hero")&&(l.getHero(function(a){
                  l.sendHero()
                }),
          f.setInterval("hero"))},11E3);
              setInterval(function(){
                18E4<f.getInterval("list")&&(l.getList(),
                  f.setInterval("list"))},12E3)
      },
      account:function(){
          return jQuery.trim(jQuery(".playerName:first").text())
      },
      isLogin:function(a){
          return""===a.find("#servertime")?(alert("\u0412\u044b \u0438\u043b\u0438 \u0432\u0430\u0448\u0438 \u0434\u0443\u0430\u043b\u044b \u0432\u044b\u0448\u043b\u0438 \u0438\u0437 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430"),!1):!0
        }
        },
    d={
      $randid:function(a){
      var c=Math.floor(9E5*Math.random())+1E5;
          jQuery("#ttools").append('<div id="'+a+c+'"></div>');
          return jQuery("#"+a+c)
      },
      r6andid:function(a){
      var c=Math.floor(9E5*Math.random())+1E5;
      jQuery("#ttools").append('<div id="'+a+c+'"></div>');
      return jQuery("#"+a+c)
      },
      attacks:{},
      heroExp:{},
      troops:{},
      snapTroops:function(a){
        var c=d.$randid("troops"),g={};
        c.load(k.page.troops+" #troops",function(){
          c.find("tbody tr").each(function(){
            var a=jQuery(this).find("th a").attr("href");g[a]={};
            jQuery(this).find("td").each(function(c){g[a][c]=jQuery(this).text()})
          });
        c.remove();
        d.troops=g;a(!0)})
      },
      attackStatus:{
                    not:"not",
                    error:"error",
                    complete:"complete"},
      snapAttacks:function(a){
      var c=d.$randid("attacks"),g=/\d+/i;
      jQuery("#ttoolsSnapcount").text("?");
      c.load(k.page.dorf1+" #background",function(){
        console.log("Snap-attacks: start");
        var b=g.exec(c.find(".heroImage").attr("src"));
        d.attacks.playerUid=b[0];
        d.attacks.serverTime=jQuery("#servertime span.timer").html();
        b=d.activeVillage();
        d.attacks.villageID=b.id;
        d.attacks.attacker={};
        d.attacks.info={};
        c.find(".boxes-contents table tbody tr").each(function(){
          var a=1,b="no";
          jQuery(this).find("td").each(function(){
            if(1===a)jQuery(this).find("img").hasClass("att1")?b="attack":jQuery(this).find("img").hasClass("def1")?b="supply":jQuery(this).find("img").hasClass("att3")?b="attackOasis":jQuery(this).find("img").hasClass("def3")&&(b="supplyOasis"),a++;
            else if(2===a&&"no"!==b){a=1;d.attacks.info[b]={};
            d.attacks.info[b].count=g.exec(jQuery(this).find("div.mov span").text());
            d.attacks.info[b].count=parseInt(d.attacks.info[b].count[0]);
            var c=jQuery(this).find("div.dur_r span").text().match(/\d{1,2}:\d{2}:\d{2}/i);
            d.attacks.info[b].time=c[0]}else a=1})
        });
        if(void 0===d.attacks.info.attack)console.log("Snap-attacks: end (not)"),c.remove(),a(d.attackStatus.not);
        else{console.log("Snap-attacks-parsing: start");
        b=0;
        void 0!==d.attacks.info.attack&&(b+=d.attacks.info.attack.count);
        var e=Math.ceil(b/10);
        jQuery("#ttoolsSnapcount").text(e);b=1E3;
        for(var h=0;h<e;h++)setTimeout(function(a){d.snapPage(e-a);
          console.log(e-a);
          jQuery("#ttoolsSnapcurrent").text(e-a)},b,h),b+=Math.floor(2001*Math.random())+2E3;setTimeout(function(){
            console.log("Snap-attacks-parsing: end");
    a(d.attackStatus.complete)},b)
        }
      })},
      snapPage:function(a){
      var b=d.$randid("snapAttackPage");
      b.load(k.page.attackPage+a+" #background",function(){
        var a=b.find("table.inAttack thead tr td.troopHeadline a:last").attr("href"),
          c=b.find("table.inRaid thead tr td.troopHeadline a:last").attr("href");
        void 0===a&&(a=c);
        void 0===a&&(a=null);
        if(null===a)return d.attackStatus.complete;a=a.match(/\d+/i);
        a=parseInt(a[0]);
        c=(a-1)%401-200;
        a=200-Math.floor((a-1)/401);
        void 0===d.attacks.playerVillageX&&(d.attacks.playerVillageX=c,
          d.attacks.playerVillageY=a);
        c=b.find("div.innerBox.content ul li a.active").attr("href").match(/\d+/i);
        null===c&&(alert("\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437."),location.reload());
        void 0===d.attacks.info.village?d.attacks.info.village=c:d.attacks.info.village[0]!==c[0]&&(alert("\u0410\u043a\u0442\u0438\u0432\u043d\u0430\u044f \u0434\u0435\u0440\u0435\u0432\u043d\u044f \u0431\u044b\u043b\u0430 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0430. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437."),
    location.reload());
        d.snapAttacksFromPage(b.find("div.data"));
        return d.attackStatus.complete})},snapAttacksFromPage:function(a){
      var b=/\d+/i;a.find("table").each(function(){
        if(jQuery(this).hasClass("inAttack")||jQuery(this).hasClass("inRaid")){
          var a=jQuery(this).find("td.role a").attr("href"),c=b.exec(a),e=c[0];
          e in d.attacks.attacker||(d.attacks.attacker[e]={},d.attacks.attacker[e].URL="https://ts4.travian.ru/"+a,
            a=parseInt(e),d.attacks.attacker[e].coordX=(a-1)%401-200,d.attacks.attacker[e].coordY= 200-Math.floor((a-1)/401),
            d.attacks.attacker[e].attacks=[]);
          var h={};
          h.timeOver=jQuery(this).find("div.in span:first").text();
          c=jQuery(this).find("div.at span:first").text().match(/\d{1,2}:\d{2}:\d{2}/i);
          h.time=c[0];jQuery(this).hasClass("inAttack")?h.type="attack":jQuery(this).hasClass("inRaid")&&(h.type="raid");h.units=[];
          jQuery(this).find("tbody.units.last td").each(function(){
            var a=b.exec(jQuery(this).text());
            h.units.push(null===a?"?":a[0])});
          d.attacks.attacker[e].attacks.push(h)}})},
      activeVillage:function(){
      var a={},
        b=jQuery("div.innerBox.content li.active"),
        d=b.find("a.active").attr("href");
      d=/\d+/i.exec(d);
      a.name=b.find("div.name:first").text();
      a.id=parseInt(d[0]);
      a.x=(a.id-1)%401-200;
      a.y=200-Math.floor((a.id-1)/401);
      return a},
      snapHero:function(a,b){
      d.heroExp={};
      if(a.status){console.log("Snap-hero-parsing: start");
      var c=d.$randid("snapHero"),
        f=1E3,e;
      for(e in a.rows)a.rows.hasOwnProperty(e)&&(setTimeout(function(a){
        c.load(k.page.hero+encodeURIComponent(a)+" #background",
          function(){
          var a=c.find(".row_table_data tr.hl td.pla a").attr("href").match(/\d+/i);
    a=a[0];
    d.heroExp[a]=c.find(".row_table_data tr.hl td.xp.lc").text()});
        console.log("Snap-hero-parsing:"+a)},
        f,
        a.rows[e]),f+=Math.floor(2001*Math.random())+2E3);setTimeout(function(){
          console.log("Snap-hero-parsing: end");
          b(!0)},f)}
          else b(!1)}},
    b={
      status:{
        def:!1,
        cut:!1,
        push:!1},
        objects:{button:null,menu:null,window:null},
      init:function(){
        var a=d.$randid("html");
        a.html("<div ttoolsButton data-run = 'no' class='ttbutton'>T</div><div ttoolsMenu class='ttmenu'><div ttoolsSnapattacks class='ttmenubutton'><a href='#' snapAttacks>\u0421\u043d\u044f\u0442\u044c \u043d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u044f</a></div><div ttoolsMessage class='ttmenubutton'><a href='#' ttoolsMessage class='tta'>\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435</a></div>\x3c!--<div ttoolsMessage class='ttmenubutton'><a href='#' ttoolsSnapTroops class='tta'>\u0421\u043d\u044f\u0442\u044c \u0432\u043e\u0439\u0441\u043a\u0430</a></div>--\x3e</div><div ttoolsWindow class='ttwindow'></div>");
      var c=a.find("div[ttoolsButton]").clone().attr("id","ttoolsButton");
      jQuery("#header").append(c);
      b.objects.button=jQuery("#ttoolsButton");
      c=a.find("div[ttoolsMenu]").clone().attr("id","ttoolsMenu");
      jQuery("#bodyWrapper").append(c);
      b.objects.menu=jQuery("#ttoolsMenu");
      b.hide("menu");
      c=a.find("div[ttoolsWindow]").clone().attr("id","ttoolsWindow");
      jQuery("#center").append(c);b.objects.window=jQuery("#ttoolsWindow");
      b.hide("window");b.objects.button.on("click",function(){"no"===jQuery(this).attr("data-run")?
        (jQuery(this).attr("data-run","yes").css("background-color","#555"),
          b.show("menu")):(jQuery(this).attr("data-run","no").css("background-color",""),
            b.hide("menu"),
            b.hide("window"))});
      jQuery("#ttoolsMenu a[snapAttacks]").on("click",function(){
        b.show("window");
        b.objects.window.html('<b>\u041d\u0435 \u043f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0430\u0439\u0442\u0435 \u0434\u0435\u0440\u0435\u0432\u043d\u044e \u043f\u043e\u043a\u0430 \u0432\u0441\u0435 \u043d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u044f \u043d\u0435 \u0431\u0443\u0434\u0443\u0442 \u0441\u043d\u044f\u0442\u044b</b><hr>\u0421\u043d\u044f\u0442\u043e <span id="ttoolsSnapcurrent">-</span> / <span id="ttoolsSnapcount">?</span>');
        d.snapAttacks(function(a){
          a===d.attackStatus.complete?(b.objects.window.html("\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c \u043d\u0430 \u0441\u0435\u0440\u0432\u0435\u0440..."),l.sendAttacks(function(){b.objects.window.html("\u041d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u044f \u0441\u043d\u044f\u0442\u044b.")})):a===d.attackStatus.not&&b.objects.window.html("\u041d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u0439 \u043d\u0430 \u0434\u0435\u0440\u0435\u0432\u043d\u044e \u043d\u0435\u0442, \u043b\u0438\u0431\u043e \u0430\u043a\u0442\u0438\u0432\u043d\u0430\u044f \u0434\u0435\u0440\u0435\u0432\u043d\u044f \u0431\u044b\u043b\u0430 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0430.")})});
      jQuery("#ttoolsMenu a[ttoolsMessage]").on("click",
        function(){
        b.show("window");
      l.getMessage(!0,
        function(a){
        "not"===a.hash?a.message="\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439 \u043d\u0435\u0442":"error"===a.hash&&(a.message="\u0412\u0430\u0448 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 \u043d\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d \u043d\u0430 \u0441\u0430\u0439\u0442\u0435.");b.objects.window.html(a.message)})});jQuery("#ttoolsMenu a[ttoolsSnapTroops]").on("click",
        function(){b.show("window");
        b.objects.window.html("\u0421\u043d\u044f\u0442\u0438\u0435 \u0432\u043e\u0439\u0441\u043a...");d.snapTroops(function(a){!1===a?b.objects.window.html("\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043d\u044f\u0442\u0438\u044f, \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u043d\u0435 \u0430\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d \u041f\u043b\u044e\u0441"):(b.objects.window.html("\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c \u043d\u0430 \u0441\u0435\u0440\u0432\u0435\u0440..."),
          l.sendTroops(function(){
            b.objects.window.html("\u0412\u043e\u0439\u0441\u043a\u0430 \u0441\u043d\u044f\u0442\u044b.")}))})})},appendItem:function(a,c){var d="",f="",e="";"def"!==a||b.status.def?"cut"!==a||b.status.cut?"push"!==a||b.status.push||(d="https://ts4.vtraviane.ru/send/push/"+k.account(),f="\u041f\u0443\u0448-\u043b\u0438\u0441\u0442 ("+c+")",e="ttmenubutton-push",b.status.push=!0):(d="https://ts4.vtraviane.ru/send/cut/"+k.account(),f="\u0421\u0440\u0435\u0437\u043a\u0438 ("+c+")",e="ttmenubutton-cut",
      b.status.cut=!0):(d="https://ts4.vtraviane.ru/send/def/"+k.account(),
        f="\u0414\u0435\u0444-\u043b\u0438\u0441\u0442 ("+c+")",
        e="ttmenubutton-def",
        b.status.def=!0);
            ""!==e&&(d="<div id='"+e+"' class='ttmenubutton'><a href='"+d+"' class='tta' target='_blank'>"+f+"</a></div>",
              jQuery("div[ttoolsMenu]").prepend(d),jQuery("div[ttoolsButton]").addClass("ttbutton-active"))},
      removeItem:function(a){
      jQuery("#ttmenubutton-"+a).remove();
      b.status[a]=!1},controlItem:function(a){
      0<a.def?b.appendItem("def",a.def):
      b.removeItem("def");0<a.cut?b.appendItem("cut",a.cut):b.removeItem("cut");0<a.push?b.appendItem("push",a.push):b.removeItem("push");b.status.push||b.status.cut||b.status.def||jQuery("div[ttoolsButton]").removeClass("ttbutton-active")},showMessage:function(a,c){b.objects.button.attr("data-run","yes").css("background-color","#555");b.show("menu");b.show("window");"error"===c?b.objects.window.html("\u0412\u0430\u0448 \u0430\u043a\u043a\u0430\u0443\u043d\u0442 \u043d\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d \u043d\u0430 \u0441\u0430\u0439\u0442\u0435"):
      b.objects.window.html(a)},
      show:function(a){
        b.objects[a].css("display","block");
        "window"===a&&b.objects.window.html("")
      },
      hide:function(a){
        b.objects[a].css("display","none");
        "window"===a&&b.objects.window.html("")
      }
    };
  k.init()
});
