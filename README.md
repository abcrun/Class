#Class.js

Javascript是一种 **面向函数** 基于对象的编程语言，尽管他不像C++,Java等这些语言明确声明面向对象的概念，但是由于Javascript的灵活性，他能够模拟实现面向对象编程的思想。Class.js就是为了解决Javascript面向对象编程而开发的一个Class构造组件。

**Notice**: 下文将会提到 **构造类<sup>见下文</sup>** 和 **实例化对象<sup>见下文</sup>**，这两个概念要区分开。

###### 快速预览

	var Animal = Class.create(function(){
		this.type = 'animal';
	})
	var Dog = Class.create(
		function(name){
			if(name) this.name = name;
		},
		Animal
	)

以上声明了两个 **构造类（暂且称之为构造类）** ：Animal和Dog。Dog继承了Animal。

	var dog1 = new Dog('doudou');

dog1是Dog构造类的一个 **实例化对象**。

### 使用范围

Class.js是对Javascript面向对象编程的实现，所以我们可以在任何支持Javascript的地方都使用，如Web浏览器，Node.js等。同时whiskers.js还支持CommonJS和AMD标准规范，所以我们能够很方便的调用。

### 关于构造类

这里所说的 **构造类** 实际上就是一个函数，我们可以通过new操作符 **实例化对象**。

###### 创建构造类

	Class.create([constructor[,extended]]);

参数说明:

- `constructor:Optional[function | object]`: 当constructor是一个函数时，它将作为当前类的构造函数；当constructor是一对象时，如果这个对象里面包含constructor方法，那么同样这个方法将会作为当前类的构造函数,而其他的属性或者方法将会作为这个类的内部属性或方法被引用。
- `extended:Optional[function | object]`: 表示父类，可以是函数也可以是对象。

###### 构造类的方法

	var klass = Class.create([constructor[,extended]]) //如上:创建构造类
	klass.extended(extended) //设置或改变构造类的父类
	klass.implemented(properties) //给构造类添加内部属性或方法

以 **快速预览** 为例：

我们通过`.implemented()`方法给Dog这个构造类添加内部方法:

	Dog.implemented({
		feets:4,
		playing:function(){
			//Jump
		}
	})

上文提到创建构造类时，参数constructor可以是对象，所以我们也可以通过以下方法创建`Dog`构造类，同时给这个构造类添加上面例子列出的内部属性：

	var Dog = Class.create(
		{
			constructor:function(name){
				this.name = name;
			},
			feet:4,
			playing:function(){
				//Jump
			}
		},
		Animal
	)

我们也可以通过`.extended()`方法改变`Dog`的父类：

	Dog.extended({
		name:'bird',
		singing:function(){
			//singing
		}
	})

这时`Dog`的父类将不再是`Animal`

### 关于实例化对象

可以通过new操作符创建实例化对象，拿上面创建的 **构造类** klass为例：

	var instance = new klass();

###### 实例化对象的一些方法

Class.js给实例化对象添加了一个方法`.extended` ( **不要和构造类的.extended方法搞混 ** )，用来给当前实例化的对象添加属性或者方法。拿 **快速预览<sup>见上文</sup>** 中的例子为例：

	dog1.extended({
		color:'yellow',
		saying:function(){
			//wangwang~~
		}
	})

**Notice**: 切记不要把 **构造类** 和 **实例化对象** 的`.extended`方法混淆。

### 补充示例

创建 **构造类** 时，当第一个参数是对象时，`constructor`方法并非必须的：

	var Animal = Class.create({
		type:'animal'
	})
	var Dog = Class.create({
		feet:4,
		playing:function(){
			//playing
		}
	},Animal)
	
	var dog1 = new Dog();
	dog1.extended({
		name:'doudou'
	});

这和之前介绍到的示例是一样的。

### 许可协议

Copyright (c) 2013 Hongbo Yang <abcrun@gmail.com>

The MIT License
