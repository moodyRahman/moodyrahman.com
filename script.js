let colors = [
    {
        "bg-color": "#07093c",
        "text-color": "#FFF8E7",
        "accent": "#FFF8E7",
        "icon": "#FFF8E7",
        "name": "cosmic"
    },
    {
        "bg-color": "#8D6B94",
        "text-color": "#E8DBC5",
        "accent": "#B185A7",
        "icon": "#C3A29E",
        "name": "fairy-like"
    },
    {
        "bg-color": "#000000",
        "text-color": "#CF0A0A",
        "accent": "#EEEEEE",
        "icon": "#DC5F00",
        "name": "evil"
    },
    {
        "bg-color": "#182747",
        "text-color": "#D8D8D8",
        "accent": "#647E68",
        "icon": "#D8D8D8",
        "name": "aquatic"
    },
    {
        "bg-color": "#EBCFB2",
        "text-color": "#424B54",
        "accent": "#D5ACA9",
        "icon": "#B38D97",
        "name": "camouflaged"
    },
    {
        "bg-color": "#272727",
        "text-color": "#D4AA7D",
        "accent": "#EFD09E",
        "icon": "#D2D8B3",
        "name": "luxurious"
    },
    {
        "bg-color": "#EDBFC6",
        "text-color": "#AF8D86",
        "accent": "#5F4842",
        "icon": "#432E36",
        "name": "psittacina"
    },
    {
        "bg-color": "#006d77",
        "text-color": "#edf6f9",
        "accent": "#83c5be",
        "icon": "#e29578",
        "name": "rainy, but like, in a nice way"
    },
    {
        "bg-color": "#5288f2",
        "text-color": "#1C1018",
        "accent": "#ffe700",
        "icon": "#04c4ec",
        "name": "neon"
    },
    {
        "bg-color": "#3a2558",
        "text-color": "#8d71b4",
        "accent": "#573b79",
        "icon": "#6a518a",
        "name": "pulsating"
    },
    {
        "bg-color": "#da0000",
        "text-color": "#000000",
        "accent": "#ff4546",
        "icon": "#ff3938",
        "name": "wretched"
    },
    {
        "bg-color": "#ee6969",
        "text-color": "#fde0e0",
        "accent": "#f4c1c1",
        "icon": "#fdaaaa",
        "name": "like bubblegum"
    },
    {
        "bg-color": "#e34029",
        "text-color": "#f0d5ac",
        "accent": "#f0d5ac",
        "icon": "#f0d5ac",
        "name": "dusky"
    },
    {
        "bg-color": "#0D5D56",
        "text-color": "#8FD5A6",
        "accent": "#329F5B",
        "icon": "#8FD5A6",
        "name": "verdant"
    },

];

let done = [];
const orig = colors.length;
const element = document.getElementById("lucky");
const lucky = (e) => {

    if (done.length === orig) {
        colors = [...done];
        done.length = 0;
    }


    const color = colors[Math.floor(Math.random() * colors.length)];
    colors.splice(colors.indexOf(color), 1);
    done.push(color);

    for (const key in color) {
        document.documentElement.style.setProperty(`--${key}`, color[key]);
    }

    element.querySelector("span").innerHTML = `im feelin' <i>${color.name}</i>`;
};


element.addEventListener("click", lucky);


const buttons = document.querySelectorAll(".proj-link");

buttons.forEach(button => {

    button.addEventListener("click", (e) => {
        const t = button.querySelector(".tool-tip");
        t.style.display = "inline";
        !button.classList.contains("active") ? (() => { button.classList.add("active"); e.preventDefault() })() : void (0);
    })

    // const tip = button.querySelector(".tool-tip");
    // button.addEventListener("mouseover", starter(tip));
    // button.addEventListener("touchstart", starter(tip));
    // button.addEventListener("mouseout", ender(tip));
    // button.addEventListener("touchend", ender(tip));
});
