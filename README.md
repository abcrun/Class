# Class.js
---

A Simple Way To Create Class With `extends` And `implements` In Javascript (OOP)

基于OOP的Javascipt实现

---


## Define and Usage (用法)

### Syntax (语法)
	var klass = Class.create([constructor[,extends]]) //Create Class
	klass.extends(extends) //Change the Class's super Class
	klass.implements(extends) //Add internal properties to the Class
	
### Parameters (参数)
###### Class.create([constructor[,extends]])
- `constructor:Optional` -- A function or an object as the constructor. If it is an object, it may have an method `init` as the constructor,and others will be the Class's internal properties.
- `extends:Optional` -- A function or an object to be inherited as the parent(super Class).

### Examples (实例)
`Class.create([constructor[,extends]])`

Let's create an Class object called Animal and an Class object Dog which inherits Animal.

	var Animal = Class.create(function(){
		this.type = 'animal';
	})
	var Dog = Class.create(
		function(name){
			this.name = name;
		},
		Animal
	)
	var dog1 = new Dog('doudou');

The codes `Dog` above is the same as below:

	var Dog = Class.create(
		{
			init:function(name){
				this.name = name;
			}
		},
		Animal
	)
	var dog1 = new Dog('doudou');

**Notice: The instance of the `Class` also has a method `.extends` which is used to add properties to the instanced object.** 
	
We can add properties to the instance of Class `Dog` (`dog1`) with `extends` method.

	dog1.extends({
		saying:'wangwang~~',
		color:'blue'
	})

We can also change the super Class of Dog.

	Dog.extends({feet:4})
	var dog2 = new Dog('lele');

**Notice**:Compatible with AMD and CommonJS
