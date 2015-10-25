//knockoutjs extensions

interface KnockoutObservableArrayFunctions<T> {
  findById(key:string): T;
  filterIf(condition:Function) : void;
  containsById: (any) => boolean;
  getRandomItem: () => T;
}

//todo: optimize this using a lookup table
ko.observableArray.fn.findById = function(Id) {
  
  for (var i = 0; i < this().length; i++) {
    if (this()[i].Id === Id) {
      return this()[i];
    }
  }
    
	return undefined;
}

ko.observableArray.fn.filterIf = function(fn) {
	for (var i = 0; i < this().length; i++) {
      if (fn(this()[i])) { 
          this().splice(i, 1);
          i--; //decrement
      }
	}
}

ko.observableArray.fn.containsById = function(Id) {
  
  for (var i = 0; i < this.length; i++) {
    if (this()[i].Id === Id) {
      return true;
    }
  }
    
  return false;
}

ko.observableArray.fn.getRandomItem = function() {
  
  var r:number = Math.floor(Math.random() * this().length);

  return this()[r];
}

//interface KnockoutMapping {
//  createInstance<T>(jsObject:any):T;
//}

interface ClassPtr {
    new (): any;
    new (...params: any[]): any;
}

function createInstance(type:ClassPtr, jsObject:any, mapping?:any):any {

  var ret:any = new type();

  ko.mapping.fromJS( jsObject, mapping, ret);

  return ret;
};