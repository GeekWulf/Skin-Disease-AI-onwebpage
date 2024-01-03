let AnimatedElem = document.querySelectorAll("section")

window.onscroll = () => {
    AnimatedElem.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop -100;
        let height = sec.offsetHeight;
    
        if (top >= offset && top < offset + height) {
            sec.classList.add("animation");
        }else {
            sec.classList.remove("animation");
        }
    })
}