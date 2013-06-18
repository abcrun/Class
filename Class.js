/**
* A Simple Way To Create Class With Extends And Implementation In Javascript (OOP)
* The MIT License - Copyright (c) 2013 Hongbo Yang <abcrun@gmail.com>
* Repository - https://github.com/abcrun/Class.git
* Version - 0.4.0
*/

(function(name,factory){
	if(typeof define === 'function' && define.amd) define(factory);//AMD
	else if(typeof module === 'object' && module.exports) module.exports = factory();//CommonJS
	else this[name] = factory();//Global
})('Class',function(){
	var type = function(arg){
		return arg === null ? 'null' :
			arg === undefined ? 'undefined' :
			typeof arg === 'function' ? 'function' :
			/\s(\w+)/.exec(toString.call(arg).toLowerCase())[1];
	};

	var _implement = function(_extends){
		for(key in _extends) this[key] = _extends[key];
		return this;
	}
	var _set = function(name,value){
		this[name] = value;
		return this;
	}
	var _get = function(name){
		return this[name];
	}

	var klass = function(_constutor,_extends){
		var _prop,constructor_type = type(_constutor),extends_type = type(_extends);

		//Format Arguments
		_constutor = constructor_type == 'function' ? [_constutor] :
			constructor_type == 'object' ? (_prop = _constutor) && [_constutor['init'] || function(){}] :
			[function(){}];
		_extends = extends_type === 'function' ? (_constutor = _constutor.concat(_extends)) && _extends.prototype :
			extends_type === 'object' ? _extends : null;

		//Prototype Chain
		_extends = _extends || {};
		_extends.set = _extends.set || _set;
		_extends.get = _extends.get || _get;
		_extends.extends = _extends.extends || _implement;

		//Constructor
		if(_prop) delete _prop.init;
		var F = function(){
			if(_prop) _implement.call(this,_prop);
		}
		F.prototype = _extends;

		var _class = function(){
			for(var i = 0; i < _constutor.length; i++) _constutor[i].apply(this,arguments);
		}
		_class.prototype = new F();

		//Static Methods
		_class.extends = function(arg){
			arg.set = arg.set || _set;
			arg.get = arg.get || _set;
			arg.extends = arg.extends || _implement;

			_class.prototype = arg;
		}

		return _class;
	}

	var Class = {};
	Class.create = klass;
	

	return Class;
})
