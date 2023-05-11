## Hokuto

Experimental dom engine

#### Try it

- install deps  
  `> yarn `
- run unminified  
  `> yarn start`
- navigate to [http://127.0.0.1:3001](http://127.0.0.1:3001)
- edit the `src/sample/index.js` (or `style.css`)

## hello world 

Hokuto exposes in the global scope one single object named `hokuto` which allows you to render anything the browser allows.  

First let's see how to _salute our world_

`inner/howto1.js`
``` js
$$../sample/inner/howto1.js$$
```
and get  

![img](./img/1.png)

easy, but this is not enough right 😂 ?

## Examples

Below there is a progressive list of examples showing everything is possible using the `hokuto`. After the examples the full API specifications can be found.  
We will always start from an almost empty body it jsut contains one element meant to be used as root element:

``` html
<body>
    <div id="target"></div>
    <script src="yourScript.js"></script>
</body>
```


Before proceeding I need to give a sneak peeck of what was passed to the _render_ function.  
We passed the configuration to render what internally is represented by an instance of a _Unode_, it consists in a object that will contain all is needed to render a fully functional, styled and interactive DOMnode and its subtree, if specified.

The `render` accepts:  
- **`target`**: where to render the node, by default is `document.body` but as we will see this parameter is almost alway only used in the very to level config object
- **`tag`**: the tag needed (defaulted a `div`) can be any valid html element which exists at the moment the render function is invoked.  
- **`children`**: an array of _Unodes_
- ... let's ignore the rest for the moment

a simple example to clarify the usage of those basic parameters:

`inner/howto2.js`
``` js
$$../sample/inner/howto2.js$$
```
and get  

![img](./img/2.png)

in this case the root level object will use the default target (`document.body`) and the inner elements instead will have as target the node rendered starting from the _Unode_ of their corresponding parent object in the config (in this case the `ul` tag).  

Ad you can see in the html there's a _div#target_ which comes originally from the html: 
``` html
<body>
    <div id="target"></div>
    <script src="./inner/howto2.js"></script>
</body>
```
and this element is neither removed neither used as target (indeed the default target is the `document.body` and we are not passing _target_ to the root node config).  

As mentioned the default target is `document.body`, what is not being mentioned is that the render function accepts a scond boolean parameter, if truthy then the target will be completely emptied before rendering:  

`inner/howto3.js`
``` js
$$../sample/inner/howto3.js$$
```
and get a clean body, also the script itself is wipedout  

![img](./img/3.png)

and with that we know everything about `hokuto.render`.

## UNode config  

**`target`**:  
where to render the node, by default is `document.body` for the top element, for the deeper nodes by default is the parent node (but could be any other existing node)  

**`tag`**:  
the tag needed (defaulted to `div`); can be any valid html element.  

**`children`**:  
an array of _Unodes_  

**`html`**:  
set the inner html  

**`text`**:  
set the inner text  

**`attrs`**:  
set the node attributes (not valid for _className_, _style_ and data attributes) 

**`style`**:  
set the node inline styles

**`data`**:  
set the node data attributes

**`state`**:  
set an internal object to manage data related to that node

**`ref`**:  
this allows to reference this node easily from any other node.  

### life cycle

**`init`**: (Unode lifecycle)  
when passed this function will receive the _UNode_ instance and expects to return a boolean value which will decide whether the node will be rendered or not.  

**`cb`**: (Unode lifecycle)  
when passed this function will receive the _UNode_ instance and **if the `done` function is not invoked on it then the whole tree from the root will NOT be rendered**. When invoked the whole subtree exists already, it just awaits to be rendered.

**`end`**: (Unode lifecycle)  
when passed this function will receive the _UNode_ instance and will be called right after the done is actually rendered.  

### events 
**`on{Event}`**:  
this is a generic way to set an event listener, might be _onClick_, _onMouseover_ or any among the possible listeners; the listener function will receive the event as first parameter and the context will be the _Unode_ instance. Whenever the node gets replaced or deleted all the listeners are automatically unbinded.  

**`method_{name}`**:  
this is a way to add a method to the node


### what hokuto

The `hokuto` object does offer some other methods other than `render`:  

**`renderWithComponents`**  
_hokuto_ allows to use components which are rendered based on a specific config file (lazyloaded) and can accept properties. The only thing we have to take care is to allow _hokuto_ to know where to retrieve the components setting a _componentsUrl_

**`cleanup(target)`**    
cleanup the content of _target_
**`get(ref)`**    

**`load`**    
do u have another script that renders something else in the target? maybe you would need to do it with a proper routing, this function allows to route the app among all of the configured routes. An example will show how easy it is.

**`getElement(ref)`**    
wherever you call this funtion it will allow to retrieve one node passins its _ref_

**`getElements`**    
wherever you call this funtion it will the list of all nodes with a _ref_

**`channel`**    
this is exactly [channeljs](https://www.npmjs.com/package/@fedeghe/channeljs) function

**`i18n`**    
internationalization utility object

**`history`**    
histoy object 

---
---
---

## More examples


