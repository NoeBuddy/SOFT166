function checkWin(element)
{
    var treasure = "4";
    var winner = false;
    if (element.attr("id") === treasure)
    {
        winner = true;
    }
    return winner;
};

function getLightURI(number)
{
    var IP = "http://192.168.0.50/api/";
    var username = "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz";
    var lights = "/lights/";
    var URI = IP + username + lights;
    return URI + number +"/";
}

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