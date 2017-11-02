var UniqueArr = function(arr)
{
    var temp = [];
    arr.forEach(function(el1) 
    {
        var unique = true;
        temp.forEach(function(el2) 
        {
            if (el1.name === el2.name)
            {
                unique = false;
            }
        });
        if (unique)
        {
            temp.push(el1);
        }
    });

    return temp;
};

module.exports = UniqueArr;