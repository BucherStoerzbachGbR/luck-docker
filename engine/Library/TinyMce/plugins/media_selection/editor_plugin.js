(function(){tinymce.create('tinymce.plugins.MediaSelectionPlugin',{ed:null,imageCls:'tinymce-editor-image',linkCls:'tinymce-editor-link',videoCls:'tinymce-editor-video',audioCls:'tinymce-editor-audio',url:null,init:function(ed,url){var me=this;me.ed=ed;me.url=url;ed.addCommand('mceMediaSelection',function(){var forceToFront=false;if(typeof(Shopware.app.Application.addSubApplication)!=='function'){Ext.Error.raise({msg:'Your ExtJS application does not support sub applications',option:[ed,url]})}if(me.ed.settings&&me.ed.settings.fullscreen_is_enabled){forceToFront=true}Shopware.app.Application.addSubApplication({name:'Shopware.apps.MediaManager',layout:'small',forceToFront:forceToFront,selectionMode:'single',eventScope:me,mediaSelectionCallback:me._processImage})});ed.addButton('media_selection',{title:'Media Selection',cls:'tinymce-media-selection',cmd:'mceMediaSelection',image:url+'/assets/inbox-image.png'})},getInfo:function(){return{longname:'MediaManager - MediaSelection',author:'shopware AG - st.pohl',authorurl:'http://www.shopware.de',infourl:'http://wiki.shopware.de/',version:'1.1.0'}},_processImage:function(btn){var me=this,ed=me.ed,win=btn.up('window'),dataPnl=win.down('.mediamanager-media-view'),selModel,selected;if(dataPnl.selectedLayout==='grid'){dataPnl=dataPnl.dataView}else{dataPnl=dataPnl.cardContainer.getLayout().getActiveItem()}selModel=dataPnl.getSelectionModel();selected=selModel.getSelection();Ext.each(selected,function(record){var type=record.get('type');if(type==='VIDEO'){me._insertVideo(record)}else if(type==='IMAGE'){me._insertImage(record)}else if(type==='MUSIC'){me._insertAudio(record)}else{me._insertLink(record)}ed.undoManager.add()});win.destroy()},_insertImage:function(record){var me=this,ed=me.ed,args;var uuid=Shopware.ModuleManager.uuidGenerator.generate();args={'id':me.imageCls+'-'+uuid,'class':me.imageCls+' '+me.imageCls+'-'+uuid,'alt':record.get('name'),'data-src':record.get('virtualPath'),'src':me.url+'/assets/placeholder-image.png'};ed.execCommand('mceInsertContent',false,tinymce.DOM.createHTML('img',args),{skip_undo:1});var evt=new Event('insertMedia');document.dispatchEvent(evt);return true},_insertLink:function(record){var me=this,ed=me.ed,args;args={'class':me.linkCls,href:record.get('path'),title:record.get('name'),target:'_blank'};ed.execCommand('mceInsertContent',false,tinymce.DOM.createHTML('a',args,record.get('name')),{skip_undo:1});return true},_insertVideo:function(record){var me=this,ed=me.ed,args;args={'class':me.videoCls,width:320,height:240,src:ed.settings.document_base_url+record.get('path'),controls:true};ed.execCommand('mceInsertContent',false,tinymce.DOM.createHTML('video',args),{skip_undo:1});return true},_insertAudio:function(record){var me=this,ed=me.ed,args;args={'class':me.audioCls,src:ed.settings.document_base_url+record.get('path'),controls:true};ed.execCommand('mceInsertContent',false,tinymce.DOM.createHTML('audio',args),{skip_undo:1});return true}});tinymce.PluginManager.add('media_selection',tinymce.plugins.MediaSelectionPlugin)})();