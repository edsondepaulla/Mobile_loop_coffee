var timeoutVendas = null;
app.controller('Index', function($scope, $rootScope, ReturnData) {
    QRScannerConf.destroy();
    $rootScope.REDIRECT = '';
    $rootScope.NO_WHATSAPP = false;
    $scope.PRODUTOS = ReturnData.PRODUTOS;

    clearInterval(timeoutVendas);
    timeoutVendas = setInterval(function(){
        $rootScope.location('#!/');
    }, 15000);

    $scope.atualizar = function () {
        $rootScope.location('#!/');
    };

    $scope.check = function (REQUEST) {
        if(confirm('Confirmar entrega?')){
            Factory.ajax(
                {
                    action: 'loopcoffee/check',
                    data: {
                        REQUEST: REQUEST
                    }
                },
                function (data) {
                    $rootScope.location('#!/');
                }
            );
        }
    };
});