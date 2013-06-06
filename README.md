# Class.js
---

A Simple Way To Create Classes With `extends` And `implements` In Javascript (OOP)

基于OOP的Javascipt实现

---


## Define and Usage (用法)

### Syntax (语法)
	Class.create([properties] || [main,extends,parameters])
### Parameters (参数)
###### Class.create([main,extends,parameters])
- `main:Optional` -- A function or an object as the constructor. If it is an object, it may have an main method as the constructor,and others will be the properties.
- `extends:Optional` -- A function or an object to be inherited as the parent.
- `parameters:Optional` -- The parameters of the constructor for instance.

###### Class.create([properties])
`properties`
- `main:Optional` -- Used as main in `Class.create([main,extends,parameters])`.
- `extends:Optional` -- Used as extends in `Class.create([main,extends,parameters])`.
- `parameters:Optional` -- Used as parameters in `Class.create([main,extends,parameters])`.
- `implements:Optional` -- Used to add new attributes.

### Methods (方法)
- `extends(parent)` -- Inherit the parent 
- `implements(properties)` -- Add properties to the current object

### Examples (实例)
`Class.create([main,extends,parameters])`

Let's create an object called Animal and an object Dog which inherits Animal.

	var Animal = Class.create(function(){
		this.type = 'animal';
	})
	var Dog = Class.create(
		function(name){
			this.name = name;
		},
		Animal,
		'dog'
	)

**Notice**: The `parameters` can be an array if there are more arguments in the constuctor. If the `parameters` is an object and the current class has no parent, `extends` should be set to null or undefind.

The codes `Dog` above is the same as below:

	var Dog = Class.create({
		main:function(name){
			this.name = name;
		},
		extends:Animal,
		parameters:'dog'
	})
	var Dog = Class.create(
		{
			main:function(name){
				this.name = name;
			}
		},
		Animal,
		['dog']
	)
	var Dog = Class.create(function(name){
		this.name = name;
	},'dog').extends(Animal);
	
We can add properties throw `implements` method.

	Dog.implements({
		saying:'wangwang~~',
		color:'blue'
	})
	
We can also change the parent object.

	Dog = Dog.extends(object)
	
The parameter `main` or `constructor` can be an object with properties which will be implements in the class

	var Person = Class.create({
		main:function(age){
			this.age = age;
		},
		eyes:'two',
		language:'Chinese'
	})

It is the same as:

	var Person = Class.create({
		main:function(age){
			this.age = age;
		}
	}).implements({
		eyes:'two',
		language:'Chinese'
	})


**Notice**:Compatible with AMD and CommonJS
