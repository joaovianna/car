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
var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    
    
    
    
onDeviceReady: function() {
    var watchID = null;
    app.receivedEvent('deviceready');
 //   $('#myPopupDiv').popup();
    checkPreAuth();
    
    
//if(window.localStorage["rtb"]=="on")
if(true)
    {
    socket = io.connect('http://jornal.us:7777');
    socket.on('connect', function(){
              navigator.notification.alert("Connected", function() {});

              socket.emit('register', usuario );
              });
    socket.on('disconnect', function () {
              navigator.notification.alert("Disconnected from Base", function() {});
               });
    socket.on('error', function(){
              navigator.notification.alert("Connection failed trying to reach Base", function() {});

              });
    socket.on('connect_failed', function(){
              navigator.notification.alert("Connection failed trying to reach Base", function() {});
              });
    socket.on('reconnect', function(){
              navigator.notification.alert("Reconnecting to reach Base", function() {});
              });
}
    function checkPreAuth() {
        var form = $("#loginForm");
        if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
            $("#username", form).val(window.localStorage["username"]);
            $("#password", form).val(window.localStorage["password"]);
            usuario=window.localStorage["username"];
            company=window.localStorage["company"];
            companyname=window.localStorage["companyname"];
            drivername=window.localStorage["drivername"];
            
            //$.mobile.changePage("#maintela");

        }
        else
        {
                $.mobile.changePage("#logintela");
        }
    }
    $( "#rtb" ).bind( "change", function(event, ui) {
                     window.localStorage["rtb"] = $(this).val();
    });
    $("#jobs").click(function() {
                     $.mobile.loading( 'show', { text: 'Loading...', textVisible: true, theme: 'z', html: "" });
                     $.get("http://www.jornal.us/cordova/cars/busca_jobs.php?driver="+usuario+"&company="+company, function(data){$("#result").html(data);$('#result').trigger('create');
                           $.mobile.loading( 'hide', { text: 'Loading...', textVisible: true, theme: 'z', html: "" });
   
                           });

                     });
    $("#other").click(function() {
                      $.mobile.loading( 'show', { text: 'Loading...', textVisible: true, theme: 'z', html: "" });

                      $.get("http://www.jornal.us/cordova/cars/busca_other.php?driver="+usuario, function(data){$("#result").html(data);$('#result').trigger('create');
                            $.mobile.loading( 'hide', { text: 'Loading...', textVisible: true, theme: 'z', html: "" });
                            });
                      });
    
    $("#finished").click(function() {
                         $.mobile.loading( 'show', { text: 'Loading...', textVisible: true, theme: 'z', html: "" });
                      $.get("http://www.jornal.us/cordova/cars/busca_finished.php?driver="+usuario, function(data){$("#result").html(data);$('#result').trigger('create');
                            $.mobile.loading( 'hide', { text: 'Loading...', textVisible: true, theme: 'z', html: "" });
                            });
                      });
    
    

    
    $("#logout").click(function() {
                       window.localStorage.clear();
                       usuario=null;
                       $.mobile.changePage("index.html");
                       });
    $("#login").click(function() {
                       $.mobile.changePage("#logintela");
                       });
    $("#loginForm").on("submit",function(e) {
                       //disable the button so we can't resubmit while we wait
                       var u = $("#username", this).val();
                       var p = $("#password", this).val();
                       if(u != '' && p!= '') {
                         $.ajax({
                              type: "POST",
                                cache: false,
                              url: "http://www.jornal.us/cordova/cars/login.php",
                              data: { username: u, password: p}
                              }).done(function( msg ) {

                                      var obj = jQuery.parseJSON(msg);
                                    if(obj.ret=='success')
                                      {
                                        navigator.notification.alert("Login accepted", function() {});
                                      window.localStorage["username"] = obj.driver;
                                      window.localStorage["password"] = p;
                                      window.localStorage["company"] = obj.company;
                                      window.localStorage["companyname"] = obj.companyname;
                                      window.localStorage["drivername"] = obj.drivername;
                                      
                                      usuario=u;
                                      company=obj.company;
                                      $.mobile.changePage("index.html");
                                                                              }
                                      else
                                      {
                                        navigator.notification.alert("Access denied", function() {});
                                      }
                                      });
                       }
                       return false;
                       });
    
    
    
    
},
    // Update DOM on a Received Event
receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');
    
    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');
    
    console.log('Received Event: ' + id);
}
    
    
};





