/**
 * 文档
 * @author fool2fish<fool2fish@gmail.com>
 */

KISSY.ready(function(S){

    var D = S.DOM, E = S.Event, doc = document;
	
	
	/**显示和隐藏源码*****************************************************************/
	
    var TRIGGER_CLS = 's-view-code', DEMO_CLS = 's-demo', CODE_CLS = 's-code', 
        SHOW_CODE = '显示源码', HIDE_CODE = '隐藏源码';
    
    E.on(doc.body,'click',function(e){ 
        var t = e.target;
        if(D.hasClass(t,TRIGGER_CLS)){
            e.preventDefault();
            var code = D.next(t);
            if(!code || !D.hasClass(code,CODE_CLS)){
                var demo = D.prev(t,'.'+DEMO_CLS);
                code = createCode(t,demo);
            }
            toggleShow(t,code);
        }
    });

    function createCode(trigger,demo){
        var code = D.create('<textarea class="'+CODE_CLS+'"></textarea>');
        D.insertAfter(code,trigger);
        code.value = S.UA.ie ? '请使用非ie内核刘浏览器查看。' : formatCode(demo.innerHTML);
        return code;
    }

    function formatCode(code){
        code = code.replace(/^[\r\n]+|[\s\r\n]+$/g,'');
        var tabs = code.match(/^\s*/)[0];
        code = code.replace(new RegExp(tabs,'g'),'');
        return code;
    }

    function toggleShow(trigger,code){
        if(trigger.innerHTML == SHOW_CODE){
            code.style.display = 'block';
            trigger.innerHTML = HIDE_CODE;
        }else{
            code.style.display = 'none';
            trigger.innerHTML = SHOW_CODE;
        }
    }

    E.on(doc.body,'mouseover',function(e){
        var t = e.target;
        if(D.hasClass(t,CODE_CLS)) t.select(); 
    })
	
	
});