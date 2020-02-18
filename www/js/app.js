app.config(function($routeProvider, $mdThemingProvider, $mdDateLocaleProvider, $httpProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(geo):/);
    $mdThemingProvider.generateThemesOnDemand(true);
    $httpProvider.defaults.withCredentials = true;

    /*
     * Route
     */
    $routeProvider
        .when("/qr-code", {
            templateUrl: "view/qr-code/index.html",
            controller: 'QrCode',
            resolve: {
                ReturnData: function ($route, $rootScope) {
                    if (Page.active) {
                        if (parseInt(Login.getData().ID)) {
                            if (!parseInt(Login.getData().DADOS_ATUALIZADO)) {
                                $rootScope.REDIRECT = btoa('#!/qr-code');
                                $rootScope.location('#!/cadastro');
                            }
                        } else {
                            $rootScope.REDIRECT = btoa('#!/qr-code');
                            $rootScope.location('#!/conecte-se');
                        }
                    } else
                        window.history.go(-1);
                }
            }
        })
        .when("/", {
            templateUrl: "view/index/index.html",
            controller: 'Index',
            resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'loopcoffee/lst'
                        }
                    );
                }
            }
        })
        .when("/conecte-se", {
            templateUrl: "view/conecte-se/conecte-se.html",
            controller: 'ConecteSe',
            resolve: {
                ReturnData: function ($route) {
                    return Login.get('#!/cadastro');
                }
            }
        })
        .when("/cadastro", {
            templateUrl: "view/conecte-se/form.html",
            controller: 'Cadastro',
            resolve: {
                ReturnData: function ($route, $rootScope) {
                    return parseInt($rootScope.usuario.ID) || !$rootScope.usuario.NOVO ? Login.get() : null;
                }
            }
        })
        .when("/conecte-se-codigo", {
            templateUrl: "view/conecte-se/codigo.html",
            controller: 'ConecteSeCodigo'
        })
        .when("/minha-carteira", {
            templateUrl: "view/conecte-se/carteira.html",
            controller: 'MinhaCarteira',
            resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'cadastro/minhacarteira'
                        }
                    );
                }
            }
        })
        .when("/voucher", {
            templateUrl: "view/conecte-se/voucher.html",
            controller: 'VoucherLst',
            resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'cadastro/voucher'
                        }
                    );
                }
            }
        })
        .when("/atualizar-app", {
            templateUrl: "view/pages/atualizar-app.html",
            controller: 'AtualizarApp',
            resolve: {
                ReturnData: function ($route) {
                    if (Page.active) {
                        return Factory.ajax(
                            {
                                action: 'options/atualizarapp'
                            }
                        );
                    } else
                        window.history.go(-1);
                }
            }
        })
        .when("/relatorio", {
            templateUrl: "view/pages/relatorio.html",
            controller: 'Relatorio',
            resolve: {
                ReturnData: function () {
                    return Factory.ajax(
                        {
                            action: 'loopcoffee/relatorio'
                        }
                    );
                }
            }
        })
        .when("/relatorio/:DATA", {
            templateUrl: "view/pages/relatorio.html",
            controller: 'Relatorio',
            resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'loopcoffee/relatorio',
                            data: {
                                DATA: $route.current.params.DATA
                            }
                        }
                    );
                }
            }
        })
        .when("/token/:TOKEN", {
            templateUrl: "view/pages/token.html",
            controller: 'Token',
            resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'options/token',
                            data: {
                                TOKEN: $route.current.params.TOKEN
                            }
                        }
                    );
                }
            }
        })
        .when("/voucher/:ID", {
            templateUrl: "view/conecte-se/voucher-detalhes.html",
            controller: 'VoucherGet',
            resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'cadastro/voucher',
                            data: {
                                ID: $route.current.params.ID
                            }
                        }
                    );
                }
            }
        })
        .when("/historico-transacoes", {
            templateUrl: "view/conecte-se/historico-transacoes.html",
            controller: 'HistoricoTransacoesLst',
            resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'cadastro/historicotransacoes'
                        }
                    );
                }
            }
        })
        .when("/suporte", {
            templateUrl: "view/pages/suporte.html",
            controller: 'Suporte'
        })
        .when("/faq", {
            templateUrl: "view/pages/faq.html",
            controller: 'Faq',
            resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'options/faq'
                        }
                    );
                }
            }
        })
        .when("/historico-transacoes/:ID", {
            templateUrl: "view/conecte-se/historico-transacoes-detalhes.html",
            controller: 'HistoricoTransacoesGet',
            resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'cadastro/historicotransacoes',
                            data: {
                                ID: $route.current.params.ID
                            }
                        }
                    );
                }
            }
        })
        .when("/maquinas", {
            templateUrl: "view/maquinas/lst.html",
            controller: 'MaquinasLst',
            resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'maquinas/lst'
                        }
                    );
                }
            }
        })
        .when("/maquinas-filtros", {
            templateUrl: "view/maquinas/filtros.html",
            controller: 'MaquinasFiltros'
        })
        .when("/maquinas/:ID", {
            templateUrl: "view/maquinas/get.html",
            controller: 'MaquinasGet',
                resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'maquinas/get',
                            data: {
                                ID: $route.current.params.ID
                            }
                        }
                    );
                }
            }
        })
        .when("/produtos/:MAQUINA/:JSON", {
            templateUrl: "view/produtos/get.html",
            controller: 'ProdutosGet',
            resolve: {
                ReturnData: function ($route) {
                    return Factory.ajax(
                        {
                            action: 'produtos/get',
                            data: {
                                MAQUINA: $route.current.params.MAQUINA,
                                JSON: $route.current.params.JSON
                            }
                        }
                    );
                }
            }
        })
        .when("/payment/:MAQUINA", {
            templateUrl: "view/payment/start.html",
            controller: 'PaymentStart',
            resolve: {
                ReturnData: function ($route, $rootScope) {
                    if (Page.active) {
                        if (parseInt(Login.getData().ID)) {
                            if (parseInt(Login.getData().DADOS_ATUALIZADO)) {
                                return Factory.ajax(
                                    {
                                        action: 'payment/start',
                                        data: {
                                            MAQUINA: $route.current.params.MAQUINA
                                        }
                                    }
                                );
                            } else {
                                $rootScope.REDIRECT = btoa('#!/payment/' + $route.current.params.MAQUINA);
                                $rootScope.location('#!/cadastro');
                            }
                        } else {
                            $rootScope.REDIRECT = btoa('#!/payment/' + $route.current.params.MAQUINA);
                            $rootScope.location('#!/conecte-se');
                        }
                    } else
                        window.history.go(-1);
                }
            }
        })
        .when("/payment/:MAQUINA/:JSON", {
            templateUrl: "view/payment/start.html",
            controller: 'PaymentStart',
            resolve: {
                ReturnData: function ($route, $rootScope) {
                    if (Page.active) {
                        if (parseInt(Login.getData().ID)) {
                            if (parseInt(Login.getData().DADOS_ATUALIZADO)) {
                                return Factory.ajax(
                                    {
                                        action: 'payment/start',
                                        data: {
                                            MAQUINA: $route.current.params.MAQUINA,
                                            JSON: $route.current.params.JSON
                                        }
                                    }
                                );
                            } else {
                                $rootScope.REDIRECT = btoa('#!/payment/' + $route.current.params.MAQUINA);
                                $rootScope.location('#!/cadastro');
                            }
                        } else {
                            $rootScope.REDIRECT = btoa('#!/payment/' + $route.current.params.MAQUINA);
                            $rootScope.location('#!/conecte-se');
                        }
                    } else
                        window.history.go(-1);
                }
            }
        })
        .when("/ajuda", {
            templateUrl: "view/ajuda/index.html",
            controller: 'Ajuda'
        })
        .when("/sem-internet", {
            templateUrl: "view/sem-internet/index.html",
            controller: 'SemInternet'
        });
});

app.controller('SemInternet', function($rootScope, $scope, $routeParams) {
    $rootScope.border_top = 1;
    $rootScope.Titulo = "Ops...";
    QRScannerConf.destroy();
});

app.controller('Faq', function($rootScope, $scope, $routeParams, ReturnData) {
    $rootScope.border_top = 1;
    $rootScope.Titulo = "FAQ";
    QRScannerConf.destroy();
    $scope.CONTENT = ReturnData.CONTENT;
    $scope.LST = ReturnData.LST;
    $rootScope.REDIRECT = '';
});

app.controller('Relatorio', function($scope, $rootScope, ReturnData) {
    $rootScope.border_top = 1;
    $rootScope.Titulo = "Relatório";
    QRScannerConf.destroy();
    $rootScope.REDIRECT = '';
    $scope.PRODUTOS = ReturnData.PRODUTOS;
    $scope.TOTAL = ReturnData.TOTAL;
    $scope.DATA = ReturnData.DATA;
    clearInterval(timeoutVendas);
});

app.controller('Token', function($rootScope) {
    $rootScope.border_top = 1;
    $rootScope.Titulo = "Token";
    QRScannerConf.destroy();
    $rootScope.REDIRECT = '';
});

app.controller('Suporte', function($rootScope) {
    $rootScope.border_top = 1;
    $rootScope.Titulo = "Suporte";
    QRScannerConf.destroy();
    $rootScope.REDIRECT = '';
    $rootScope.NO_WHATSAPP = false;
});

app.controller('AtualizarApp', function($rootScope, $scope, ReturnData) {
    $rootScope.border_top = 1;
    $rootScope.Titulo = "Nova versão";
    QRScannerConf.destroy();
    $rootScope.REDIRECT = '';
    $scope.REG = ReturnData;
});

app.controller('Main', function($rootScope, $scope, $http, $routeParams, $route, $mdSelect, $animate, $sce, deviceDetector) {
    navigator.geolocation;
    Factory.prepare();

    $rootScope.device = deviceDetector.os;

    $rootScope.versao_app_mobile = config.versao_app_mobile;
    $rootScope.REDIRECT = '';
    Factory.$http = $http;
    Factory.$rootScope = $rootScope;

    // Get login
    Login.get();

    // User
    $rootScope.usuario = Login.getData();

    $rootScope.NO_WHATSAPP = true;
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.menuClose();
    });

    $rootScope.controller = 'Index';
    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.NO_WHATSAPP = true;
        $rootScope.border_top = 0;
        $rootScope.controller = $route.current.controller;
        $rootScope.toolbar = true;
        setTimeout(function () {
            var position = $('.scrollable-content').position();
            if (position)
                $('.scrollable-content').css('padding-bottom', position.top + 70);
            $('body').attr('scroll-top', $('.scrollable-content:visible').scrollTop() || 0);
        }, 1000);
    });

    $rootScope.trustAsHtml = function (string) {
        return $sce.trustAsHtml(string);
    };

    $rootScope.AppBrowser = function (open_browser) {
        if (open_browser.url)
            Factory.AppBrowser(open_browser.url, open_browser);
    };

    $rootScope.TEXT_WHATSAPP = '';
    $rootScope.whatsapp = function () {
        if ($rootScope.usuario.WHATSAPP.ATIVO) {
            Factory.AppBrowser(
                $rootScope.usuario.WHATSAPP.url + $rootScope.TEXT_WHATSAPP,
                $rootScope.usuario.WHATSAPP
            );
        }
    };

    $rootScope.backpageTop = function () {
        $('.scrollable:first').attr('backpage', 1);
        window.history.go(-1);
    };

    $rootScope.logout = function () {
        Login.logout();
        $rootScope.location('#!/');
    };

    $rootScope.swipeLeft = function () {
        $rootScope.menuClose();
    };

    $rootScope.swipeRight = function () {
        if (!$('[ng-controller="Modal"]').is(':visible'))
            $rootScope.menuOpen();
    };

    $rootScope.location = function (url, external, active) {
        if (active)
            Page.start();
        if (parseInt(external)) {
            $rootScope.swipeLeft();
            try {
                cordova.InAppBrowser.open(url, '_self');
            } catch (e) {
                window.open(url, '_system');
            }
        } else {
            switch (url) {
                case '#!/minha-carteira':
                case '#!/cadastro':
                    if ((!parseInt(Login.getData().ID) && !Page.active)) {
                        $rootScope.REDIRECT = btoa(url);
                        url = '#!/conecte-se';
                    } else if (url == '#!/minha-carteira' && parseInt(Login.getData().ID) && !parseInt(Login.getData().DADOS_ATUALIZADO)) {
                        $rootScope.REDIRECT = btoa(url);
                        url = '#!/cadastro';
                    }
                    break;
            }

            if (url.indexOf('#!/payment') !== -1
                || url.indexOf('#!/conecte-se') !== -1
                || url.indexOf('#!/conecte-se-codigo') !== -1
                || url.indexOf('#!/qr-code') !== -1)
                Page.start();

            window.location = url;
            $route.reload();
        }
    };

    // Menu
    $rootScope.MenuLeft = [
        {
            titulo: 'Vendas',
            url: '#!/',
            icon: 'mdi-action-home',
            logado: 1
        },
        {
            titulo: 'Relatório',
            url: '#!/relatorio',
            icon: 'mdi-social-domain',
            logado: 1
        }
    ];

    var menuClose_time = null;
    $rootScope.menuOpen = function () {
        clearTimeout(menuClose_time);
        $('#fundo_transparente').css('display', 'block');
        setTimeout(function () {
            $('#fundo_transparente').css('opacity', '0.5').css('display', 'block');
        }, 1);
        $('.Menuleft').css('left', '0%');
        $('body').attr('menu_left', 1);
    };
    $rootScope.menuClose = function () {
        $('.Menuleft').css('left', '-70%');
        $('#fundo_transparente').css('opacity', '0');
        menuClose_time = setTimeout(function () {
            $('#fundo_transparente').hide();
        }, 1000);
        $('body').removeAttr('menu_left');
    };

    /*
     * Payment
     */
    $rootScope.dadosInvalidosCC = function () {
        Factory.alert('Dados de cartão de créditos inválidos!');
    };
    $rootScope.pagseguro = function (paymentPagSeguro, origem) {
        $rootScope.PAGSEGURO_SESSIONID = null;
        try {
            Factory.ajax(
                {
                    action: 'payment/pagseguro'
                },
                function (data) {
                    if (data.SESSIONID) {
                        $rootScope.PAGSEGURO_SESSIONID = data.SESSIONID;
                        PagSeguroDirectPayment.setSessionId($rootScope.PAGSEGURO_SESSIONID);
                        if (parseInt(paymentPagSeguro))
                            $rootScope.paymentPagSeguro(origem);

                        PagSeguroDirectPayment.getPaymentMethods({
                            success: function (data) {
                                if (data.paymentMethods) {
                                    var seq = 0;
                                    $rootScope.BANDEIRAS = {};
                                    $.each(data.paymentMethods.CREDIT_CARD.options, function (idx, item) {
                                        $rootScope.BANDEIRAS[seq] = config.url_api[config.ambiente] + 'skin/default/images/bandeira_cc/' + item.name.toLowerCase() + '.png';
                                        seq++;
                                    });
                                }
                            }
                        });
                    }
                }
            );
        } catch (e) {

        }
    };
    var verifyLimitFormasPg = null;
    $rootScope.verifyLimitFormasPg = function () {
        if ($rootScope.transacaoId) {
            clearTimeout(verifyLimitFormasPg);
            verifyLimitFormasPg = setTimeout(function () {
                Factory.ajax(
                    {
                        action: 'payment/confirm',
                        data: {
                            VERIFICA_LIMITE_FORMAS_PG: 1,
                            UTILIZADO_SALDO: $rootScope.ACTIVE_SALDO ? 1 : 0,
                            VOUCHER: $rootScope.VOUCHER || 0,
                            TRANSACAO_ID: $rootScope.transacaoId
                        }
                    },
                    function (data) {
                        $rootScope.VALOR_PG = parseFloat(data.VALOR_PG || 0);
                        $rootScope.VALOR_PG_FORMAT = data.VALOR_PG_FORMAT;
                    }
                );
            }, 50);
        }
    };
    $rootScope.selectFormaPg = function (PG) {
        if (PG.ACTIVE) {
            if (!$('#boxCC:hover').length) {
                PG.ACTIVE = 0;
                $rootScope.FORMA_PAGAMENTO = null;
            }
        } else {
            if (PG.TIPO != 'SALDO' && PG.TIPO != 'VOUCHER') {
                $.each($rootScope.FORMAS_PG, function (idx, item_each) {
                    item_each.ACTIVE = 0;
                });
                PG.ACTIVE = 1;
                $rootScope.FORMA_PAGAMENTO = PG;
                setTimeout(function () {
                    $('#cardNumber').focus().blur();
                }, 100);
            }
        }
        if (PG.TIPO == 'SALDO') {
            $rootScope.ACTIVE_SALDO = PG.ACTIVE_SALDO ? 0 : 1;
            PG.ACTIVE_SALDO = $rootScope.ACTIVE_SALDO;
            $rootScope.verifyLimitFormasPg();
        }
    };
    $rootScope.paymentPagSeguro = function (origem) {
        if (parseInt($rootScope.FORMA_PAGAMENTO.CC)) {
            PagSeguroDirectPayment.getBrand({
                cardBin: $rootScope.FORMA_PAGAMENTO.cardNumber.toString().replace(/ /g, '').substring(0, 6),
                success: function (bandeira) {
                    var expirationMonthYear = $rootScope.FORMA_PAGAMENTO.expirationMonthYear.toString().split('/');
                    var data = {
                        cardNumber: $rootScope.FORMA_PAGAMENTO.cardNumber.toString().replace(/ /g, ''),
                        brand: bandeira.brand.name,
                        cvv: $rootScope.FORMA_PAGAMENTO.cvv.toString(),
                        expirationMonth: expirationMonthYear[0],
                        expirationYear: '20' + expirationMonthYear[1],
                        success: function (data) {
                            if (data.card.token) {
                                $rootScope.processPayment(
                                    origem,
                                    {
                                        PAGSEGURO_HASH: PagSeguroDirectPayment.getSenderHash(),
                                        PAGSEGURO_TOKEN: data.card.token
                                    }
                                );
                            } else
                                $rootScope.dadosInvalidosCC();
                        },
                        error: function (error) {
                            $rootScope.dadosInvalidosCC();
                        }
                    };
                    PagSeguroDirectPayment.createCardToken(data);
                },
                error: function (error) {
                    $rootScope.dadosInvalidosCC();
                }
            });
        } else {
            $rootScope.processPayment(
                origem,
                {
                    PAGSEGURO_HASH: PagSeguroDirectPayment.getSenderHash()
                }
            );
        }
    };
    var clearTimeoutProcessPayment = null;
    $rootScope.processPayment = function (origem, extra) {
        clearTimeout(clearTimeoutProcessPayment);
        clearTimeoutProcessPayment = setTimeout(function () {
            $('#btnConfirme').attr('disabled', true);
            switch (origem) {
                case 'saldo':
                    Factory.ajax(
                        {
                            action: 'cadastro/addsaldo',
                            data: {
                                FORMA_PAGAMENTO: $rootScope.FORMA_PAGAMENTO,
                                VALOR_PG: $rootScope.VALOR_PG,
                                EXTRA: extra
                            }
                        },
                        function () {
                            $('#btnConfirme').attr('disabled', false);
                        },
                        function () {
                            $('#btnConfirme').attr('disabled', false);
                        }
                    );
                    break;
                case 'compra':
                    Factory.ajax(
                        {
                            action: 'payment/confirm',
                            data: {
                                UTILIZADO_SALDO: $rootScope.ACTIVE_SALDO,
                                VOUCHER: $rootScope.VOUCHER || 0,
                                FORMA_PAGAMENTO: $rootScope.FORMA_PAGAMENTO,
                                TRANSACAO_ID: $rootScope.transacaoId,
                                EXTRA: extra
                            }
                        },
                        function (data) {
                            $('#btnConfirme').attr('disabled', false);
                            if (parseInt(data.status) != 2)
                                $rootScope.showBtnCancel = $rootScope.showPaymentFlag = false;

                            switch (parseInt(data.status)) {
                                case 1:
                                    $rootScope.verify();
                                    break;
                                case 2:
                                    $rootScope.showBtnCancel = $rootScope.showPaymentFlag = true;
                                    break;
                                default:
                                    Payment.cancel();
                                    break;
                            }
                        },
                        function () {
                            $('#btnConfirme').attr('disabled', false);
                        }
                    );
                    break;
            }

        }, 100);
    };
    $rootScope.confirmPayment = function (origem) {
        var valido = false;
        if ($rootScope.FORMA_PAGAMENTO && $('#boxPg > ul > li.active').length) {
            $.each($rootScope.FORMAS_PG, function (idx, item_each) {
                if (parseInt(item_each.ACTIVE))
                    $rootScope.FORMA_PAGAMENTO = item_each;
            });
            if (parseInt($rootScope.FORMA_PAGAMENTO.CC)) {
                if (!$rootScope.FORMA_PAGAMENTO.cardNumber)
                    $('[id="cardNumber"]').focus();
                else if (!$rootScope.FORMA_PAGAMENTO.expirationMonthYear)
                    $('[id="expirationMonthYear"]').focus();
                else
                    valido = true;
            } else
                valido = true;
        } else if ($rootScope.VALOR_PG)
            Factory.alert('Selecione um meio de pagamento!');
        else {
            $rootScope.FORMA_PAGAMENTO = null;
            valido = true;
        }

        if (valido) {
            if ($rootScope.FORMA_PAGAMENTO) {
                if ($('#cvv:visible').val())
                    $rootScope.FORMA_PAGAMENTO.cvv = $('#cvv:visible').val();
                switch ($rootScope.FORMA_PAGAMENTO.GATEWAY) {
                    case 'PAGSEGURO':
                        if ($rootScope.PAGSEGURO_SESSIONID)
                            $rootScope.paymentPagSeguro(origem);
                        else
                            $rootScope.pagseguro(1, origem);
                        break;
                    default:
                        $rootScope.processPayment(origem);
                        break;
                }
            } else
                $rootScope.processPayment(origem);
        }
    };
    $rootScope.STEPS = [];
    $rootScope.transacaoId = 0;
});

app.directive('onErrorSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function () {
                attrs.$set('src', 'img/login_default.png');
            });
        }
    }
});

var scrollTimeout = null;
app.directive('scroll', function($routeParams) {
    return {
        link: function(scope, element, attrs) {
            angular.element(element).bind("scroll", function () {
                $('body').attr('scroll-top', $('.scrollable-content:visible').scrollTop() || 0);
            });
        }
    };
});

app.directive('selectSearch', function() {
    return {
        restrict: 'A',
        controllerAs: '$selectSearch',
        bindToController: {},
        controller: selectSearchController
    };
});

app.directive('input', function() {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                $(this).blur();
                $(this).closest('form').find('.btn-salvar[type="submit"]').trigger('click');
            }
        });
        element.bind("blur", function (event) {
            inputEvents(this);
        });
    };
});

function showPassword() {
    $('#showPassword').toggleClass('mdi-action-visibility').toggleClass('mdi-action-visibility-off');
    $('#senha').attr('type', $('#showPassword').hasClass('mdi-action-visibility') ? 'password' : 'text').focus();
}

var setTimeoutClearKeyPress = null;
function inputEvents(_this) {
    var _this = $(_this);
    clearTimeout(setTimeoutClearKeyPress);
    setTimeoutClearKeyPress = setTimeout(function () {
        var _value = _this.val();
        var _invalid = 0;
        var _type = 1;
        var _verify = 1;
        switch (_this.attr('id')) {
            case 'senha':
                if (_value.length < 8 && _value.length)
                    _invalid = 1;
                break;
            case 'postalcode':
                if (_value.length == 9 && _value.length) {
                    $.ajax({
                        url: 'https://viacep.com.br/ws/' + _value.replace('-', '') + '/json/',
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            if (!data.erro) {
                                $('#street').val(data.logradouro);
                                $('#district').val(data.bairro);
                                $('#city').val(data.localidade);
                                $('#state').val(data.uf);
                            }
                        }
                    });
                }
                break;
            case 'data_nascimento':
                if(_value.length) {
                    if (!isValidDate(_value))
                        _invalid = 1;
                    else if (_value.length < 10)
                        _invalid = 1;
                }
                break;
            case 'cpf':
                if (!validaCpf(_value.substring(0, 14)) && _value.length)
                    _invalid = 1;
                break;
            case 'expirationMonthYear':
                var length = _value.length;
                if (_value.length) {
                    _value = _value.split('/');
                    _value[1] = '20' + _value[1];
                    if (parseInt(_value[0]) > 12 || parseInt(_value[0]) < 1)
                        _invalid = 1;
                    else if (parseInt(_value[1]) < (new Date()).getFullYear())
                        _invalid = 1;
                }
                break;
            case 'numero_celular':
                if (_value.length < 14 && _value.length)
                    _invalid = 1;
                break;
            case 'cardNumber':
                _value = _value.replace(/ /g, '');
                if (_value.length >= 6) {
                    PagSeguroDirectPayment.getBrand({
                        cardBin: _value.substring(0, 6),
                        success: function (data) {
                            if (data.brand.name) {
                                _invalid = 0;
                                $('#imgBandeira').show().attr('src', config.url_api[config.ambiente] + 'skin/default/images/bandeira_cc/' + data.brand.name + '.png');
                            } else {
                                $('#imgBandeira').hide();
                                _invalid = 1;
                            }
                            verifyMsg(_verify, _invalid, _this);
                        },
                        error: function () {
                            verifyMsg(_verify, 1, _this);
                        }
                    });
                } else {
                    $('#imgBandeira').hide();
                    _invalid = 0;
                }
                break;
            case 'nome_completo':
                _value = _value.split(' ');
                if (!((_value[0] && _value[1]) || !_value[0]) && _value[0])
                    _invalid = 1;
                break;
            case 'email':
                if (_value.length) {
                    var email = _value.split('@');
                    if (email[0] && email[1]) {
                        Factory.ajax(
                            {
                                action: 'cadastro/verify',
                                data: {
                                    TYPE: 'EMAIL',
                                    VALUE: _value
                                }
                            },
                            function (data) {
                                verifyMsg(_verify, data.ja_utilizado ? 1 : 0, _this, 2);
                            }
                        );
                    }
                } else
                    _type = 2;
                break;
            case 'u_n':
                if (_value.length) {
                    _value = replaceSpecialChars(_value.toLowerCase());
                    _this.val(_value);
                    Factory.ajax(
                        {
                            action: 'cadastro/verify',
                            data: {
                                TYPE: 'USERNAME',
                                VALUE: _value
                            }
                        },
                        function (data) {
                            verifyMsg(_verify, data.ja_utilizado ? 1 : 0, _this, 2);
                        }
                    );
                } else
                    _type = 2;
                break;
            default:
                _verify = 0;
                break;
        }
        verifyMsg(_verify, _invalid, _this, _type);
    }, 500);
}

function verifyMsg(_verify, _invalid, _this, type) {
    if (_verify) {
        if (_invalid)
            _this.addClass('ng-invalid' + (type == 2 ? '2' : ''));
        else
            _this.removeClass('ng-invalid' + (type == 2 ? '2' : ''));

        _this.closest('form').attr('invalid', _this.closest('form').find('input.ng-invalid').length ? 1 : 0);
    }
}

function replaceSpecialChars(str) {
    var $spaceSymbol = '';
    var regex;
    var returnString = str;
    var specialChars = [
        {val:"a",let:"áàãâä"},
        {val:"e",let:"éèêë"},
        {val:"i",let:"íìîï"},
        {val:"o",let:"óòõôö"},
        {val:"u",let:"úùûü"},
        {val:"c",let:"ç"},
        {val:"A",let:"ÁÀÃÂÄ"},
        {val:"E",let:"ÉÈÊË"},
        {val:"I",let:"ÍÌÎÏ"},
        {val:"O",let:"ÓÒÕÔÖ"},
        {val:"U",let:"ÚÙÛÜ"},
        {val:"C",let:"Ç"},
        {val:"",let:"?!()"}
    ]
    for (var i = 0; i < specialChars.length; i++) {
        regex = new RegExp("["+specialChars[i].let+"]", "g");
        returnString = returnString.replace(regex, specialChars[i].val);
        regex = null;
    }

    var sourceString = returnString.replace(/\s/g,$spaceSymbol);

    return sourceString.replace(/[` ´~!@#$%^&*()|_+\-=?;:¨'",.<>\{\}\[\]\\\/]/gi, '');
};

function isValidDate(data) {
    var regex = "\\d{2}/\\d{2}/\\d{4}";
    var dtArray = data.split("/");

    if (dtArray == null)
        return false;

    // Checks for dd/mm/yyyy format.
    var dtDay = dtArray[0];
    var dtMonth = dtArray[1];
    var dtYear = dtArray[2];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if (dtYear > (new Date()).getFullYear() || dtYear <= ((new Date()).getFullYear() - 100))
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

function validaCpf(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9, 10].forEach(function (j) {
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
            soma += parseInt(e) * ((j + 2) - (i + 1));
        });
        r = soma % 11;
        r = (r < 2) ? 0 : 11 - r;
        if (r != cpf.substring(j, j + 1)) result = false;
    });
    return result;
}

var mask = function(element, mask, length){
    function inputHandler(masks, max, event) {
        var c = event.target;
        var v = c.value.replace(/\D/g, '');
        var m = c.value.length > max ? 1 : 0;
        VMasker(c).unMask();
        VMasker(c).maskPattern(masks[m]);
        c.value = VMasker.toPattern(v, masks[m]);
    }
    var element = document.querySelector(element);
    VMasker(element).maskPattern(mask[0]);
    if(mask[1])
        element.addEventListener('input', inputHandler.bind(undefined, mask, length), false);
};