<a name="module_transformers"></a>

## transformers
A suite of composable transformations.


* [transformers](#module_transformers)
    * _static_
        * [.at(path, transformer)](#module_transformers.at) ⇒ <code>transformer</code>
        * [.get(...path)](#module_transformers.get) ⇒ <code>transformer</code>
        * [.hide(...keys)](#module_transformers.hide) ⇒ <code>transformer</code>
        * [.later(path, format)](#module_transformers.later) ⇒ <code>compareFunction</code>
        * [.map(transformer)](#module_transformers.map) ⇒ <code>transformer</code>
        * [.object(mapping)](#module_transformers.object) ⇒ <code>transformer</code>
        * [.on(f, g)](#module_transformers.on) ⇒ <code>function</code>
        * [.sequence(...transformers)](#module_transformers.sequence) ⇒ <code>transformer</code>
        * [.sortBy(compare)](#module_transformers.sortBy) ⇒ <code>transformer</code>
        * [.take(n)](#module_transformers.take) ⇒ <code>transformer</code>
    * _inner_
        * [~transformer](#module_transformers..transformer) ⇒ <code>U</code>
        * [~compareFunction](#module_transformers..compareFunction) ⇒ <code>number</code>

<a name="module_transformers.at"></a>

### transformers.at(path, transformer) ⇒ <code>transformer</code>
Walk down a path through an object and transform the end.

**Kind**: static method of <code>[transformers](#module_transformers)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Array.&lt;string&gt;</code> | A path into the object. |
| transformer | <code>transformer</code> |  |

<a name="module_transformers.get"></a>

### transformers.get(...path) ⇒ <code>transformer</code>
Walk down a path through an object an return the end.

**Kind**: static method of <code>[transformers](#module_transformers)</code>  

| Param | Type |
| --- | --- |
| ...path | <code>string</code> | 

<a name="module_transformers.hide"></a>

### transformers.hide(...keys) ⇒ <code>transformer</code>
Hide keys in an object.

**Kind**: static method of <code>[transformers](#module_transformers)</code>  

| Param | Type |
| --- | --- |
| ...keys | <code>string</code> | 

<a name="module_transformers.later"></a>

### transformers.later(path, format) ⇒ <code>compareFunction</code>
Return a comparison function for reverse chronological order.

**Kind**: static method of <code>[transformers](#module_transformers)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Array.&lt;string&gt;</code> | A path into an object. |
| format | <code>string</code> | [A Moment format.](http://momentjs.com/docs/#/parsing/string-format/) |

<a name="module_transformers.map"></a>

### transformers.map(transformer) ⇒ <code>transformer</code>
Transform every item in an array.

**Kind**: static method of <code>[transformers](#module_transformers)</code>  

| Param | Type |
| --- | --- |
| transformer | <code>transformer</code> | 

<a name="module_transformers.object"></a>

### transformers.object(mapping) ⇒ <code>transformer</code>
Construct a new object.

**Kind**: static method of <code>[transformers](#module_transformers)</code>  

| Param | Type | Description |
| --- | --- | --- |
| mapping | <code>object</code> | A map from keys to transformers. Each transformer should return the value for that key. |

<a name="module_transformers.on"></a>

### transformers.on(f, g) ⇒ <code>function</code>
Map two arguments with one function and then pass those results to
another.

**Kind**: static method of <code>[transformers](#module_transformers)</code>  

| Param | Type |
| --- | --- |
| f | <code>function</code> | 
| g | <code>function</code> | 

<a name="module_transformers.sequence"></a>

### transformers.sequence(...transformers) ⇒ <code>transformer</code>
Compose transformers in order.

**Kind**: static method of <code>[transformers](#module_transformers)</code>  

| Param | Type |
| --- | --- |
| ...transformers | <code>transformers</code> | 

<a name="module_transformers.sortBy"></a>

### transformers.sortBy(compare) ⇒ <code>transformer</code>
Sort array ordered by a comparison function.

**Kind**: static method of <code>[transformers](#module_transformers)</code>  

| Param | Type |
| --- | --- |
| compare | <code>compareFunction</code> | 

<a name="module_transformers.take"></a>

### transformers.take(n) ⇒ <code>transformer</code>
Return first `n` items in array.

**Kind**: static method of <code>[transformers](#module_transformers)</code>  

| Param | Type |
| --- | --- |
| n | <code>number</code> | 

<a name="module_transformers..transformer"></a>

### transformers~transformer ⇒ <code>U</code>
A transformation.

**Kind**: inner typedef of <code>[transformers](#module_transformers)</code>  

| Type |
| --- |
| <code>T</code> | 

<a name="module_transformers..compareFunction"></a>

### transformers~compareFunction ⇒ <code>number</code>
Compare two values and return their ordering.

**Kind**: inner typedef of <code>[transformers](#module_transformers)</code>  
**Returns**: <code>number</code> - - A negative, zero, or positive number.  
**See**: [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)  

| Param | Type |
| --- | --- |
| a | <code>T</code> | 
| b | <code>T</code> | 

