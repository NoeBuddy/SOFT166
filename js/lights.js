//I took your treasure.js folder from one of your (Atkinson) labs and edited them to a point where I could understand/use it.

//This function is used in the togglelight() function. It forms the light uri that I'm calling up
function getLightURI(number)
{
    var IP = "http://192.168.0.50/api/";
    var username = "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz";
    var lights = "/lights/";
    var URI = IP + username + lights;
    return URI + number +"/";
}

//To put it simply this function just turns a light on if it's off and vice versa.
function togglelight(number)
{
    var getState = $.getJSON(getLightURI(number), function (data)
    {
        var state = data["state"]["on"];
        if (state)
        {
            state = false;
        }
        else
        {
            state = true;
        }

        var lightState = {"on" : state};

        $.ajax({
            url: getLightURI(number) + "state/",
            type: "PUT",
            data: JSON.stringify(lightState)
        })
    });
}

//At this point I can't figure out what this last bit does and I don't want to delete it for fear that it makes my code
//work. Since I'm in America I can't be certain what will happen so I'm just leaving it
$(document).ready(function()
{
    $('td').click(function()
    {
        togglelight($(this));

        if (checkWin($(this)))
        {
            $(this).removeClass("bg-light").addClass("bg-success");
            alert("Congratulations you have won!");
        }
        else
        {
            $(this).removeClass("bg-light").addClass("bg-danger");
        }
    })
});