
var value = (function (numHolder) { 
  
  return function (num) { 
    
    
    if(num === "CE") {
       document.getElementById("eachValue").innerHTML = "0";  
    }
      
		var dupeSign = [];
		var lastValue = numHolder[numHolder.length - 1];
      
		if(num === "CE" && typeof lastValue === "number") {
			numHolder.splice(-1);
		}
		else if (num === "+" && lastValue === "+") {
			dupeSign.push(num);
		}
		else if (num === "-" && lastValue === "-") {
			dupeSign.push(num);
		}
		else if (num === "\xD7" && lastValue=== "\xD7") {
			dupeSign.push(num);
		}
		else if (num === "\xF7" && lastValue === "\xF7") {
			dupeSign.push(num);
		}
		else if(!isNaN(num) && lastValue === "*") {
			dupeSign.push(num);
		}
		else if(num === "." && lastValue === ".") {
        dupeSign.push(num);
		}
		else if(num === "*" && lastValue === "*") {
			numHolder.splice(-1);
		}
		else if(num === "." && lastValue === "*") {
        dupeSign.push(num);
		}
		else if(isNaN(num) && isNaN(lastValue) && lastValue !== "*" && num !== "." && num !=="CE") {
			numHolder.splice(-1, 1, num);
		}
		else if (num !== "CE") {
			numHolder.push(num);
		}
      
      
    return mapToNumbers(numHolder); 
      
    };
    
    
}([])); 

function mapToNumbers(numHolder) {
  
	numHolder.forEach(function(item, index, array) {
		if(array[0] === "+" || array[0] === "-" || array[0] === "\xD7" || array[0] === "\xF7" || array[0] === "^" || array[0] === "*") {
			numHolder.shift();
		}
    
	});
  
  
	var numTranslator = numHolder.join("").split(/([^0-9.])/);
  
  
	numTranslator.forEach(function(item, index, array) {
		if(item === "") {
		array.splice(index, 1);
		}
	});
  
	var switchToNum = numTranslator.map(function(item, index, array) {
    
		if(!isNaN(item)) {
			document.getElementById("eachValue").innerHTML = item;
			return parseFloat(item);    
		}
		else {
			return item;
		}   
	});
  
	switchToNum.forEach(function(item, index, array) {
		if(item === "-" && array[index+1] === "-") {
			array.splice(index, 1);
			array.splice(index, 1, "+");
		}
		if(item === "\xD7" && array[index+1] === "-" && typeof array[index+2] === "number") {
			array.splice(index, 3, "-", array[index+2]);
		}
		if(item === "\xF7" && array[index+1] === "-" && typeof array[index+2] === "number") {
			array.splice(index, 3, "-", array[index+2]);
		}
		if(item === "^" && array[index+1] === "-" && typeof array[index+2] === "number") {
			array.splice(index, 3, "-", array[index+2]);
		}
		if(item === "*" && !isNaN(array[index-1])) {
			array.splice(index-1, 2, array[index-1] * -1);
		}
    });
  
	document.getElementById("values").innerHTML = switchToNum.join("");
  
  return findValue(switchToNum);
}

var result = 0;
function findValue(switchToNum) {
  
  result = 0;

	switchToNum.reduce(function(curr, next, index, array) {
  
		var previousValue = array[index-1];
		var isNumber = typeof next === "number";        
    
		if(typeof curr === "number") {
			result += curr;
		}
		if(isNumber && previousValue === "+") {
			result += next;
		}
		if(isNumber && previousValue === "\xD7") {
			result *= next;
		}
		if(isNumber && previousValue === "-") {
			result -= next;
		}
		if(isNumber && previousValue === "\xF7") {
			result /= next;
		}
		if(isNumber && previousValue === "^") {
		result = Math.pow(result, next);
		}
  
	});
   return result;   
}

function showValue(result) {
  
  
  if(result > 1000000000 && isFinite(result)) {
    result = result.toExponential();
    document.getElementById("eachValue").innerHTML = result;
  } 
  else if(result < -1000000000 && isFinite(result)) {
    result = result.toExponential();
    document.getElementById("eachValue").innerHTML = result;
  } 
  else if(isNaN(result)) {
    result = "Error";
    document.getElementById("eachValue").innerHTML = result;
  }
  else if(result === Infinity) {
    result = "Cannot divide by Zero";
    document.getElementById("eachValue").innerHTML = result;
  }
  else {
	result = Number(result).toLocaleString();
	document.getElementById("eachValue").innerHTML = result;
  }
  
}

function clearAllValue() {
	document.location.href = "";
}