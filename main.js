// Yes I know its bad
let container = document.getElementById("Container");
function hover(e) {
    var _id = e.id
    if (_id == "Server") {
        window.location = ('none.html')

    }
    if (_id == "Store") {
        window.location = ('store.html')
    }
    if (_id == "Trailers") {
        window.location = ('https://www.youtube.com/channel/UCY1hMzsMsoOw3RZ1nbs31Gw')
    }
    if (_id == "Games") {
        window.location = ('https://flowwave.itch.io/')
    }
    if (_id == "Tools") {
        window.location = ('none.html')
    }
    if (_id == "Discord") {
        window.location = 'https://discord.com/invite/3zb78Pp4kw'
    }
    // var offset = e.offsetLeft - e.parentElement.scrollLeft + e.offsetWidth / 2

}
