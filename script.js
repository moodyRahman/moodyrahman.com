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


let fallen = false;
const GRAVITY = 0.5;

const collapse = (e) => {
    e.preventDefault();
    if (fallen) return;
    fallen = true;

    const root = document.documentElement;
    const viewport = window.innerHeight;
    const startHeight = Math.max(root.scrollHeight, viewport);
    // the floor is always the bottom edge of what's on screen, so it moves as you scroll
    const getFloor = () => window.scrollY + window.innerHeight;
    let floor = getFloor();

    // measure everything before pulling anything out of the layout
    const pieces = [...document.querySelectorAll("p, h4, .proj-link, .section > a")].map(el => {
        const r = el.getBoundingClientRect();
        return {
            el,
            x: r.left + window.scrollX,
            y: r.top + window.scrollY,
            w: r.width,
            h: r.height,
        };
    });

    // extra room below so there's still somewhere to scroll once everything is out of the flow
    document.body.style.height = `${startHeight + viewport * 2}px`;
    root.style.overflowX = "hidden";

    for (const p of pieces) {
        const s = p.el.style;
        s.position = "absolute";
        s.left = `${p.x}px`;
        s.top = "0px";
        s.width = `${p.w}px`;
        s.margin = "0";
        s.boxSizing = "border-box";
        s.zIndex = "1";
        p.dy = p.y;
        // a small hop up before gravity takes over
        p.vy = -(5 + Math.random() * 2);
        // and a random push left or right, so they don't all land in one pile
        p.vx = (Math.random() - 0.5) * 12;
        p.dx = 0;
        p.rot = 0;
        p.vrot = (Math.random() - 0.5) * 0.8;
        p.delay = Math.random() * 15;
        p.settled = false;
        s.transform = `translate(${p.dx}px, ${p.dy}px)`;
    }

    let frame = 0;

    const tick = () => {
        frame++;

        floor = getFloor();

        for (const p of pieces) {
            if (frame < p.delay) continue;

            // the floor dropped away (scrolled down): start falling again
            if (p.settled && p.dy + p.h < floor - 0.5) {
                p.settled = false;
                p.vy = 0;
            }
            if (p.settled && Math.abs(p.vx) < 0.05 && Math.abs(p.dy + p.h - floor) <= 0.5) continue;

            if (!p.settled) {
                p.vy += GRAVITY;
                p.dy += p.vy;
                p.rot += p.vrot;
            } else {
                // sliding along the floor
                p.vx *= 0.9;
                p.vrot *= 0.9;
            }

            p.dx += p.vx;
            // stay on the page, bouncing off the side edges
            const minDx = -p.x;
            const maxDx = root.clientWidth - p.x - p.w;
            if (p.dx < minDx) { p.dx = minDx; p.vx = Math.abs(p.vx) * 0.5; }
            if (p.dx > maxDx) { p.dx = maxDx; p.vx = -Math.abs(p.vx) * 0.5; }
            if (p.settled && Math.abs(p.vx) < 0.05) p.vx = 0;

            // landing, or the floor rising (scrolled up) and carrying it along
            if (p.dy + p.h >= floor) {
                p.dy = floor - p.h;
                p.vy = 0;
                p.settled = true;
            }
            p.el.style.transform = `translate(${p.dx}px, ${p.dy}px) rotate(${p.rot}deg)`;
        }

        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

document.getElementById("fall").addEventListener("click", collapse);


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
