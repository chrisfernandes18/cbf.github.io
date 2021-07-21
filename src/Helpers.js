// Source: https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/
export function removeTags(str) { 
    if ((str===null) || (str==='')) 
        return false; 
    else
        str = str.toString(); 
          
    // Regular expression to identify HTML tags in  
    // the input string. Replacing the identified  
    // HTML tag with a null string. 
    return str.replace( /(<([^>]+)>)/ig, ''); 
} 

// Source: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-37.php
export function timezone() 
{ 
  return /\((.*)\)/.exec(new Date().toString())[1];
}
