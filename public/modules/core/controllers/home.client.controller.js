'use strict';

angular
        .module('app.core')
        .controller('AngularCarouselController', AngularCarouselController);

    AngularCarouselController.$inject = ['$scope', '$timeout', '$http', '$interval', 'SweetAlert', 'ngDialog'];

    function AngularCarouselController($scope, $timeout, $http, $interval, SweetAlert, ngDialog) {
        var vm = this;        

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

          if (1 == 1) {
            // homem
            vm.banners = vm.masculino;

          } else {
            //mluher
            vm.banners = vm.feminino;
          }

        }, 20000);

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

        vm.recarga = function() {

          var dialog = ngDialog.openConfirm({
              //template: '<p>Just passing through!{{caro.saldoa}}</p><input type=\'text\' class="form-control" id="saldo" ng-model="caro.saldoa" ng-show="caro.showsaldo" ng-virtual-keyboard="{forcePosition: \'bottom\', enterSubmit:caro.executeSaldo}"/>',
              template: 'tpl.html',
              showClose: false,
              className: 'ngdialog-theme-default',
              closeByEscape: true
            }).then(function(value){
              
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