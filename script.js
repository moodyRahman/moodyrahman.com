let colors = [
    {
        "bg-color": "#07093c",
        "text-color": "#FFF8E7",
        "accent": "#FFF8E7",
        "icon": "#FFF8E7",
        "name": "cosmic"
    },
    {
        "bg-color": "#795879",
        "text-color": "#E8E8E8",
        "accent": "#E9DDE7",
        "icon": "#C3A29E",
        "name": "fairy-like"
    },
    {
        "bg-color": "#000000",
        "text-color": "#F41515",
        "accent": "#EEEEEE",
        "icon": "#DC5F00",
        "name": "evil"
    },
    {
        "bg-color": "#182747",
        "text-color": "#D8D8D8",
        "accent": "#7E9A84",
        "icon": "#D8D8D8",
        "name": "aquatic"
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
        "text-color": "#654B43",
        "accent": "#5F4842",
        "icon": "#432E36",
        "name": "psittacina"
    },
    {
        "bg-color": "#006d77",
        "text-color": "#edf6f9",
        "accent": "#C7E6E4",
        "icon": "#e29578",
        "name": "rainy, but like, in a nice way"
    },
    {
        "bg-color": "#1155DF",
        "text-color": "#1C1018",
        "accent": "#ffe700",
        "icon": "#04c4ec",
        "name": "neon"
    },
    {
        "bg-color": "#3a2558",
        "text-color": "#C3B7D7",
        "accent": "#A592C9",
        "icon": "#6a518a",
        "name": "pulsating"
    },
    {
        "bg-color": "#F00000",
        "text-color": "#000000",
        "accent": "#FFEBEB",
        "icon": "#ff3938",
        "name": "wretched"
    },
    {
        "bg-color": "#fc9f9f",
        "text-color": "#424242",
        "accent": "#791616",
        "icon": "#fdaaaa",
        "name": "like bubblegum"
    },
    {
        "bg-color": "#e34029",
        "bg-color": "#0D5D56",
        "text-color": "#8FD5A6",
        "accent": "#329F5B",
        "icon": "#8FD5A6",
        "name": "verdant"
    },
    {
        "bg-color": "#000000",
        "text-color": "#008F11",
        "accent": "#008F11",
        "icon": "#008F11",
        "name": "in the matrix"

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

    button.addEventListener("click", async (e) => {
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
