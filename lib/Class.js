/**
* A Simple Way To Create Class With Extends And Implementation In Javascript (OOP)
* The MIT License - Copyright (c) Hongbo Yang <abcrun@gmail.com>
* Repository - https://github.com/abcrun/Class.git
* Version - 0.2.0
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
		return Class(this,_extends);
	}
	var _implements = function(_implements){
		for(key in _implements){
			if(hasOwn.call(_implements,key)) this[key] = _implements[key];
		}
		return this;
	}

	var Class = function(main,_extends,parameters){
		var _prop,main_type = type(main),extends_type = type(_extends),F = new Function();

		//Format Arguments
		main = main_type === 'function' ? [main] :
			main_type === 'object' ? (_prop = main) && [main.init || function(){}] :
			[function(){}];
		_extends = extends_type === 'function' ? (main = main.concat(_extends)) && _extends.prototype :
			extends_type === 'object' ? _extends :
			extends_type === 'array' ? (parameters = _extends) && null :
			/(?:number|string)/.test(extends_type) ? (parameters = [_extends]) && null :
			null;
		parameters = parameters && type(parameters) !== 'array' ? [parameters] :
			parameters;

		//Prototype Chain
		if(_extends) F.prototype = _extends;
		F.prototype.extends = _inherits;
		F.prototype.implements = _implements;

		//Instance Constructor
		var _class = new F();
		while(main.length) main.shift().apply(_class,parameters);
		if(_prop) _implements.call(_class,_prop);

		main = _extends = parameters = _prop = null;
		return _class;
	}

	Class.create = function(){
		var arg = arguments[0],main = function(){},_extends,parameters,_implements;
		if(arg) main = arg.constructor,_extends = arg.extends,parameters = arg.parameters,_implements = arg.implements;
		return Class(main,_extends,parameters).implements(_implements)
	}
	

	return Class;
})
