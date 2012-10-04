Ext.define("FinancialMobile.view.painel.Painel",{
	extend : 'Ext.Panel',
	alias : [ 'widget.painel' ],
	requires: ['Ext.chart.Chart', 'Ext.chart.series.Bar', 'Ext.chart.axis.Numeric', 'FinancialMobile.view.manter.DespesaReceita', 
	           'FinancialMobile.utils.NumberUtils', 'Ext.XTemplate', 'FinancialMobile.comp.MonthToolBar', 'Ext.data.Store'],
	config : {
	    layout: {
            type: 'card',
            animation: 'slide'
        },
		items : [{
				xtype: 'panel',
				layout : 'vbox',
				items : [{
			                xtype: 'monthtoolbar',
			                docked: 'top'
			            },{
							xtype : 'panel',
							layout : 'fit',
							flex : 2,
							items : {
								xtype : 'chart',
								name : 'chart_despesas_receitas',
								layout: 'auto',
								store : Ext.create("Ext.data.Store",{
											fields : ['name', 'valor']
										}),
								animate : true,
								shadow: false,
							 series: [
						                {
						                    type: 'bar',
						                    renderer: function (sprite, storeItem, barAttr, i, store) {
						                        if(storeItem.get('name') === 'Receitas'){
						                        	barAttr.fill = '#00C906';
						                        }else if(storeItem.get('name') === 'Despesas'){
						                        	barAttr.fill = '#FF0202';
						                        }else if(storeItem.get('name') === 'Diferenca'){
						                        	if(storeItem.get('valor') > 0){
														barAttr.fill = '#00C906';
						                        	}else{
						                        		barAttr.fill = '#FF0202';
						                        	}
						                        }
						                        return barAttr;
						                    },
						                    xField: 'name',
						                    yField: ['valor']//,
						                    //axis: 'bottom',
						                   // highlight: true,
						                    //showInLegend: true,
						                    //label: 'valor'
						                }
						            ],
						        axes: [
					                {
					                    type: 'numeric',
					                    position: 'left',
					                    fields: ['valor'],
					                    minimum: 0,
				                        maximum: 10000,
					                    label: {
					                        renderer: function (v) {
					                            return v.toFixed(0);
					                        }
					                    }
					                },
					                {
					                    type: 'category',
					                    position: 'bottom',
					                    fields: 'name'
					                }
					            ]
							}
						},{
							xtype : 'list',
							flex : 1,
							name : 'receitas_despesas_grid',
							store : Ext.create("Ext.data.Store",{
									fields : ['name', 'valor']
								}),
							itemTpl : new Ext.XTemplate(
									'<tpl if="name == \'Receitas\'">',
									'<div style="color:#00C906;"><strong>{name}</strong> R$ {valor:this.mask}</div>',
									'<tpl elseif="name == \'Despesas\'">',
									'<div style="color:#FF0202;"><strong>{name}</strong> R$ {valor:this.mask}</div>',
									'<tpl else>',
									'<tpl if="valor &gt; 0">',
									'<div style="color:#00C906;"><strong>{name}</strong> R$ {valor:this.mask}</div>',
									'<tpl else>',
									'<div style="color:#FF0202;"><strong>{name}</strong> R$ {valor:this.mask}</div>',
									'</tpl>',
									'</tpl>',
									{
										mask : function(texto){
											return FinancialMobile.utils.NumberUtils.float2moeda(texto);
										}
									})
						} ]
			}, {		
				xtype: 'panel',
				layout : 'fit',
				items : [ {
					xtype : 'despesareceita'
				} ]
			},{
	            xtype: 'toolbar',
	            docked: 'bottom',
	            ui : 'light',
	            items: [{ 
	                    	xtype: 'spacer' 
	                    },{
	                        xtype: 'segmentedbutton',
	                        items: [{
	                        			iconMask: true, 
					    				iconCls : 'home',
					    				action: 'principal',
					    				pressed: true
				    				}, {
				    					iconMask: true, 
				    					iconCls : 'add',
				    					action : 'adicionar'
				    				}/*,{
				    					iconMask: true, 
				    					iconCls : 'refresh',
				    					badgeText : '4'
				    				}, {
				    					iconMask: true, 
				    					iconCls : 'settings'
				    				}*/
				    				]
	                    },{ 
	                    	xtype: 'spacer' 
	                    },{
	    					text: 'Sair',
	    					action : 'sair'
	    				}
	                ]
	        }]
		}
});