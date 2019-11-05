 
// var list=[result];  
// var list = [ 
//    { "col_1": "val_11", "col_3": "val_13" }, 
//  { "col_2": "val_22", "col_3": "val_23" }, 
//     { "col_1": "val_31", "col_3": "val_33" } 
// ];    
       
$("#search-form").submit(function(){
    var fd = $(this).serializeArray();

    $.post('/',fd,function(result){
        list = result;
    })

    return false;
})

function constructTable(selector) { 
        
    $(selector).empty();
    // Getting the all column names 
    var cols = Headers(list, selector);   

    // Traversing the JSON data 
    for (var i = 0; i < list.length; i++) { 
        var row = $('<tr/>');    
        for (var colIndex = 0; colIndex < cols.length; colIndex++) 
        { 
            var val = list[i][cols[colIndex]]; 
                
            // If there is any key, which is matching 
            // with the column name 
            if (val == null) val = "";   
                row.append($('<td/>').html(val)); 
        } 
            
        // Adding each row to the table 
        $(selector).append(row);
    } 
} 
    
function Headers(list, selector) { 
    var columns = []; 
    var header = $('<tr/>'); 
        
    for (var i = 0; i < list.length; i++) { 
        var row = list[i]; 
            
        for (var k in row) { 
            if ($.inArray(k, columns) == -1) { 
                columns.push(k); 
                    
                // Creating the header 
                header.append($('<th/>').html(k)); 
            } 
        } 
    } 
        
    // Appending the header to the table 
    $(selector).append(header); 
        return columns; 
} 