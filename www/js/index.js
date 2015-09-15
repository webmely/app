/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function disableselect(e){
return false
}
function reEnable(){
return true
}
//if IE4+
document.onselectstart=new Function ("return false")
//if NS6
if (window.sidebar){
document.onmousedown=disable-select
document.onclick=reEnable
}

    // Application Constructor

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
var countb = 0;
$(document).ready(function() {
    $(window).scroll(function(){
        if($(this).scrollTop()!=0){
            $('#backtop').fadeIn();}
        else{
            $('#backtop').fadeOut();}
    });
    $('#backtop').click(function(){
        $('body,html').animate({scrollTop:0},800);
    });

    
    $("#loadmenuuser").load("loadmenuuser.html");

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    
        window.addEventListener("batterystatus", onBatteryStatus, false);
        window.addEventListener("batterycritical", onBatteryCritical, false);
        window.addEventListener("batterylow", onBatteryLow, false);


        //database
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);
        $(".listening").css('display', 'none');
        $(".received").css('display', 'block');
        function successCB() {
        db.transaction(queryDB, errorCB);
        }
        StatusBar.hide();

    }
function onBatteryStatus(info) {
    // Handle the online event
    navigator.notification.alert("Pin: " + info.level + "%, cắm sạc: " + info.isPlugged);
}
function onBatteryCritical(info) {
    // Handle the battery critical event
    navigator.notification.alert("Pin nguy cấp " + info.level + "%\nCắm sặc sớm!");
}
function onBatteryLow(info) {
    // Handle the battery low event
    navigator.notification.alert("Pin yếu: " + info.level + "%");
}
function populateDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name, image, detail)');
    }
function queryDB(tx) {
        tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
    }
function querySuccess(tx, results) {
            var len = results.rows.length;
            var count1 = countb+5;
            if(len<count1) {count1=len;}
            console.log("DEMO table: " + len + " rows found.");
            
            for (var i=countb; i<count1; i++){
                $("#loadcontent").append('<li><a href="show.html?id='+results.rows.item(i).id+'" data-transition="slide"><img src="' + results.rows.item(i).image + '"/><h2>' + results.rows.item(i).name + '</h2></a></li>');
            }
            countb+=5;
             try {
                $("#loadcontent").listview();
              } catch (ex) {}
              try {
                $("#loadcontent").listview("refresh");
              } catch (ex) {}
            
            
        }


function addMore(page) {
    $.mobile.loading("show", {
        text: "loading more..",
        textVisible: true,
        theme: "b"
    });
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    setTimeout(function () {
        db.transaction(queryDB, errorCB);
        $.mobile.loading("hide");
    }, 500);
}

/* scroll event */
$(document).on("scrollstop", function (e) {
    var activePage = $.mobile.pageContainer.pagecontainer("getActivePage"),
        screenHeight = $.mobile.getScreenHeight(),
        contentHeight = $(".ui-content", activePage).outerHeight(),
        scrolled = $(window).scrollTop(),
        header = $(".ui-header", activePage).hasClass("ui-header-fixed") ? $(".ui-header", activePage).outerHeight() - 2 : $(".ui-header", activePage).outerHeight(),
        footer = $(".ui-footer", activePage).hasClass("ui-footer-fixed") ? $(".ui-footer", activePage).outerHeight() - 2 : $(".ui-footer", activePage).outerHeight(),
        scrollEnd = contentHeight - screenHeight + header + footer;
    $(".ui-btn-left", activePage).text("Scrolled: " + scrolled);
    $(".ui-btn-right", activePage).text("ScrollEnd: " + scrollEnd);
    if (activePage[0].id == "homePage" && scrolled >= scrollEnd) {
        console.log("adding...");
        addMore(activePage);
    }
});

function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }
//exit
$("#exitFromApp").on("click",function() {
    navigator.notification.confirm(
            'Do you really want to exit?',  // message
            exitFromApp,              // callback to invoke with index of button pressed
            'Exit',            // title
            'Cancel,OK'         // buttonLabels
        );
       function exitFromApp(buttonIndex) {
      if (buttonIndex==2){
       navigator.app.exitApp();
        }}
    })
 function getUrlVars() {
                var vars = [], hash;
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('#');
                for(var i = 0; i < hashes.length; i++)
                {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
                return vars;
            }
//show

$(document).on("pageshow","#showPage", function (e) {
        var id=getUrlVars()["id"]; 
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(queryDBid, errorCB);
        
        function queryDBid(tx) {
        tx.executeSql('SELECT * FROM DEMO WHERE id='+id, [], querySuccessid, errorCB);
        }
        function querySuccessid(tx, results) {
        $("#ndhead").html(results.rows.item(0).name);
        var tag ='<li><a href="#myPopup" data-rel="popup" data-position-to="window"><img src="' + results.rows.item(0).image + '"><h2>' + results.rows.item(0).name + '</h2><p>' + results.rows.item(0).detail + '</p></a><a href="del.html?id='+results.rows.item(0).id+'" data-rel="dialog" data-transition="slide">Delete</a></li>';
        tag += '<div data-role="popup" id="myPopup"><p>' + results.rows.item(0).detail + '</p> <a href="#pageone" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><img src="' + results.rows.item(0).image + '" style="width:800px;height:400px;" alt="' + results.rows.item(0).name + '"></p></div>';
        $("#nd").append(tag).trigger('create');
        try {
                $("#nd").listview();
              } catch (ex) {}
              try {
                $("#nd").listview("refresh");
              } catch (ex) {}
        $("#name").val(results.rows.item(0).name);
        $("#mota").val(results.rows.item(0).detail);
        $("#editb").click(function(e) {
            e.preventDefault();
            n = $("#name").val();
            mt = $("#mota").val();
            if (n=='' || mt=='') {
                navigator.notification.alert('Vui lòng nhập tiêu đề và mô tả vào!');}
            else {
                db.transaction(updateDB, errorCB);
                
            }
            function updateDB(tx) {
            tx.executeSql("UPDATE DEMO SET name='" + n + "', detail='" + mt + "' WHERE id='"+id+"'",[], successupdate,errorCB);
            
            }
            function successupdate() {
            $.mobile.pageContainer.pagecontainer("change", "index.html");
            countb = 0;
            $("#loadcontent").empty();
            db.transaction(queryDB, errorCB);
            }
            
        })

        }
});


//endshow
//del
$(document).on("pageshow","#delPage", function (e) {
        var id=getUrlVars()["id"]; 
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        $("#delDB").on("click", function() {
            db.transaction(delDBid, errorCB);
        })
        function delDBid(tx) {
            tx.executeSql('DELETE FROM DEMO WHERE id='+id+'',[], successdel,errorCB);
        }
        function successdel() {
            $.mobile.pageContainer.pagecontainer("change", "index.html");
            countb = 0;
            $("#loadcontent").empty();
            db.transaction(queryDB, errorCB);
        }
})
//enddel
//post
$(document).on("pageshow","#postPage", function() {
    //success
    function onCamSuccess(imageURI) {
            document.getElementById("camImg").src = imageURI;
            document.getElementById("status").innerHTML = "Ảnh đã chọn";
            navigator.notification.beep(1);
            navigator.notification.vibrate(2000);
            $("#camImg").css("display","block").show(1000);
            $("#form,#submitt").css("display","block");
            $("#submitt").click(function (e) {
            e.preventDefault();
            n = $("#name").val();
            mt = $("#mota").val();
            if (n=='' || mt=='') {
                navigator.notification.alert('Vui lòng nhập tiêu đề và mô tả vào!');}
            else {
                function insertDB(tx) {
                    tx.executeSql("INSERT INTO DEMO (name, image, detail) VALUES ('"+n+"', '"+imageURI+"', '"+mt+"')");
                }
                var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
                db.transaction(insertDB, function(err) {navigator.notification.alert('Lỗi:!'+err.code)}, function() {
                    navigator.notification.alert('Thành công!');
                    $.mobile.pageContainer.pagecontainer("change", "index.html");
                    countb = 0;
            $("#loadcontent").empty();
            db.transaction(queryDB, errorCB);
            });
            }
            });
        }
        //end success
        //err
        function onCamError(message) {
                document.getElementById("status").innerHTML = "Camera error: " + message;
            }
        //end err
        //take pic
        $("#newPicLink").click(function (e) {
                navigator.camera.getPicture(onCamSuccess, onCamError, { quality: 100, correctOrientation: true, destinationType: Camera.DestinationType.FILE_URI, targetWidth: 200, targetHeight: 200 });
                e.preventDefault();
            });
        //end take
        //choose pic lib
        $("#existingPicLink").click(function (e) {
                navigator.camera.getPicture(onCamSuccess, onCamError, { sourceType: Camera.PictureSourceType.PHOTOLIBRARY, destinationType: Camera.DestinationType.FILE_URI, quality: 50, targetWidth: 200, targetHeight: 200 });
                e.preventDefault();
            });
        //end choose lib
    });
//end post


});
