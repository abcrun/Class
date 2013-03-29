<h1>Class.js - A Class Constructor For Javascript</h1>
<p><a href="https://github.com/abcrun/Class">Class.js</a> is a constructor for javascript. You can use it to create object easily.</p>
<h2>How to use it</h2>
<p>We can use it with new operator: <strong>new Class(con,extra)</strong></p>
<p>The argument <strong>con</strong> can be a <strong>Function</strong> or an <strong>Object</strong> which is the original object, and the <strong>extra</strong> is an <strong>Object</strong>, <strong>Number</strong> or <strong>String</strong>.</P> 
<p>When <strong>extra</strong> is an object,it can include some of the values below:</p>
<blockquote>
	<ul>
		<li>inherit: The parent object</li>
		<li>extend: Attributes to be extended</li>
		<li>init: Initiazation when creates the object</li>
		<li>paras: The parameter for initazation</li>
	</ul>
</blockquote>
<p>If the <strong>extra</strong> is string or number,it will be the parameters for the initazation</p>
<h2>Demos</h2>
<p>Below are some examples how to use Class.js</p>
<strong>#demo1</strong>
<pre>
<code>
	function Animal(){
		this.type = 'Animal';
	}
	var animal = new Class(Animal);
</code>
</pre>
<p>Output:</p>
<pre>{
	type: "Animal",
	__proto__:{
		extend:function
	}
	...
}</pre>
<strong>#demo2</strong>
<pre>
<code>
	function Dog(color){
		this.type = 'Dog';
		this.color = color;
	}
	var dog = new Class(Dog,{
		inherit:animal,
		extend:{
			saying:'Wang Wang ~~~'
		},
		paras:['blue']
	})
	console.log(dog)	
</code>
</pre>
<p>Output:</p>
<pre>{
	type: "Dog",
	saying: "Wang Wang",
	color: "blue",
	__proto__:{
		type: "Animal",
		extend:function
	}
	...
}</pre>
<strong>#demo3</strong>
<pre>
<code>
	var object = {
		name:'Object',
		init:function(paras){
			this.type = 'demo';
			this.paras = paras;
		}
	}
	var object1 = new Class(object,'this is paras');
	console.log(object1)	
</code>
</pre>
<p>Output:</p>
<pre>{
	name: "Object",
	paras: "this is paras",
	type: "demo",
	__proto__:{
		extend:function
	}
	...
}</pre>
<strong>#demo4</strong>
<pre>
<code>
	var object2 = new Class(object,{
		extend:{
			newName:'object2'
		},
		paras:['demo2']
	})
	console.log(object2)	
</code>
</pre>
<p>Output:</p>
<pre>{
	name: "Object",
	newName: "object2",
	paras: "demo2",
	type: "demo",
	__proto__:{
		extend:function
	}
	...
}</pre>
