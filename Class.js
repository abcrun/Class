/**
* A Simple Way To Create Class With Extends And Implementation In Javascript (OOP)
* The MIT License - Copyright (c) 2013 Hongbo Yang <abcrun@gmail.com>
* Repository - https://github.com/abcrun/Class.git
* Version - 0.3.0
*/

(function(name,factory){
	if(typeof define === 'function' && define.amd) define(factory);//AMD
	else if(typeof module === 'object' && module.exports) module.exports = factory();//CommonJS
	else this[name] = factory();//Global
})('Class',function(){
	var hasOwn = Object.hasOwnProperty,
		type = function(arg){
			return arg === null ? 'null' :
				arg === undefined ? 'undefined' :
				typeof arg === 'function' ? 'function' :
				/\s(\w+)/.exec(toString.call(arg).toLowerCase())[1];
		};

	var _inherits = function(_extends){
		return klass(this,_extends);
	}
	var _implements = function(_implements){
		for(key in _implements){
			if(hasOwn.call(_implements,key)) this[key] = _implements[key];
		}
		return this;
	}

	var klass = function(main,_extends,parameters){
		var _prop,main_type = type(main),extends_type = type(_extends),F = new Function();

		//Format Arguments
		main = main_type == 'function' ? [main] :
			main_type == 'object' ? (_prop = main) && [main['main'] || function(){}] :
			[function(){}];
		_extends = extends_type === 'function' ? (main = main.concat(_extends)) && _extends.prototype :
			extends_type === 'object' ? _extends :
			extends_type === 'array' ? (parameters = _extends) && null :
			/(?:number|string)/.test(extends_type) ? (parameters = [_extends]) && null :
			null;
		parameters = parameters && type(parameters) !== 'array' ? [parameters] :
			parameters;

		//Prototype Chain
		_extends = _extends || {};
		if(!_extends.extends) _extends.extends = _inherits;
		if(!_extends.implements) _extends.implements = _implements;
		F.prototype = _extends;

		//Instance Constructor
		var _class = new F();
		while(main.length) main.shift().apply(_class,parameters);
		if(_prop) _implements.call(_class,_prop);

		main = _extends = parameters = _prop = null;
		return _class;
	}

	var isConsObj = function(obj){
		var bl = true;
		for(key in obj){
			if(hasOwn.call(obj,key)){
				if(!/main|extends|parameters|implements/.test(key)){
					bl = false;
					break;
				}
			}
		}
		return bl;
	}

	var Class = {};
	Class.create = function(){
		var arg = arguments;
		if(arg.length == 1 && type(arg) == 'object' && isConsObj(arg[0])){
			arg = arg[0];
			var main = arg.main || function(){},
				_extends = arg.extends,
				parameters = arg.parameters,
				_implements = arg.implements;
			return klass(main,_extends,parameters).implements(_implements)
		}else{
			return klass.apply(this,arg)
		}
	}
	

	return Class;
})
