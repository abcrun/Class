/**
* A Simple Way To Create Class With Extends And Implementation In Javascript (OOP)
* The MIT License - Copyright (c) 2013 Hongbo Yang <abcrun@gmail.com>
* Repository - https://github.com/abcrun/Class.git
*/

(function(name,factory){
	if(typeof define === 'function' && define.amd) define(factory);//AMD
	else if(typeof module === 'object' && module.exports) module.exports = factory();//CommonJS
	else this[name] = factory();//Global
})('Class',function(){
	var type = function(arg){
			return /\s(\w+)/.exec(Object.prototype.toString.call(arg).toLowerCase())[1];
	};

	var _implement = function(_extends){
		for(key in _extends) this[key] = _extends[key];
		return this;
	}

	var klass = function(_constructor,_extends){
		var _prop,constructor_type = type(_constructor),extends_type = type(_extends),temp = _extends;

		//Format Arguments
		_constructor = constructor_type == 'function' ? [_constructor] :
			constructor_type == 'object' ? (_prop = _constructor) && [_constructor['constructor'] || function(){}] :
			[function(){}];
		if(_prop) delete _prop['constructor'];

		_extends = extends_type == 'function' ? (_constructor = _constructor.concat(_extends.constructor || _extends)) && _extends.prototype :
			extends_type == 'object' ? _extends : null;

		//Prototype Chain
		_extends = _extends || {};
		if(!temp || !temp.extended) _extends.extended = _implement;

		var F = function(){
			if(_prop) _implement.call(this,_prop);
		}
		F.prototype = _extends;

		//Constructor
		var _class = function(){
			var length = _constructor.length;
			for(var i = length - 1; i >= 0; i--) _constructor[i].apply(this,arguments);
		}
		_class.constructor = _constructor[0];
		_class.prototype = new F();

		_class.extended = function(arg){
			if(!arg.extended) arg.extended = arg.extended || _implement;
			_constructor = [this.constructor];
			this.prototype = arg;

			if(type(arg) == 'function'){
				_constructor = _constructor.concat(arg.constructor || arg);
				this.prototype = arg.prototype;
			}

			return this;
		}
		_class.implements = function(arg){
			this.prototype = (new F()).extended(arg);
		}

		return _class;
	}

	var Class = {};
	Class.create = klass;
	

	return Class;
})
