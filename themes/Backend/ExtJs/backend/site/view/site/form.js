/**
 * Shopware 5
 * Copyright (c) shopware AG
 *
 * According to our dual licensing model, this program can be used either
 * under the terms of the GNU Affero General Public License, version 3,
 * or under a proprietary license.
 *
 * The texts of the GNU Affero General Public License with an additional
 * permission and of our proprietary license can be found at and
 * in the LICENSE file you have received along with this program.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * "Shopware" is a registered trademark of shopware AG.
 * The licensing of the program under the AGPLv3 does not imply a
 * trademark license. Therefore any rights, title and interest in
 * our trademarks remain entirely with us.
 *
 * @category   Shopware
 * @package    Site
 * @subpackage View
 * @version    $Id$
 * @author shopware AG
 */

/**
 * Shopware UI - Site site Form View
 *
 * This file contains the layout of the modules detail form.
 */

//{namespace name=backend/site/site}

//{block name="backend/site/view/site/form"}
Ext.define('Shopware.apps.Site.view.site.Form', {
	extend: 'Ext.form.Panel',
    alias: 'widget.site-form',
    layout: 'anchor',
    defaults: {
        anchor: '98%',
        padding: 5
    },
    bodyPadding: 5,
    overflowY: 'auto',
    autoWidth: true,

    initComponent: function() {
        var me = this;
		me.dockedItems = [];
        me.items = me.getItems();
		me.toolBar = me.getToolBar();
		me.dockedItems.push(me.toolBar);

        me.callParent(arguments);

        var record = Ext.create('Shopware.apps.Site.model.Nodes');
        me.loadRecord(record);
    },

	getToolBar: function(){
		var me = this,
            items = [];

		me.saveButton = Ext.create('Ext.button.Button',{
			text: '{s name=formLinkFieldSaveButtonText}Save{/s}',
			action: 'onSaveSite',
			cls:'primary'
		});
        /*{if not {acl_is_allowed privilege=createSite}}*/
        me.saveButton.disable();
        /*{/if}*/
		items.push('->');

        /*{if {acl_is_allowed privilege=createSite} || {acl_is_allowed privilege=updateSite}}*/
		items.push(me.saveButton);
        /*{/if}*/
		return Ext.create('Ext.toolbar.Toolbar',{
			dock: 'bottom',
			ui: 'shopware-ui',
			items: items
		});
	},

    getItems: function() {
        var me = this;
        return [
            {
                xtype: 'fieldset',
                title: '{s name=formDetailFormEditContentCaption}Content{/s}',
                items: me.getContentField()
            },
            {
                xtype: 'fieldset',
                title: '{s name=formDetailFormLinksCaption}Link{/s}',
                items: me.getLinkField()
            },
            {
                xtype: 'fieldset',
                title: '{s name=formDetailFormOptionalSettingsCaption}Settings{/s}',
                collapsible: true,
                collapsed: true,
                items: me.getOptionsField()
            }
        ]
    },

    getContentField: function() {
        var me = this;

        return [
            {
                name: 'helperId',
                xtype: 'hidden'
            },
            {
                name: 'parentId',
                xtype: 'hidden'
            },
            {
                fieldLabel: '{s name=formContentFieldDescriptionLabel}Description{/s}',
                xtype: 'textfield',
                emptyText: '{s name=formContentFieldDescriptionEmptyText}Page name{/s}',
                name: 'description',
                allowBlank: false,
                anchor:'100%'
            },
            {
                fieldLabel: '{s name=formContentFieldHtmlEditorLabel}Content{/s}',
                xtype: 'tinymce',
                name: 'html',
                anchor:'100%',
                height: 300
            },
            me.getDdSelector()
        ]
    },

    getLinkField: function() {
        var me = this;
		var data = [
			['_parent'],
			['_blank']
		];

        return [
            {
                fieldLabel: '{s name=formLinkFieldAddressLabel}Link-Address{/s}',
                xtype: 'textfield',
                name: 'link',
                anchor:'100%'
            },
            {
                fieldLabel: '{s name=formLinkFieldTargetLabel}Link-Target{/s}',
                xtype: 'combo',
				mode:'local',
                name: 'target',
				valueField:'target',
    			displayField:'target',
                anchor:'100%',
				store: new Ext.data.SimpleStore({
					fields:['target'],
					data: data
				})
            },
            me.getShopsSelector()
        ]
    },

    getOptionsField: function() {
        var me = this;

        return [
			{
			   fieldLabel: '{s name=formSettingsFieldPositionLabel}Position{/s}',
			   xtype: 'textfield',
			   name: 'position',
			   anchor:'100%'
			},
            {
               fieldLabel: '{s name=formSettingsFieldEmbedCodeLabel}Embed-Code{/s}',
               xtype: 'textfield',
               name: 'embedCode',
               readOnly: true,
               anchor:'100%'
            },
            {
                fieldLabel: '{s name=formSettingsFieldTplVariableLabel_1}Tpl. Variable 1{/s}',
                xtype: 'textfield',
                name: 'tpl1variable',
                anchor:'100%'
            },
            {
                fieldLabel: '{s name=formSettingsFieldTplPathLabel_1}Tpl. Path 1{/s}',
                xtype: 'textfield',
                name: 'tpl1path',
                anchor:'100%'
            },
            {
               fieldLabel: '{s name=formSettingsFieldTplVariableLabel_2}Tpl. Variable 2{/s}',
               xtype: 'textfield',
               name: 'tpl2variable',
               anchor:'100%'
            },
            {
               fieldLabel: '{s name=formSettingsFieldTplPathLabel_2}Tpl. Path 2{/s}',
               xtype: 'textfield',
               name: 'tpl2path',
               anchor:'100%'
            },
            {
                fieldLabel: '{s name=formSettingsFieldTplVariableLabel_3}Tpl. Variable 3{/s}',
                xtype: 'textfield',
                name: 'tpl3variable',
                anchor:'100%'
            },
            {
                fieldLabel: '{s name=formSettingsFieldTplPathLabel_3}Tpl. Path 3{/s}',
                xtype: 'textfield',
                name: 'tpl3path',
                anchor:'100%'
            },
            {
                fieldLabel: '{s name=formSettingsFieldSEOTitle}SEO Title{/s}',
                xtype: 'textfield',
                name: 'pageTitle',
                anchor:'100%'
            },
            {
                fieldLabel: '{s name=formSettingsFieldMetaKeywords}Meta-Keywords{/s}',
                xtype: 'textfield',
                name: 'metaKeywords',
                anchor:'100%'
            },
            {
                fieldLabel: '{s name=formSettingsFieldMetaDescription}Meta-Description{/s}',
                xtype: 'textfield',
                name: 'metaDescription',
                anchor:'100%'
            }
        ]
    },

    getDdSelector: function() {
        var me = this;

        return {
            name: 'grouping',
            margin: '0 0 0 105',
            xtype:'ddselector',
            fromTitle: '{s name=site/ddselector/fromTitle}Groups{/s}',
            toTitle: '{s name=site/ddselector/toTitle}Assigned groups{/s}',
            dataIndex: 'groupName',
            fromStore: me.groupStore,
            buttons:[ 'add','remove' ],
            gridHeight: 125,
            selectedItems: me.selectedStore,
            buttonsText: {
                add: "Add",
                remove: "Remove"
            },
			fromColumns :[{
				text: 'name',
				flex: 1,
				dataIndex: 'groupName'
			}],
			toColumns :[{
				text: 'name',
				flex: 1,
				dataIndex: 'groupName'
			}]
        }
    },

    getShopsSelector: function() {
        var me = this;

        return {
            xtype: 'combobox',
            name: 'shopIds',
            fieldLabel: '{s name=site/shop_selector/label}Limit to shop(s){/s}',
            helpText: '{s name=site/shop_selector/helper}If set, limits shop page visibility to the configured shops. If this shop page links to another page, that page might still be accessible.{/s}',
            store: me.shopStore,
            multiSelect: true,
            displayField: 'name',
            valueField: 'id',
            queryMode:'local',
            anchor:'100%',
            editable: false
        };
    }
});
//{/block}



