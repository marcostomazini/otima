'use strict';

angular
        .module('app.core')
        .controller('AngularCarouselController', AngularCarouselController);

    AngularCarouselController.$inject = ['$scope', '$timeout', '$http', '$interval', 'SweetAlert', 'ngDialog'];

    function AngularCarouselController($scope, $timeout, $http, $interval, SweetAlert, ngDialog) {
        var vm = this;       

        document.body.style.cursor = 'none'; 

        vm.showsaldo = false;
        vm.principal = false;

        vm.masculino = [{
                  id: 1,
                  label: 'slide #1',
                  desc: 'Museu',
                  img: '/server/h1.jpg'
              },
              {
                  id: 2,
                  label: 'slide #2',
                  desc: 'Ponto Turistico',
                  img: '/server/h2.png'
              }];

              vm.feminino = [{
                  id: 1,
                  label: 'slide #1',
                  desc: 'Museu',
                  img: '/server/f1.jpeg'
              },
              {
                  id: 2,
                  label: 'slide #2',
                  desc: 'Ponto Turistico',
                  img: '/server/f2.jpg'
              }];

        $interval(function() {
          vm.principal = !vm.principal;

          $http({
            method: 'GET',
            url: '/photo'
          }).then(function successCallback(response) {
            console.log('Cloudinary: ' + response);
            $http({
              method: 'GET',
              url: 'https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?attribute=glass%2Cpose%2Cgender%2Cage%2Crace%2Csmiling&url=' + response.data.type.url,
              headers: {
                'X-Mashape-Key': '68auyH9m7AmshPkopQT9CBqS45G2p1pRjeujsn0y9YlTF9elT4',
                'Accept': 'application/json'
              }
            }).then(function successCallback(response2) {
              console.log('Api Reconhecimento: ' + response2);
              var face = response2.data.face[0];
              if (face != null) {
                if (face.attribute.gender.value == "Female") {
                  vm.banners = vm.feminino;
                }
                else {
                  vm.banners = vm.masculino;
                }
              }
            }, function errorCallback(response2) {

            });                   
          }, function errorCallback(response) {

          });          
        }, 60000);

        activate();        

        vm.executeSaldo = function() {
          vm.showsaldo = false;
          vm.saldo = '';

          $http({
            method: 'GET',
            url: 'http://campusparty.cittamobi.com.br/recharge/balance/' + vm.saldo
          }).then(function successCallback(response) {            
            SweetAlert.swal({   
              title: "Saldo",   
              text: 'R$: ' + response.data.balance.toFixed(2),
              timer: 10000,   
              showConfirmButton: true 
            });        
          }, function errorCallback(response) {

          });
        }

        vm.teste = function() {
          vm.showsaldo = true;         

          $timeout(function(){
            $('#saldo').focus();
          }, 0);
        }

        vm.feedback = function() {

          var dialog = ngDialog.openConfirm({
              //template: '<p>Just passing through!{{caro.saldoa}}</p><input type=\'text\' class="form-control" id="saldo" ng-model="caro.saldoa" ng-show="caro.showsaldo" ng-virtual-keyboard="{forcePosition: \'bottom\', enterSubmit:caro.executeSaldo}"/>',
              template: 'feedback.html',
              showClose: false,
              className: 'ngdialog-theme-default',
              closeByEscape: true
            }).then(function(value){
              SweetAlert.swal('Sucesso!', 'seu feedback foi enviada com sucesso, obrigado!', 'success');              
            }, function(value){
              console.log('rejected:' + value);
            });
            setTimeout(function () {
              dialog.close();
            }, 30000);
        }

        vm.recarga = function() {

          var dialog = ngDialog.openConfirm({
              //template: '<p>Just passing through!{{caro.saldoa}}</p><input type=\'text\' class="form-control" id="saldo" ng-model="caro.saldoa" ng-show="caro.showsaldo" ng-virtual-keyboard="{forcePosition: \'bottom\', enterSubmit:caro.executeSaldo}"/>',
              template: 'tpl.html',
              showClose: false,
              className: 'ngdialog-theme-default',
              closeByEscape: true
            }).then(function(value){
              
              try {
                var data = {
                  "card": value.numerocartao, //            <-- Número do bilhete eletrônico que deve receber os créditos
                  "value": value.valor,       //           <-- Valor da recarga em centavos de R$
                  "payment": {
                    "card": value.numerocartaocredito, //    <-- Número do cartão de crédito
                    "cvv": value.cvv,               //    <-- Código de verificação
                    "owner": value.nomecartao,   //    <-- Nome no cartão
                    "expires": value.expiracao        //    <-- Validade do cartão
                  }
                };

                 $http.put('http://campusparty.cittamobi.com.br/recharge/balance', data)
                    .success(function (data, status, headers, config) {
                        SweetAlert.swal('Sucesso!', 'Seu novo saldo é R$: ' + data.balance , 'success');
                    })
                    .error(function (data, status, header, config) {
                      SweetAlert.swal({   
                        title: 'Por favor, revise os dados e tente novamente, obrigado!!',   
                        text: 'Problema em alguma informacão incorreta.',   
                        type: 'warning',   
                        confirmButtonColor: '#DD6B55',   
                        confirmButtonText: 'OK!',
                        closeOnConfirm: true
                      },  function(){  
                        
                      });
                    });
              } catch(ex) {
                SweetAlert.swal({   
                  title: 'Por favor, revise os dados e tente novamente, obrigado!!',   
                  text: 'Alguma informacão não foi preenchida.',   
                  type: 'warning',   
                  confirmButtonColor: '#DD6B55',   
                  confirmButtonText: 'OK!',
                  closeOnConfirm: true
                },  function(){  
                  
                });
              }                   
              // Perform the save here
            }, function(value){
              console.log('rejected:' + value);
            });

            setTimeout(function () {
              dialog.close();
            }, 120000);
        }

        function activate() {          

          vm.carouselIndex = 3;
          vm.carouselIndex2 = 0;
          vm.carouselIndex2 = 1;
          vm.carouselIndex3 = 5;
          vm.carouselIndex4 = 5;


          vm.pontos = [{
                  id: 1,
                  label: 'slide #1',
                  desc: 'Museu',
                  img: '/server/pt1.jpg'
              },
              {
                  id: 2,
                  label: 'slide #2',
                  desc: 'Ponto Turistico',
                  img: '/server/pt2.jpg'
              },{
                  id: 3,
                  label: 'slide #3',
                  desc: 'São Paulo',
                  img: '/server/pt3.jpg'
              }];

          // 3rd ngRepeat demo
          vm.banners = [{
                  id: 1,
                  label: 'slide #1',
                  desc: 'Museu',
                  img: '/server/h1.jpg'
              },
              {
                  id: 2,
                  label: 'slide #2',
                  desc: 'Ponto Turistico',
                  img: '/server/h2.png'
              },{
                  id: 3,
                  label: 'slide #3',
                  desc: 'São Paulo',
                  img: '/server/f1.jpg'
              }];
        }
    }