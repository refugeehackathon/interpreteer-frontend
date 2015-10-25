//array extensions
interface Array<T> {
  //removeItem: (any) => void;
  containsKey: (any) => boolean;
  findById: (any) => any;
  containsById: (any) => boolean;
  addById: (any) => void;
}

/*
Array.prototype.removeItem = function(v) { 

	if(this.indexOf(v) == -1)
		return;
		
	this.splice(this.indexOf(v), 1); 
}
*/

Array.prototype.containsKey = function(k:any): boolean {
  return (k in this);
}

Array.prototype.findById = function(Id:any): any {
  
  for (var i = 0; i < this.length; i++) {
    if (this[i].Id === Id) {
      return this[i];
    }
  }
    
  return undefined;
}

Array.prototype.containsById = function(Id:any):boolean {
  
  for (var i = 0; i < this.length; i++) {
    if (this[i].Id === Id) {
      return true;
    }
  }
    
  return false;
}

Array.prototype.addById = function(value:any):void {
  this[value.Id] = value;
}

//Object extensions
interface Object {
  //length: () => number;
}

//Object.prototype.length = function() {
//    var size = 0, key;
//    for (key in this) {
//         if (this.hasOwnProperty(key)) 
//           size++;
//     }
//     return size;
// };

//String extensions
interface String {
	startsWith: (value: string) => boolean;
	contains: (value: string) => boolean;
}

String.prototype.startsWith = function(value:string) {
  return this.lastIndexOf(value, 0) === 0;
}

String.prototype.contains = function (value: string) {
	return this.indexOf(value) != -1;
}