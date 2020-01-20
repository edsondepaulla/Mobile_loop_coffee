app.controller('Index', function($scope, $rootScope, ReturnData) {
    QRScannerConf.destroy();
    $rootScope.REDIRECT = '';
    $rootScope.NO_WHATSAPP = false;
    $scope.PRODUTOS = ReturnData.PRODUTOS;

    $scope.atualizar = function () {
        Factory.ajax(
            {
                action: 'pedidos/atualizar'
            },
            function (data) {
                $rootScope.location('#!/');
            }
        );
    };

    $scope.check = function (PROD) {
        if(confirm('Confirmar entrega?')){
            Factory.ajax(
                {
                    action: 'pedidos/check',
                    data: {
                        ID: PROD.ID_PEDIDO
                    }
                },
                function (data) {
                    $rootScope.location('#!/');
                }
            );
        }
    };
});