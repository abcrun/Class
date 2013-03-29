/**
* @file Class.js
* @brief Javascript Class Constructor 
* @author abcrun@gmail.com
* @version 0.1.0
*/

/**
*
* @param cons [funciton|object] Original Constructor or Object
* @param extra [object{inherit:object|function,extend:object,paras:array|string|number]
*
* @return thisBinding
*/
var Class = function(cons,extra){
	var _class,init,extend,inherit,paras,
		F = new Function();

	if(typeof cons == 'function'){
		init = cons;
	}else if(typeof cons == 'object'){
		extend = [cons];
	}

	if(typeof extra == 'string' || typeof extra == 'number' || toString.call(extra).toLowerCase().indexOf('array') > -1){
		paras = toString.call(extra).toLowerCase().indexOf('array') > -1?extra:[].concat(extra);
	}else if(typeof extra == 'object'){
		inherit = extra.inherit || null;
		paras = paras || extra.paras;
		if(extra.extend){
			if(extend){
				extend.push(extra.extend);
			}else{
				extend = [].concat(extra.extend)
			}
		}
	}
	
	//Prototype Chain
	if(inherit) F.prototype = (typeof inherit == 'function'?inherit.prototype:inherit);
	F.prototype.extend = function(extend){
		for(key in extend){
			if(extend.hasOwnProperty(key)){
				this[key] = extend[key];
			}
		}
	}
	
	//Constructor Object
	_class = new F();
	if(extend){
		for(var i = 0; i < extend.length;i++){
			_class.extend(extend[i]);
		}
	}

	init = init || _class.init;
	if(init) init.apply(_class,paras);
	if(inherit && typeof inherit == 'function') inherit.apply(_class,paras)

	return _class;
}
