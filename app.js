window.Financial = {
    VERTION : "1.0.0",
    //desenvolvimento
    //SERVER : 'http://192.168.1.7/openshift/financial/php/new/'
    //producao
    SERVER : 'https://financial-diegosilva.rhcloud.com/new/'
};

//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'FinancialMobile': 'app'
});
//</debug>

Ext.application({
    name: 'FinancialMobile',

    requires: [
        'Ext.MessageBox','Ext.data.Store'
    ],

    models : [ 'Usuario', 'Categoria', 'Custo', 'Parcela'],
    controllers : [ 'Usuario', 'Principal', 'DespesaReceita'],
    views : [ 'usuario.Login', 'painel.Painel'],
    stores: ['Categoria', 'Usuario'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {     

        uStore = Ext.data.StoreManager.lookup('usuarioStore');

        uStore.load(function(records, op, success){
            if(records.length > 0){
                console.log('Usuario Logado');
                console.log(records[0].data);
                
                FinancialMobile.UsuarioUtils.setUsuarioLogado(records[0].data);

                Ext.fly('appLoadingIndicator').destroy();

                var p = Ext.create('FinancialMobile.view.painel.Painel');
                Ext.Viewport.add(p);
                Ext.Viewport.setActiveItem(p);
            }else{
                console.log('Usuario nao esta logado');                
                Ext.fly('appLoadingIndicator').destroy();
                var p = Ext.create('FinancialMobile.view.usuario.Login');
                Ext.Viewport.add(p);
                Ext.Viewport.setActiveItem(p);
                
            }
        });
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
